import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { UserPool } from './awsConfig';

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromSignup = location.state?.email || '';

  const [email, setEmail] = useState(emailFromSignup);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    cognitoUser.confirmRegistration(code, true, (err) => {
      setLoading(false);
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }

      alert('OTP verified successfully');
      navigate('/home');
    });
  };

  const resendCode = () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    cognitoUser.resendConfirmationCode((err) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
      } else {
        alert('OTP resent to your email');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Verify Your Email
        </h2>

        <form onSubmit={handleVerify} className="space-y-4">
          {/* <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}

          <input
            type="text"
            placeholder="Enter OTP"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition duration-200 ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        <button
          onClick={resendCode}
          className="w-full mt-4 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
