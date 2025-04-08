'use client';

import PageTemplate from "@/components/templates/page-template";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Industry data
const industries = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Digital solutions for modern healthcare delivery and patient care.',
    image: '/Website_image/Website/Industry/lobby.png',
    solutions: ['Patient Management Systems', 'Telemedicine Platforms', 'Medical Data Analytics']
  },
  {
    id: 'finance',
    title: 'Finance',
    description: 'Innovative technology for financial services and fintech.',
    image: '/Website_image/Website/Industry/lobby.png',
    solutions: ['Payment Processing', 'Wealth Management', 'Fraud Detection']
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Digital transformation solutions for educational institutions.',
    image: '/Website_image/Website/Industry/lobby.png',
    solutions: ['Learning Management', 'Student Analytics', 'Virtual Classrooms']
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    description: 'Driving online retail growth with innovative technology solutions.',
    image: '/Website_image/Website/Industry/lobby.png',
    solutions: ['Custom Shopping Platforms', 'Payment Integration', 'Inventory Management']
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description: 'Streamlining production processes with advanced technology.',
    image: '/Website_image/Website/Industry/lobby.png',
    solutions: ['Supply Chain Optimization', 'Quality Control Systems', 'Production Analytics']
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    description: 'Enhancing guest experiences through digital innovation.',
    image: '/Website_image/Website/Industry/lobby.png',
    solutions: ['Booking Systems', 'Guest Experience Platforms', 'Operational Efficiency']
  }
];

// Case studies
const caseStudies = [
  {
    id: 'case1',
    client: 'VN Healthcare Provider',
    industry: 'Healthcare',
    summary: 'Implemented telemedicine platform resulting in 40% increase in patient accessibility',
    image: '/Website_image/Website/Industry/lobby.png',
  },
  {
    id: 'case2',
    client: 'Leading Financial Institution',
    industry: 'Finance',
    summary: 'Developed secure payment system processing over 1 million transactions monthly',
    image: '/Website_image/Website/Industry/lobby.png',
  },
  {
    id: 'case3',
    client: 'E-Commerce Marketplace',
    industry: 'E-Commerce',
    summary: 'Increased online sales by 150% with custom marketplace solution',
    image: '/Website_image/Website/Industry/lobby.png',
  }
];

export default function IndustriesPage() {
  return (
    <PageTemplate 
      title="Industries"
      subtitle="Delivering innovative solutions across diverse sectors"
    >
      {/* Tagline Section */}
      <div className="mb-16 text-center">
        <motion.p 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-lg md:text-xl font-medium text-[#00b8ff] italic"
        >
          INNOVATING FOR LIMITLESS GROWTH
        </motion.p>
      </div>

      {/* Industries Overview */}
      <section className="mb-16 px-4 md:px-8 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-white">Industry Expertise</h2>
          <p className="text-white/70 max-w-3xl mx-auto px-4">
            We deliver specialized technology solutions that address the unique challenges and opportunities of your industry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="group relative overflow-hidden rounded-xl h-[320px] bg-gradient-to-br from-[#0021a7]/20 to-[#00b8ff]/10 border border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0021a7] to-[#00b8ff] opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-10"></div>
              
              <div className="relative h-full w-full">
                <Image 
                  src={industry.image} 
                  alt={industry.title}
                  fill
                  className="object-cover opacity-60 filter grayscale" 
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABxAHEDASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAwQFAgEABv/EABoQAQEBAQEBAQAAAAAAAAAAAAACAQMREjH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD6lGUZbBcgFwMBbZYBCFJUgBUlKVyAJXIUpCgCVyFKQoAlchSEKALGMYwAR11GQC67A47AHHXIUgBCkKXJQCEKUpCgEIUpSkAIRtK0bQBjGMYAI4xgDsJOjA64UhS5KAQhSlIUAhCFKQoBSkKQpAFIQraNoCsYxjABCkYwB2FIxgDsKRjAHYUjGAOwpGMAdpWMYA7GMYwf/9k=" 
                />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{industry.title}</h3>
                <p className="mb-4 opacity-90 group-hover:opacity-100">{industry.description}</p>
                
                <ul className="mb-5 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {industry.solutions.map((solution, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2 text-[#00b8ff]">•</span> {solution}
                    </li>
                  ))}
                </ul>
                
                <div className="h-6"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="mb-16 px-4 md:px-8 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-white">Success Stories</h2>
          <p className="text-white/70 max-w-3xl mx-auto px-4">
            See how we've helped organizations across industries achieve remarkable results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-gradient-to-br hover:from-[#0021a7]/20 hover:to-[#00b8ff]/10 transition-all duration-300"
            >
              <div className="h-48 relative">
                <Image
                  src={study.image}
                  alt={study.client}
                  fill
                  className="object-cover opacity-70 filter grayscale" 
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABxAHEDASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAwQFAgEABv/EABoQAQEBAQEBAQAAAAAAAAAAAAACAQMREjH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD6lGUZbBcgFwMBbZYBCFJUgBUlKVyAJXIUpCgCVyFKQoAlchSEKALGMYwAR11GQC67A47AHHXIUgBCkKXJQCEKUpCgEIUpSkAIRtK0bQBjGMYAI4xgDsJOjA64UhS5KAQhSlIUAhCFKQoBSkKQpAFIQraNoCsYxjABCkYwB2FIxgDsKRjAHYUjGAOwpGMAdpWMYA7GMYwf/9k="
                />
              </div>
              <div className="p-6">
                <div className="uppercase tracking-wide text-sm text-[#00b8ff] font-semibold mb-1">
                  {study.industry}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {study.client}
                </h3>
                <p className="text-white/70 mb-4">
                  {study.summary}
                </p>
                <div className="h-6"></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            href="/work/case-studies" 
            className="inline-flex items-center px-6 py-3 border border-[#00b8ff] text-base font-medium rounded-lg text-[#00b8ff] hover:bg-[#00b8ff] hover:text-black transition-colors"
          >
            View All Case Studies <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="rounded-xl bg-gradient-to-r from-[#0021a7] to-[#00b8ff] p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-5 text-white">
            Ready to transform your industry?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90 px-4">
            Schedule a consultation to discuss your industry-specific challenges and how our solutions can drive growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/about/contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg bg-white text-[#0021a7] hover:bg-gray-100 transition-colors"
            >
              Schedule a Consultation
            </Link>
            <Link 
              href="/services" 
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              Explore Our Services
            </Link>
          </div>
        </motion.div>
      </section>
    </PageTemplate>
  );
}
