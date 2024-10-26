/** @format */

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useRouter } from "next/router";
import { fetchTracking } from "../../../features/checkout/checkoutSlice";
import PrivateRoute from "../../../components/PrivateRoute";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function detail() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { slug } = router.query;
  // console.log("slug", slug);

  const trackingData = useAppSelector((state) => state.checkout.trackingData);
  // console.log("trackingData", trackingData);

  useEffect(() => {
    dispatch(fetchTracking(slug as string));
  }, []);

  const reverseArray = (array: any) => {
    const newArray = [];
    for (let i = array.length - 1; i >= 0; i--) {
      newArray.push(array[i]);
    }
    return newArray;
  };

  return (
    <PrivateRoute>
      <div className='black h-screen'>
        <Link
          href={"/transaction"}
          className='topBar fixed z-50 border-b-2 bg-white top-0 right-0 left-0 flex space-x-3.5 py-4 px-8'>
          <AiOutlineArrowLeft className='w-6 h-6' />
          <p className='TextMedium semiBold'>Lacak Pengiriman</p>
        </Link>
        <div className='divide-y mx-8 mt-20'>
          <div className='invoice TextSmall regular space-y-2 py-4'>
            <p>{trackingData?.transaction?.invoice}</p>
            <p>238423499888</p>
            <p>{trackingData?.transaction?.date}</p>
          </div>
          {trackingData?.data?.rajaongkir?.status?.code === 200 ? (
            <div className=''>
              {trackingData?.data?.rajaongkir?.result?.delivered === true ? (
                <p className='TextSmall semiBold text-center py-4'>
                  Pesanan Telah Sampai Tujuan
                </p>
              ) : (
                <p className='TextSmall semiBold text-center py-4'>
                  Pesanan Sedang Dikirim
                </p>
              )}
            </div>
          ) : (
            <p className='TextSmall semiBold text-center py-4'>
              Kesalahan Resi atau Nomor Resi Tidak Ditemukan
            </p>
          )}
          <div className='stepperTracking pt-6'>
            {trackingData?.data?.rajaongkir?.result?.delivered === true ? (
              <div className='flex'>
                <div className='flex flex-col items-center mr-9'>
                  <div>
                    <div className='flex items-center justify-center w-4 h-4 primary1 rounded-full'></div>
                  </div>
                  <div className='w-0.5 h-full primary1' />
                </div>
                <div className='pb-8'>
                  <p className='TextXSmall semiBold'>
                    {
                      trackingData?.data?.rajaongkir?.result?.delivery_status
                        ?.pod_receiver
                    }
                  </p>
                  <p className='TextXSmall light italic'>
                    {
                      trackingData?.data?.rajaongkir?.result?.delivery_status
                        ?.pod_date
                    }{" "}
                    {
                      trackingData?.data?.rajaongkir?.result?.delivery_status
                        ?.pod_time
                    }
                  </p>
                  <p className='TextXSmall regular'>
                    {
                      trackingData?.data?.rajaongkir?.result?.delivery_status
                        ?.pod_time
                    }
                  </p>
                </div>
              </div>
            ) : null}

            {trackingData?.data?.rajaongkir?.result?.manifest.length > 0
              ? reverseArray(
                  trackingData?.data?.rajaongkir?.result?.manifest
                ).map((item: any, index: any) => (
                  <div className='flex' key={index}>
                    <div className='flex flex-col items-center mr-9'>
                      <div>
                        <div className='flex items-center justify-center w-4 h-4 primary1 rounded-full'></div>
                      </div>
                      <div className='w-0.5 h-full primary1' />
                    </div>
                    <div className='pb-8'>
                      {item?.city_name !== "" ? (
                        <p className='TextXSmall semiBold'>{item?.city_name}</p>
                      ) : (
                        <p className='TextXSmall semiBold'>
                          {item?.manifest_description}
                        </p>
                      )}
                      <p className='TextXSmall light italic'>
                        {item?.manifest_date} {item?.manifest_time}
                      </p>
                      <p className='TextXSmall regular'>
                        {item?.manifest_description}
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
