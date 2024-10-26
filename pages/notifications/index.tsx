/** @format */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/layout";
import { HiOutlineArrowLeft } from "react-icons/hi";

export default function index() {
  return (
    <Layout>
      <section className='mx-auto lg:max-w-6xl px-8 md:px-16 text-sm'>
        <Link href='/'>
          <HiOutlineArrowLeft className='text-xl' />
        </Link>
        <div className='divider'></div>
        <div className='header flex justify-between mb-12'>
          <p className='text-xl font-bold'>Notifikasi</p>
          <p className='primaryColor font-bold'>Tandai Sudah dibaca</p>
        </div>
        <div className='list space-y-4'>
          <div className='scale6Bg rounded-md py-8 px-10'>
            <div className='wrapper flex items-center'>
              <div className='relative h-10 w-10 mr-5'>
                <Image
                  src='/icons/activeNotification.svg'
                  alt='active icon'
                  fill
                  objectFit='contain'
                />
              </div>
              <div className='desc'>
                <p className='font-semibold'>
                  Transaksi Berhasil silakan cek email anda
                </p>
                <p className='text-sm'>8 Jan, 22:00</p>
              </div>
            </div>
          </div>
          <div className='scale6Bg rounded-md py-8 px-10'>
            <div className='wrapper flex items-center'>
              <div className='relative h-10 w-10 mr-5'>
                <Image
                  src='/icons/activeNotification.svg'
                  alt='active icon'
                  fill
                  objectFit='contain'
                />
              </div>
              <div className='desc'>
                <p className='font-semibold'>
                  Transaksi Berhasil silakan cek email anda
                </p>
                <p className='text-sm'>8 Jan, 22:00</p>
              </div>
            </div>
          </div>
          <div className='scale6Border rounded-md py-8 px-10'>
            <div className='wrapper flex items-center'>
              <div className='relative h-10 w-10 mr-5'>
                <Image
                  src='/icons/inactiveNotification.svg'
                  alt='active icon'
                  fill
                  objectFit='contain'
                />
              </div>
              <div className='desc'>
                <p className='font-semibold'>
                  Transaksi Berhasil silakan cek email anda
                </p>
                <p className='text-sm'>8 Jan, 22:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
