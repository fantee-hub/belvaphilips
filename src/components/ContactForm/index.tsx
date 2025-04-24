"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { contactUs } from "@/lib/api";

export default function ContactForm() {
  const [formState, setFormState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await contactUs(formState);
      if (data) {
        console.log(data);
        setIsSubmitted(true);
        setIsSubmitting(false);
        setFormState({
          firstname: "",
          lastname: "",
          email: "",
          message: "",
        });
      }
    } catch (e) {
      console.log(e);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {!isSubmitted ? (
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formState.firstname}
                onChange={handleChange}
                required
                className="w-full px-4 h-[47px] rounded-full bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-[#585858]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formState.lastname}
                onChange={handleChange}
                required
                className="w-full px-5 h-[47px] rounded-full bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-[#585858]"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full px-5 h-[47px] rounded-full bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-[#585858]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <textarea
              name="message"
              placeholder="Enter your message"
              value={formState.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-5 py-4 rounded-[16px] bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none placeholder:text-[#585858]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1D1D1B] text-white h-[38px] rounded-full transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 uppercase font-semibold text-xs cursor-pointer"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </motion.div>
        </motion.form>
      ) : (
        <motion.div
          className="flex flex-col justify-center space-x-3 max-w-[594px] h-[71px] px-4 border-[0.5px] border-[#C9C9C9] rounded-[16px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0.25C8.07163 0.25 6.18657 0.821828 4.58319 1.89317C2.97981 2.96451 1.73013 4.48726 0.992175 6.26884C0.254221 8.05042 0.0611382 10.0108 0.437344 11.9021C0.81355 13.7934 1.74215 15.5307 3.10571 16.8943C4.46927 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.7473 7.41498 18.7192 4.93661 16.8913 3.10872C15.0634 1.28084 12.585 0.25273 10 0.25ZM14.2806 8.28063L9.03063 13.5306C8.96097 13.6004 8.87825 13.6557 8.78721 13.6934C8.69616 13.7312 8.59856 13.7506 8.5 13.7506C8.40144 13.7506 8.30384 13.7312 8.2128 13.6934C8.12175 13.6557 8.03903 13.6004 7.96938 13.5306L5.71938 11.2806C5.57864 11.1399 5.49958 10.949 5.49958 10.75C5.49958 10.551 5.57864 10.3601 5.71938 10.2194C5.86011 10.0786 6.05098 9.99958 6.25 9.99958C6.44902 9.99958 6.6399 10.0786 6.78063 10.2194L8.5 11.9397L13.2194 7.21937C13.2891 7.14969 13.3718 7.09442 13.4628 7.0567C13.5539 7.01899 13.6515 6.99958 13.75 6.99958C13.8485 6.99958 13.9461 7.01899 14.0372 7.0567C14.1282 7.09442 14.2109 7.14969 14.2806 7.21937C14.3503 7.28906 14.4056 7.37178 14.4433 7.46283C14.481 7.55387 14.5004 7.65145 14.5004 7.75C14.5004 7.84855 14.481 7.94613 14.4433 8.03717C14.4056 8.12822 14.3503 8.21094 14.2806 8.28063Z"
                fill="black"
              />
            </svg>

            <p className="text-[#444444]  -mt-1">
              Thank you! Your message has been received. Our team will be in
              touch with you soon.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
