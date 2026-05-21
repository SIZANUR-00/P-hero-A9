import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <FaEnvelope /> sportnest@example.com
              </p>
              <p className="flex items-center gap-2">
                <FaPhone /> +1 234 567 8900
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-blue-500 transition">Home</a></li>
              <li><a href="/facilities" className="hover:text-blue-500 transition">All Facilities</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SportNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;