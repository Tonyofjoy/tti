import PageTemplate from "@/components/templates/page-template"

export default function MissionPage() {
  return (
    <PageTemplate 
      title="Mission & Vision"
      subtitle="Building the future of technology"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-white/70">Driving technological advancement through innovative solutions.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-white/70">Delivering exceptional quality in every project.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Client Success</h3>
              <p className="text-white/70">Empowering clients to achieve their business goals.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Vision</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Global Impact</h3>
              <p className="text-white/70">Transforming industries worldwide through technology.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="text-white/70">Creating sustainable solutions for the future.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Leadership</h3>
              <p className="text-white/70">Leading the way in technological innovation.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
