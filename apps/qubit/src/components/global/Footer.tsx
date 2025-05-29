import Logo from '../../../public/qubit-logo-no-background.png';
import {
  LogoFacebook,
  LogoTwitter,
  LogoInstagram,
  LogoYoutube,
  LogoLinkedin,
  type CarbonIconType,
} from '@carbon/icons-react';

type LinkItem = {
  name: string;
  link: string;
};

export const PRODUCTS: LinkItem[] = [
  { name: 'Drag And Drop', link: '#' },
  { name: 'Visual Studio X', link: '#' },
  { name: 'Easy Content', link: '#' },
];
export const RESOURCES: LinkItem[] = [
  { name: 'Industries and tools', link: '#' },
  { name: 'Use cases', link: '#' },
  { name: 'Blog', link: '#' },
  { name: 'Online evenet', link: '#' },
  { name: 'Nostrud exercitation', link: '#' },
];
export const COMPANY: LinkItem[] = [
  { name: 'Diversity & inclusion', link: '#' },
  { name: 'About us', link: '#' },
  { name: 'Press', link: '#' },
  { name: 'Customer Stories', link: '#' },
  { name: 'Online communities', link: '#' },
];
export const SUPPORT: LinkItem[] = [
  { name: 'Documentation', link: '#' },
  { name: 'Tutorials & guides', link: '#' },
  { name: 'Webinars', link: '#' },
  { name: 'Open-source', link: '#' },
];

export const Icons: (LinkItem & { icon: CarbonIconType })[] = [
  { name: 'logo-facebook', link: '#', icon: LogoFacebook },
  { name: 'logo-twitter', link: '#', icon: LogoTwitter },
  { name: 'logo-linkedin', link: '#', icon: LogoLinkedin },
  { name: 'logo-instagram', link: '#', icon: LogoInstagram },
  { name: 'logo-youtube', link: '#', icon: LogoYoutube },
];

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-10
      text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2025 Qubit-il. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="flex justify-center items-center gap-4">
          <IconsGroup />
        </div>
      </div>
    </footer>
  );
};

const IconsGroup = () => {
  return (
    <div className="flex justify-center items-center gap-4">
      {Icons.filter((i) => i.icon).map((icon) => (
        <a key={icon.name} href={icon.link}>
          <icon.icon className="w-6 h-6 hover:text-gray-200" />
        </a>
      ))}
    </div>
  );
};

const Item = ({ Links, title }: { Links: LinkItem[]; title: string }) => {
  return (
    <ul>
      <h1 className="mb-1 font-semibold">{title}</h1>
      {Links.map((link) => (
        <li key={link.name}>
          <a
            className="text-gray-400 hover:underline duration-300
          text-sm cursor-pointer leading-6"
            href={link.link}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:px-8 px-5 py-16">
      <img src={Logo} alt="logo" className="object-cover size-40" />
      <Item Links={PRODUCTS} title="PRODUCTS" />
      <Item Links={RESOURCES} title="RESOURCES" />
      <Item Links={COMPANY} title="COMPANY" />
      <Item Links={SUPPORT} title="SUPPORT" />
    </div>
  );
};
