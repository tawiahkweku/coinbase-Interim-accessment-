import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DemoNotice from "../components/ui/DemoNotice";
import PinVerification from "../components/auth/PinVerification";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('register'); // 'register' or 'verify'
  const [tempUserData, setTempUserData] = useState(null);
  
  const { register, loginWithDemo } = useAuth();
  const navigate = useNavigate();

  const handleDemoSignup = async () => {
    setLoading(true);
    setError("");
    const result = await loginWithDemo();
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    setLoading(true);
    
    // Store user data temporarily and move to verification step
    setTempUserData({ name, email, password });
    
    // Simulate sending PIN (in real app, this would send email)
    console.log(`Demo: PIN sent to ${email}. Use PIN: 123456`);
    
    // Move to verification step
    setStep('verify');
    setLoading(false);
  };

  const handlePinVerify = async (pin) => {
    setLoading(true);
    setError("");
    
    // For demo, accept PIN "123456"
    if (pin === '123456') {
      // Complete registration
      const result = await register(tempUserData);
      
      if (result.success) {
        navigate("/");
      } else {
        setError(result.message);
        setStep('register'); // Go back to registration form
      }
    } else {
      setError('Invalid PIN. Please use 123456 for demo.');
    }
    
    setLoading(false);
  };

  const handleBackToRegister = () => {
    setStep('register');
    setError("");
  };

  // Show PIN verification step
  if (step === 'verify') {
    return (
      <PinVerification
        email={tempUserData?.email}
        onVerify={handlePinVerify}
        onBack={handleBackToRegister}
        loading={loading}
      />
    );
  }

  // Show registration form
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <svg
            width="44"
            height="44"
            viewBox="0 0 40 40"
            fill="none"
            className="mx-auto mb-4"
          >
            <title>Coinbase Logo</title>
            <circle cx="20" cy="20" r="20" fill="#0052FF" />
            <path
              d="M20 6C12.268 6 6 12.268 6 20s6.268 14 14 14 14-6.268 14-14S27.732 6 20 6zm-3.6 16.8a3.6 3.6 0 110-7.2h7.2a3.6 3.6 0 110 7.2h-7.2z"
              fill="white"
            />
          </svg>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Create account
          </h1>
        </div>

        {/* Demo Notice */}
        <DemoNotice />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="Enter password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="Confirm password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            type="button"
            onClick={handleDemoSignup}
            disabled={loading}
            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating demo account...' : 'Continue with Demo Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
