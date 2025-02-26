type NavigationItem = {
  name: string;
  path: string;
}

type NavigationSection = {
  name?: string;
  items: NavigationItem[];
}

type NavigationData = {
  services: Array<{
    name: string;
    items: NavigationItem[];
  }>;
  work: NavigationSection[];
  resources: NavigationSection[];
  about: NavigationSection[];
}

export const navigationData: NavigationData = {
  services: [
    {
      name: "Marketing and Branding",
      items: [
        { name: "Digital Marketing", path: "/services/digital/marketing" },
        { name: "Design & Animation", path: "/services/digital/design" },
        { name: "Brand Strategy", path: "/services/digital/brand" },
        { name: "Email Automation", path: "/services/digital/email-automation" },
      ],
    },
    {
      name: "Application Development",
      items: [
        { name: "Enterprise Software", path: "/services/application/enterprise-solutions" },
        { name: "Mobile Apps", path: "/services/application/mobile-apps" },
        { name: "Web Applications", path: "/services/application/web-apps" },
        { name: "Rapid Development", path: "/services/application/rapid-development" },
      ],
    },
    {
      name: "Data Services",
      items: [
        { name: "Data Architecture", path: "/services/data/architecture" },
        { name: "Data Pipeline", path: "/services/data/pipeline" },
        { name: "Business Intelligence", path: "/services/data/business-intelligence" },
      ],
    },
    {
      name: "AI & Automation",
      items: [
        { name: "Conversational AI", path: "/services/ai/conversational" },
        { name: "AI Solutions", path: "/services/ai/solutions" },
      ],
    },
    {
      name: "Cloud Services",
      items: [
        { name: "Cloud Infrastructure", path: "/services/cloud/infrastructure" },
        { name: "Cloud Operations", path: "/services/cloud/operations" },
        { name: "DevOps Services", path: "/services/cloud/devops" },
        { name: "Cloud Security", path: "/services/cloud/security" },
      ],
    },
  ],
  work: [
    {
      items: [
        { name: "Case Studies", path: "/work/case-studies" },
        { name: "Industries", path: "/work/industries" },
      ],
    },
  ],
  resources: [
    {
      items: [
        { name: "Blog", path: "/resources/blog" },
      ],
    },
  ],
  about: [
    {
      items: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/about/careers" },
        { name: "Contact Us", path: "/about/contact" },
      ],
    },
  ],
}

export const footerLinks = {
  services: [
    { name: "All Services", href: "/services" },
    { name: "Marketing and Branding", href: "/services/digital/marketing" },
    { name: "Application Development", href: "/services/application/enterprise-solutions" },
    { name: "Cloud Services", href: "/services/cloud/infrastructure" },
    { name: "AI & Automation", href: "/services/ai/solutions" },
    { name: "Data Services", href: "/services/data/architecture" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/about/contact" },
    { name: "Admin Login", href: "/admin/login" },
  ],
  resources: [
    { name: "Blog", href: "/resources/blog" },
    { name: "Case Studies", href: "/work/case-studies" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Terms of Service", href: "/legal/terms" },
    { name: "Cookie Policy", href: "/legal/cookies" },
  ],
}

