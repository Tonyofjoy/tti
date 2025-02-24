import PageTemplate from "@/components/templates/page-template"

export default function EnterpriseSolutionsPage() {
  return (
    <PageTemplate 
      title="Enterprise Software Solutions"
      subtitle="Custom enterprise applications that drive business growth"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Enterprise Solutions</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">ERP Systems</h3>
              <p className="text-white/70">Integrated enterprise resource planning solutions.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">CRM Platforms</h3>
              <p className="text-white/70">Customer relationship management systems.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Business Intelligence</h3>
              <p className="text-white/70">Data analytics and reporting solutions.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Development Process</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Requirements Analysis</h3>
              <p className="text-white/70">Understanding your business needs and objectives.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Custom Development</h3>
              <p className="text-white/70">Building tailored solutions for your enterprise.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Integration & Support</h3>
              <p className="text-white/70">Seamless deployment and ongoing maintenance.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
