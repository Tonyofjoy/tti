import { Metadata } from "next";
import { Heading } from "@/components/ui/heading";

export const metadata: Metadata = {
  title: "Terms of Service | Tony Tech Insights",
  description: "Terms of Service for Tony Tech Insights - Understand the terms and conditions governing the use of our services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Heading level={1} className="mb-8">Terms of Service</Heading>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-white/70 mb-8">
            Last Updated: February 25, 2024
          </p>
          
          <section className="mb-10">
            <Heading level={2} className="mb-4">Introduction</Heading>
            <p>
              Welcome to Tony Tech Insights. These Terms of Service ("Terms") govern your use of our website, products, and services. 
              By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, 
              you may not access our services.
            </p>
          </section>
          
          <section className="mb-10">
            <Heading level={2} className="mb-4">Use of Our Services</Heading>
            <p>
              Our services are designed to provide information, resources, and solutions related to technology and digital transformation. 
              You agree to use our services only for lawful purposes and in accordance with these Terms.
            </p>
            <p className="mt-4">
              You are prohibited from:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Using our services in any way that violates any applicable federal, state, local, or international law or regulation.</li>
              <li>Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running our services.</li>
              <li>Using our services in any manner that could disable, overburden, damage, or impair the site or interfere with any other party's use of the services.</li>
              <li>Using any robot, spider, or other automatic device, process, or means to access our services for any purpose, including monitoring or copying any of the material on our services.</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <Heading level={2} className="mb-4">Intellectual Property</Heading>
            <p>
              The content, features, and functionality of our services, including but not limited to text, graphics, logos, icons, images, 
              audio clips, digital downloads, data compilations, and software, are owned by Tony Tech Insights, its licensors, or other 
              providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property 
              or proprietary rights laws.
            </p>
            <p className="mt-4">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, 
              store, or transmit any of the material on our services, except as follows:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.</li>
              <li>You may store files that are automatically cached by your Web browser for display enhancement purposes.</li>
              <li>You may print or download one copy of a reasonable number of pages of the website for your own personal, non-commercial use and not for further reproduction, publication, or distribution.</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <Heading level={2} className="mb-4">User Accounts</Heading>
            <p>
              When you create an account with us, you must provide accurate, complete, and current information at all times. 
              Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our services.
            </p>
            <p className="mt-4">
              You are responsible for safeguarding the password that you use to access our services and for any activities or actions under your password. 
              We encourage you to use "strong" passwords (passwords that use a combination of upper and lower case letters, numbers, and symbols) with your account.
            </p>
          </section>
          
          <section className="mb-10">
            <Heading level={2} className="mb-4">Limitation of Liability</Heading>
            <p>
              In no event will Tony Tech Insights, its affiliates, or their licensors, service providers, employees, agents, officers, or directors 
              be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, our services, 
              including any direct, indirect, special, incidental, consequential, or punitive damages.
            </p>
          </section>
          
          <section className="mb-10">
            <Heading level={2} className="mb-4">Changes to Terms</Heading>
            <p>
              We may revise and update these Terms from time to time at our sole discretion. All changes are effective immediately when we post them. 
              Your continued use of our services following the posting of revised Terms means that you accept and agree to the changes.
            </p>
          </section>
          
          <section className="mb-10">
            <Heading level={2} className="mb-4">Contact Us</Heading>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-4">
              <p><strong>Email:</strong> legal@tonytechinsights.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Innovation Drive, Tech City, TC 12345</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 