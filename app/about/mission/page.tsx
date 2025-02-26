import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Our Mission | Tony Tech Insights',
  description: 'Learn about Tony Tech Insights mission, vision, and core values as a leading technology partner.',
};

export default function MissionPage() {
  return (
    <div className="relative overflow-hidden bg-black min-h-screen pt-16">
      {/* Background gradient element */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00b8ff]/5 to-[#0021a7]/10 pointer-events-none" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-64 h-64 rounded-full bg-[#00b8ff]/10 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 rounded-full bg-[#0021a7]/10 blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Hero section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-transparent bg-clip-text">
              Our Mission & Vision
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Democratizing European-standard digital services for businesses seeking reliable, long-term partnerships.
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-gray-900 to-black p-8 border border-gray-800">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full bg-[#00b8ff] flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300">
                To democratize European-standard digital services, making them affordable and accessible for businesses seeking reliable, long-term partnerships.
              </p>
            </Card>

            <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-gray-900 to-black p-8 border border-gray-800">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full bg-[#0021a7] flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">Our Vision</h2>
              </div>
              <p className="text-gray-300">
                To establish leadership in the technology services sector through excellence in online services within a two-year horizon.
              </p>
            </Card>
          </div>

          {/* Tagline */}
          <div className="text-center mb-20">
            <div className="inline-block relative">
              <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-white">
                INNOVATING FOR LIMITLESS GROWTH
              </h2>
              <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-[#00b8ff] to-[#0021a7]"></div>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Our Core Values</h2>
            <p className="text-xl text-center mb-12 text-gray-300">
              To become Vietnam's premier digital service provider, distinguished by:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-br from-gray-900 to-black p-6 text-center border border-gray-800">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00b8ff] to-[#0021a7] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Fastest Delivery</h3>
                <p className="text-gray-400">We prioritize efficiency without compromising quality.</p>
              </Card>
              
              <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-br from-gray-900 to-black p-6 text-center border border-gray-800">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00b8ff] to-[#0021a7] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Highest Quality</h3>
                <p className="text-gray-400">We maintain European standards in all our services.</p>
              </Card>
              
              <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-br from-gray-900 to-black p-6 text-center border border-gray-800">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00b8ff] to-[#0021a7] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Most Trusted</h3>
                <p className="text-gray-400">We build lasting relationships based on reliability and trust.</p>
              </Card>
            </div>
          </div>

          {/* Company Culture */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Our Culture</h2>
            <p className="text-xl text-center mb-12 text-gray-300">
              At TTI, we build our culture on three fundamental principles:
            </p>
            
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-start gap-6 p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 shadow-lg">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#00b8ff] flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Honesty</h3>
                  <p className="text-gray-300">
                    We believe trust is the foundation of all relationships - both with our team members and clients.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6 p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 shadow-lg">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#0021a7] flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Conscientiousness</h3>
                  <p className="text-gray-300">
                    We embrace proactive work ethics, believing that action is the antidote to stress and the pathway to career advancement.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6 p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 shadow-lg">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00b8ff] to-[#0021a7] flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Respect</h3>
                  <p className="text-gray-300">
                    We maintain a flat organizational structure where ideas matter more than hierarchy, and every voice is valued regardless of position.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Heritage */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 md:p-12 border border-gray-800">
              <h2 className="text-3xl font-bold mb-6 text-white">Our Heritage</h2>
              <p className="text-lg mb-6 text-gray-300">
                Tony Tech Insights (TTI) has its roots in Danish agency expertise, bringing European standard services to the Vietnamese market at accessible price points. The company positions itself as a long-term technology partner for businesses seeking quality and reliability.
              </p>
              <Button className="bg-gradient-to-r from-[#00b8ff] to-[#0021a7] hover:from-[#0021a7] hover:to-[#00b8ff] text-white border-none">
                Learn More About Us
              </Button>
            </div>
          </div>

          {/* Contact section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Get in Touch</h2>
            <p className="mb-6 text-gray-300">
              Ready to innovate with us? Reach out to our team.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-4">
              <a href="mailto:hello@tonytechinsight.vn" className="text-[#00b8ff] hover:underline">hello@tonytechinsight.vn</a>
              <span className="hidden md:inline text-gray-600">|</span>
              <a href="https://tonytechinsight.vn" target="_blank" rel="noopener noreferrer" className="text-[#00b8ff] hover:underline">tonytechinsight.vn</a>
            </div>
            <p className="text-sm text-gray-500">
              31 Dan Toc, Tan Thanh Ward, Tan Phu District, Ho Chi Minh City, Vietnam
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
