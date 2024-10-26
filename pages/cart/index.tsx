/** @format */

import Image from "next/image";
import React, { useEffect } from "react";
import Layout from "../../components/layout";
import { FaTrashAlt } from "react-icons/fa";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchDeleteCart,
  fetchListCart,
  fetchSummaryCart,
  fetchUpdateCart,
  setQuantity,
} from "../../features/cart/cartSlice";
import Link from "next/link";
import PrivateRoute from "../../components/PrivateRoute";
import { useRouter } from "next/router";
import MobileView from "./MobileView";

export default function index() {
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
    <PrivateRoute>
      <div className='hidden md:block'>
        <Layout>
          <section className='mx-auto lg:max-w-6xl px-8 md:px-16 text-sm my-5 hidden md:block'>
            <h2 className='text-base font-bold text1'>Keranjang</h2>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 my-4'>
              <div className='col-span-1 lg:col-span-2 w-full'>
                <div className='divide-y'>
                  {listCart?.length > 0
                    ? listCart?.map((item) => (
                        <div className='flex gap-4 py-7' key={item?.id}>
                          <div className='product-img relative rounded-xl overflow-hidden h-32 w-32'>
                            <Image
                              src={item?.thumbnail}
                              alt='product image'
                              fill
                              objectFit='cover'
                            />
                          </div>
                          <div className='desc flex flex-col justify-between pb-2'>
                            <div className='top'>
                              <h5 className='TextSmall md:text-lg black regular md:font-semibold mb-1'>
                                {item?.name}
                              </h5>
                              <div className='text-desc flex items-center gap-1'>
                                <div className='md:flex space-x-2 items-center'>
                                  <p className='hidden md:block text-base regular black'>
                                    Harga Satuan
                                  </p>
                                  {item?.discount === "0" ||
                                  item?.discount === undefined ? (
                                    <></>
                                  ) : (
                                    <div className='flex space-x-2'>
                                      <p className='text-xs p-0.5 regular text1 bg4 rounded-sm'>
                                        {item?.discount || 0} %
                                      </p>
                                      <p className='TextXSmall regular md:text-sm black line-through'>
                                        {formatter.format(item?.product_price)}
                                      </p>
                                    </div>
                                  )}
                                </div>

                                <p className='textXSmall md:text-base black semiBold md:font-bold'>
                                  {formatter.format(item?.price_after_discount)}
                                </p>
                              </div>
                            </div>
                            <div className='action-desc flex space-x-12'>
                              <div className='left flex flex-row-reverse md:flex-row w-auto items-center'>
                                <FaTrashAlt
                                  className='text-red-500 text-xl'
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
                                <div className='divider divider-horizontal'></div>
                                <div className='flex flex-row h-8 w-fit rounded-lg relative bg-transparent'>
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
                                    className='flex items-center justify-center primary1 text-white h-full px-4 rounded-l cursor-pointer outline-none'>
                                    <BiMinus />
                                  </button>
                                  <input
                                    type='number'
                                    className='outline-none w-8 focus:outline-none  text-center primary1 text-white font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center'
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
                                    className='flex items-center justify-center primary1 text-white h-full px-4 rounded-r cursor-pointer'>
                                    <BiPlus />
                                  </button>
                                </div>
                              </div>
                              <div className='hidden md:block'>
                                <p className='text-2xl font-bold'>
                                  {formatter.format(item?.total_price_product)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
              <div className='col-span-1 shadow-md p-4'>
                <div className='divide-y'>
                  <div className='rincian pb-3.5'>
                    <p className='text-lg black font-semibold mb-3.5'>
                      Rincian Belanja
                    </p>
                    <div className='totalHarga flex justify-between'>
                      <p className='text-base regular black'>
                        Total Harga ({summaryCart?.total_product} Barang)
                      </p>
                      <p className='text-base regular black'>
                        {formatter.format(
                          summaryCart?.total_price_before_discount
                        )}
                      </p>
                    </div>
                    <div className='totalDiskon flex justify-between'>
                      <p className='text-base regular black'>Total Diskon</p>
                      <p className='text-base regular black'>
                        -{formatter.format(summaryCart?.total_discount_price)}
                      </p>
                    </div>
                  </div>
                  <div className='total mt-1 flex flex-col pt-3.5'>
                    <div className='totalHarga text-xl font-bold flex justify-between'>
                      <p>Total Harga</p>
                      <p>{formatter.format(summaryCart?.total_price)}</p>
                    </div>
                    <button
                      className='primary1 py-2 mb-3 mt-3.5 text-lg semiBold rounded-md text-white font-bold w-full'
                      onClick={navigateToCheckout}>
                      Proses Checkout
                    </button>
                    <Link
                      href='/product'
                      className='rounded-md scale5Border text-lg semiBold flex justify-center py-2 primaryColor w-full'>
                      Lanjutkan Belanja
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </div>
      <div className='block md:hidden'>
        <MobileView />
      </div>
    </PrivateRoute>
  );
}
