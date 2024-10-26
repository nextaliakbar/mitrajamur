/** @format */

import Link from "next/link";
import PrivateRoute from "../../components/PrivateRoute";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchAddress,
  fetchSetDefaultAddress,
} from "../../features/address/addressSlice";
import { HiCheck } from "react-icons/hi";
import { useEffect } from "react";

export default function Coice() {
  const dispatch = useAppDispatch();
  const listAddress = useAppSelector((state) => state.address.listAddress);

  // console.log("lisAddress", listAddress);

  useEffect(() => {
    dispatch(fetchAddress());
  }, [listAddress]);

  return (
    <PrivateRoute>
      <div className='black black TextXSmall regular'>
        <Link
          href={"/checkout"}
          className='topBar fixed z-50 border-b-2 bg-white top-0 right-0 left-0 flex space-x-3.5 py-4 px-8'>
          <AiOutlineArrowLeft className='w-6 h-6' />
          <p className='TextMedium semiBold'>Pilih Alamat</p>
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
                  </div>
                  {item?.is_default ? (
                    <HiCheck className='text-6xl primaryColor' />
                  ) : (
                    <button
                      className='primary1 text-white rounded-md semiBold py-1 px-2'
                      onClick={() => {
                        dispatch(fetchSetDefaultAddress(item?.id));
                      }}>
                      Pilih
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
