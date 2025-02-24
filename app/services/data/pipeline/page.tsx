import PageTemplate from "@/components/templates/page-template"

export default function DataPipelinePage() {
  return (
    <PageTemplate 
      title="Data Pipeline Solutions"
      subtitle="Build robust data integration workflows"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Pipeline Services</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">ETL/ELT</h3>
              <p className="text-white/70">Data extraction, transformation, and loading.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Real-time Processing</h3>
              <p className="text-white/70">Stream processing and real-time analytics.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Data Quality</h3>
              <p className="text-white/70">Validation and cleansing processes.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Benefits</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Automation</h3>
              <p className="text-white/70">Automated data workflows and processes.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Reliability</h3>
              <p className="text-white/70">Robust error handling and monitoring.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Scalability</h3>
              <p className="text-white/70">Handle increasing data volumes and sources.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
