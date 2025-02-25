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
      name: "Digital Experience & Branding",
      items: [
        { name: "Digital Marketing", path: "/services/digital/marketing" },
        { name: "Design & Animation", path: "/services/digital/design" },
        { name: "Brand Strategy", path: "/services/digital/brand" },
        { name: "Email Automation", path: "/services/digital/email-automation" },
      ],
    },
    {
      name: "Custom Software Solutions",
      items: [
        { name: "Enterprise Software", path: "/services/application/enterprise-solutions" },
        { name: "Mobile Apps", path: "/services/application/mobile-apps" },
        { name: "Web Applications", path: "/services/application/web-apps" },
        { name: "Rapid Development", path: "/services/application/rapid-development" },
      ],
    },
    {
      name: "Data Intelligence & Analytics",
      items: [
        { name: "Data Architecture", path: "/services/data/architecture" },
        { name: "Data Pipeline", path: "/services/data/pipeline" },
        { name: "Business Intelligence", path: "/services/data/business-intelligence" },
      ],
    },
    {
      name: "AI-Powered Solutions",
      items: [
        { name: "Conversational AI", path: "/services/ai/conversational" },
        { name: "AI Solutions", path: "/services/ai/solutions" },
      ],
    },
    {
      name: "Cloud & Infrastructure",
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
    { name: "Digital Experience & Branding", href: "/services/digital/marketing" },
    { name: "Custom Software Solutions", href: "/services/application/enterprise-solutions" },
    { name: "Cloud & Infrastructure", href: "/services/cloud/infrastructure" },
    { name: "AI-Powered Solutions", href: "/services/ai/solutions" },
    { name: "Data Intelligence & Analytics", href: "/services/data/architecture" },
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

