export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">About</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your modern e-commerce solution built with the latest technologies.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Contact</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Email: info@mystore.com<br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} My E-Commerce Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

