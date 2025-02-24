import PageTemplate from "@/components/templates/page-template"

export default function CloudOperationsPage() {
  return (
    <PageTemplate 
      title="Cloud Operations"
      subtitle="Optimize and manage your cloud infrastructure"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Operations Services</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Performance Monitoring</h3>
              <p className="text-white/70">Real-time monitoring and optimization.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Cost Management</h3>
              <p className="text-white/70">Cloud spend optimization and control.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Incident Response</h3>
              <p className="text-white/70">24/7 support and issue resolution.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Key Features</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Automation</h3>
              <p className="text-white/70">Automated operational workflows.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Resource Optimization</h3>
              <p className="text-white/70">Efficient resource utilization.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Compliance</h3>
              <p className="text-white/70">Maintain security and compliance standards.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
