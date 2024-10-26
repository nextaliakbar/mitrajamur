/** @format */

import React from "react";
import Image from "next/image";

export default function SkeletonProductCard() {
  return (
    <div className='flex flex-col items-center animate-pulse bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer'>
      <div className='relative w-full h-44 overflow-hidden rounded-t-lg'>
        <Image
          src='https://placehold.jp/200.png?text=Product'
          alt='product-1'
          fill
          objectFit='cover'
        />
      </div>
      <div className='flex flex-col gap-8 w-full p-4'>
        <div className='flex flex-col gap-2'>
          <div className='h-6 w-11/12 rounded-md bg-gray-300 '></div>
          <div className='h-6 w-9/12 rounded-md bg-gray-300 '></div>
          <div className='h-6 w-5/12 rounded-md bg-gray-300 '></div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='h-6 rounded-md bg-gray-300 '></div>
          <div className='h-6 rounded-md bg-gray-300 '></div>
        </div>
      </div>
    </div>
  );
}
