import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { NextRequest, NextResponse } from "next/server";
import { ZodSchema, ZodError } from "zod";
import { getToken, JWT } from "next-auth/jwt";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ValidationSchema {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

interface ValidateEndpointOptions {
  authenticate?: boolean;
  requireAdmin?: boolean;
}

type InferValidatedData<T extends ValidationSchema> = {
  validatedBody: T["body"] extends ZodSchema
    ? Awaited<ReturnType<T["body"]["parseAsync"]>>
    : undefined;
  query: T["query"] extends ZodSchema
    ? Awaited<ReturnType<T["query"]["parseAsync"]>>
    : undefined;
  params: T["params"] extends ZodSchema
    ? Awaited<ReturnType<T["params"]["parseAsync"]>>
    : undefined;
};

type ValidatedData = {
  validatedBody?: unknown;
  query?: unknown;
  params?: unknown;
};

type EndpointHandler<T extends ValidationSchema = ValidationSchema> = (
  request: NextRequest & InferValidatedData<T>,
  token?: JWT | null
) => Promise<NextResponse>;

export function validateEndpoint<T extends ValidationSchema>({
  schema,
  handler,
  options = { authenticate: true, requireAdmin: false },
}: {
  schema: T;
  handler: EndpointHandler<T>;
  options: ValidateEndpointOptions;
}) {
  return async (request: NextRequest) => {
    try {
      if (options.authenticate) {
        const authResponse = await authenticateRequest(
          request,
          options.requireAdmin
        );
        if (authResponse) {
          return authResponse;
        }
      }

      const validated = await validateRequest(request, schema);
      if (validated instanceof NextResponse) {
        return validated;
      }

      const requestWithValidated = Object.assign(
        request,
        validated
      ) as InferValidatedData<T> & NextRequest;
      return await handler(requestWithValidated);
    } catch (error) {
      console.error("Endpoint error:", error);
      return NextResponse.json(
        {
          success: false,
          error:
            error instanceof Error ? error.message : "Internal server error",
        },
        { status: 500 }
      );
    }
  };
}

async function authenticateRequest(
  request: NextRequest,
  requireAdmin?: boolean
): Promise<NextResponse | null> {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "server_misconfigured" },
      { status: 500 }
    );
  }

  const token = await getToken({ req: request, secret });
  if (!token?.email) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  if (requireAdmin) {
    const adminEmails = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    if (!adminEmails.includes(String(token.email).toLowerCase())) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
  }

  return null;
}

async function validateRequest<T extends ValidationSchema>(
  request: NextRequest,
  schema: T
): Promise<InferValidatedData<T> | NextResponse> {
  const validated: ValidatedData = {};

  try {
    if (schema.body) {
      const body = await request.json();
      validated.validatedBody = schema.body.parse(body);
    }

    if (schema.query) {
      const searchParams = Object.fromEntries(
        new URL(request.url).searchParams.entries()
      );
      validated.query = schema.query.parse(searchParams);
    }

    if (schema.params) {
      const { pathname } = new URL(request.url);
      const pathSegments = pathname.split("/").filter(Boolean);
      validated.params = schema.params.parse({ path: pathSegments });
    }

    return validated as InferValidatedData<T>;
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
            code: issue.code,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to parse request",
      },
      { status: 400 }
    );
  }
}
