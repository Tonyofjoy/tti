import PageTemplate from "@/components/templates/page-template"

export default function CloudDevOpsPage() {
  return (
    <PageTemplate 
      title="DevOps Solutions"
      subtitle="Streamline development and operations"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">DevOps Services</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">CI/CD Pipelines</h3>
              <p className="text-white/70">Automated build and deployment workflows.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Container Orchestration</h3>
              <p className="text-white/70">Kubernetes and Docker solutions.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Infrastructure Automation</h3>
              <p className="text-white/70">Terraform and CloudFormation expertise.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Benefits</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Faster Delivery</h3>
              <p className="text-white/70">Accelerate time to market.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
              <p className="text-white/70">Automated testing and validation.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Monitoring</h3>
              <p className="text-white/70">Real-time performance insights.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
