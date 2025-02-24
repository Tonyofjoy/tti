import PageTemplate from "@/components/templates/page-template"

export default function WebinarsPage() {
  return (
    <PageTemplate 
      title="Webinars"
      subtitle="Live and on-demand technical sessions"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Upcoming Webinars</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Cloud Architecture</h3>
              <p className="text-white/70">Building scalable cloud solutions.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">AI Implementation</h3>
              <p className="text-white/70">Practical AI integration strategies.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">DevOps Best Practices</h3>
              <p className="text-white/70">Modern development workflows.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">On-Demand Sessions</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Digital Transformation</h3>
              <p className="text-white/70">Enterprise modernization strategies.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Security Essentials</h3>
              <p className="text-white/70">Cybersecurity best practices.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Data Analytics</h3>
              <p className="text-white/70">Advanced analytics techniques.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
