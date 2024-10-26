/** @format */

import Link from "next/link";
import PrivateRoute from "../../components/PrivateRoute";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Image from "next/image";
import { BsCheck } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { fetchProfile } from "../../features/profile/ProfileSlice";

export default function index() {
  const dispatch = useAppDispatch();
  const ProfileData = useAppSelector((state) => state.profile.profileData);
  // console.log("ProfileData", ProfileData);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <PrivateRoute>
      <div className='black h-screen TextXSmall regular black'>
        <Link
          href={"/dashboard"}
          className='topBar fixed z-50 border-b-2 bg-white top-0 right-0 left-0 flex space-x-3.5 py-4 px-8'>
          <AiOutlineArrowLeft className='w-6 h-6' />
          <p className='TextMedium semiBold'>Profil</p>
        </Link>

        <div className='items mx-8 mt-20'>
          <div className='profile flex flex-col items-center justify-center space-y-2'>
            <div className='profile-img relative h-36 w-36 rounded-lg overflow-hidden'>
              <Image
                src={ProfileData?.avatar}
                alt='profile image'
                fill
                objectFit='cover'
              />
            </div>
            <Link href={'/account/avatar'} className='flex justify-center border3 py-1 w-36 text1 TextSmall semiBold rounded-md'>
              Ubah Foto
            </Link>
            <Link href={'/account/edit'} className='flex justify-center border3 py-1 w-36 text1 TextSmall semiBold rounded-md'>
              Edit Profil
            </Link>
          </div>

          <div className='desc mt-4'>
            <div className='identity space-y-2'>
              <p className='TextMedium bold'>Data Diri</p>
              <div className='desc space-y-1 regular'>
                <div className='grid grid-cols-3'>
                  <p className='col-span-1'>Username</p>
                  <p className='col-span-2'>: {ProfileData?.username || '-'}</p>

                  <p className='col-span-1'>Nama</p>
                  <p className='col-span-2'>: {ProfileData?.name || '-'}</p>

                  <p className='col-span-1'>Tanggal Lahir</p>
                  <p className='col-span-2'>: {ProfileData?.birthdate || '-'}</p>

                  <p className='col-span-1'>Jenis Kelamin</p>
                  <p className='col-span-2'>: {ProfileData?.sex || '-'}</p>
                </div>
              </div>
            </div>

            <div className='contact space-y-2 mt-4'>
              <p className='TextMedium bold'>Kontak</p>
              <div className='desc space-y-1 regular'>
                <div className='grid grid-cols-3'>
                  <p className='col-span-1'>Nomor Hp</p>
                  <div className='col-span-2 flex justify-between items-center'>
                    <span>: {ProfileData?.phone || '-'}</span>
                    <div className='bg-green-400 rounded-full'>
                      <BsCheck className='text-white text-xs' />
                    </div>
                  </div>

                  <p className='col-span-1'>Email</p>
                  <div className='col-span-2 flex justify-between items-center'>
                    <span>: {ProfileData?.email || '-'}</span>
                    <div className='bg-green-400 rounded-full'>
                      <BsCheck className='text-white text-xs' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
