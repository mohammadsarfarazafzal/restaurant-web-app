import React, { useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId="service_cpgwqyv";
    const templateId="template_1pjsp6k"
    const publicKey="gDwnWrJLSikRm1gjb"

    const templateParams={
          from_name: formData.name,
          from_email: formData.email,
          mobile: formData.mobile,
          message: formData.message,
    };

    emailjs
      .send(serviceId,templateId,templateParams,publicKey)
      .then(
        (result) => {
          console.log(result.text);
          setStatus("Message sent successfully");
          setFormData({ name: "", email: "", mobile: "", message: "" });
        })
        .catch((error) => {
          console.error(error.text);
          setStatus("Failed to send message. Please try again.");
        });
    setFormData({
      name: "",
      email: "",
      mobile: "",
      message: "",
    });
  };
  return (
    <div className="bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
        Contact Us
      </h2>
      <form
        className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-2 border p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-2 border p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold">
            Mobile
          </label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full mt-2 border p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            type="text"
            value={formData.message}
            onChange={handleChange}
            className="w-full mt-2 border p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition
            "
        >
          Send Message
        </button>
        {status && (
          <p className="mt-4 text-center text-lg text-green-500">{status}</p>
        )}
      </form>
    </div>
  );
}

export default Contact;
