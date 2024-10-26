/** @format */

import { useEffect } from "react";
import Image from "next/image";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchDeleteCart,
  fetchListCart,
  fetchSummaryCart,
  fetchUpdateCart,
  setQuantity,
} from "../../features/cart/cartSlice";
import { useRouter } from "next/router";
import { FaTrashAlt } from "react-icons/fa";
import { BiMinus, BiPlus } from "react-icons/bi";
import Link from "next/link";

export default function MobileView() {
  const dispatch = useAppDispatch();
  const listCart = useAppSelector((state) => state.cart.listCart);
  const summaryCart = useAppSelector((state) => state.cart.summaryCart);

  const quantity = useAppSelector((state) => state.cart.quantity);

  useEffect(() => {
    dispatch(fetchSummaryCart());
  }, [dispatch]);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const router = useRouter();
  const navigateToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className='black h-screen'>
      <Link href={"/"} className='topBar fixed z-50 border-b-2 bg-white top-0 right-0 left-0 flex space-x-3.5 py-4 px-8'>
        <AiOutlineArrowLeft className='w-6 h-6' />
        <p className='TextMedium semiBold'>Keranjang</p>
      </Link>
      <div className='divide-y mx-8 mt-20'>
        {listCart?.length > 0
          ? listCart?.map((item) => (
              <div className='flex gap-3 py-4 w-full' key={item?.id}>
                <div className='product-img relative rounded-xl overflow-hidden h-20 w-20 shrink-0'>
                  <Image
                    src={item?.thumbnail}
                    alt='product image'
                    fill
                    objectFit='cover'
                  />
                </div>
                <div className='desc w-full flex flex-col justify-between pb-2'>
                  <div className='top'>
                    <h5 className='TextSmall black regular'>{item?.name}</h5>
                    <div className='text-desc flex items-center gap-1'>
                      <div className='md:flex space-x-2 items-center'>
                        {item?.discount === "0" ||
                        item?.discount === undefined ? (
                          <></>
                        ) : (
                          <div className='flex space-x-2'>
                            <p className='TextXSmall p-0.5 light text1 bg4 rounded-sm'>
                              {item?.discount || 0}%
                            </p>
                            <p className='TextXSmall regular black line-through'>
                              {formatter.format(item?.product_price)}
                            </p>
                          </div>
                        )}
                      </div>

                      <p className='textXSmall black semiBold'>
                        {formatter.format(item?.price_after_discount)}
                      </p>
                    </div>
                  </div>
                  <div className='action-desc flex'>
                    <div className='left flex justify-between items-center w-full'>
                      <div className='flex flex-row h-5 w-fit rounded-lg relative bg-transparent'>
                        <button
                          disabled={quantity === 1}
                          onClick={() => {
                            dispatch(
                              fetchUpdateCart({
                                quantity: item?.quantity - 1,
                                id: item?.id,
                              })
                            ).then(() => {
                              dispatch(fetchListCart());
                              dispatch(fetchSummaryCart());
                            });
                          }}
                          className='flex items-center justify-center primary1 text-white h-full px-1 rounded-l cursor-pointer outline-none'>
                          <BiMinus className='text-sm' />
                        </button>
                        <input
                          type='number'
                          className='outline-none TextXSmall w-6 focus:outline-none  text-center primary1 text-white font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center'
                          name='custom-input-number'
                          value={item?.quantity}
                          onChange={(e: any) =>
                            dispatch(setQuantity(e))
                          }></input>
                        <button
                          onClick={() => {
                            try {
                              dispatch(
                                fetchUpdateCart({
                                  quantity: item?.quantity + 1,
                                  id: item?.id,
                                })
                              ).then(() => {
                                dispatch(fetchListCart());
                                dispatch(fetchSummaryCart());
                              });
                            } catch (error) {
                              console.log("error", error);
                            }
                          }}
                          className='flex items-center justify-center primary1 text-white h-full px-1 rounded-r cursor-pointer'>
                          <BiPlus className='text-sm' />
                        </button>
                      </div>

                      <FaTrashAlt
                        className='text-red-500 text-base cursor-pointer'
                        onClick={() => {
                          dispatch(
                            fetchDeleteCart({
                              id: item?.id,
                            })
                          ).then(() => {
                            dispatch(fetchListCart());
                            dispatch(fetchSummaryCart());
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      <div className='bottom-action bg-white fixed flex justify-between bottom-0 right-0 left-0 py-4 px-8 shadowBold'>
        <div className='desc'>
          <p className='TextXSmall regular text1'>Total Tagihan</p>
          <p className='TextMedium semiBold black'>
            {formatter.format(summaryCart?.total_price)}
          </p>
        </div>
        <button
          className='action TextSmall semiBold primary1 text-white py-2 px-4 rounded-md'
          onClick={navigateToCheckout}>
          Proses Checkout
        </button>
      </div>
    </div>
  );
}
