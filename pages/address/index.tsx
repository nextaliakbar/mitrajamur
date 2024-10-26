/** @format */

import Link from "next/link";
import PrivateRoute from "../../components/PrivateRoute";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchAddress,
  fetchDeleteAddress,
  fetchDetailAddress,
  fetchSetDefaultAddress,
} from "../../features/address/addressSlice";
import { HiCheck } from "react-icons/hi";
import { Toaster } from "react-hot-toast";
import {useEffect} from "react";

export default function index() {
  const dispatch = useAppDispatch();
  const listAddress = useAppSelector((state) => state.address.listAddress);
  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  return (
    <PrivateRoute>
      <div className='black black TextXSmall regular'>
        <Toaster position='bottom-center' reverseOrder={false} />
        <Link
          href={"/dashboard"}
          className='topBar fixed z-50 border-b-2 bg-white top-0 right-0 left-0 flex space-x-3.5 py-4 px-8'>
          <AiOutlineArrowLeft className='w-6 h-6' />
          <p className='TextMedium semiBold'>Daftar Alamat</p>
        </Link>

        <div className='mx-8 mt-20'>
          <div className='wrapper space-y-4'>
            {listAddress?.length > 0 &&
              listAddress.map((item) => (
                <div
                  className={
                    item?.is_default
                      ? "items flex items-center space-x-2 space-y-2 primaryBorderBold w-full rounded-md p-4"
                      : "items flex items-center space-x-2 space-y-2 border-2 border-gray-200 w-full rounded-md p-4"
                  }
                  key={item?.id}>
                  <div className='desc'>
                    <p className='primaryColor bold'>
                      {item?.label}{" "}
                      {item?.is_default ? (
                        <span className='scale3Color'>(Utama)</span>
                      ) : null}
                    </p>
                    <p className={item?.is_default ? "semiBold" : "bold"}>
                      {item?.name}
                    </p>
                    <p>{item?.phone}</p>

                    <p className='mt-2'>{item?.address}</p>

                    <div className='action flex mt-2 space-x-3.5'>
                      <Link
                        href={`/address/${item?.id}`}
                        onClick={() => {
                          console.log(item?.id);
                          dispatch(fetchDetailAddress(item?.id));
                        }}
                        className='primaryColor bold'>
                        Ubah Alamat
                      </Link>
                      <button
                        className='BgDangerColor bold'
                        onClick={() => {
                          dispatch(fetchDeleteAddress(item?.id));
                        }}>
                        Hapus
                      </button>
                    </div>
                  </div>
                  {item?.is_default ? (
                    <HiCheck className='text-6xl primaryColor' />
                  ) : (
                    <button
                      className='primary1 text-white rounded-md semiBold py-1 px-2'
                      onClick={() => {
                        dispatch(fetchSetDefaultAddress(item?.id)).then(() => {
                          dispatch(fetchAddress());
                        });
                      }}>
                      Pilih
                    </button>
                  )}
                </div>
              ))}
          </div>
          <div className='mt-4 w-full'>
            <Link href={"/address/add"}>
              <div className='py-2 primary1 text-center semiBold text-white rounded-md w-full'>
                Tambah Alamat Lainnya
              </div>
            </Link>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
