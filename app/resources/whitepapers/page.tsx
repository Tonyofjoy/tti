import PageTemplate from "@/components/templates/page-template"

export default function WhitepapersPage() {
  return (
    <PageTemplate 
      title="Whitepapers"
      subtitle="In-depth research and industry insights"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Latest Research</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Cloud Security</h3>
              <p className="text-white/70">Advanced security frameworks for cloud.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">AI Ethics</h3>
              <p className="text-white/70">Responsible AI development practices.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Digital Strategy</h3>
              <p className="text-white/70">Enterprise digital transformation guide.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Industry Reports</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Market Analysis</h3>
              <p className="text-white/70">Technology market trends and forecasts.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Tech Impact</h3>
              <p className="text-white/70">Technology's impact on industries.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Future Outlook</h3>
              <p className="text-white/70">Emerging technology predictions.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
