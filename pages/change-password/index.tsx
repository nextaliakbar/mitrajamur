/** @format */

import Link from "next/link";
import PrivateRoute from "../../components/PrivateRoute";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../app/hooks";
import { Toaster } from "react-hot-toast";
import { changePassword } from "../../features/profile/ProfileSlice";

const changePasswordSchema = Yup.object().shape({
  current_password: Yup.string().required("Harus diisi"),
  new_password: Yup.string().required("Harus diisi"),
  confirm_password: Yup.string()
    .required("Harus diisi")
    .oneOf([Yup.ref("new_password"), null as any], "Password harus sama"),
});

interface ChangePassword {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export default function index() {
  const dispatch = useAppDispatch();

  const initialValues: ChangePassword = {
    current_password: "",
    new_password: "",
    confirm_password: "",
  };

  return (
    <PrivateRoute>
      <Toaster position='bottom-center' reverseOrder={false} />
      <div className='black TextXSmall regular black'>
        <Link
          href={"/dashboard"}
          className='topBar fixed z-50 border-b-2 bg-white top-0 right-0 left-0 flex space-x-3.5 py-4 px-8'>
          <AiOutlineArrowLeft className='w-6 h-6' />
          <p className='TextMedium semiBold'>Ubah Password</p>
        </Link>

        <div className='items mx-8 mt-20 space-y-4'>
          <div className='header'>
            <p className='BgInfoBg py-2 semiBold text-white text-center rounded-md mb-2'>
              Jaga Akun Anda Tetap Aman!
            </p>
            <p className='light'>
              Mengubah password secara teratur membantu menjaga keamanan akun
              Anda dari akses orang yang tidak bertanggung jawab
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={changePasswordSchema}
            onSubmit={(values, actions) => {
              // alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
              dispatch(changePassword(values));
            }}>
            {({ errors, touched, isValidating, isSubmitting }) => (
              <Form>
                <div className='space-y-4'>
                  <div className='flex flex-col space-y-2'>
                    <label htmlFor='current_password' className='semiBold'>
                      Password Lama
                    </label>
                    <Field
                      type='password'
                      className='input h-10 border4 rounded-md'
                      id='current_password'
                      name='current_password'
                    />
                    {errors.current_password && touched.current_password ? (
                      <div className='BgDangerColor'>
                        {errors.current_password}
                      </div>
                    ) : null}
                  </div>
                  <div className='flex flex-col space-y-2'>
                    <label htmlFor='newPassword' className='semiBold'>
                      Password Baru
                    </label>
                    <Field
                      type='password'
                      className='input h-10 border4'
                      id='new_password'
                      name='new_password'
                    />
                    {errors.new_password && touched.new_password ? (
                      <div className='BgDangerColor'>{errors.new_password}</div>
                    ) : null}
                  </div>
                  <div className='flex flex-col space-y-2'>
                    <label htmlFor='confirm_password' className='semiBold'>
                      Konfirmasi Password
                    </label>
                    <Field
                      type='password'
                      className='input h-10 border4'
                      id='confirm_password'
                      name='confirm_password'
                    />
                    {errors.confirm_password && touched.confirm_password ? (
                      <div className='BgDangerColor'>
                        {errors.confirm_password}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='grid mt-4'>
                  <button
                    className='primary1 rounded-md py-2 TextSmall semiBold text-white'
                    type='submit'>
                    Simpan
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </PrivateRoute>
  );
}
