import React, { useState } from 'react';
import Button from '../ui/Button';

const PinVerification = ({ email, onVerify, onBack, loading }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (pin.length !== 6) {
      setError('Please enter a 6-digit PIN');
      return;
    }
    
    onVerify(pin);
  };

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPin(value);
    setError('');
  };

  const handleDemoPin = () => {
    setPin('123456');
    setTimeout(() => onVerify('123456'), 100);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Header with logo */}
      <div className="flex items-center justify-start px-6 py-6 border-b border-gray-200">
        <svg
          aria-label="Coinbase logo"
          className="w-8 h-8"
          role="img"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Coinbase logo</title>
          <path
            d="M24,36c-6.63,0-12-5.37-12-12s5.37-12,12-12c5.94,0,10.87,4.33,11.82,10h12.09C46.89,9.68,36.58,0,24,0 C10.75,0,0,10.75,0,24s10.75,24,24,24c12.58,0,22.89-9.68,23.91-22H35.82C34.87,31.67,29.94,36,24,36z"
            fill="#0052FF"
          />
        </svg>
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Heading */}
          <h1 className="text-3xl font-semibold text-center mb-8 text-gray-900">
            Verify your email
          </h1>

          {/* Email info */}
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-2">
              We sent a verification code to:
            </p>
            <p className="font-medium text-gray-900">{email}</p>
          </div>

          {/* Demo notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-blue-800 text-center">
              <strong>Demo Mode:</strong> Use PIN <code className="bg-blue-100 px-2 py-1 rounded">123456</code> or click the button below
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDemoPin}
              disabled={loading}
              className="w-full mt-2"
            >
              Use Demo PIN (123456)
            </Button>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {/* PIN input */}
            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                Enter 6-digit PIN
              </label>
              <input
                id="pin"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={pin}
                onChange={handlePinChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl font-mono"
                placeholder="000000"
                disabled={loading}
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={loading || pin.length !== 6}
              className="w-full"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </Button>

            {/* Back button */}
            <Button
              variant="secondary"
              size="lg"
              onClick={onBack}
              disabled={loading}
              className="w-full"
            >
              Back
            </Button>
          </form>

          {/* Resend link */}
          <div className="text-center mt-6">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => alert('Demo: PIN resent to console')}
              disabled={loading}
            >
              Didn't receive a code? Resend
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PinVerification;
