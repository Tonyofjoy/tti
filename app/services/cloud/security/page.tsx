import PageTemplate from "@/components/templates/page-template"

export default function CloudSecurityPage() {
  return (
    <PageTemplate 
      title="Cloud Security"
      subtitle="Enterprise-grade cloud security solutions"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Security Services</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Identity Management</h3>
              <p className="text-white/70">Access control and authentication.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Threat Detection</h3>
              <p className="text-white/70">Advanced security monitoring.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Data Protection</h3>
              <p className="text-white/70">Encryption and data security.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Compliance</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Regulatory Compliance</h3>
              <p className="text-white/70">GDPR, HIPAA, and other standards.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Security Audits</h3>
              <p className="text-white/70">Regular security assessments.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Best Practices</h3>
              <p className="text-white/70">Industry-standard security protocols.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
} 