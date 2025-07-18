"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import Image from "next/image";
import { images } from "@/lib/image";

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-gray-200 font-inter">
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo & Company Info */}
        <div className="space-y-4 col-span-2 pt-5">
          <div className="flex items-center gap-2">
            <Image
              src={images.IMG_LOGO}
              alt="Logo"
              width={80}
              height={50}
              className="object-contain"
            />
            <span className="text-[30px] font-[600]">
              <span className="">ten</span>
              <span className="text-neutral-400">eleven</span>
            </span>
          </div>
          <p className="font-semibold">PT. Kreasi Media Asia ( Insignia )</p>
          <p className="text-sm text-[#7D7D9D] w-[90%]">
            Jl. Meruya Ilir Raya, Komp. Perum. Ruko Rich Palace Blok BB, No.
            36-40. RT. 008/ RW 007. Kel. Srengseng, Kec. Kebon Jeruk. Jakarta
            Barat
          </p>
          <p className="text-sm text-[#7D7D9D]">Phone: 021 – 50880227</p>
          <p className="text-sm text-[#7D7D9D]">Email: sales@insignia.co.id</p>
        </div>

        <div className="col-span-3 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {/* Our Service */}
          <div>
            <h4 className="font-semibold mb-4">Our Service</h4>
            <ul className="space-y-2 text-sm text-[#7D7D9D]">
              <li>
                <Link href="#">Data Integration</Link>
              </li>
              <li>
                <Link href="#">Artificial Intelligence</Link>
              </li>
              <li>
                <Link href="#">Cloud Acceleration</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="text-[16px]">
            <h4 className="font-semibold mb-4 ">Company</h4>
            <ul className="space-y-2 text-sm text-[#7D7D9D]">
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Study Cases</Link>
              </li>
              <li>
                <Link href="#">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-[#7D7D9D]">
              <li>
                <Link href="#">Privacy and Policy</Link>
              </li>
              <li>
                <Link href="#">Term and Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#7D7D9D]">
            Copyright © 2025 Insignia | All Rights Reserved
          </p>
          <div className="flex gap-4 text-[#7D7D9D]">
            <Link href="#">
              <FaFacebookF />
            </Link>
            <Link href="#">
              <FaTwitter />
            </Link>
            <Link href="#">
              <FaInstagram />
            </Link>
            <Link href="#">
              <FaLinkedinIn />
            </Link>
            <Link href="#">
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
