import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/about" className="text-sm hover:text-primary">About</Link>
          <Link to="/how-it-works" className="text-sm hover:text-primary">How it Works</Link>
          <Link to="/success-stories" className="text-sm hover:text-primary">Success Stories</Link>
        </div>
      </div>
    </nav>
  );
};