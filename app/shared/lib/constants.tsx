import {
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "../icons";
import { NavItem } from "../types";

export const socials = [
  {
    label: "LinkedIn",
    icon: <LinkedinIcon />,
    href: "https://www.linkedin.com/company/qubit-community/",
  },
  {
    label: "Facebook",
    icon: <FacebookIcon />,
    href: "https://www.facebook.com/QubitQuantum",
  },
  {
    label: "YouTube",
    icon: <YoutubeIcon />,
    href: "https://www.youtube.com/@QubitQuantum",
  },
  {
    label: "Whatsapp",
    icon: <WhatsappIcon />,
    href: "https://wa.me/972546666888",
  },
] as const;

export const navItems: NavItem[] = [
  { label: "Israel in Quantum Tech", href: "#" },
  { label: "Who's Who", href: "#who" },
  { label: "Activities", href: "#activities" },
  { label: "Career", href: "#career" },
  { label: "About", href: "#about" },
  { label: "Content hub", href: "#content-hub" },
] as const;
