import PageTemplate from "@/components/templates/page-template"

export default function DigitalDesignPage() {
  return (
    <PageTemplate 
      title="Graphic Design Services"
      subtitle="Creating visually stunning and impactful designs"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Design Services</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Brand Identity</h3>
              <p className="text-white/70">Logo design, style guides, and visual identity systems.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">UI/UX Design</h3>
              <p className="text-white/70">User-centered interface and experience design.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Marketing Materials</h3>
              <p className="text-white/70">Digital and print marketing collateral design.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Process</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Discovery</h3>
              <p className="text-white/70">Understanding your brand and objectives.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Design</h3>
              <p className="text-white/70">Creating concepts and iterating on feedback.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Delivery</h3>
              <p className="text-white/70">Providing final assets in all required formats.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
