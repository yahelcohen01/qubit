import Link from "next/link";
import { ExternalLinkIcon } from "../shared/icons";

export const JoinToNewsletter = () => {
  return (
    <Link
      className="flex justify-start text-center items-center gap-1 hover:underline"
      href={"https://qubitil.substack.com/welcome"}
      target="_blank"
    >
      <h4 className="text-base font-semibold text-white">
        Subscribe to Our Newsletter
      </h4>
      <ExternalLinkIcon />
    </Link>
  );
};
