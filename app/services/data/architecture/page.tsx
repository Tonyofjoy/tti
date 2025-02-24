import PageTemplate from "@/components/templates/page-template"

export default function DataArchitecturePage() {
  return (
    <PageTemplate 
      title="Modern Data Architecture"
      subtitle="Build scalable and efficient data infrastructure"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Architecture Solutions</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Data Warehousing</h3>
              <p className="text-white/70">Modern cloud data warehouse solutions.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Data Lakes</h3>
              <p className="text-white/70">Scalable storage for structured and unstructured data.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Data Mesh</h3>
              <p className="text-white/70">Domain-oriented data architecture.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Features</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Scalability</h3>
              <p className="text-white/70">Handle growing data volumes efficiently.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Security</h3>
              <p className="text-white/70">Enterprise-grade data protection.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Governance</h3>
              <p className="text-white/70">Data quality and compliance management.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
