/** @format */

import { AiOutlineArrowLeft } from "react-icons/ai";
import PrivateRoute from "../../../components/PrivateRoute";
import Link from "next/link";
import Image from "next/image";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  checkUsername,
  fetchProfile,
  updateProfile,
} from "../../../features/profile/ProfileSlice";
import { Toaster } from "react-hot-toast";

const UpdateProfileSchema = Yup.object().shape({
  username: Yup.string().required("Harus diisi"),
  name: Yup.string().required("Harus diisi"),
  birthdate: Yup.string().required("Harus diisi"),
  sex: Yup.string().required("Harus diisi"),
  phone: Yup.string().required("Harus diisi"),
  email: Yup.string().email("Isi email dengan benar").required("Harus diisi"),
});

interface MyFormValues {
  username: string;
  name: string;
  birthdate: string;
  sex: string;
  phone: string;
  email: string;
}

export default function Edit() {
  console.log("Hello World")
  const dispatch = useAppDispatch();
  const ProfileData = useAppSelector((state) => state.profile.profileData);
  // console.log("ProfileData", ProfileData);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  // console.log("sex", sex);

  const initialValues: MyFormValues = {
    username: ProfileData?.username,
    name: ProfileData?.name,
    birthdate: ProfileData?.birthdate,
    sex: ProfileData?.sex,
    email: ProfileData?.email,
    phone: ProfileData?.phone,
  };

  if (!initialValues.email) {
    dispatch(fetchProfile()).then((res) => {
      initialValues.username = res?.payload?.username || "";
      initialValues.name = res?.payload?.name || "";
      initialValues.birthdate = res?.payload?.birthdate || "";
      initialValues.sex = res?.payload?.sex || "";
      initialValues.email = res?.payload?.email || "";
      initialValues.phone = res?.payload?.phone || "";
    });
  }
  const [sex, setSex] = useState(initialValues?.sex || "Laki - laki");

  return (
      <PrivateRoute>
        <div className='black h-screen TextXSmall semiBold black'>
          <Toaster position='bottom-center' reverseOrder={false} />
          <Link
              href={"/account"}
              onClick={() => {
                dispatch(fetchProfile());
              }}
              className='topBar fixed z-50 border-b-2 bg-white top-0 right-0 left-0 flex space-x-3.5 py-4 px-8'>
            <AiOutlineArrowLeft className='w-6 h-6' />
            <p className='TextMedium semiBold'>Edit Profile</p>
          </Link>

          <div className='mx-8 mt-11'>
            <div className='divide-y'>
              <Formik
                  initialValues={initialValues}
                  validationSchema={UpdateProfileSchema}
                  onSubmit={(values, actions) => {
                    // console.log({ values, actions });
                    // alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                    dispatch(updateProfile(values));
                  }}>
                {({ errors, touched, isValidating, isSubmitting }) => (
                    <Form>
                      <div className='identity divide-y py-9'>
                        <p className='TextSmall bold pb-2'>Data Diri</p>
                        <div className='formInput pt-2 space-y-4'>
                          <div className='username space-y-2'>
                            <label htmlFor=''>Username</label>
                            <Field
                                type='text'
                                id='username'
                                name='username'
                                className='h-10 w-full border4 rounded-md p-2'
                            />
                            {errors.username && touched.username ? (
                                <div className='error BgDangerColor'>
                                  {errors.username}
                                </div>
                            ) : null}
                          </div>
                          <div className='name space-y-2'>
                            <label htmlFor=''>Name</label>
                            <Field
                                type='text'
                                id='name'
                                name='name'
                                className='h-10 w-full border4 rounded-md p-2'
                            />
                            {errors.name && touched.name ? (
                                <div className='error BgDangerColor'>
                                  {errors.name}
                                </div>
                            ) : null}
                          </div>
                          <div className='birthdate space-y-2'>
                            <label htmlFor=''>Tanggal Lahir</label>
                            <div className='relative w-full'>
                              <Field
                                  type='date'
                                  id='birthdate'
                                  name='birthdate'
                                  className='h-10 w-full border4 rounded-md p-2 px-1'
                              />
                              {errors.birthdate && touched.birthdate ? (
                                  <div className='error BgDangerColor'>
                                    {errors.birthdate}
                                  </div>
                              ) : null}
                            </div>
                          </div>
                          <div className='sex space-y-2'>
                            <label htmlFor=''>Jenis Kelamin</label>
                            <div className=''>
                              <Field
                                  className='w-full grid grid-cols-2 gap-4'
                                  component='div'
                                  name='sex'>
                                <input
                                    type='radio'
                                    id='radioOne'
                                    defaultChecked={sex === "Laki - laki"}
                                    name='sex'
                                    value='Laki - laki'
                                    hidden
                                />
                                <label htmlFor='radioOne'>
                                  <div
                                      className={
                                        sex === "Laki - laki"
                                            ? "flex items-center py-2 px-3 space-x-3 rounded-md p-2 primaryBorder"
                                            : "flex items-center py-2 px-3 space-x-3 rounded-md p-2 border4"
                                      }
                                      onClick={() => {
                                        setSex("Laki - laki");
                                      }}>
                                    <div className='avatar h-11 w-11 rounded-full overflow-hidden'>
                                      <Image
                                          src='/images/maleAvatar.png'
                                          alt='avatar'
                                          fill
                                          objectFit='cover'
                                      />
                                    </div>
                                    <p className='primaryColor'>Laki-laki</p>
                                  </div>
                                </label>

                                <input
                                    type='radio'
                                    id='radioTwo'
                                    defaultChecked={sex === "Perempuan"}
                                    name='sex'
                                    value='Perempuan'
                                    hidden
                                />
                                <label htmlFor='radioTwo'>
                                  <div
                                      className={
                                        sex === "Perempuan"
                                            ? "flex items-center py-2 px-3 space-x-3 rounded-md p-2 primaryBorder"
                                            : "flex items-center py-2 px-3 space-x-3 rounded-md p-2 border4"
                                      }
                                      onClick={() => {
                                        setSex("Perempuan");
                                      }}>
                                    <div className='avatar h-11 w-11 rounded-full overflow-hidden'>
                                      <Image
                                          src='/images/femaleAvatar.png'
                                          alt='avatar'
                                          fill
                                          objectFit='cover'
                                      />
                                    </div>
                                    <p className='primaryColor'>Perempuan</p>
                                  </div>
                                </label>
                              </Field>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='account divide-y py-9'>
                        <p className='TextSmall bold pb-2'>Informasi AKun</p>
                        <div className='formInput pt-2 space-y-4'>
                          <div className='username space-y-2'>
                            <label htmlFor=''>Email</label>
                            <Field
                                type='text'
                                id='email'
                                name='email'
                                className='h-10 w-full border4 rounded-md p-2'
                            />
                            {errors.email && touched.email ? (
                                <div className='error BgDangerColor'>
                                  {errors.email}
                                </div>
                            ) : null}
                          </div>
                          <div className='name space-y-2'>
                            <label htmlFor=''>Nomor Hp</label>
                            <Field
                                type='text'
                                id='phone'
                                name='phone'
                                className='h-10 w-full border4 rounded-md p-2'
                            />
                            {errors.phone && touched.phone ? (
                                <div className='error BgDangerColor'>
                                  {errors.phone}
                                </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className='grid pt-9'>
                        <button
                            type='submit'
                            className='w-ful py-2 primary1 TextSmall rounded-md p-2 text-white mb-11'>
                          Simpan
                        </button>
                      </div>
                    </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </PrivateRoute>
  );
}