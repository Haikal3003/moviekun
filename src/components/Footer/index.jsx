import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative w-full  bg-gray-900 text-gray-400 py-20">
      <div className="px-[10rem]">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-white text-[1.8rem] font-bold">Moviekun</h2>
            <p className="font-semibold text-[1rem] mb-2">Discover and explore details of your favorite movies and TV shows!</p>
            <p className="text-gray-500">&copy; {new Date().getFullYear()} Moviekun. All rights reserved.</p>
          </div>

          <div className="flex space-x-6 text-center md:text-left">
            <a href="/about" className="hover:text-white">
              About Us
            </a>
            <a href="/contact" className="hover:text-white">
              Contact
            </a>
            <a href="/privacy" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white">
              Terms of Service
            </a>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
