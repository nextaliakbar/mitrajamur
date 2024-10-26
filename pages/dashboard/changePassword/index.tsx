/** @format */

import React from "react";
import { useFormik } from "formik";
import {changePassword} from "../../../features/profile/ProfileSlice";
import * as Yup from "yup";
import {useAppDispatch} from "../../../app/hooks";
const changePasswordSchema = Yup.object().shape({
  current_password: Yup.string().required("Harus diisi"),
  new_password: Yup.string().required("Harus diisi"),
  confirm_password: Yup.string()
  .required("Harus diisi")
  .oneOf([Yup.ref("new_password"), null as any], "Passwords harus sama"),
});

export default function index() {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(changePassword(values));
      }
  });
  return (
    <div className='col-span-3'>
      <div className='changePassword rounded-xl border border-gray-300 p-7 space-y-7'>
        <p className='header py-2 rounded-md bg-blue-300 text1 font-semibold text-center'>
          Jaga Akun Anda Tetap Aman!
        </p>

        <div className='desc'>
          <p className='font-bold text1 mb-1'>Ubah Password</p>
          <p className=''>
            Mengubah password secara teratur membantu menjaga keamanan akun Anda
            dari akses orang yang tidak bertanggung jawab
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2 flex flex-col space-y-1'>
              <label htmlFor='current_password' className='text1 font-semibold'>
                Password Lama
              </label>
              <input
                type='password'
                className='input h-10 border4 rounded-md'
                id="current_password"
                name='current_password'
                onChange={formik.handleChange}
                value={formik.values.current_password}
              />
              {formik.errors.current_password && formik.touched.current_password ? (
                <div className='text-red-500'>{formik.errors.current_password}</div>
              ) : null}
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor='new_password' className='text1 font-semibold'>
                Password Baru
              </label>
              <input
                type='password'
                className='input h-10 border4'
                id="new_password"
                name='new_password'
                onChange={formik.handleChange}
                value={formik.values.new_password}
              />
              {formik.errors.new_password && formik.touched.new_password ? (
                <div className='text-red-500'>{formik.errors.new_password}</div>
              ) : null}
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor='confirm_password' className='text1 font-semibold'>
                Konfirmasi Password
              </label>
              <input
                type='password'
                className='input h-10 border4'
                id="confirm_password"
                name='confirm_password'
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
              />
              {formik.errors.confirm_password &&
              formik.touched.confirm_password ? (
                <div className='text-red-500'>
                  {formik.errors.confirm_password}
                </div>
              ) : null}
            </div>
          </div>
          <div className='grid mt-4'>
            <button className='primary1 rounded-md py-2 font-semibold text-white' type='submit'>
              Ubah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
