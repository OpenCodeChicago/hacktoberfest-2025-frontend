import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout as logoutAction } from '../../store/authSlice';
import { authServices } from '../../services/api';
import { getDisplayName, getDisplayEmail } from '../../utils/authHelpers';

// small client-side sanitizer for server-provided messages (avoid rendering HTML / long traces)
function sanitizeErrorMessage(message) {
  if (typeof message !== 'string') return 'An error occurred';
  return message
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    .substring(0, 200);
}

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user) || null;
  const name = getDisplayName(user);
  const email = getDisplayEmail(user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = useCallback(async () => {
    try {
      await authServices.logout();
      toast.success('You have been logged out.');
    } catch (err) {
      const raw =
        err?.response?.data?.message || err?.message || 'Logout failed';
      const message = sanitizeErrorMessage(raw);
      console.error('Logout request failed', message);
    } finally {
      try {
        localStorage.removeItem('hasSession');
      } catch (storageErr) {
        const rawStorage = storageErr?.message || storageErr;
        const storageMsg = sanitizeErrorMessage(rawStorage);
        console.error('Failed to clear hasSession flag', storageMsg);
      }
      dispatch(logoutAction());
      navigate('/');
    }
  }, [dispatch, navigate]);

  // redirect if not authenticated
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className=" w-full min-h-screen flex flex-col items-center justify-normal gap-y-10 py-8 px-5 md:px-32  ">
      <div className="w-full flex items-center justify-between gap-2">
        <h1 className="text-xl font-[600] font-inter">Profile</h1>
        <button
          className=" px-6 sm:px-15 py-1 sm:py-2 border border-gray-300 bg-[#f8f9fa] rounded-xl cursor-pointer hover:bg-[#f1f3f5] transition-all duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="w-full border-1 border-gray-200 rounded-xl p-5 flex flex-col gap-4">
        <h2 className="font-medium text-left text-[16px] font-montserrat">
          {name}
        </h2>
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-40">
          <div>
            <p className="text-gray-400 text-[14px]">Email:</p>
            <p className="font-normal text-[14px]">{email}</p>
          </div>
          <div>
            <p className="text-gray-400 text-[14px] ">Phone number:</p>
          </div>
        </div>
      </div>
      <div className="w-full border-1 border-gray-200 rounded-xl p-5 flex flex-col gap-4">
        <h2 className="font-medium text-[16px] font-montserrat">Addresses</h2>
        <div className="flex flex-col gap-1">
          <p className="text-gray-400">Default address</p>
        </div>
      </div>
      <div className="w-full border-1 border-gray-200 rounded-xl p-5">
        <div className="flex flex-col gap-5 sm:flex-row  justify-between sm:items-end">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-[16px] font-montserrat">
              Adding a payment method for subscription orders?
            </h3>
            <p className=" font-normal text-[14px]">
              Once you've added the payment you want to use, assign it to your
              subscriptions.
            </p>
          </div>
          <div>
            <button className="text-white bg-[#0b71be] p-[14px] rounded-xl cursor-pointer hover:bg-[#015c9b] transition-all duration-200 font-inter w-full">
              Assign a payment method to subscriptions
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <hr className="mb-4 text-gray-200" />
        <h2 className="font-bold text-m mb-4 font-inter">DISCLAIMER</h2>
        <p className="font-medium text-m font-inter">
          ⚠️ Core<span className="text-red-600">X</span> Nutrition is a
          community open-source project. The site does not sell or deliver
          products. All content is for demonstration purposes only.
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
