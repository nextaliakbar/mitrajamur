/** @format */

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useRouter } from "next/router";
import {
  registerUser,
} from "../../../features/auth/authSlice";
import { BiXCircle } from "react-icons/bi";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Harus diisi"),
  username: Yup.string().required("Harus diisi"),
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

export default function Register() {
  const [message, setMessage] = useState("");
  const Auth = useAppSelector((state) => state.user);
  console.log("Auth", Auth);

  const [errorAlert, setErrorAlert] = useState(false);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const handleSubmit = async (values: any) => {
    try {
      const resultAction = await dispatch(registerUser(values));
      if (registerUser.fulfilled.match(resultAction)) {
        if (resultAction.payload.error) {
          setMessage(resultAction.payload.error.message);
          setErrorAlert(true);
          console.log("resultAction.payload", resultAction.payload);
        } else {
          console.log("resultAction.payload", resultAction.payload);
          router.push("/dashboard");
        }
      }
    } catch (err) {
      console.error("Failed to login: ", err);
      router.push("/authentikasi");
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: handleSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {errorAlert ? (
        <div
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center justify-between my-2'
          role='alert'>
          <div className='text'>
            <strong className='font-bold mr-2'>Error</strong>
            <span className='block sm:inline'>{message}</span>
          </div>
          <span className=''>
            <BiXCircle
              className='font text-2xl'
              onClick={() => setErrorAlert(false)}
            />
          </span>
        </div>
      ) : null}
      <label className='label'>
        <span className='label-text'>Nama</span>
      </label>
      <input
        className='input input-md input-bordered w-full'
        id='name'
        name='name'
        type='text'
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.errors.name && formik.touched.name ? (
        <div className='text-red-500'>{formik.errors.name}</div>
      ) : null}

      <label className='label'>
        <span className='label-text'>Username</span>
      </label>
      <input
        className='input input-md input-bordered w-full'
        id='username'
        name='username'
        type='text'
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      {formik.errors.username && formik.touched.username ? (
        <div className='text-red-500'>{formik.errors.username}</div>
      ) : null}

      <label className='label'>
        <span className='label-text'>Nomor Telepon</span>
      </label>
      <input
        className='input input-md input-bordered w-full'
        id='phone'
        name='phone'
        type='text'
        onChange={formik.handleChange}
        value={formik.values.phone}
      />
      {formik.errors.phone && formik.touched.phone ? (
        <div className='text-red-500'>{formik.errors.phone}</div>
      ) : null}

      <label className='label'>
        <span className='label-text'>Email</span>
      </label>
      <input
        className='input input-md input-bordered w-full'
        id='email'
        name='email'
        type='email'
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email && formik.touched.email ? (
        <div className='text-red-500'>{formik.errors.email}</div>
      ) : null}

      <label className='label'>
        <span className='label-text'>Password</span>
      </label>
      <input
        className='input input-md input-bordered w-full'
        id='password'
        name='password'
        type='password'
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.errors.password && formik.touched.password ? (
        <div className='text-red-500'>{formik.errors.password}</div>
      ) : null}

      <label className='label'>
        <span className='label-text'>Konfirmasi Password</span>
      </label>
      <input
        className='input input-md input-bordered w-full'
        id='password_confirmation'
        name='password_confirmation'
        type='password'
        onChange={formik.handleChange}
        value={formik.values.password_confirmation}
      />
      {formik.errors.password_confirmation &&
      formik.touched.password_confirmation ? (
        <div className='text-red-500'>
          {formik.errors.password_confirmation}
        </div>
      ) : null}

      <div className='grid mt-4'>
        <button className='btn btn-md' type='submit'>
          Daftar Sekarang
        </button>
      </div>
    </form>
  );
}
