import PageTemplate from "@/components/templates/page-template"

export default function DigitalMarketingPage() {
  return (
    <PageTemplate 
      title="Digital Marketing Services"
      subtitle="Drive growth with data-driven marketing strategies"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Marketing Solutions</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">SEO</h3>
              <p className="text-white/70">Search engine optimization and content strategy.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">PPC</h3>
              <p className="text-white/70">Pay-per-click advertising and campaign management.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Social Media</h3>
              <p className="text-white/70">Social media marketing and community management.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Approach</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Strategy</h3>
              <p className="text-white/70">Data-driven marketing strategy development.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Execution</h3>
              <p className="text-white/70">Campaign implementation and optimization.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Analytics</h3>
              <p className="text-white/70">Performance tracking and reporting.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
