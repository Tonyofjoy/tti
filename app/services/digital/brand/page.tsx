import PageTemplate from "@/components/templates/page-template"

export default function BrandIdentityPage() {
  return (
    <PageTemplate 
      title="Brand Identity Services"
      subtitle="Building memorable and impactful brand identities"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Branding Services</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Brand Strategy</h3>
              <p className="text-white/70">Developing your unique brand positioning and voice.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Visual Identity</h3>
              <p className="text-white/70">Creating your brand's visual language and assets.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Brand Guidelines</h3>
              <p className="text-white/70">Comprehensive brand usage and style guides.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Brand Development</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Research</h3>
              <p className="text-white/70">Market and competitor analysis.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Creation</h3>
              <p className="text-white/70">Brand identity design and development.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Implementation</h3>
              <p className="text-white/70">Brand rollout and asset management.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
