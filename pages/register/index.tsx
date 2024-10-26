/** @format */
import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/dist/client/router";
import { useAppDispatch } from "../../app/hooks";
import { registerUser } from "../../features/auth/authSlice";
import { Toaster } from "react-hot-toast";
import { fetchUser } from "../../features/auth/userSlice";

const LoginSchema = Yup.object().shape({
  name:Yup.string().required("Silahkan masukkan nama lengkap"),
  email: Yup.string().email("Isi email dengan benar").required("Harus diisi"),
  phone: Yup.string()
    .required("Harus diisi")
    .matches(/^[0-9]+$/, "Harus diisi dengan angka"),
  password: Yup.string()
    .required("Harus diisi")
    .min(8, "Password minimal 8 karakter"),
  password_confirmation: Yup.string()
    .required("Harus diisi")
    .oneOf([Yup.ref("password"), null as any], "Passwords harus sama"),
});
export default function index() {
  const [errorAlert, setErrorAlert] = useState(false);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const handleSubmit = async (values: any) => {
    console.log(values);
    
    try {
      const resultAction = await dispatch(registerUser(values));
      if (registerUser.fulfilled.match(resultAction)) {
        if (resultAction.payload.error) {
          setErrorAlert(true);
          console.log("resultAction.payload", resultAction.payload);
        } else {
          console.log("resultAction.payload", resultAction.payload);
          dispatch(fetchUser());
          router.push("/");
        }
      }
    } catch (err) {
      console.error("Failed to login: ", err);
      router.push("/login");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: LoginSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div className='mx-8 mt-6 textSmall regular black'>
      <Toaster position='bottom-center' reverseOrder={false} />
      <p className='text-2xl semiBold'>Buat akun baru</p>
      <p className='text-gray-500 semiBold mb-16'>
        Registrasi akun agar terhubung dengan kami.
      </p>

      <form onSubmit={formik.handleSubmit}>
        <div className='space-y-3'>
          <div className='space-y-2'>
            <label className='primaryColor mb-2'>Nama</label>
            <input
                className='input input-bordered h-10 input-md w-full'
                id='name'
                name='name'
                type='name'
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder='Masukkan nama lengkap'
            />
          </div>
          {formik.errors.name && formik.touched.email ? (
              <div className='BgDangerColor'>{formik.errors.name}</div>
          ) : null}

          <div className='space-y-2'>
            <label className='primaryColor mb-2'>Email</label>
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
            <div className='BgDangerColor'>{formik.errors.email}</div>
          ) : null}

          <div className='space-y-2'>
            <label className='primaryColor mb-2'>Nomor HP</label>
            <input
              className='input input-bordered h-10 input-md w-full'
              id='phone'
              name='phone'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.phone}
              placeholder='Masukkan nomor hp anda'
            />
          </div>
          {formik.errors.phone && formik.touched.phone ? (
            <div className='BgDangerColor'>{formik.errors.phone}</div>
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
          {formik.errors.password && formik.touched.password ? (
            <div className='BgDangerColor'>{formik.errors.password}</div>
          ) : null}
          <div className='space-y-2'>
            <label className='primaryColor mb-2'>Konfirmasi Password</label>
            <input
              className='input input-bordered h-10 input-md w-full'
              id='password_confirmation'
              name='password_confirmation'
              type='password'
              onChange={formik.handleChange}
              value={formik.values.password_confirmation}
              placeholder='Masukkan password anda'
            />
          </div>
          {formik.errors.password_confirmation &&
          formik.touched.password_confirmation ? (
            <div className='BgDangerColor'>
              {formik.errors.password_confirmation}
            </div>
          ) : null}
        </div>

        <div className='grid mt-5'>
          <button
            className='primary1 text-white semiBold py-3 rounded-xl'
            type='submit'>
            Sign Up
          </button>
        </div>

        <p className='mt-2 text-gray-500'>
          Sudah punya akun?{" "}
          <Link href='/login' className='primaryColor'>
            Masuk sekarang
          </Link>
        </p>
      </form>
    </div>
  );
}
