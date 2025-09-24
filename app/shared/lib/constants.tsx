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

export const stats = [
  {
    label: "Events",
    value: "30+",
    className: "col-span-1",
    content: "Events with global thought leaders.",
  },
  {
    label: "Members",
    value: "1000+",
    className: "col-span-1",
    content: "members in our super-active WhatsApp community.",
  },
  {
    label: "Companies",
    value: "100+",
    className: "col-span-1",
    content: "Participants taking part in Israel’s first quantum hackathon.",
  },
  {
    label: "Leadership",
    value: "Leadership",
    className: "col-span-1",
    content: "C-suite leaders across finance, energy, healthcare, etc.",
  },
  {
    label: "Synergy",
    value: "Synergy",
    className: "col-span-2 navbar:col-span-1",
    content:
      "Collaboration with the Israel Innovation Authority and national quantum leadership.",
  },
] as const;
