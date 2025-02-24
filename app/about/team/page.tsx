import PageTemplate from "@/components/templates/page-template"

export default function TeamPage() {
  return (
    <PageTemplate 
      title="Our Team"
      subtitle="Meet the experts behind our success"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Leadership</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Executive Team</h3>
              <p className="text-white/70">Experienced leaders driving innovation and growth.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Technical Directors</h3>
              <p className="text-white/70">Expert architects guiding technical excellence.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Project Leaders</h3>
              <p className="text-white/70">Dedicated managers ensuring project success.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Culture</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-white/70">Fostering creativity and forward thinking.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p className="text-white/70">Working together to achieve excellence.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Growth</h3>
              <p className="text-white/70">Continuous learning and development.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
