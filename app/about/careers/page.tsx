import PageTemplate from "@/components/templates/page-template"

export default function CareersPage() {
  return (
    <PageTemplate 
      title="Careers"
      subtitle="Join our team of innovators"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Opportunities</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Engineering</h3>
              <p className="text-white/70">Software development and architecture roles.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Design</h3>
              <p className="text-white/70">UX/UI and product design positions.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Project Management</h3>
              <p className="text-white/70">Technical project leadership roles.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Benefits</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Growth</h3>
              <p className="text-white/70">Professional development opportunities.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Culture</h3>
              <p className="text-white/70">Innovative and collaborative environment.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Benefits</h3>
              <p className="text-white/70">Comprehensive benefits package.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
