import PageTemplate from "@/components/templates/page-template"

export default function AISolutionsPage() {
  return (
    <PageTemplate 
      title="AI-Powered Solutions"
      subtitle="Transform your business with artificial intelligence"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">AI Applications</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Predictive Analytics</h3>
              <p className="text-white/70">Data-driven forecasting and insights.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Computer Vision</h3>
              <p className="text-white/70">Image and video analysis solutions.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Machine Learning</h3>
              <p className="text-white/70">Custom ML models and applications.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Industry Solutions</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Healthcare AI</h3>
              <p className="text-white/70">Diagnostic and patient care solutions.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Financial AI</h3>
              <p className="text-white/70">Risk assessment and fraud detection.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Retail AI</h3>
              <p className="text-white/70">Personalization and inventory optimization.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
