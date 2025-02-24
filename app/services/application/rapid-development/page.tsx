import PageTemplate from "@/components/templates/page-template"

export default function RapidDevelopmentPage() {
  return (
    <PageTemplate 
      title="Rapid Development Platform"
      subtitle="Accelerate your digital transformation"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Development Approach</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Agile Methodology</h3>
              <p className="text-white/70">Iterative development with quick feedback cycles.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Low-Code Solutions</h3>
              <p className="text-white/70">Accelerated development using modern platforms.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Component Library</h3>
              <p className="text-white/70">Pre-built components for faster development.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Benefits</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Faster Time-to-Market</h3>
              <p className="text-white/70">Reduce development time significantly.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Cost Efficiency</h3>
              <p className="text-white/70">Lower development and maintenance costs.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Scalability</h3>
              <p className="text-white/70">Easy to scale and modify as needs change.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
