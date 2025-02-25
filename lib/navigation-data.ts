type NavigationItem = {
  name: string;
  path: string;
}

type NavigationSection = {
  name?: string;
  items: NavigationItem[];
}

// Add type for the entire navigation data structure
type NavigationData = {
  [key: string]: NavigationSection[];
}

export const navigationData: NavigationData = {
  services: [
    {
      name: "Digital Services",
      items: [
        { name: "Digital Marketing", path: "/services/digital/marketing" },
        { name: "Graphic Design", path: "/services/digital/design" },
        { name: "Brand Identity", path: "/services/digital/brand" },
        { name: "Email Automation", path: "/services/digital/email-automation" },
      ],
    },
    {
      name: "Development",
      items: [
        { name: "Enterprise Solutions", path: "/services/application/enterprise-solutions" },
        { name: "Mobile Apps", path: "/services/application/mobile-apps" },
        { name: "Web Applications", path: "/services/application/web-apps" },
        { name: "Rapid Development", path: "/services/application/rapid-development" },
      ],
    },
    {
      name: "Cloud & Data",
      items: [
        { name: "Cloud Infrastructure", path: "/services/cloud/infrastructure" },
        { name: "DevOps Services", path: "/services/cloud/devops" },
        { name: "Security Solutions", path: "/services/cloud/security" },
        { name: "Data Architecture", path: "/services/data/architecture" },
      ],
    },
  ],
  work: [
    {
      items: [
        { name: "Case Studies", path: "/work/case-studies" },
        { name: "Industries", path: "/work/industries" },
        { name: "Portfolio", path: "/work/portfolio" },
        { name: "Testimonials", path: "/work/testimonials" },
      ],
    },
  ],
  resources: [
    {
      items: [
        { name: "Blog", path: "/resources/blog" },
        { name: "Whitepapers", path: "/resources/whitepapers" },
        { name: "Tech Guides", path: "/resources/guides" },
        { name: "Webinars", path: "/resources/webinars" },
      ],
    },
  ],
  about: [
    {
      items: [
        { name: "Our Team", path: "/about/team" },
        { name: "Mission & Vision", path: "/about/mission" },
        { name: "Our Process", path: "/about/process" },
        { name: "Careers", path: "/about/careers" },
        { name: "Contact Us", path: "/about/contact" },
      ],
    },
  ],
}

export const footerLinks = {
  services: [
    { name: "Digital Transformation", href: "/services/digital/transformation" },
    { name: "Application Development", href: "/services/application/enterprise-solutions" },
    { name: "Cloud Services", href: "/services/cloud/infrastructure" },
    { name: "AI & Automation", href: "/services/ai/solutions" },
    { name: "Data Services", href: "/services/data/architecture" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about/team" },
    { name: "Contact", href: "/about/contact" },
    { name: "Admin Login", href: "/admin/login" },
  ],
  resources: [
    { name: "Blog", href: "/resources/blog" },
    { name: "Case Studies", href: "/work/case-studies" },
    { name: "Whitepapers", href: "/resources/whitepapers" },
    { name: "Webinars", href: "/resources/webinars" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Terms of Service", href: "/legal/terms" },
    { name: "Cookie Policy", href: "/legal/cookies" },
  ],
}

