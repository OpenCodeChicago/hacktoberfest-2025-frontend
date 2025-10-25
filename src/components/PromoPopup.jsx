import React, { useState, useEffect } from 'react';
import promoImage from '../assets/promo.png';
import usFlag from '../assets/us.png';

const PromoPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [goal, setGoal] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [goalError, setGoalError] = useState('');

  useEffect(() => {
    const popupFlag = localStorage.getItem('promoPopupShown');
    if (!popupFlag) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);
  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem('promoPopupShown', 'true');
  };

  const handleOverlayClick = (e) => {
    // If clicked directly on overlay, close
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setGoalError('');

    let hasErrors = false;

    if (!firstName.trim()) {
      setNameError('First name is required');
      hasErrors = true;
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      hasErrors = true;
    }

    // Phone is optional - no validation needed

    if (!goal || goal === '') {
      setGoalError('Please select your fitness goal');
      hasErrors = true;
    }

    if (hasErrors) return;

    // Here you could send data to a server if needed
    closePopup();
  };

  if (!showPopup) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden flex max-w-4xl w-full mx-4">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-10 text-[#000000] md:text-[#FAFAF9] rounded-full w-8 h-8 flex items-center justify-center border-2 border-gray-300"
          onClick={closePopup}
        >
          ✕
        </button>

        {/* Left: Signup Form */}
        <div className="p-8 flex-1 bg-white">
          <h1
            className="text-4xl font-bold mb-4 text-[#010409] leading-tight"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            UNLOCK 20% OFF YOUR FIRST ORDER!
          </h1>
          <p className="text-[#000000] mb-6 text-lg leading-relaxed font-medium">
            Join the{' '}
            <span className="font-bold text-[#000000] text-lg">
              #Core<span className="text-red-500">X</span>shop!
            </span>{' '}
            crew for exclusive deals, product launches, and pro fitness tips
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="First Name *"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setNameError('');
                }}
                className="w-full px-4 py-3 border-2 border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {nameError && (
                <p className="text-red-500 text-xs mt-1">{nameError}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                className="w-full px-4 py-3 border-2 border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>

            <div>
              <div className="flex">
                <div className="flex items-center px-4 py-3 border-2 border-r-0 border-gray-400 bg-gray-100 rounded-l">
                  <img src={usFlag} alt="US" className="w-6 h-4" />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError('');
                  }}
                  className="flex-1 px-4 py-3 border-2 border-gray-400 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {phoneError && (
                <p className="text-red-500 text-xs mt-1">{phoneError}</p>
              )}
            </div>

            <div>
              <select
                value={goal}
                onChange={(e) => {
                  setGoal(e.target.value);
                  setGoalError('');
                }}
                className="w-full px-4 py-3 border-2 border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
              >
                <option value="">What's Your Fitness Goal?</option>
                <option>Build Muscle</option>
                <option>Lose Weight</option>
                <option>Improve Endurance</option>
                <option>General Wellness</option>
                <option>Recovery</option>
              </select>
              {goalError && (
                <p className="text-red-500 text-xs mt-1">{goalError}</p>
              )}
            </div>

            <div className="space-y-3 pt-4">
              <button
                type="submit"
                className="w-full bg-[#0D1B2A] text-white py-3 px-6 rounded font-semibold hover:bg-gray-800 transition"
              >
                Yes! I Want 20% OFF
              </button>
              <button
                type="button"
                onClick={closePopup}
                className="w-full border-2 border-[#000000] text-gray-900 py-3 px-6 rounded font-semibold hover:bg-gray-50 transition"
              >
                No thanks, I'll pay full price
              </button>
            </div>
          </form>

          <p className="mt-4 text-xs text-gray-600 leading-relaxed">
            By signing up, you’ll receive occasional exclusive offers and
            fitness tips from CoreX. No spam, unsubscribe anytime. See our{' '}
            <a href="/privacy-policy" className="underline text-gray-700">
              Privacy Policy
            </a>{' '}
            &amp;{' '}
            <a href="/terms-of-service" className="underline text-gray-700">
              Terms
            </a>
          </p>
        </div>

        {/* Right: Product Image with gradient background */}
        <div className="hidden md:flex md:flex-1 relative bg-gradient-to-br from-purple-700 via-purple-600 to-blue-700 items-center justify-center overflow-hidden">
          {/* Promo Image */}
          <img
            src={promoImage}
            alt="CoreX Promotional Products"
            className="object-cover h-full w-full"
          />

          {/* Blue water splash overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;
