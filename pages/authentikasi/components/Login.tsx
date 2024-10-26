/** @format */

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../../features/auth/authSlice";
import { useAppDispatch } from "../../../app/hooks";
import { useRouter } from "next/dist/client/router";
import { BiXCircle } from "react-icons/bi";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Isi email dengan benar").required("Harus diisi"),
  password: Yup.string().required("Harus diisi"),
});

export default function Login() {
  const [errorAlert, setErrorAlert] = useState(false);
  const dispatch = useAppDispatch();

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
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
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
            <span className='block sm:inline'>Email/Password salah</span>
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
        <span className='label-text'>Email</span>
      </label>
      <input
        className='input input-bordered input-md w-full'
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
        className='input input-bordered input-md w-full'
        id='password'
        name='password'
        type='password'
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.errors.password && formik.touched.password ? (
        <div className='text-red-500'>{formik.errors.password}</div>
      ) : null}

      <div className='grid mt-4'>
        <button className='btn btn-md' type='submit'>
          Masuk
        </button>
      </div>
    </form>
  );
}
