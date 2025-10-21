import { formOptions, useForm, AnyFieldApi } from "@tanstack/react-form";
import { Select } from "../select";

type ContactFormFields = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const defaultForm: ContactFormFields = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const formOpts = formOptions({
  defaultValues: defaultForm,
});

export const ContactForm = () => {
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? `Server error ${res.status}`);
        }
        form.reset();
      } catch (err) {
        console.error("Failed to send contact message", err);
        throw err;
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-8 rounded-2xl backdrop-blur-md"
    >
      <form.Field
        name="fullName"
        validators={{
          onChange: ({ value }) =>
            !value
              ? "A Name is required"
              : value.length < 3
              ? "Minimum 3 characters"
              : undefined,
        }}
        children={(field) => {
          return (
            <InputField
              field={field}
              label="Full Name *"
              placeholder="Full Name"
            />
          );
        }}
      />
      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) =>
            !value
              ? "An email is required"
              : !/\S+@\S+\.\S+/.test(value)
              ? "Email is invalid"
              : undefined,
        }}
        children={(field) => {
          return (
            <InputField field={field} label="Email *" placeholder="Email" />
          );
        }}
      />
      <form.Field
        name="phone"
        children={(field) => {
          return <InputField field={field} label="Phone" placeholder="Phone" />;
        }}
      />
      <form.Field
        name="subject"
        children={(field) => {
          return (
            <SelectField
              field={field}
              label="Subject"
              options={[
                { label: "General Inquiry", value: "general-inquiry" },
                { label: "Partnership", value: "partnership" },
                { label: "Sponsorship", value: "sponsorship" },
                { label: "Other", value: "other" },
              ]}
            />
          );
        }}
      />
      <form.Field
        name="message"
        children={(field) => {
          return (
            <TextField
              field={field}
              label="Message"
              placeholder="Your message here..."
            />
          );
        }}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit}
            className="disabled:cursor-not-allowed disabled:opacity-50 col-span-full bg-white/10 hover:bg-white/20 transition-colors py-3 px-6 rounded-full flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? "..." : "Submit"}
          </button>
        )}
      />
    </form>
  );
};

const InputField = ({
  field,
  label,
  placeholder,
}: {
  field: AnyFieldApi;
  label: string;
  placeholder: string;
}) => {
  const errors = field.state.meta.errors as string[];
  return (
    <div className="flex flex-col gap-2 justify-start">
      <label className="flex justify-start" htmlFor={field.name}>
        {label}
      </label>
      <div className="flex flex-col justify-start">
        <input
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 rounded-full leading-7 border border-white/20 focus:border-white/50 transition-all"
        />
        {errors?.length > 0 && (
          <div className="text-red-500 text-sm mt-1" role="alert">
            {errors.map((err, i) => (
              <div key={i}>{err}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const TextField = ({
  field,
  label,
  placeholder,
}: {
  field: AnyFieldApi;
  label: string;
  placeholder: string;
}) => {
  const errors = field.state.meta.errors as string[];
  return (
    <div className="flex flex-col gap-2 justify-start col-span-full">
      <label className="flex justify-start" htmlFor={field.name}>
        {label}
      </label>
      <textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 rounded-2xl leading-7 border border-white/20 focus:border-white/50 transition-all"
      />
      {errors?.length > 0 && (
        <div className="text-red-500 text-sm mt-1" role="alert">
          {errors.map((err, i) => (
            <div key={i}>{err}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const SelectField = ({
  field,
  label,
  options,
}: {
  field: AnyFieldApi;
  label: string;
  options: { label: string; value: string }[];
}) => {
  return (
    <div className="relative flex flex-col gap-2 justify-start">
      <label className="flex justify-start" htmlFor={field.name}>
        {label}
      </label>
      <Select
        options={options}
        value={field.state.value}
        onChange={field.handleChange}
        onBlur={field.handleBlur}
        placeholder="Select Subject"
      />
    </div>
  );
};
