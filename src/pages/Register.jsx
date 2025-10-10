import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission

    setFormData({ name: '', email: '', password: '' });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isFormFilled = formData.name && formData.email && formData.password;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] px-4">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src="/images/coreX-logo.svg"
          alt="CoreX Logo"
          className="h-10 object-contain"
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-[500px] bg-white border border-[#D7DDE9] rounded-[8px] px-6 py-8 shadow-sm">
        {/* Header */}
        <h2
          className="text-left text-[#05254E] text-2xl mb-1"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          LOGIN <span className="text-[#05254E]/50 font-bold"> / </span>
          <span
            className="text-[#05254E] font-bold"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            REGISTER
          </span>
        </h2>

        <p className="text-left text-xs text-[#6B7280] mb-5 font-poppins">
          Choose how you'd like to sign in
        </p>

        {/* Google Sign In */}
        <button
          type="button"
          className="w-full flex items-center cursor-pointer justify-center gap-2 px-4 py-2 bg-[#B4C2CF] text-[#0B1A2C] text-sm font-medium rounded-md mb-6 hover:bg-[#c1d0dd] transition"
        >
          <img
            src="/assets/google-icon.svg"
            alt="Google Icon"
            className="w-5 h-5"
          />
        </button>

        {/* Divider */}
        <div className="flex items-center justify-between mb-4">
          <hr className="border-t bg-[#B4C2CF] w-full" />
          <span className="px-2 text-sm text-[#89949F] font-poppins">or</span>
          <hr className="border-t bg-[#B4C2CF] w-full" />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full px-4 py-2.5 border border-[#D7DDE9] text-base placeholder:text-[#767676] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBD5E1]"
            onChange={handleChange}
            value={formData.name}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2.5 border border-[#D7DDE9] text-base placeholder:text-[#767676] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBD5E1]"
            onChange={handleChange}
            value={formData.email}
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2.5 pr-12 border border-[#D7DDE9] text-base placeholder:text-[#767676] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBD5E1]"
              onChange={handleChange}
              value={formData.password}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-500"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2.5 text-base text-white rounded-md font-medium transition ${
              isFormFilled
                ? 'bg-[#023e8a] hover:bg-[#1054ab] cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!isFormFilled}
          >
            Continue
          </button>
        </form>

        {/* Redirect */}
        <div className="mt-6 text-center text-sm text-[#6B7280]">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-[#0B1A2C] font-medium hover:underline"
          >
            Login
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-center gap-4 text-[12px] text-[#05254E] text-xs font-medium font-poppins">
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
