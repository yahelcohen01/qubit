# Qubit — Israel's Quantum Tech Community

Welcome to the official repository for Israel's Quantum Tech Association website! This platform serves as the central hub for quantum researchers, scientists, and technology enthusiasts across Israel and beyond.

---

## Table of Contents

1. [About](#about)
2. [Demo](#demo)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
   - Installation
   - Development
   - Production Build
   - Deployment
5. [Customization](#customization)
6. [Project Structure](#project-structure)
7. [Troubleshooting & Tips](#troubleshooting--tips)
8. [Contact](#contact)
9. [License](#license)
10. [Support](#support)

---

## 1. About

Qubit is Israel's premier quantum technology community platform, designed to connect quantum researchers, scientists, engineers, and enthusiasts. Our mission is to foster collaboration, share knowledge, and advance quantum technology research and development across Israel's vibrant quantum ecosystem.

### Key Features:

- **Community Hub**: Connect with quantum researchers from leading Israeli institutions
- **Event Management**: Stay updated on quantum conferences, workshops, and meetups
- **Resource Sharing**: Access to quantum research papers, educational materials, and tools
- **Industry Showcase**: Discover quantum startups and established companies in Israel
- **International Space Station Tracking**: Real-time ISS tracking with quantum-enhanced visualization
- **Interactive Experience**: Engaging animations and responsive design for optimal user experience

### Target Audience:

- Quantum researchers and scientists
- University students and professors
- Industry professionals in quantum technologies
- Startup founders and entrepreneurs
- Government officials and policymakers
- International collaborators and partners

---

## 2. Demo

**Live Site**:  
Explore the live quantum community platform here: [www.qubit-israel.com](https://www.qubit-israel.com)

### Key Sections:

- **Hero Section**: Introduction to Israel's quantum revolution
- **About Section**: Mission, vision, and community values
- **Institutes Section**: Showcasing leading quantum research institutions
- **Activities Section**: Upcoming events and community activities
- **Projects Section**: Featured quantum research projects and collaborations
- **ISS Tracker**: Real-time International Space Station tracking with 3D visualization

---

## 3. Tech Stack

- **Framework**: Next.js 14 (React) with App Router
- **Language**: TypeScript for type safety and better development experience
- **Styling**: Tailwind CSS for responsive, utility-first design
- **3D Graphics**: Three.js for interactive ISS tracking and quantum visualizations
- **Animations**: Framer Motion for smooth, engaging animations
- **State Management**: Zustand for lightweight state management
- **API Integration**: RESTful APIs for TLE (Two-Line Element) data and space tracking
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Development Tools**: ESLint, PostCSS, and TypeScript for code quality
- **Deployment**: Vercel for seamless CI/CD and global edge deployment

---

## 4. Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yahelcohen01/qubit.git
cd qubit

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Deployment

Deploy the quantum community platform via Vercel:

1. Push your code to a GitHub repository
2. Log in to [Vercel](https://vercel.com) and import the project
3. Vercel auto-detects Next.js configuration
4. Click **Deploy** and your live site will be available shortly
5. Configure custom domain and environment variables as needed

#### Environment Variables

Create a `.env.local` file for local development:

```bash
# Add any required API keys or configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Add other environment variables as needed
```

---

## 5. Customization

### Content Management

- **Community Information**: Update content in `app/components/` for different sections
- **Institute Showcase**: Modify institution data in the institutes section component
- **Event Management**: Update activities and events through the activities section
- **Project Highlights**: Customize featured projects in the projects section

### Styling & Theming

- **Global Styles**: Located in `app/globals.css`
- **Theme Configuration**: Customize colors, fonts, and breakpoints via Tailwind config
- **Component Styling**: Individual component styles using Tailwind utility classes
- **Dark/Light Mode**: Theme toggle implementation in `app/context/ThemeContext.tsx`

### Assets & Media

- **Images**: Store community photos, institution logos, and project images in `publichttps://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/`
- **Icons**: Custom SVG icons located in `public/icons/`
- **Quantum Visualizations**: 3D models and animations for quantum concepts

---

## 6. Project Structure

```
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Global layout and metadata
│   ├── page.tsx                 # Main community homepage
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── components/              # Reusable UI components
│   │   ├── hero-section/        # Landing hero section
│   │   ├── about-section/       # Community mission and vision
│   │   ├── institutes-section/  # Research institutions showcase
│   │   ├── activities-section/  # Events and community activities
│   │   ├── events-highlights-section/ # Featured events
│   │   ├── mobile/              # Mobile-specific components
│   │   └── ...                  # Other shared components
│   ├── context/                 # React contexts (theme, etc.)
│   ├── providers/               # Context providers setup
│   ├── iss/                     # ISS tracking feature
│   │   ├── components/          # ISS-specific components
│   │   └── stores/              # ISS state management
│   ├── secret/                  # Easter egg section
│   ├── shared/                  # Shared utilities and types
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Utility functions and constants
│   │   └── types/               # TypeScript type definitions
│   └── api/                     # API routes
├── public/                      # Static assets
│   ├── assets/                  # Images, logos, backgrounds
│   └── icons/                   # SVG icons
├── next.config.ts               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint rules and settings
├── postcss.config.mjs           # PostCSS configuration
└── package.json                 # Dependencies and scripts
```

---

## 7. Troubleshooting & Tips

| Issue                                  | Solution                                                                   |
| -------------------------------------- | -------------------------------------------------------------------------- |
| **Build fails with TypeScript errors** | Ensure all types are properly defined; check `tsconfig.json` configuration |
| **3D visualizations not loading**      | Verify Three.js dependencies; check browser WebGL support                  |
| **ISS tracking data not updating**     | Check TLE API endpoints; verify network connectivity and API keys          |
| **Tailwind styles not applying**       | Run `npm run build`; check for CSS conflicts in global styles              |
| **Mobile responsiveness issues**       | Test breakpoints; ensure mobile-first design principles                    |
| **Performance issues**                 | Optimize images; implement lazy loading; check bundle size                 |
| **Theme switching not working**        | Verify ThemeContext provider setup; check localStorage persistence         |

### Development Best Practices

- Use semantic HTML for accessibility
- Implement proper error boundaries
- Optimize images and assets for web
- Follow TypeScript strict mode guidelines
- Test across different devices and browsers
- Ensure proper SEO metadata configuration

---

## 8. Contact

Connect with Israel's Quantum Tech Association:

- **Email**: [info@qubit-israel.com](mailto:info@qubit-israel.com)
- **Website**: [www.qubit-israel.com](https://www.qubit-israel.com)
- **Community Manager**: [Yahel Cohen](mailto:yahelcohen01@gmail.com)
- **Social Media**: Follow us on LinkedIn and Twitter for updates

### Contributing

We welcome contributions from the quantum community! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request with detailed description

### Community Guidelines

- Respect all community members
- Share knowledge and resources
- Collaborate on quantum research initiatives
- Maintain professional and inclusive environment

---

## 9. License

This project is distributed under the [MIT License](LICENSE). Feel free to use, modify, or adapt for your quantum community needs.

### Open Source Commitment

We believe in open collaboration for advancing quantum science. This platform is open source to encourage:

- Community contributions and improvements
- Educational use in quantum computing courses
- Adaptation for other regional quantum communities
- Transparency in community platform development

---

## 10. Support

Support Israel's Quantum Tech Community by:

- ⭐ **Starring** this repository
- 🔄 **Sharing** with fellow quantum researchers
- 🤝 **Contributing** to the codebase
- 📢 **Spreading** awareness about Israel's quantum ecosystem
- 🎯 **Participating** in community events and activities

### Acknowledgments

Special thanks to:

- Leading Israeli quantum research institutions
- Quantum technology companies and startups
- International collaborators and partners
- Open source community and contributors
- The global quantum research community

Built with passion for advancing quantum science and fostering collaboration across Israel's innovative quantum ecosystem.

---

**"Shaping the Global Quantum Revolution from Israel"** 🇮🇱⚛️
