/** @format */

import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { BiBell, BiCart, BiSearch } from "react-icons/bi";
import { IoPersonCircle } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logoutUser, setOnLogin } from "../features/auth/authSlice";
import { fetchUser } from "../features/auth/userSlice";
import {
  fetchFilteredProducts,
  setFilterSearch,
} from "../features/product/ProductSlice";
import { fetchListCart } from "../features/cart/cartSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const listCart = useAppSelector((state) => state.cart.listCart);
  const filterInfo = useAppSelector((state) => state.product.filter);

  const handleSearchFilter = (e: any) => {
    dispatch(setFilterSearch(e.target.value));
  };

  const handleAactionSearch = () => {
    dispatch(
      fetchFilteredProducts({
        q: filterInfo.q,
        category: filterInfo.category,
        sort: filterInfo.sort,
      }),
    ).then(() => {
      router.push("/product");
    });
  };

  const userInfo = useAppSelector((state) => state.user.userData);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      dispatch(fetchUser());
      dispatch(setOnLogin("login"));
      router.push("/");
    });
  };

  useEffect(() => {
    dispatch(fetchListCart());
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <nav className="bg-transparant">
      <div className="flex flex-col items-center md:hidden">
        <Link href="/" className="my-4">
          <Image
            src="/images/logo-mobile.svg"
            alt="logo"
            width={140}
            height={100}
            className="cursor-pointer"
          />
        </Link>
        <div className="relative flex items-center min-w-full px-8 max-w-md md:w-auto">
          <Link href={"/dashboard"} className="pr-4">
            <AiOutlineArrowLeft className="w-6 h-6" />
          </Link>
          <div className=" relative w-full">
            <input
              type="text"
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              placeholder="Cari produk..."
              onChange={handleSearchFilter}
            />
            <button className="absolute right-0 bottom-0 top-0 py-1 px-3 text-white primary1 border-r border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <BiSearch className="w-6 h-6" />
            </button>
          </div>
          <Link
            href="/cart"
            className="flex items-center justify-center rounded-md shadow-sm hover:bg-gray-100 pl-4"
          >
            <div className="indicator">
              <BiCart className="w-6 h-6 text1" />
              {listCart?.length === 0 ? (
                ""
              ) : (
                <span className="indicator-item notifAlert">
                  {listCart?.length}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
      <div className="justify-between px-16 mx-auto lg:max-w-6xl md:items-center hidden md:flex md:px-8dden">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={100}
                height={100}
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>
        <div>
          <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            <div className="relative flex items-center w-full max-w-md space-x-3 md:w-auto">
              <div className="form-control">
                <div className="search relative w-full mt-3 md:mt-0">
                  <input
                    type="text"
                    className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Cari produk..."
                    onChange={handleSearchFilter}
                  />
                  <button
                    className="absolute right-0 bottom-0 top-0 py-1 px-3 primary1 text-white border-r border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleAactionSearch}
                  >
                    <BiSearch className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-5">
              {/* <Link
                href='/notifications'
                className='flex items-center justify-center text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-100'>
                <div className='indicator'>
                  <BiBell className='w-7 h-7' />
                  <span className='indicator-item notifAlert'>8</span>
                </div>
              </Link> */}
              <Link
                href="/cart"
                className="flex items-center justify-center text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-100"
              >
                <div className="indicator">
                  <BiCart className="w-7 h-7" />
                  {listCart?.length === 0 ? (
                    ""
                  ) : (
                    <span className="indicator-item notifAlert">
                      {listCart?.length}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {userInfo?.avatar !== undefined && userInfo?.avatar !== null ? (
              <div className="flex items-center space-x-3 dropdown dropdown-bottom dropdown-end">
                <div className="avatar cursor-pointer">
                  <div className="w-8 rounded-full relative" tabIndex={0}>
                    <Image
                      src={userInfo?.avatar}
                      alt="user"
                      fill
                      objectFit="cover"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content text-sm menu shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <p className="font-semibold text-xl">
                      {userInfo?.username}
                    </p>
                  </li>
                  <li>
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li onClick={handleLogout}>
                    <a className="text-red-500 font-semibold">Log Out</a>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                className="primary1 px-4 py-2 rounded-md text-white font-semibold cursor-pointer"
                onClick={() => {
                  dispatch(setOnLogin("login"));
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
