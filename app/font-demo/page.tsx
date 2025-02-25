import { Heading } from "@/components/ui/heading";

export default function FontDemoPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="mb-8">This is an H1 with Deltha Font</h1>
      
      <h2 className="mb-6">This is an H2 with BETELGUESSE Font</h2>
      
      <h3 className="mb-4">This is an H3 with BETELGUESSE Font</h3>
      
      <p className="mb-8 text-lg">
        This is a paragraph with Raleway font. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc
        quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam
        nisl nunc quis nisl.
      </p>
      
      <div className="mt-12 mb-8">
        <h2 className="mb-4">Using the Heading Component</h2>
        
        <Heading level={1} className="mb-6">
          Heading Level 1 (Deltha)
        </Heading>
        
        <Heading level={2} className="mb-4">
          Heading Level 2 (BETELGUESSE)
        </Heading>
        
        <Heading level={3} className="mb-4">
          Heading Level 3 (BETELGUESSE)
        </Heading>
        
        <Heading level={4} className="mb-4">
          Heading Level 4 (BETELGUESSE)
        </Heading>
      </div>
      
      <div className="mt-12 p-6 bg-gray-900 rounded-lg">
        <h2 className="mb-4">Font Samples</h2>
        
        <div className="mb-6">
          <h3 className="text-sm text-gray-400 mb-2">Deltha Font</h3>
          <p className="font-deltha text-3xl">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p className="font-deltha text-3xl">abcdefghijklmnopqrstuvwxyz</p>
          <p className="font-deltha text-3xl">0123456789</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm text-gray-400 mb-2">BETELGUESSE Font</h3>
          <p className="font-betelgeuse text-3xl">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p className="font-betelgeuse text-3xl">abcdefghijklmnopqrstuvwxyz</p>
          <p className="font-betelgeuse text-3xl">0123456789</p>
        </div>
        
        <div>
          <h3 className="text-sm text-gray-400 mb-2">Raleway Font</h3>
          <p className="font-raleway text-3xl">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p className="font-raleway text-3xl">abcdefghijklmnopqrstuvwxyz</p>
          <p className="font-raleway text-3xl">0123456789</p>
        </div>
      </div>
    </div>
  );
} 