/** @format */

import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";

export default function index() {
  const [auth, setAuth] = React.useState("login");
  console.log("auth", auth);

  const router = useRouter();

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("user");
    if (token) {
      router.push("/");
    }
  }

  return (
    <div className='relative flex flex-col items-center justify-center'>
      <div className='absolute h-full w-full -z-10'>
        <Image
          src='/images/auth.jpg'
          alt='auth'
          layout='fill'
          objectFit='contain'
          objectPosition='center'
        />
      </div>
      <div className='logo relative overflow-hidden h-64 w-64'>
        <Image
          src='/images/logo.svg'
          alt='logo'
          layout='fill'
          objectFit='contain'
          objectPosition='center'
        />
      </div>
      <div className='form shadow-xl bg-white p-8 w-fit rounded-md mb-20'>
        <div className='header grid grid-cols-2'>
          {auth === "login" ? (
            <h5 className='text-2xl font-semibold'>Masuk</h5>
          ) : (
            <h5 className='text-2xl font-semibold'>Daftar</h5>
          )}
          <div className='tabs'>
            <a
              className={
                auth === "login"
                  ? "tab tab-lifted tab-active"
                  : "tab tab-lifted"
              }
              onClick={() => setAuth("login")}>
              <span className='font-semibold'>Masuk</span>
            </a>
            <a
              className={
                auth === "register"
                  ? "tab tab-lifted tab-active"
                  : "tab tab-lifted"
              }
              onClick={() => setAuth("register")}>
              <span className='font-semibold'>Daftar Akun</span>
            </a>
          </div>
        </div>
        {auth === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
}
