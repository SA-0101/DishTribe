import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700">
  <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row justify-between gap-8">
      
      {/* Logo and About */}
      <div className="flex flex-col gap-2 max-w-sm">
        <h2 className="text-2xl font-bold text-orange-500">DishTribe</h2>
        <p className="text-sm">
          Discover delicious dishes from top-rated restaurants. Taste the tribe!
        </p>
      </div>

      {/* Navigation Links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
        <div>
          <h3 className="font-semibold mb-2">Company</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-orange-500">About Us</a></li>
            <li><a href="#" className="hover:text-orange-500">Careers</a></li>
            <li><a href="#" className="hover:text-orange-500">Blog</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-orange-500">Help Center</a></li>
            <li><a href="#" className="hover:text-orange-500">Contact Us</a></li>
            <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-orange-500">Instagram</a></li>
            <li><a href="#" className="hover:text-orange-500">Twitter</a></li>
            <li><a href="#" className="hover:text-orange-500">Facebook</a></li>
          </ul>
        </div>
      </div>
    </div>

    {/* Footer bottom */}
    <div className="mt-8 border-t pt-6 text-sm text-center text-gray-500">
      &copy; {new Date().getFullYear()} DishTribe. All rights reserved.
    </div>
  </div>
</footer>

  )
}

export default Footer
