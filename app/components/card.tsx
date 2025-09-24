import { cn } from "@shared/lib";
import { CardDividerIcon } from "@shared/icons";

interface CardProps {
  title: string;
  content: string;
  className?: string;
}

export const Card = ({ title, content, className }: CardProps) => {
  return (
    <div
      className={cn(
        "grid gap-2 items-start bg-card-bg rounded-lg p-6 font-poppins",
        className
      )}
    >
      <h2 className="text-2xl text-black font-medium">{title}</h2>
      <CardDividerIcon />
      <p className="font-normal text-black">{content}</p>
    </div>
  );
};
