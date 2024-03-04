import Link from "next/link";
import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaDiscord } from "react-icons/fa6";
import { SocialMediaLink } from "./IFooter";

const socialMediaLinks: SocialMediaLink[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/tulias/",
    icon: <FaLinkedin className="text-lg hover:text-gray-400 transition-all" />,
  },
  {
    name: "Twitter",
    url: "https://www.linkedin.com/company/tulias/",
    icon: <FaXTwitter className="text-lg hover:text-gray-400 transition-all" />,
  },
  {
    name: "Discord",
    url: "https://www.linkedin.com/company/tulias/",
    icon: <FaDiscord className="text-lg hover:text-gray-400 transition-all" />,
  },
];

const Footer = () => {
  return (
    <footer className="w-full border-0 border-y text-white py-4 px-8 text-xs">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {socialMediaLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              {link.icon}
            </Link>
          ))}
        </div>
        <div>
          <p className="text-xs">© 2024 Tulia</p>
        </div>
        <div>
          <Link href="/faq" className="hover:text-gray-500 transition-all">
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
