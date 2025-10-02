import {
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "../icons";
import { CarouselItem, NavItem } from "../types";

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

export const startups: CarouselItem[] = [
  {
    title: "LightSolver",
    img: "/assets/light-solver.png",
  },
  {
    title: "IQCC",
    img: "/assets/iqcc.png",
  },
  {
    title: "Qarakal",
    img: "/assets/qarakal.png",
  },
  {
    title: "Quantum Source",
    img: "/assets/quantum-source.png",
  },
  {
    title: "TQS",
    img: "/assets/tqs.png",
  },
  {
    title: "Quantum Pulse",
    img: "/assets/quantum-pulse.png",
  },
  {
    title: "Qedma",
    img: "/assets/qedma.png",
  },
  {
    title: "QuamCore",
    img: "/assets/quamcore.png",
  },
  {
    title: "Raicol Crystals",
    img: "/assets/raicol-crystals.png",
  },
  {
    title: "Classiq",
    img: "/assets/classiq.png",
  },
  {
    title: "Quantum Art",
    img: "/assets/quantum-art.png",
  },
  {
    title: "Quantum Transistors",
    img: "/assets/quantum-transistors.png",
  },
  {
    title: "HEQA",
    img: "/assets/heqa.png",
  },
  {
    title: "Quantum Machines",
    img: "/assets/quantum-machines.png",
  },
  {
    title: "Wiz",
    img: "/assets/wiz.png",
  },
  {
    title: "Triarii",
    img: "/assets/triarii.png",
  },
  {
    title: "Accubeat",
    img: "/assets/accubeat.png",
  },
  {
    title: "Quantimize",
    img: "/assets/quantimize.png",
  },
  {
    title: "Spinflex",
    img: "/assets/spinflex.png",
  },
] as const;

export const institutes = [
  {
    name: "Hebrew University",
    img: "/assets/hebrew-university.png",
  },
  {
    name: "Weizmann Institute",
    img: "/assets/weizmann-institute-of-science.png",
  },
  {
    name: "Tel Aviv University",
    img: "/assets/tel-aviv-university.png",
  },
  {
    name: "Technion",
    img: "/assets/technion-university.png",
  },
  {
    name: "Ben Gurion University",
    img: "/assets/ben-gurion-university.png",
  },
  {
    name: "Bar Ilan University",
    img: "/assets/bar-ilan-university.png",
  },
  {
    name: "Ariel University",
    img: "/assets/ariel-university.png",
  },
] as const;

export const eventsHighlights: CarouselItem[] = [
  {
    img: "/assets/meetup-tlv-2025.png",
    title:
      "Meetup 2025 Tel Aviv — talking about everything shaping the world of quantum",
  },
  {
    img: "/assets/quantum-meetup-tlv-2025.png",
    title:
      "Quantum Meetup Tel Aviv 2025 — conversations at the frontier of innovation",
  },
  {
    img: "/assets/cvent-connect.png",
    title: "Cvent Connect 2024 — exploring the future of event technology",
  },
] as const;

export const people = [
  {
    name: "Idan Keynan",
    role: "Qubit Community Manager",
    img: "/assets/idan-keynan.png",
    linkedin: "https://www.linkedin.com/in/idan-keynan/",
  },
  {
    name: "Dror Pezo",
    role: "Qubit Community Manager",
    img: "/assets/dror-pezo.png",
    linkedin: "https://www.linkedin.com/in/dror-pezo-b82b31138/",
  },
  {
    name: "Roy Ben Avraham",
    role: "Software Engineer",
    img: "/assets/roy-ben-avraham.png",
    linkedin: "https://www.linkedin.com/in/roybenavraham/",
  },
  {
    name: "Paz Shakroka",
    role: "Quantum Technology Enthusiast | Qubit Community Manager",
    img: "/assets/paz-shakroka.png",
    linkedin: "https://www.linkedin.com/in/paz-shakroka-216283224/",
  },

  {
    name: "Amit Mizrahi",
    role: "Qubit Community Manager",
    img: "/assets/amit-mizrahi.png",
    linkedin: "https://www.linkedin.com/in/amizrahiz/",
  },
  {
    name: "Shir",
    role: "Qubit Community Manager",
    img: "/assets/shir.png",
    linkedin: "/",
  },
  {
    name: "Yahel Cohen",
    role: "Software Engineer | Quantum Technology Enthusiast",
    img: "/assets/yahel-cohen.jpeg",
    linkedin: "https://www.linkedin.com/in/yahelcohen/",
  },
] as const;
