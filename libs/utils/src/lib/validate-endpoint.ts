import { Request, Response, NextFunction, type RequestHandler } from 'express';
import { z, ZodTypeAny } from 'zod';

type SchemaObject = {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
};

export function validateEndpoint<
  T extends SchemaObject,
  ReqBody = T['body'] extends ZodTypeAny ? z.infer<T['body']> : unknown,
  ReqQuery = T['query'] extends ZodTypeAny ? z.infer<T['query']> : unknown,
  ReqParams = T['params'] extends ZodTypeAny ? z.infer<T['params']> : unknown
>(
  schema: T,
  handler: (
    req: Request<ReqParams, any, ReqBody, ReqQuery>,
    res: Response
  ) => any
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) req.body = await schema.body.parseAsync(req.body);
      if (schema.query) req.query = await schema.query.parseAsync(req.query);
      if (schema.params)
        req.params = await schema.params.parseAsync(req.params);
      return handler(req as Request<ReqParams, any, ReqBody, ReqQuery>, res);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      next(err);
    }
  };
}
