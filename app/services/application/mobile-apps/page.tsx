import PageTemplate from "@/components/templates/page-template"

export default function MobileAppsPage() {
  return (
    <PageTemplate 
      title="Cross-platform Mobile Apps"
      subtitle="Native and hybrid mobile applications for iOS and Android"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Mobile Solutions</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Native Apps</h3>
              <p className="text-white/70">Platform-specific apps for iOS and Android.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Cross-platform Apps</h3>
              <p className="text-white/70">React Native and Flutter development.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Progressive Web Apps</h3>
              <p className="text-white/70">Web apps with native-like functionality.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Development Features</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Offline Support</h3>
              <p className="text-white/70">Work seamlessly with or without internet.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Push Notifications</h3>
              <p className="text-white/70">Engage users with timely updates.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Analytics Integration</h3>
              <p className="text-white/70">Track user behavior and app performance.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
