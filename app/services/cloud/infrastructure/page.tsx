import PageTemplate from "@/components/templates/page-template"

export default function CloudInfrastructurePage() {
  return (
    <PageTemplate 
      title="Cloud Infrastructure"
      subtitle="Build and manage scalable cloud environments"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Infrastructure Services</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Cloud Migration</h3>
              <p className="text-white/70">Seamless transition to cloud platforms.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Infrastructure as Code</h3>
              <p className="text-white/70">Automated infrastructure deployment.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Multi-Cloud Strategy</h3>
              <p className="text-white/70">Optimize across cloud providers.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Key Features</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Auto-scaling</h3>
              <p className="text-white/70">Dynamic resource allocation.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">High Availability</h3>
              <p className="text-white/70">Redundant and fault-tolerant systems.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Security</h3>
              <p className="text-white/70">Advanced cloud security measures.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
} 