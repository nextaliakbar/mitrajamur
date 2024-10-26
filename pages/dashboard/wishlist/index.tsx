/** @format */

import React, { useEffect } from "react";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { BiPlus } from "react-icons/bi";
import { BsFillHeartFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchAddWislist,
  fetchWishlist,
} from "../../../features/wishlist/WishlistSlice";

export default function index() {
  const dispatch = useAppDispatch();

  const listWishlist = useAppSelector((state) => state.wishlist.listWishlist);
  // console.log("listWislist", listWishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <div className='col-span-3'>
      <p className='text-xl font-bold mb-6'>Daftar Wishlist</p>
      <div className='rounded-xl border border-gray-300 p-4 grid grid-cols-4 gap-4'>
        {listWishlist?.length > 0 ? (
          listWishlist?.map((item) => (
            <div
              className='wishlist shadowLow rounded-md space-y-2'
              key={item?.product_id}>
              <div className='relative h-32 w-full rounded-t-md overflow-hidden'>
                <Image
                  src={item?.product_thumbnail}
                  alt='product'
                  fill
                  objectFit='cover'
                />
              </div>
              <div className='desc px-2'>
                <p className='font-semibold m-0'>Media Tanam</p>
                <div className='rate flex items-center space-x-2'>
                  <Rating
                    initialValue={item?.rating_avg}
                    size={16}
                    transition
                    allowFraction
                    emptyStyle={{ display: "flex" }}
                    fillStyle={{ display: "-webkit-inline-box" }}
                    readonly
                  />
                  <p className='text-xs'>({item?.review_count})</p>
                </div>
              </div>
              <div className='price items-center text1 text-xs space-y-2 px-2'>
                <p className='text-sm font-semibold'>
                  {formatter.format(item?.price_after_discount)}
                </p>
                <div className='flex items-center space-x-2'>
                  <p className='bg4 py-0.5 px-1 rounded-sm font-light'>
                    {item?.product_discount}%
                  </p>
                  <p className='font-light line-through'>
                    {formatter.format(item?.product_price)}
                  </p>
                </div>
              </div>
              <div className='action flex justify-between px-2 pb-2'>
                <button className='primaryBorder rounded-md text-xs primaryColor p-1 flex items-center'>
                  {" "}
                  <BiPlus /> Keranjang
                </button>

                <button
                  className='bg-red-500 p-1 rounded-md'
                  onClick={() => {
                    dispatch(
                      fetchAddWislist({
                        product_id: item?.product_id,
                      })
                    ).then(() => {
                      dispatch(fetchWishlist());
                    });
                  }}>
                  <BsFillHeartFill className='text-white' />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='col-span-4 flex justify-center'>
            <div className='ilutration relative h-80 w-80'>
              <Image
                src='/images/wishlistNotFound.png'
                alt='empty-wishlist'
                layout='fill'
                objectFit='contain'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
