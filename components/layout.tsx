/** @format */

import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import BottomNav from "./BottomNav";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSidebar } from "../features/auth/authSlice";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import ReactGA from "react-ga";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onLogin = useAppSelector((state) => state.auth.onLogin);

  if (router.pathname !== "/dashboard") {
    dispatch(setSidebar("transactionList"));
  }

  useEffect(() => {
    if (
      process.env.googleAnalyticsID &&
      process.env.NODE_ENV === "production"
    ) {
      // Checks for GA ID and only turns on GA in production
      ReactGA.initialize(process.env.googleAnalyticsID);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  });

  return (
    <div>
      <Head>
        <title>Mitra Jamur</title>
        <meta name='description' content='Jualan PT Mitra Jamur' />
        <link rel='icon' href='/images/logo.jpg' />
        <script
          type='text/javascript'
          src='https://app.sandbox.midtrans.com/snap/snap.js'
          data-client-key='SET_YOUR_CLIENT_KEY_HERE'></script>
      </Head>
      <Navbar />
      {onLogin === "login" ? (
        <Login />
      ) : onLogin === "register" ? (
        <Register />
      ) : null}
      <Toaster position='bottom-center' reverseOrder={true} />
      <main>{children}</main>
      <Footer />
      <BottomNav />
    </div>
  );
}
