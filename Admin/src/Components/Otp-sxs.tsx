import { CheckCircleIcon } from '@heroicons/react/24/solid'; // if you use Heroicons (optional)
import { motion } from "framer-motion"; // optional for animation

const OtpSuccessMessage = () => {
  return (
    <motion.div 
      className="flex items-center justify-center p-6 bg-green-100 rounded-lg shadow-md text-green-800 space-x-3"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <CheckCircleIcon className="h-8 w-8 text-green-500" />
      <div className="text-lg font-semibold">
        OTP Verified Successfully!
      </div>
    </motion.div>
  );
};

export default OtpSuccessMessage;
