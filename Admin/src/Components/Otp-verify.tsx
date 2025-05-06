import React, { useState, useEffect } from "react";
import axios from "axios";
import OtpSuccessMessage from "./Otp-sxs";

interface OtpverifyProps {
  formData: object;
  email: string;
  isVerified: (yes: boolean) => void;
}

const Otpverify: React.FC<OtpverifyProps> = ({ formData, email, isVerified }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [verificationSxs, setVerificationSxs] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Cleanup when unmount
  }, []);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    setErrorMessage(""); // Clear previous error messages

    if (enteredOtp.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const verification = await axios.post(
        import.meta.env.VITE_VERIFY_OTP_URL,
        { email: email, otp: enteredOtp }
      );

      if (verification.data.verified) {
        try {
          const newUser = await axios.post(
            import.meta.env.VITE_NEW_USER_URL,
            formData
          );
          console.log(newUser.data);
          setVerificationSxs(true);
          isVerified(true);
        } catch (error) {
          console.error("Error in user registration", error);
          setErrorMessage("Failed to register user. Please try again later.");
        }
      } else {
        setErrorMessage("OTP verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error in OTP verification", error);
      setErrorMessage("An error occurred during verification. Please try again later.");
    }
  };

  return (
    <>
      <div
        className={`max-w-md mx-auto bg-white p-6 rounded-xl shadow-md text-center space-y-4 ${
          verificationSxs && "hidden"
        }`}
      >
        <h2 className="text-xl font-semibold text-gray-700">Verify OTP</h2>
        <p className="text-sm text-gray-500">
          Enter the 6-digit code sent to your email
        </p>

        <div className="space-y-6">
          <div className="flex justify-center space-x-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                className="w-12 h-12 text-center text-xl border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
            ))}
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <button
            onClick={(e) => handleSubmit(e)}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Verify
          </button>
        </div>
        <div className="flex items-center justify-center p-4 bg-yellow-100 rounded-md shadow-md text-yellow-800 font-semibold">
          OTP expires in <span className="ml-2 font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>
      <div className={!verificationSxs ? "hidden" : ""}>
        <OtpSuccessMessage />
      </div>
    </>
  );
};

export default React.memo(Otpverify);
