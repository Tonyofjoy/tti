import PageTemplate from "@/components/templates/page-template"

export default function BlogPage() {
  return (
    <PageTemplate 
      title="Blog"
      subtitle="Insights, updates, and tech deep dives"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Latest Articles</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">AI in Enterprise</h3>
              <p className="text-white/70">Transforming business with artificial intelligence.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Cloud Migration</h3>
              <p className="text-white/70">Strategies for successful cloud adoption.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Digital Innovation</h3>
              <p className="text-white/70">Leading the digital transformation journey.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Featured Topics</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Tech Trends</h3>
              <p className="text-white/70">Emerging technologies and innovations.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Best Practices</h3>
              <p className="text-white/70">Industry standards and methodologies.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Case Studies</h3>
              <p className="text-white/70">Real-world implementation stories.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
