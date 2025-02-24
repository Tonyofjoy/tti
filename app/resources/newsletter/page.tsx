import PageTemplate from "@/components/templates/page-template"

export default function NewsletterPage() {
  return (
    <PageTemplate 
      title="Newsletter"
      subtitle="Stay updated with our latest insights"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Newsletter Benefits</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Tech Updates</h3>
              <p className="text-white/70">Latest technology trends and news.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Industry Insights</h3>
              <p className="text-white/70">Expert analysis and perspectives.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Exclusive Content</h3>
              <p className="text-white/70">Subscriber-only resources and guides.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Featured Content</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Case Studies</h3>
              <p className="text-white/70">Success stories and implementations.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Best Practices</h3>
              <p className="text-white/70">Industry standards and guidelines.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Event Updates</h3>
              <p className="text-white/70">Upcoming webinars and conferences.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
