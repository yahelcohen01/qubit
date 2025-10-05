import {
  DotIcon,
  ExternalLinkIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@shared/icons";
import { ResponsiveLayout } from "../responsive-layout";
import { FadingText } from "../fading-text";
import { AnyFieldApi, formOptions, useForm } from "@tanstack/react-form";
import { Select } from "../select";
import { cn } from "@shared/lib";

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative w-full py-16 px-4 md:px-16 lg:px-24 xl:px-56 scroll-mt-30"
    >
      <div
        className={cn(
          "absolute right-0 -translate-y-1/2 pointer-events-none z-0 h-[90%] top-3/4 md:top-1/2"
        )}
      >
        <img
          src="/assets/contact-section-bg.png"
          alt="contact-section-bg"
          className="w-auto h-auto max-h-full object-cover"
          style={{
            mask: `
      linear-gradient(to left, black 75%, transparent),
      linear-gradient(to bottom, black 75%, transparent)
    `,
            WebkitMask: `
      linear-gradient(to left, black 75%, transparent),
      linear-gradient(to bottom, black 75%, transparent)
    `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
      </div>
      <ResponsiveLayout
        className="text-center md:text-left"
        columns={{ base: 1, md: 2 }}
      >
        <div className="relative flex flex-col gap-6 justify-center md:justify-start items-center md:items-start">
          <FadingText className="text-3xl sm:text-3xl md:text-5xl xl:text-6xl font-normal flex flex-col">
            <div className="text-sm font-normal mb-4 flex items-center gap-x-2 mx-auto md:mx-0">
              <DotIcon color="white" /> CONTACT
            </div>
            Join the Quantum Revolution
          </FadingText>
          <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-4xl font-poppins">
            Reach out with any question, idea, or opportunity.
          </p>
          <h3 className="text-base sm:text-lg md:text-xl font-normal mt-4">
            Join Qubit Community
          </h3>
          <div className="flex gap-12">
            <div className="flex font-poppins items-center gap-2">
              <a
                href="https://www.linkedin.com/company/qubit-community"
                target="_blank"
                rel="noopener noreferrer"
                className="flex underline items-center gap-1"
              >
                <div className="my-auto justify-self-end bg-[#0277B5] p-3 rounded-full shadow-[0_0_15px_#0277B5]">
                  <LinkedinIcon className="size-4" />
                </div>
                LinkedIn
                <ExternalLinkIcon className="size-3" />
              </a>
            </div>

            <div className="flex font-poppins items-center gap-2">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex underline items-center gap-1"
              >
                <div className="my-auto justify-self-end bg-[#57F573] p-3 rounded-full relative shadow-[0_0_15px_#57F573]">
                  <WhatsappIcon className="size-4 text-black" />
                </div>
                WhatsApp
                <ExternalLinkIcon className="size-3" />
              </a>
            </div>
          </div>
        </div>
        <ContactForm />
      </ResponsiveLayout>
    </section>
  );
};

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

const ContactForm = () => {
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
          onMount: ({ value }) => (!value ? "A Name is required" : undefined),
          onChange: ({ value }) =>
            !value
              ? "A Name is required"
              : value.length < 3
              ? "Name must be at least 3 characters"
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
          onMount: ({ value }) => (!value ? "An email is required" : undefined),
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
        // validators={{
        //   onChange: ({ value }) =>
        //     value
        //       ? !/^\+?[1-9]\d{1,14}$/.test(value)
        //       : "Phone number is invalid",
        // }}
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
  return (
    <div className="flex flex-col gap-4 justify-start">
      <label className="flex justify-start" htmlFor={field.name}>
        {label}
      </label>
      <input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 rounded-full leading-7 border border-white/20 focus:border-white/50 transition-all"
      />
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
  return (
    <div className="flex flex-col gap-4 justify-start col-span-full">
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
    <div className="relative flex flex-col gap-4 justify-start">
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
