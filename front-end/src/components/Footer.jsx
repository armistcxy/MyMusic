import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mt-2 bg-neutral-900 tertiary_bg px-6 py-6">
      <div className="grid grid-cols-12 ">
        <div className="col-span-3 text-sm">
          <ul>
            <li className="font-bold mb-4 text-white">Company</li>
            <li className="text-gray-400 my-2 hover:text-white hover:underline cursor-pointer">About</li>
            <li className="text-gray-400 my-2 hover:text-white hover:underline cursor-pointer">Jobs</li>
            <li className="text-gray-400 my-2 hover:text-white hover:underline cursor-pointer">For the Record</li>
          </ul>
        </div>
        <div className="col-span-3 text-sm">
          <ul>
            <li className="font-bold text-white">Communities</li>
            <li className="text-gray-400 my-2 hover:text-white hover:underline cursor-pointer">For Artists</li>
            <li className="text-gray-400 my-2 hover:text-white hover:underline cursor-pointer">Developers</li>
            <li className="text-gray-400 my-2 hover:text-white hover:underline cursor-pointer">Advertising</li>
            <li className="text-gray-400 my-2 hover:text-white hover:underline cursor-pointer">Investors</li>
            <li className="text-gray-400 my-2 hover:text-white hover:underline cursor-pointer">Vendors</li>
          </ul>
        </div>
        <div className="col-span-3 text-sm">
          <ul>
            <li className="font-bold text-white">Useful links</li>
            <li className="text-gray-400 my-2 hover:text-white hover:underline cursor-pointer">Support</li>
            <li className="text-gray-400 my-2 hover:text-white hover:underline cursor-pointer">Free Mobile App</li>
          </ul>
        </div>
        <div className="col-span-3">
          <div className="flex justify-end gap-2">
            <FaFacebook className="text-4xl p-2 rounded-full bg-[#292929] shadow-2xl hover:bg-white/10 text-white" />
            <FaInstagram className="text-4xl p-2 rounded-fulgl bg-[#292929] shadow-2xl hover:bg-white/10 text-white" />
            <FaTwitter className="text-4xl p-2 rounded-full bg-[#292929] shadow-2xl hover:bg-white/10 text-white" />
          </div>
        </div>
      </div>
      <div className="border-b border-white/10 my-8 w-full"></div>
      <div className="flex justify-between">
        <ul className="text-sm flex gap-4">
          <li className="text-gray-400">Legal</li>
          <li className="text-gray-400">Privacy Center</li>
          <li className="text-gray-400">Privacy Policy</li>
          <li className="text-gray-400">Cookies</li>
          <li className="text-gray-400">About Ads</li>
          <li className="text-gray-400">Accessibility</li>
        </ul>
        <h4 className="text-gray-400 text-sm">© 2024 Flotify</h4>
      </div>
    </div>
  );
};

export default Footer;
