import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { authServices } from '../../services/api';
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from '../../store/authSlice';
import { extractToken, normalizeUser } from '../../utils/authHelpers';
import { sanitizeErrorMessage } from '../../utils/sanitize';

// Allow unicode letters, marks, spaces and common name punctuation
const nameRegex = /^[\p{L}\p{M}'\-. ]+$/u;

// Password: simpler policy for open-source project — min 8, must contain letters and numbers
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(50, 'Name must be 50 characters or fewer.')
    .matches(
      nameRegex,
      'Name may contain letters, spaces, apostrophes, hyphens and periods.'
    )
    .required('Name is required.'),
  email: yup
    .string()
    .trim()
    .lowercase()
    .max(254, 'Email must be 254 characters or fewer.')
    .email('Please enter a valid email address.')
    .required('Email is required.'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(72, 'Password must be 72 characters or fewer.')
    .matches(passwordRegex, 'Password must contain letters and numbers.')
    .required('Password is required.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match.')
    .required('Please confirm your password.'),
  // honeypot
  website: yup
    .string()
    .test('is-empty', 'Invalid submission', (v) => !v || v.length === 0),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const [submissionTimestamp, setSubmissionTimestamp] = useState(Date.now());
  const honeypotRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    trigger,
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      website: '',
    },
  });

  useEffect(() => {
    // mark time when form first displayed
    setSubmissionTimestamp(Date.now());
  }, []);

  // focus first invalid field for better UX
  useEffect(() => {
    const first = Object.keys(errors)[0];
    if (first) {
      const el = document.querySelector(`[name="${first}"]`);
      el?.focus?.();
    }
  }, [errors]);

  const handleBlur = (fieldName) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
    trigger(fieldName);
  };

  const handleChange = (fieldName) => {
    if (touchedFields[fieldName] || errors[fieldName]) {
      trigger(fieldName);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((s) => !s);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((s) => !s);

  const onSubmit = async (data) => {
    try {
      // basic spam prevention checks
      const now = Date.now();
      if (now - submissionTimestamp < 1500) {
        toast.error('Form submitted too quickly. Please take your time.');
        return;
      }
      if (data.website) {
        toast.error('Spam detected.');
        return;
      }

      dispatch(registerStart());
      const response = await authServices.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      const payload = response?.data ?? {};
      const token = extractToken(payload);
      const user = normalizeUser(payload, {
        email: data.email,
        name: data.name,
      });

      if (!token) {
        throw new Error('No token returned from server');
      }

      dispatch(registerSuccess({ user, token }));
      try {
        localStorage.setItem('hasSession', '1');
      } catch {
        /* ignore storage errors */
      }

      reset(); // clear form
      toast.success('Account created successfully!');
      // small delay so user sees toast before route change (optional if ToastContainer is global)
      navigate('/');
    } catch (err) {
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.message;

      let message;
      if (serverMsg && typeof serverMsg === 'string' && serverMsg.trim()) {
        message = sanitizeErrorMessage(serverMsg);
      } else if (status === 429) {
        message = 'Too many requests. Please wait a moment and try again.';
      } else if (status === 409) {
        message = 'An account with this email already exists.';
      } else if (status >= 500) {
        message = 'Server error. Please try again later.';
      } else {
        message = sanitizeErrorMessage(err?.message || 'Registration failed');
      }

      if (import.meta.env.DEV) console.error('Register error (raw):', err);
      dispatch(registerFailure(message));
      setError('email', { type: 'server', message });
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] px-4 py-4">
      {/* Logo with navigation */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => navigate('/')}
          className="focus:outline-none focus:ring-2 focus:ring-[#CBD5E1] rounded cursor-pointer"
          aria-label="Go to home page"
        >
          <img
            src="/icons/coreX-logo-login.svg"
            alt="CoreX Logo"
            className="h-10 object-contain"
          />
        </button>
      </div>

      {/* Card */}
      <div className="w-full max-w-[500px] bg-white border border-[#D7DDE9] rounded-[8px] px-6 py-8 shadow-sm">
        {/* Header */}
        <h2
          className="text-left text-[#05254E] text-2xl mb-1"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          <Link
            to="/login"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <span className="text-[#05254E] font-medium">LOGIN</span>
          </Link>{' '}
          <span className="text-[#05254E]/50 font-bold"> / </span>
          <span className="font-bold" aria-current="page">
            REGISTER
          </span>
        </h2>

        <p className="text-left text-xs text-[#6B7280] mb-5 font-poppins">
          Choose how you'd like to sign in
        </p>

        {/* Google Sign In */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-[#0B1A2C] bg-[#f1f3f5] text-sm font-medium mb-6  border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition-all duration-300"
          disabled={loading}
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

        <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-1">
            Create a secure profile
          </h3>
          <p className="text-xs text-blue-700">
            Use a password of at least 8 characters including letters and
            numbers.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          style={{ fontFamily: 'var(--font-inter)' }}
          noValidate
        >
          {/* honeypot: off-screen (visually-hidden) so bots that ignore display:none still see it */}
          <div className="visually-hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              {...register('website')}
              tabIndex={-1}
              autoComplete="off"
              ref={honeypotRef}
            />
          </div>

          <div>
            <input
              type="text"
              {...register('name', { onChange: () => handleChange('name') })}
              onBlur={() => handleBlur('name')}
              name="name"
              placeholder="Full Name"
              autoComplete="name"
              maxLength={50}
              inputMode="text"
              aria-invalid={errors.name ? 'true' : 'false'}
              className={`w-full px-4 py-2.5 border rounded-md text-base placeholder:text-[#767676] focus:outline-none focus:ring-2 ${
                errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-[#D7DDE9] focus:ring-[#CBD5E1]'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              {...register('email', { onChange: () => handleChange('email') })}
              onBlur={() => handleBlur('email')}
              name="email"
              placeholder="Email Address"
              autoComplete="email"
              maxLength={254}
              inputMode="email"
              aria-invalid={errors.email ? 'true' : 'false'}
              className={`w-full px-4 py-2.5 border rounded-md text-base placeholder:text-[#767676] focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-[#D7DDE9] focus:ring-[#CBD5E1]'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  onChange: () => handleChange('password'),
                })}
                onBlur={() => handleBlur('password')}
                name="password"
                placeholder="Password"
                autoComplete="new-password"
                maxLength={72}
                aria-invalid={errors.password ? 'true' : 'false'}
                className={`w-full px-4 py-2.5 pr-12 border rounded-md text-base placeholder:text-[#767676] focus:outline-none focus:ring-2 ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[#D7DDE9] focus:ring-[#CBD5E1]'
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  onChange: () => handleChange('confirmPassword'),
                })}
                onBlur={() => handleBlur('confirmPassword')}
                name="confirmPassword"
                placeholder="Confirm Password"
                autoComplete="new-password"
                maxLength={128}
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                className={`w-full px-4 py-2.5 pr-12 border rounded-md text-base placeholder:text-[#767676] focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[#D7DDE9] focus:ring-[#CBD5E1]'
                }`}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                aria-label={
                  showConfirmPassword ? 'Hide password' : 'Show password'
                }
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2.5 text-base text-white rounded-md font-medium transition ${
              isValid && isDirty && !loading
                ? 'bg-[#023e8a] hover:bg-[#1054ab] cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!isValid || !isDirty || loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
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
