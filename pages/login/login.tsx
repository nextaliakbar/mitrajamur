/** @format */

import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/dist/client/router";
import { BiX, BiXCircle } from "react-icons/bi";
import { loginUser, setOnLogin } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../app/hooks";
import { fetchUser } from "../../features/auth/userSlice";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Isi email dengan benar").required("Harus diisi"),
  password: Yup.string().required("Harus diisi"),
});

export default function Login() {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setOnLogin(""));
  };
  const [errorAlert, setErrorAlert] = useState(false);

  const router = useRouter();
  const handleSubmit = async (values: any) => {
    try {
      const resultAction = await dispatch(loginUser(values));
      if (loginUser.fulfilled.match(resultAction)) {
        if (resultAction.payload.error) {
          setErrorAlert(true);
          console.log("resultAction.payload", resultAction.payload);
        } else {
          console.log("resultAction.payload", resultAction.payload);
          router.push("/");
          dispatch(setOnLogin(""));
          dispatch(fetchUser());
        }
      }
    } catch (err) {
      console.error("Failed to login: ", err);
      router.push("/authentikasi");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div className='relative z-10'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
            <div className='bg-white p-3'>
              <div className='content'>
                <div className='m-9 textSmall regular black'>
                  <p className='text-2xl semiBold'>Hi, Wecome Back!👋</p>
                  <p className='text-gray-500 semiBold mb-16'>
                    Selamat datang di Mitra Jamur Indonesia.
                  </p>

                  <form onSubmit={formik.handleSubmit}>
                    {errorAlert ? (
                      <div
                        className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center justify-between my-2'
                        role='alert'>
                        <div className='text'>
                          <strong className='font-bold mr-2'>Error</strong>
                          <span className='block sm:inline'>
                            Email/Password salah
                          </span>
                        </div>
                        <span className=''>
                          <BiXCircle
                            className='font text-2xl'
                            onClick={() => setErrorAlert(false)}
                          />
                        </span>
                      </div>
                    ) : null}
                    <div className='space-y-3'>
                      <div className='space-y-2'>
                        <label className='primaryColor mb-2'>
                          Email
                        </label>
                        <input
                          className='input input-bordered h-10 input-md w-full'
                          id='email'
                          name='email'
                          type='email'
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          placeholder='Masukkan email / nomor hp'
                        />
                      </div>
                      {formik.errors.email && formik.touched.email ? (
                        <div className='BgDangerColor'>
                          {formik.errors.email}
                        </div>
                      ) : null}
                      <div className='space-y-2'>
                        <label className='primaryColor mb-2'>Password</label>
                        <input
                          className='input input-bordered h-10 input-md w-full'
                          id='password'
                          name='password'
                          type='password'
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          placeholder='Masukkan password anda'
                        />
                      </div>
                    </div>
                    {formik.errors.password && formik.touched.password ? (
                      <div className='BgDangerColor'>
                        {formik.errors.password}
                      </div>
                    ) : null}

                    <div className='flex justify-between items-center mt-4'>
                      <div className='flex items-center'>
                        <input
                          id='remember_me'
                          name='remember_me'
                          type='checkbox'
                          className='h-4 w-4 text-primaryColor focus:ring-primaryColor border-gray-300 rounded'
                        />
                        <label
                          htmlFor='remember_me'
                          className='ml-2 block semiBold text-black'>
                          Remember me
                        </label>
                      </div>
                      {/* <Link href='/lupa-password' className='semiBold text-black'>
                        Lupa Password?
                      </Link> */}
                    </div>

                    <div className='grid mt-4'>
                      <button
                        className='primary1 text-white semiBold py-3 rounded-xl'
                        type='submit'>
                        Login
                      </button>
                    </div>

                    <p className='mt-2 text-gray-500'>
                      Belum punya akun?{" "}
                      <button
                        className='primaryColor'
                        onClick={() => {
                          dispatch(setOnLogin("register"));
                        }}>
                        Daftar disini
                      </button>
                    </p>

                    <div className='flex justify-center'>
                      <Link
                        href={"/"}
                        className='primaryColor semiBold text-center mt-7'
                        onClick={() => {
                          dispatch(setOnLogin(""));
                        }}>
                        &lt;- Kembali ke beranda
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
