import PageTemplate from "@/components/templates/page-template"

export default function ConversationalAIPage() {
  return (
    <PageTemplate 
      title="Conversational AI"
      subtitle="Intelligent chatbots and virtual assistants"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">AI Solutions</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Chatbots</h3>
              <p className="text-white/70">Intelligent customer service automation.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Virtual Assistants</h3>
              <p className="text-white/70">AI-powered personal and business assistants.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Voice Interfaces</h3>
              <p className="text-white/70">Natural language processing solutions.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Features</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Natural Language</h3>
              <p className="text-white/70">Advanced language understanding capabilities.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Learning & Adaptation</h3>
              <p className="text-white/70">Continuous improvement from interactions.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Integration</h3>
              <p className="text-white/70">Seamless integration with existing systems.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
