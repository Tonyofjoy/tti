import PageTemplate from "@/components/templates/page-template"

export default function IndustriesPage() {
  return (
    <PageTemplate 
      title="Industries"
      subtitle="Delivering solutions across diverse sectors"
    >
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 rounded-lg border border-white/10 bg-white/5">
          <h3 className="text-xl font-bold mb-3">Healthcare</h3>
          <p className="text-white/70">
            Digital solutions for modern healthcare delivery and patient care.
          </p>
        </div>

        <div className="p-6 rounded-lg border border-white/10 bg-white/5">
          <h3 className="text-xl font-bold mb-3">Finance</h3>
          <p className="text-white/70">
            Innovative technology for financial services and fintech.
          </p>
        </div>

        <div className="p-6 rounded-lg border border-white/10 bg-white/5">
          <h3 className="text-xl font-bold mb-3">Education</h3>
          <p className="text-white/70">
            Digital transformation solutions for educational institutions.
          </p>
        </div>
      </div>
    </PageTemplate>
  )
}
