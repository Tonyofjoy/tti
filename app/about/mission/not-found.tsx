import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4">Page Moved</h2>
      <p className="mb-6 text-center max-w-md">
        The mission page has been moved to our new unified About page.
      </p>
      <Link 
        href="/about?section=mission"
        className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-medium hover:shadow-lg transition-all"
      >
        Go to About Page
      </Link>
    </div>
  )
} 