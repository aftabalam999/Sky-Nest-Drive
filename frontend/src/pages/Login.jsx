import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import logo from '../assets/main-logo-removebg.png';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  HardDrive,
  Cloud,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  X,
  Zap,
} from 'lucide-react';

const Login = () => {
  const { login, signup, forgotPassword, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated, redirect to the intended destination or home
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Mode switcher: false = Sign In, true = Sign Up
  const [customMode, setCustomMode] = useState(null);
  const isSignUp = customMode !== null ? customMode : location.pathname === '/signup';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotResult, setForgotResult] = useState({ status: '', msg: '' });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError('');
  };

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'Too short', color: 'bg-gray-200' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 25, label: 'Weak', color: 'bg-red-400' };
      case 2:
        return { score: 50, label: 'Fair', color: 'bg-amber-400' };
      case 3:
        return { score: 75, label: 'Good', color: 'bg-blue-400' };
      case 4:
        return { score: 100, label: 'Strong', color: 'bg-emerald-500' };
      default:
        return { score: 15, label: 'Very Weak', color: 'bg-red-300' };
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // Field Validations
    if (!formData.email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please provide a valid email format (e.g. user@domain.com).');
      return;
    }

    if (!formData.password) {
      setError('Please enter your password.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (isSignUp) {
      if (!formData.name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match. Please verify your password confirmation.');
        return;
      }

      setLoading(true);
      const res = await signup(formData.name, formData.email, formData.password);
      setLoading(false);

      if (res.success) {
        setSuccessMsg(res.message || 'Account created successfully! Loading your Drive...');
        setTimeout(() => {
          navigate(location.state?.from?.pathname || '/', { replace: true });
        }, 900);
      } else {
        setError(res.message);
      }
    } else {
      setLoading(true);
      const res = await login(formData.email, formData.password, formData.rememberMe);
      setLoading(false);

      if (res.success) {
        setSuccessMsg('Signed in successfully! Loading your Sky Nest Drive...');
        setTimeout(() => {
          navigate(location.state?.from?.pathname || '/', { replace: true });
        }, 800);
      } else {
        setError(res.message);
      }
    }
  };

  // Handle forgot password submit
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      setForgotResult({ status: 'error', msg: 'Please provide a valid email address.' });
      return;
    }

    setForgotLoading(true);
    const res = await forgotPassword(forgotEmail);
    setForgotLoading(false);
    setForgotResult({ status: res.success ? 'success' : 'error', msg: res.message });
  };

  return (
    <div className="bg-gray-200 min-h-screen w-full p-3 sm:p-5 flex flex-col justify-between selection:bg-blue-200 selection:text-blue-900">
      {/* Top Header */}
      <header className="flex items-center justify-between max-w-7xl w-full mx-auto py-2">
        {/* Sky Nest Drive Brand Badge */}
        <Link
          to="/"
          id="brand-header-link"
          className="flex items-center gap-2 bg-blue-200 hover:bg-blue-300/80 rounded-full py-1.5 px-4 shadow-lg shadow-blue-200/50 transition-all cursor-pointer group"
        >
          <img
            src={logo}
            alt="Sky Nest Drive Logo"
            className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
          />
          <h1 className="font-bold text-xl sm:text-2xl text-zinc-700 tracking-tight">
            SKY <span className="text-blue-500">NEST</span> DRIVE
          </h1>
        </Link>

      </header>

      {/* Main Auth Container */}
      <main className="max-w-6xl w-full mx-auto my-4 sm:my-6">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          {/* Left Column: Real Auth Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Sign In / Sign Up Mode Pill Switcher */}
              <div className="flex items-center justify-center sm:justify-start mb-6">
                <div className="inline-flex p-1 bg-gray-100 rounded-full border border-gray-200 shadow-inner">
                  <button
                    type="button"
                    id="switch-signin-btn"
                    onClick={() => {
                      setCustomMode(false);
                      setError('');
                      setSuccessMsg('');
                    }}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${!isSignUp
                        ? 'bg-white text-blue-600 shadow-md'
                        : 'text-gray-500 hover:text-gray-900'
                      }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    id="switch-signup-btn"
                    onClick={() => {
                      setCustomMode(true);
                      setError('');
                      setSuccessMsg('');
                    }}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${isSignUp
                        ? 'bg-white text-blue-600 shadow-md'
                        : 'text-gray-500 hover:text-gray-900'
                      }`}
                  >
                    Create Account
                  </button>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-800 tracking-tight">
                  {isSignUp ? 'Create your Sky Nest Account' : 'Welcome back to Sky Nest'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {isSignUp
                    ? 'Register your account to unlock 15 GB of cloud storage, smart backups, and fast file syncing.'
                    : 'Sign in with your registered account credentials to access your drive.'}
                </p>
              </div>

              {/* Alert Feedback Messages */}
              {error && (
                <div
                  id="auth-error-banner"
                  className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm animate-in fade-in"
                >
                  <AlertCircle size={18} className="shrink-0 text-red-500" />
                  <span className="font-medium">{error}</span>
                </div>
              )}

              {successMsg && (
                <div
                  id="auth-success-banner"
                  className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-sm animate-in fade-in"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
                  <span className="font-medium">{successMsg}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name (Sign Up only) */}
                {isSignUp && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                      Full Name
                    </label>
                    <div className="relative flex items-center">
                      <User size={18} className="absolute left-3.5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        id="signup-name-input"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Aftab Alam"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 hover:bg-gray-100/70 focus:bg-white rounded-2xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm text-gray-800 transition-all outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail size={18} className="absolute left-3.5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      id="auth-email-input"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 hover:bg-gray-100/70 focus:bg-white rounded-2xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm text-gray-800 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Password
                    </label>
                    {!isSignUp && (
                      <button
                        type="button"
                        id="forgot-password-link"
                        onClick={() => {
                          setForgotEmail(formData.email);
                          setForgotResult({ status: '', msg: '' });
                          setShowForgotModal(true);
                        }}
                        className="text-xs text-blue-600 hover:text-blue-700 font-semibold hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative flex items-center">
                    <Lock size={18} className="absolute left-3.5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="auth-password-input"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-10 pr-12 py-3 bg-gray-50 hover:bg-gray-100/70 focus:bg-white rounded-2xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm text-gray-800 transition-all outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer p-1"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Password strength meter on sign up */}
                  {isSignUp && formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-500">Strength:</span>
                        <span className="font-semibold text-gray-700">{passwordStrength.label}</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${passwordStrength.score}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password (Sign Up only) */}
                {isSignUp && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                      Confirm Password
                    </label>
                    <div className="relative flex items-center">
                      <KeyRound size={18} className="absolute left-3.5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        id="signup-confirmpassword-input"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter password to confirm"
                        className="w-full pl-10 pr-12 py-3 bg-gray-50 hover:bg-gray-100/70 focus:bg-white rounded-2xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm text-gray-800 transition-all outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer p-1"
                        aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Keep Signed In Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-400"
                    />
                    <span className="text-xs text-gray-600 font-medium">
                      {isSignUp
                        ? 'I agree to Sky Nest Terms & Security Guidelines'
                        : 'Remember my session on this device'}
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="auth-submit-btn"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 px-6 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:opacity-70 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Connecting with server...</span>
                    </>
                  ) : (
                    <>
                      <span>{isSignUp ? 'Create My Account' : 'Sign In to Sky Nest'}</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>

              {/* Informational Note */}
              <div className="mt-6 p-3.5 bg-blue-50/60 border border-blue-100 rounded-2xl flex items-center gap-3 text-xs text-blue-900">
                <ShieldCheck size={18} className="text-blue-500 shrink-0" />
                <span>
                  {isSignUp
                    ? 'Accounts are secured with bcrypt salted hashing and JWT bearer authorization.'
                    : 'Enter your registered email and password to access your cloud storage.'}
                </span>
              </div>
            </div>

            {/* Bottom Footer Switch Prompt */}
            <p className="text-center text-xs text-gray-500 mt-6">
              {isSignUp ? (
                <>
                  Already registered?{' '}
                  <button
                    type="button"
                    id="goto-signin-prompt"
                    onClick={() => {
                      setCustomMode(false);
                      setError('');
                      setSuccessMsg('');
                    }}
                    className="text-blue-600 font-bold hover:underline cursor-pointer"
                  >
                    Sign In to your account
                  </button>
                </>
              ) : (
                <>
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    id="goto-signup-prompt"
                    onClick={() => {
                      setCustomMode(true);
                      setError('');
                      setSuccessMsg('');
                    }}
                    className="text-blue-600 font-bold hover:underline cursor-pointer"
                  >
                    Create a free account
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Right Column: Visual Showcase Feature Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Background Circles */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Showcase Header */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold mb-6">
                <Sparkles size={14} className="text-amber-300" />
                <span>Enterprise Cloud Protection</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                Your personal digital nest in the sky.
              </h3>
              <p className="text-blue-100 text-xs sm:text-sm mt-2 leading-relaxed">
                Store, organize, collaborate, and access all your important files from any browser with secure server-side token authentication.
              </p>
            </div>

            {/* Visual Simulated Drive Cards */}
            <div className="relative z-10 my-8">
              {/* Storage Gauge Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="flex items-center gap-1.5">
                    <HardDrive size={15} />
                    Free Cloud Tier
                  </span>
                  <span className="text-amber-200">15 GB Standard</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden mb-2">
                  <div className="bg-white h-2 rounded-full w-[10%]"></div>
                </div>
                <p className="text-[11px] text-blue-100 flex items-center justify-between">
                  <span>Fresh user accounts start with 15 GB</span>
                  <span className="font-semibold text-white">Full Free Access</span>
                </p>
              </div>
            </div>

            {/* Showcase Footer */}
            <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-blue-100">
              <span className="flex items-center gap-1.5">
                <Cloud size={14} />
                Sky Nest Drive v2.4
              </span>
              <span className="flex items-center gap-1">
                <Zap size={13} className="text-amber-300" />
                High-Speed Cloud
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative">
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <KeyRound size={24} />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1">Reset Password</h3>
            <p className="text-xs text-gray-500 mb-5">
              Enter the email address registered with your Sky Nest account. We'll verify with the server and send instructions.
            </p>

            {forgotResult.status === 'success' ? (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 text-emerald-800 text-xs leading-relaxed">
                  <CheckCircle2 size={18} className="shrink-0 text-emerald-600 mt-0.5" />
                  <span>{forgotResult.msg}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-2xl text-xs transition-colors cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                {forgotResult.status === 'error' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium flex items-center gap-2">
                    <AlertCircle size={15} />
                    <span>{forgotResult.msg}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Registered Email
                  </label>
                  <div className="relative flex items-center">
                    <Mail size={16} className="absolute left-3.5 text-gray-400" />
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 focus:bg-white rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-xs text-gray-800 outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {forgotLoading ? (
                      <span>Verifying...</span>
                    ) : (
                      <>
                        <span>Send Link</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto py-3 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2 border-t border-gray-300/60">
        <p>© 2026 Sky Nest Drive. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          <a href="#help" className="hover:text-blue-600 transition-colors">Help Center</a>
        </div>
      </footer>
    </div>
  );
};

export default Login;
