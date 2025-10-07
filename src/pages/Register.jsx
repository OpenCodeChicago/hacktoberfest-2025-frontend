import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic

    // Reset form
    setFormData({ name: '', email: '', password: '' });
  };

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

      {/* Form */}
      <div className="w-full max-w-[500px] bg-white border border-[#D7DDE9] rounded-[8px] px-6 py-8 shadow-sm">
        {/* Header */}
        <h2
          className="text-left text-[#05254E] text-2xl mb-1"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          LOGIN <span className="text-[#05254E]/50 font-bold"> / </span>{' '}
          <span
            className="text-[#05254E] font-bold"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            REGISTER
          </span>
        </h2>

        <p className="text-left text-xs text-[#6B7280] mb-5">
          Choose how you'd like to sign in
        </p>

        {/* Google Sign In Button */}
        <button
          type="button"
          className="w-full flex cursor-pointer items-center justify-center gap-2 px-4 py-2 bg-[#B4C2CF] text-[#0B1A2C] text-sm font-medium rounded-md mb-6 hover:bg-[#c1d0dd] transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_2_2112)">
              <path
                d="M8.36104 0.789433C5.96307 1.62131 3.89506 3.20024 2.46077 5.29431C1.02649 7.38838 0.301526 9.8872 0.392371 12.4237C0.483217 14.9603 1.38508 17.4008 2.9655 19.3869C4.54591 21.373 6.72158 22.8 9.17292 23.4582C11.1603 23.971 13.2424 23.9935 15.2404 23.5238C17.0504 23.1173 18.7238 22.2476 20.0967 21.0001C21.5256 19.662 22.5627 17.9597 23.0967 16.0763C23.677 14.0282 23.7803 11.8743 23.3985 9.78006H12.2385V14.4094H18.7017C18.5725 15.1478 18.2957 15.8525 17.8878 16.4814C17.48 17.1102 16.9494 17.6504 16.3279 18.0694C15.5387 18.5915 14.649 18.9428 13.716 19.1007C12.7803 19.2747 11.8205 19.2747 10.8848 19.1007C9.9364 18.9046 9.03923 18.5132 8.25042 17.9513C6.9832 17.0543 6.03168 15.7799 5.53167 14.3101C5.02319 12.8127 5.02319 11.1893 5.53167 9.69193C5.88759 8.64234 6.47598 7.68669 7.25292 6.89631C8.14203 5.97521 9.26766 5.3168 10.5063 4.99333C11.745 4.66985 13.0488 4.6938 14.2748 5.06256C15.2325 5.35654 16.1083 5.87019 16.8323 6.56256C17.561 5.83756 18.2885 5.11068 19.0148 4.38193C19.3898 3.99006 19.7985 3.61693 20.1679 3.21568C19.0627 2.1872 17.7654 1.38691 16.3504 0.860683C13.7736 -0.0749616 10.9541 -0.100106 8.36104 0.789433Z"
                fill="white"
              />
              <path
                d="M8.3607 0.789367C10.9536 -0.100776 13.7731 -0.0762934 16.3501 0.858742C17.7654 1.38855 19.062 2.19269 20.1657 3.22499C19.7907 3.62624 19.3951 4.00124 19.0126 4.39124C18.2851 5.11749 17.5582 5.84124 16.832 6.56249C16.1079 5.87012 15.2321 5.35648 14.2745 5.06249C13.0489 4.69244 11.7451 4.66711 10.5061 4.98926C9.26712 5.31141 8.14079 5.96861 7.2507 6.88874C6.47377 7.67912 5.88538 8.63477 5.52945 9.68437L1.64258 6.67499C3.03384 3.91604 5.44273 1.80566 8.3607 0.789367Z"
                fill="#E33629"
              />
              <path
                d="M0.611401 9.65605C0.820316 8.62067 1.16716 7.61798 1.64265 6.6748L5.52953 9.69168C5.02105 11.1891 5.02105 12.8124 5.52953 14.3098C4.23453 15.3098 2.9389 16.3148 1.64265 17.3248C0.452308 14.9554 0.0892746 12.2557 0.611401 9.65605Z"
                fill="#F8BD00"
              />
              <path
                d="M12.2372 9.77832H23.3972C23.7789 11.8726 23.6756 14.0264 23.0953 16.0746C22.5614 17.958 21.5242 19.6602 20.0953 20.9983C18.8409 20.0196 17.5809 19.0483 16.3265 18.0696C16.9484 17.6501 17.4792 17.1094 17.8871 16.4798C18.295 15.8503 18.5716 15.1448 18.7003 14.4058H12.2372C12.2353 12.8646 12.2372 11.3214 12.2372 9.77832Z"
                fill="#587DBD"
              />
              <path
                d="M1.64062 17.3251C2.93687 16.3251 4.2325 15.3201 5.5275 14.3101C6.02851 15.7804 6.98138 17.0549 8.25 17.9513C9.04127 18.5106 9.94037 18.8988 10.89 19.0913C11.8257 19.2653 12.7855 19.2653 13.7213 19.0913C14.6542 18.9334 15.5439 18.5821 16.3331 18.0601C17.5875 19.0388 18.8475 20.0101 20.1019 20.9888C18.7292 22.237 17.0558 23.1073 15.2456 23.5144C13.2476 23.9841 11.1655 23.9616 9.17813 23.4488C7.60632 23.0291 6.13814 22.2893 4.86563 21.2757C3.51874 20.2063 2.41867 18.8588 1.64062 17.3251Z"
                fill="#319F43"
              />
            </g>
            <defs>
              <clipPath id="clip0_2_2112">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>

        {/* Divider */}
        <div className="flex items-center justify-between mb-4">
          <hr className="border-t bg-[#B4C2CF] w-full" />
          <span
            className="px-2 text-sm text-[#89949F]"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            or
          </span>
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2.5 border border-[#D7DDE9] text-base placeholder:text-[#767676] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBD5E1]"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2.5 border border-[#D7DDE9] text-base placeholder:text-[#767676] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBD5E1]"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password}
          />

          <button
            type="submit"
            className="w-full px-4 py-2.5 text-base text-[#0B1A2C] bg-[#F1F5F9] rounded-md hover:bg-[#E2E8F0] transition cursor-pointer font-medium"
          >
            Continue
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm text-[#6B7280]">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-[#0B1A2C] font-medium hover:underline"
          >
            Login
          </Link>
        </div>

        {/* Footer Links */}
        <div className="mt-6 flex justify-center gap-4 text-[12px] text-[#0B1A2C] font-montserrat">
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
