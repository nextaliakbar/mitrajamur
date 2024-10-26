/** @format */

import { BiX } from "react-icons/bi";
import { useAppDispatch } from "../../app/hooks";
import { registerUser, setOnLogin } from "../../features/auth/authSlice";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/dist/client/router";
import { Toaster } from "react-hot-toast";
import { fetchUser } from "../../features/auth/userSlice";

const RegisterSchema = Yup.object().shape({
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

export default function Register() {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setOnLogin(""));
  };

  const router = useRouter();
  const handleSubmit = async (values: any) => {
    try {
      const resultAction = await dispatch(registerUser(values));
      if (registerUser.fulfilled.match(resultAction)) {
        if (resultAction.payload.error) {
          console.log("resultAction.payload", resultAction.payload);
        } else {
          console.log("resultAction.payload", resultAction.payload);
          dispatch(fetchUser());
          router.push("/");
          dispatch(setOnLogin(""));
        }
      }
    } catch (err) {
      console.error("Failed to login: ", err);
      router.push("/authentikasi");
    }
  };

  const formik = useFormik({
    initialValues: {
      name:"",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div className='relative z-10'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex h-fit items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
            <div className='bg-white p-3'>
              <div className='content'>
                <div className='m-9 textSmall regular black'>
                  <Toaster position='bottom-center' reverseOrder={false} />
                  <p className='text-2xl semiBold'>Buat akun baru</p>
                  <p className='text-gray-500 semiBold mb-16'>
                    Registrasi akun agar terhubung dengan kami.
                  </p>

                  <form onSubmit={formik.handleSubmit}>
                    <div className='space-y-3'>
                      <div className='space-y-2'>
                        <label className='primaryColor mb-2'>
                          Nama
                        </label>
                        <input
                          className='input input-bordered h-10 input-md w-full'
                          id='name'
                          name='name'
                          type='text'
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          placeholder='Masukkan nama lengkap'
                        />
                      </div>
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
                        <div className='BgDangerColor'>
                          {formik.errors.phone}
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
                      {formik.errors.password && formik.touched.password ? (
                        <div className='BgDangerColor'>
                          {formik.errors.password}
                        </div>
                      ) : null}
                      <div className='space-y-2'>
                        <label className='primaryColor mb-2'>
                          Konfirmasi Password
                        </label>
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
                      <button
                        className='primaryColor'
                        onClick={() => {
                          dispatch(setOnLogin("login"));
                        }}>
                        Masuk sekarang
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
