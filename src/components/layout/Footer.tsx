import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-primary">About Us</Link></li>
              <li><Link to="/team" className="text-sm text-gray-600 hover:text-primary">Our Team</Link></li>
              <li><Link to="/careers" className="text-sm text-gray-600 hover:text-primary">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-sm text-gray-600 hover:text-primary">Blog</Link></li>
              <li><Link to="/guides" className="text-sm text-gray-600 hover:text-primary">Guides</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-sm text-gray-600 hover:text-primary">Cookie Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-primary">Contact Us</Link></li>
              <li><Link to="/support" className="text-sm text-gray-600 hover:text-primary">Support</Link></li>
              <li><a href="mailto:info@cofounder.com" className="text-sm text-gray-600 hover:text-primary">info@cofounder.com</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} CoFounder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};