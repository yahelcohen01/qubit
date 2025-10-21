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
    href: "https://www.facebook.com/groups/quantumcomputingisrael/",
  },
  {
    label: "YouTube",
    icon: <YoutubeIcon className="m-auto" />,
    href: "https://www.youtube.com/@qubit-il3967",
  },
  {
    label: "Whatsapp",
    icon: <WhatsappIcon className="w-5 h-5" />,
    href: "https://docs.google.com/forms/d/e/1FAIpQLSdTxRV03uhpIRm4KsXp3eQMGXrCCnyCiDPOpRlpdOihiYklog/viewform",
  },
] as const;

export const navItems: NavItem[] = [
  { label: "Israel in Quantum Tech", href: "#" },
  { label: "About", href: "#about" },
  { label: "Activities", href: "#activities" },
  { label: "Who's Who", href: "#whos-who" },
  // { label: "Content hub", href: "#content-hub" },
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
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/light-solver.png",
  },
  {
    title: "IQCC",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/iqcc.png",
  },
  {
    title: "Qarakal",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/qarakal.png",
  },
  {
    title: "Quantum Source",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/quantum-source.png",
  },
  {
    title: "TQS",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/tqs.png",
  },
  {
    title: "Quantum Pulse",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/quantum-pulse.png",
  },
  {
    title: "Qedma",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/qedma.png",
  },
  {
    title: "QuamCore",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/quamcore.png",
  },
  {
    title: "Raicol Crystals",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/raicol-crystals.png",
  },
  {
    title: "Classiq",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/classiq.png",
  },
  {
    title: "Quantum Art",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/quantum-art.png",
  },
  {
    title: "Quantum Transistors",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/quantum-transistors.png",
  },
  {
    title: "HEQA",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/heqa.png",
  },
  {
    title: "Quantum Machines",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/quantum-machines.png",
  },
  {
    title: "Wiz",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/wiz.png",
  },
  {
    title: "Triarii",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/triarii.png",
  },
  {
    title: "Accubeat",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/accubeat.png",
  },
  {
    title: "Quantimize",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/quantimize.png",
  },
  {
    title: "Spinflex",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/spinflex.png",
  },
] as const;

export const institutes = [
  {
    name: "Hebrew University",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/hebrew-university.png",
  },
  {
    name: "Weizmann Institute",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/weizmann-institute-of-science.png",
  },
  {
    name: "Tel Aviv University",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/tel-aviv-university.png",
  },
  {
    name: "Technion",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/technion-university.png",
  },
  {
    name: "Ben Gurion University",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/ben-gurion-university.png",
  },
  {
    name: "Bar Ilan University",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/bar-ilan-university.png",
  },
  {
    name: "Ariel University",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/ariel-university.png",
  },
] as const;

export const eventsHighlights: CarouselItem[] = [
  {
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/meetup-tlv-2025.png",
    title:
      "Meetup 2025 Tel Aviv — talking about everything shaping the world of quantum",
  },
  {
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/quantum-meetup-tlv-2025.png",
    title:
      "Quantum Meetup Tel Aviv 2025 — conversations at the frontier of innovation",
  },
  {
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/cvent-connect.png",
    title: "Cvent Connect 2024 — exploring the future of event technology",
  },
] as const;

export const people = [
  {
    name: "Shir Peri Lichtig",
    role: "Board Member",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/shir-peri.jpeg",
    linkedin: "/",
  },
  {
    name: "Gal Bar Dea",
    role: "Board Member",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/gal-bar-dea.png",
    linkedin: "https://www.linkedin.com/in/galbardea/",
  },
  {
    name: "Miriam Shtilman Lavsovski",
    role: "Board Member",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/miriam-shtilman-lavsovski .jpeg",
    linkedin: "https://www.linkedin.com/in/miriamshtilman/",
  },
  {
    name: "Tomer Diari",
    role: "Board Member",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/tomer-diari.jpeg",
    linkedin: "https://www.linkedin.com/in/diari/",
  },
  {
    name: "Ayal Itzkovitz",
    role: "Board Member",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/ayal-itzkovitz.jpeg",
    linkedin: "https://www.linkedin.com/in/ayali/",
  },
  {
    name: "Dorit Dor",
    role: "Board Member",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/dorit-dor.jpeg",
    linkedin: "https://www.linkedin.com/in/dorit-dor-b1149/",
  },
  {
    name: "Nadav Katz",
    role: "Board Member",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/nadav-katz.jpg",
    linkedin: "https://www.linkedin.com/in/nadav-katz-7775251a/",
  },
  {
    name: "Shai Lev",
    role: "Board Member",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/shai-lev.jpeg",
    linkedin: "https://www.linkedin.com/in/shai-lev-b420079/",
  },
  {
    name: "Idan Keynan",
    role: "Board Member",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/idan-keynan.png",
    linkedin: "https://www.linkedin.com/in/idan-keynan/",
  },
  {
    name: "Dror Pezo",
    role: "Team Member",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/dror-pezo.png",
    linkedin: "https://www.linkedin.com/in/dror-pezo-b82b31138/",
  },
  {
    name: "Tali Mayer-Chissick",
    role: "Team Member",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/tali-mayer-chissick.jpeg",
    linkedin: "https://www.linkedin.com/in/talima/",
  },
  {
    name: "Avichay Ben Lulu",
    role: "Team Member",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/avichay-ben-lulu.png",
    linkedin: "https://www.linkedin.com/in/avichaybenlulu/",
  },
  {
    name: "Roy Lehana",
    role: "Team Member",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/roy-lehana.jpeg",
    linkedin: "https://www.linkedin.com/in/roy-lehana/",
  },
  {
    name: "Gilad Levi",
    role: "Team Member",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/gilad-levi.jpeg",
    linkedin: "https://www.linkedin.com/in/gilad-levi-kickstart/",
  },
  {
    name: "Dafna Meir",
    role: "Team Member",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/dafna-meir.jpeg",
    linkedin: "https://www.linkedin.com/in/dafna-meir-557bb7266/",
  },
  {
    name: "Yahel Cohen",
    role: "Website Manager",
    img: "https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/yahel-cohen.jpeg",
    linkedin: "https://www.linkedin.com/in/yahelcohen/",
  },
] as const;
