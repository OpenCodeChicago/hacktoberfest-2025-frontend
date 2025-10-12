import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';

const customerCare = [
  { name: 'My Account', href: '/login' },
  { name: 'My Orders', href: '/login' },
  { name: 'Email Support', href: 'mailto:info@opencodechicago.org' },
  { name: 'Call Support', href: 'tel:+13125551234' },
];

const information = [
  { name: 'Shipping Policy', href: '/shipping-policy' },
  { name: 'Return Policy', href: '/return-policy' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Accessibility', href: '/accessibility' },
  { name: 'Terms of Service', href: '/terms-of-service' },
];

export default function TopFooter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!isValidEmail) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // Simulate subscription success (e.g., API call here)
    console.log('Subscribed:', email);

    // Show success toast notification
    toast.success(
      'Thank you for subscribing! Your email has been received. You’ll now get our latest deals and discounts.'
    );

    setEmail('');
  };

  return (
    <footer className="bg-neutral-900 text-neutral-200 px-6 py-12">
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-3">
        {/* Logo + Address */}
        <div>
          <Link
            to="/"
            className="inline-block mb-4"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/images/official-logo-core-x-footer.svg"
              alt="CoreX"
              className="mb-4 w-32"
            />
          </Link>
          <ul className="flex space-x-2 mb-4">
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 transition-transform duration-300 ease-in-out"
              >
                <img
                  src="/images/youtube_icon.png"
                  alt="YouTube"
                  className="w-6 h-6 hover:scale-110 transform hover:rotate-2 hover:shadow-lg"
                />
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 transition-transform duration-300 ease-in-out"
              >
                <img
                  src="/images/linkedin_icon.png"
                  alt="LinkedIn"
                  className="w-6 h-6 hover:scale-110 transform hover:rotate-2 hover:shadow-lg"
                />
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 transition-transform duration-300 ease-in-out"
              >
                <img
                  src="/images/x_icon.png"
                  alt="Twitter"
                  className="w-6 h-6 hover:scale-110 transform hover:rotate-2 hover:shadow-lg"
                />
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 transition-transform duration-300 ease-in-out"
              >
                <img
                  src="/images/facebook_icon.png"
                  alt="Facebook"
                  className="w-6 h-6 hover:scale-110 transform hover:rotate-2 hover:shadow-lg"
                />
              </a>
            </li>
          </ul>
          <address className="hover:underline cursor-pointer not-italic text-sm leading-relaxed">
            1234 N Main St,
            <br /> Chicago, IL 60607
          </address>
        </div>

        {/* Navigation Links */}
        <nav className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h3 className="font-semibold text-white mb-3">Customer Care</h3>
            <ul className="space-y-2">
              {customerCare.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-300 link-underline transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Information</h3>
            <ul className="space-y-2">
              {information.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-300 link-underline transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <h3 className="text-4xl uppercase font-bold mb-4">
            Get our latest deals and discounts!
          </h3>
          <div className="flex bg-neutral-800 rounded-lg overflow-hidden">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow p-3 bg-neutral-800 text-neutral-200 placeholder-neutral-400 outline-none hover:bg-neutral-700 hover:ring-1 hover:ring-neutral-500 focus:ring-2 focus:ring-white transition duration-200 ease-in-out"
              required
            />
            <button
              type="submit"
              className="p-3 rounded-full bg-white hover:bg-neutral-400 text-neutral-900 transition cursor-pointer flex items-center justify-center"
              aria-label="Subscribe"
            >
              <ArrowRight className="w-5 h-5 text-neutral-900" />
            </button>
          </div>
          <p className="mt-2 text-xs">
            Become a Core<span className="text-red-500">X</span> Insider!
          </p>
        </form>
      </div>
    </footer>
  );
}
