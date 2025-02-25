import { Metadata } from "next";
import { Heading } from "@/components/ui/heading";

export const metadata: Metadata = {
  title: "Privacy Policy | Tony Tech Insights",
  description: "Privacy Policy for Tony Tech Insights - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Heading level={1} className="mb-8">Privacy Policy</Heading>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-white/70 mb-8">
            Last Updated: February 25, 2024
          </p>
          
          <section className="mb-10">
            <Heading level={2} className="mb-4">Introduction</Heading>
            <p>
              Tony Tech Insights ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our website and tell 
              you about your privacy rights and how the law protects you.
            </p>
          </section>
          
          <section className="mb-10">
            <Heading level={2} className="mb-4">Information We Collect</Heading>
            <p>
              We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Identity Data</strong> includes first name, last name, username, or similar identifier.</li>
              <li><strong>Contact Data</strong> includes email address, telephone numbers, and physical address.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li><strong>Usage Data</strong> includes information about how you use our website, products, and services.</li>
              <li><strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <Heading level={2} className="mb-4">How We Use Your Information</Heading>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <Heading level={2} className="mb-4">Data Security</Heading>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
            </p>
          </section>
          
          <section className="mb-10">
            <Heading level={2} className="mb-4">Your Legal Rights</Heading>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <Heading level={2} className="mb-4">Contact Us</Heading>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <div className="mt-4">
              <p><strong>Email:</strong> privacy@tonytechinsights.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Innovation Drive, Tech City, TC 12345</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 