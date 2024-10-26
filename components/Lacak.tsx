/** @format */

import { BiX } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setModalTracking } from "../features/checkout/checkoutSlice";

export default function Lacak() {
  const dispatch = useAppDispatch();
  const trackingData = useAppSelector((state) => state.checkout.trackingData);
  console.log("trackingData", trackingData);

  const handleClose = () => {
    dispatch(setModalTracking(false));
  };

  const reverseArray = (array: any) => {
    const newArray = [];
    for (let i = array.length - 1; i >= 0; i--) {
      newArray.push(array[i]);
    }
    return newArray;
  };

  return (
    <div className='relative z-10'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity'></div>
      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl'>
            <div className='bg-white p-9'>
              <div className='content TextSmall regular black divide-y'>
                <div className='flex justify-between pb-6'>
                  <h4 className='text-2xl bold'>Lacak Pengiriman</h4>
                  <button onClick={handleClose} className='text-gray-500'>
                    <BiX className='text-2xl' />
                  </button>
                </div>
                <div className='invoice TextMedium regular space-y-2 py-4'>
                  <div className='inVoiceNo flex justify-between'>
                    <p>No Invoice</p>
                    <p>{trackingData?.transaction?.invoice}</p>
                  </div>
                  <div className='resi flex justify-between'>
                    <p>Nomor Resi</p>
                    <p>238423499888</p>
                  </div>
                  <div className='date flex justify-between'>
                    <p>Tanggal Pembelian</p>
                    <p>{trackingData?.transaction?.date}</p>
                  </div>
                </div>
                {trackingData?.data?.rajaongkir?.status?.code === 200 ? (
                  <div className=''>
                    {trackingData?.data?.rajaongkir?.result?.delivered ===
                    true ? (
                      <p className='TextLarge semiBold text-center py-4'>
                        Pesanan Telah Sampai Tujuan
                      </p>
                    ) : (
                      <p className='TextLarge semiBold text-center py-4'>
                        Pesanan Sedang Dikirim
                      </p>
                    )}
                  </div>
                ) : (
                  <p className='TextLarge semiBold text-center py-4'>
                    Kesalahan Resi atau Nomor Resi Tidak Ditemukan
                  </p>
                )}
                <div className='stepperTracking pt-6'>
                  {trackingData?.data?.rajaongkir?.result?.delivered ===
                  true ? (
                    <div className='flex'>
                      <div className='flex flex-col items-center mr-9'>
                        <div>
                          <div className='flex items-center justify-center w-7 h-7 primary1 rounded-full'></div>
                        </div>
                        <div className='w-1 h-full primary1' />
                      </div>
                      <div className='pb-8'>
                        <p className='TextMedium semiBold'>
                          {
                            trackingData?.data?.rajaongkir?.result
                              ?.delivery_status?.pod_receiver
                          }
                        </p>
                        <p className='TextSmall light italic'>
                          {
                            trackingData?.data?.rajaongkir?.result
                              ?.delivery_status?.pod_date
                          }{" "}
                          {
                            trackingData?.data?.rajaongkir?.result
                              ?.delivery_status?.pod_time
                          }
                        </p>
                        <p className='TextSmall regular'>
                          {
                            trackingData?.data?.rajaongkir?.result
                              ?.delivery_status?.pod_time
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
                              <div className='flex items-center justify-center w-7 h-7 primary1 rounded-full'></div>
                            </div>
                            <div className='w-1 h-full primary1' />
                          </div>
                          <div className='pb-8'>
                            {item?.city_name !== "" ? (
                              <p className='TextMedium semiBold'>
                                {item?.city_name}
                              </p>
                            ) : (
                              <p className='TextMedium semiBold'>
                                {item?.manifest_description}
                              </p>
                            )}
                            <p className='TextSmall light italic'>
                              {item?.manifest_date} {item?.manifest_time}
                            </p>
                            <p className='TextSmall regular'>
                              {item?.manifest_description}
                            </p>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
