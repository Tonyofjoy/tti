import PageTemplate from "@/components/templates/page-template"

export default function BusinessIntelligencePage() {
  return (
    <PageTemplate 
      title="Business Intelligence"
      subtitle="Transform data into actionable insights"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">BI Solutions</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Data Visualization</h3>
              <p className="text-white/70">Interactive dashboards and reports.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Analytics Tools</h3>
              <p className="text-white/70">Advanced analytics and reporting platforms.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">KPI Monitoring</h3>
              <p className="text-white/70">Real-time performance tracking.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Capabilities</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Data Discovery</h3>
              <p className="text-white/70">Uncover patterns and trends in your data.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Predictive Analytics</h3>
              <p className="text-white/70">Forecast future trends and outcomes.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Self-Service BI</h3>
              <p className="text-white/70">Empower users to analyze data independently.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
