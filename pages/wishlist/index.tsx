/** @format */

import { useEffect } from "react";
import Link from "next/link";
import PrivateRoute from "../../components/PrivateRoute";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { BsFillHeartFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchAddWislist,
  fetchWishlist,
} from "../../features/wishlist/WishlistSlice";
import { Toaster } from "react-hot-toast";

export default function index() {
  const dispatch = useAppDispatch();

  const listWishlist = useAppSelector((state) => state.wishlist.listWishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <PrivateRoute>
      <div className='black h-screen TextXSmall regular black'>
        <Toaster position='bottom-center' reverseOrder={false} />
        <Link
          href={"/dashboard"}
          className='topBar fixed z-50 border-b-2 bg-white top-0 right-0 left-0 flex space-x-3.5 py-4 px-8'>
          <AiOutlineArrowLeft className='w-6 h-6' />
          <p className='TextMedium semiBold'>Daftar Wishlist</p>
        </Link>

        <div className='items mx-8 mt-20 grid grid-cols-2 gap-4'>
          {listWishlist?.length > 0 ? (
            listWishlist?.map((item) => (
              <div className='item shadowLow rounded-lg' key={item?.product_id}>
                <div className='product-img relative h-28 w-full rounded-t-lg overflow-hidden'>
                  <Image
                    src={item?.product_thumbnail}
                    alt='product image'
                    fill
                    objectFit='cover'
                  />
                </div>
                <div className='desc p-2 TextXSmall regular black space-y-1'>
                  <p className='truncate'>{item?.product_name}</p>
                  <div className='middle'>
                    <div className='rate flex items-center'>
                      <Rating
                        initialValue={item?.rating_avg}
                        size={12}
                        transition
                        allowFraction
                        emptyStyle={{ display: "flex" }}
                        fillStyle={{ display: "-webkit-inline-box" }}
                        readonly
                      />
                      <p className='light'>({item?.review_count})</p>
                    </div>
                    <p className='semiBold'>Sarana Produksi</p>
                  </div>
                  <div className='bottom flex justify-between items-center'>
                    <div className='left'>
                      <p className='TextSmall semiBold'>
                        {formatter.format(item?.price_after_discount)}
                      </p>
                      <div className='disc flex space-x-2'>
                        <p className='scale6Bg rounded-sm text1 px-1 light'>
                          {item?.product_discount}%
                        </p>
                        <p className='light line-through'>
                          {formatter.format(item?.product_price)}
                        </p>
                      </div>
                    </div>
                    <button
                      className='bg-red-500 rounded-md h-fit p-2'
                      onClick={() => {
                        dispatch(
                          fetchAddWislist({
                            product_id: item?.product_id,
                          })
                        ).then(() => {
                          dispatch(fetchWishlist());
                        });
                      }}>
                      <BsFillHeartFill className='text-white TextXSmall' />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='col-span-2 flex justify-center'>
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
    </PrivateRoute>
  );
}
