// import React, { useState } from "react";
// import emailjs from "@emailjs/browser";

// function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     message: "",
//   });
//   const [status, setStatus] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const serviceId="service_cpgwqyv";
//     const templateId="template_1pjsp6k"
//     const publicKey="gDwnWrJLSikRm1gjb"

//     const templateParams={
//           from_name: formData.name,
//           from_email: formData.email,
//           mobile: formData.mobile,
//           message: formData.message,
//     };

//     emailjs
//       .send(serviceId,templateId,templateParams,publicKey)
//       .then(
//         (result) => {
//           console.log(result.text);
//           setStatus("Message sent successfully");
//           setFormData({ name: "", email: "", mobile: "", message: "" });
//         })
//         .catch((error) => {
//           console.error(error.text);
//           setStatus("Failed to send message. Please try again.");
//         });
//     setFormData({
//       name: "",
//       email: "",
//       mobile: "",
//       message: "",
//     });
//   };
//   return (
//     <div className="bg-gray-100 p-8">
//       <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
//         Contact Us
//       </h2>
//       <form
//         className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6"
//         onSubmit={handleSubmit}
//       >
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-gray-700 font-semibold">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full mt-2 border p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-gray-700 font-semibold">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full mt-2 border p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-gray-700 font-semibold">
//             Mobile
//           </label>
//           <input
//             type="number"
//             id="mobile"
//             name="mobile"
//             value={formData.mobile}
//             onChange={handleChange}
//             className="w-full mt-2 border p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-gray-700 font-semibold">
//             Message
//           </label>
//           <textarea
//             id="message"
//             name="message"
//             type="text"
//             value={formData.message}
//             onChange={handleChange}
//             className="w-full mt-2 border p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
//           ></textarea>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition
//             "
//         >
//           Send Message
//         </button>
//         {status && (
//           <p className="mt-4 text-center text-lg text-green-500">{status}</p>
//         )}
//       </form>
//     </div>
//   );
// }

// export default Contact;

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FiUser, FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = "service_cpgwqyv";
    const templateId = "template_1pjsp6k";
    const publicKey = "gDwnWrJLSikRm1gjb";

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      mobile: formData.mobile,
      message: formData.message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((result) => {
        console.log(result.text);
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error(error.text);
        toast.error("Failed to send message. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Get In Touch
          </h2>
          <p className="text-gray-600">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
        >
          <div className="p-6 sm:p-8">
            {/* Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <FiUser className="mr-2 text-orange-500" />
                  Full Name
                </div>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <FiMail className="mr-2 text-orange-500" />
                  Email Address
                </div>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                placeholder="your@email.com"
              />
            </div>

            {/* Mobile Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <FiPhone className="mr-2 text-orange-500" />
                  Phone Number
                </div>
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                placeholder="+1 (123) 456-7890"
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
              />
            </div>

            {/* Message Field */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <FiMessageSquare className="mr-2 text-orange-500" />
                  Your Message
                </div>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                minLength={10}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition duration-300 ${
                isSubmitting
                  ? "bg-orange-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 transform hover:-translate-y-1"
              } shadow-md`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default Contact;