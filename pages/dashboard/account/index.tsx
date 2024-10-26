/** @format */

import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchProfile } from "../../../features/profile/ProfileSlice";
import Link from "next/link";

export default function index() {
  const dispatch = useAppDispatch();
  const ProfileData = useAppSelector((state) => state.profile.profileData);
  // console.log("ProfileData", ProfileData);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  return (
    <div className='col-span-3'>
      <div className='account grid grid-cols-3 gap-4 rounded-xl border border-gray-300 p-7'>
        <div className='space-y-4'>
          <div className='relative h-52 w-full rounded-md overflow-hidden shadowHight'>
            <Image
              src={ProfileData?.avatar}
              alt='Picture of the author'
              layout='fill'
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
        <div className='col-span-2'>
          <p className='text-sm font-bold mb-4'>Data Diri</p>
          <div className='desc grid grid-cols-3 text-xs'>
            <div className='space-y-2'>
              <p>Username</p>
              <p>Name</p>
              <p>Tanggal Lahir</p>
              <p>Jenis Kelamin</p>
            </div>
            <div className='col-span-2 space-y-2'>
              <p>: {ProfileData?.username || "-"}</p>
              <p>: {ProfileData?.name || "-"}</p>
              <p>: {ProfileData?.birthdate || "-"}</p>
              <p>: {ProfileData?.sex || "-"}</p>
            </div>
          </div>

          <p className='text-sm font-bold mb-4 mt-7'>Kontak</p>
          <div className='desc grid grid-cols-3 text-xs'>
            <div className='space-y-2'>
              <p>Nomor Telepon</p>
              <p>Email</p>
            </div>
            <div className='col-span-2 space-y-2'>
              <p>: {ProfileData?.phone}</p>
              <div className='grid grid-cols-2'>
                <p>: {ProfileData?.email || "-"}</p>
                <p className='primary1 text-white w-fit px-2 rounded-sm'>
                  verified
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
