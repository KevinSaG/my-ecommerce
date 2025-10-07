export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to My E-Commerce Store
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Built with Next.js, Supabase, and Tailwind CSS
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Next.js 15</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Latest Next.js with App Router and Server Components
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🗄️</div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Supabase</h2>
              <p className="text-gray-600 dark:text-gray-400">
                PostgreSQL database with authentication and real-time features
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🎨</div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Tailwind CSS</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Utility-first CSS framework for beautiful, responsive designs
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <a
              href="/api/auth/login"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

