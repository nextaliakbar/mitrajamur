/** @format */

import React from "react";
import Link from "next/link";
import { BiHome, BiBell, BiCart, BiStore, BiUser } from "react-icons/bi";
import { useRouter } from "next/router";

export default function BottomNav() {
  const router = useRouter();

  return (
    <div className="btm-nav btm-nav-lg md:hidden z-20">
      <Link href="/" className={router.pathname === "/" ? "active" : ""}>
        <BiHome className="h-6 w-6" />
      </Link>
      <Link
        href="/cart"
        className={router.pathname === "/cart" ? "active" : ""}
      >
        <BiCart className="h-6 w-6" />
      </Link>
      <Link
        href="/product"
        className={router.pathname === "/product" ? "active" : ""}
      >
        <BiStore className="h-6 w-6" />
      </Link>
      {/* <Link
        href='/notifications'
        className={router.pathname === "/notifications" ? "active" : ""}>
        <BiBell className='h-6 w-6' />
      </Link> */}
      <Link
        href="/dashboard"
        className={router.pathname === "/dashboard" ? "active" : ""}
      >
        <BiUser className="h-6 w-6" />
      </Link>
    </div>
  );
}
