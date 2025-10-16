const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/auth/google`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full flex items-center cursor-pointer justify-center gap-2 px-4 py-2 bg-[#B4C2CF] text-[#0B1A2C] text-sm font-medium rounded-md mb-6 hover:bg-[#c1d0dd] transition"
    >
      <img src="/assets/google-icon.svg" alt="Google Icon" className="w-5 h-5" />
    </button>
  );
};

export default GoogleLoginButton;
