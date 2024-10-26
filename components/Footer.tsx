/** @format */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setPrivaccyPolicy } from "../features/layout/LayoutSlice";

export default function Footer() {
  const dispatch = useDispatch();
  return (
    <footer className="footer mt-12 text1 mb-12 md:mb-0 TextXSmall md:TextSmall regula">
      <div className="mx-auto lg:max-w-6xl px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start justify-start">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={200}
                height={100}
                className="cursor-pointer"
              />
            </Link>
            <p className="TextXSmall md:TextSmall regular">
              PT Mitra Jamur Indonesia adalah perusahaan yang bergerak dibidang
              agribisnis pengembangan budidaya jamur tiam dari hulu hingga ke
              hiliir.
            </p>
            <div className="flex mt-4 space-x-4">
              <a
                  href="https://www.facebook.com/mitrajamur.jember.3?_rdr"
                  target="_blank"
                  rel="noreferrer"
              >
                <IoLogoFacebook className="w-6 h-6"/>
              </a>
              <a
                  href="https://api.whatsapp.com/send/?phone=6281252529100&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noreferrer"
              >
                <IoLogoWhatsapp className="w-6 h-6"/>
              </a>
              <a
                  href="https://www.instagram.com/mitrajamurindonesia/"
                  target="_blank"
                  rel="noreferrer"
              >
                <IoLogoInstagram className="w-6 h-6"/>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start">
            <h5 className="TextSmall md:TextMedium semiBold">
              Navigasi Untuk Anda
            </h5>
            <div className="mt-4 flex flex-col items-start">
              <Link href="/" className="TextXSmall md:TextSmall regular">
                Beranda
              </Link>
              <Link href="/product" className="TextXSmall md:TextSmall regular">
                List Produk
              </Link>
              <Link
                  href="#order-way"
                  className="TextXSmall md:TextSmall regular"
              >
                Cara Pemesanan
              </Link>
              <Link href="#faq" className="TextXSmall md:TextSmall regular">
                Frequntly Asked Question
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h5 className="TextSmall md:TextMedium semiBold ">
              Bantuan dan Panduan
            </h5>
            <div className="mt-4 flex flex-col items-start">
              <Link
                href="/privacy-policy"
                className="TextXSmall md:TextSmall regular"
                onClick={() => {
                  dispatch(setPrivaccyPolicy("terms-condition"));
                }}
              >
                Syarat dan Ketentuan
              </Link>
              <Link
                href="/privacy-policy"
                className="TextXSmall md:TextSmall regular"
                onClick={() => {
                  dispatch(setPrivaccyPolicy("privacy-policy"));
                }}
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="/privacy-policy"
                className="TextXSmall md:TextSmall regular"
                onClick={() => {
                  dispatch(setPrivaccyPolicy("contacts-suggestions"));
                }}
              >
                Kontak dan Saran
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h5 className="TextSmall md:TextMedium semiBold">
              Metode Pembayaran
            </h5>
            <div className="payment my-4">
              <Image
                src="/images/paymentMethod.png"
                alt="payment-method"
                height={64}
                width={300}
              />
            </div>
            <h5 className="TextSmall md:TextMedium semiBold">
              Jasa Pengiriman
            </h5>
            <div className="shipment my-4">
              <Image
                src="/images/shipment.png"
                alt="shipping-method"
                height={20}
                width={300}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full my-2">
          <div className="text1Bg h-0.5 rounded-md"></div>
        </div>
        <div>
          <div className="flex justify-between flex-col md:flex-row">
            <div className="flex TextXSmall md:TextSmall regular">
              <span className="text2">&copy;&nbsp;</span> 2023 &nbsp;
              <span className="text2">Made with&nbsp;</span>
              <AiFillHeart className="text-red-700 text-xl mx-1" />
              <span className="text2">by&nbsp;</span>{" "}
              <Link href="https://gstechnology.id/">
                <span className="semiBold"> PKM Mitra Jamur 2023</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
