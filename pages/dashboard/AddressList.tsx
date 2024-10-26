/** @format */

import { BiCheck, BiPlus } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    fetchAddress,
    fetchDeleteAddress,
    fetchSetDefaultAddress,
    fetchDetailAddress,
    setModalAdd, setModalEdit,
} from "../../features/address/addressSlice";
import AddAddress from "./AddAddress";
import EditAddress from "./EditAddress";
import { useState } from "react";

export default function AddressList() {
  const dispatch = useAppDispatch();
  const listAddress = useAppSelector((state) => state.address.listAddress);

  const modalAdd = useAppSelector((state) => state.address.modalAdd);
  const modalEdit = useAppSelector((state) => state.address.modalEdit);

    const [detailAddress, setDetailAddress] = useState(null);

    const handleEditAddress = async (id : any) => {
        const data = await dispatch(fetchDetailAddress(id));
        setDetailAddress(data.payload);
        dispatch(setModalEdit(true));
    };

  return (
    <div className='col-span-3 TextSmall regular black'>
      {modalAdd && <AddAddress />}
      {modalEdit && <EditAddress detailAddress={detailAddress} />}
      <div className='flex justify-between'>
        <p className='text-2xl bold'>Daftar Alamat</p>
        <button
          className='flex items-center primary1 semiBold rounded-md text-white px-6 py-2 w-fit'
          onClick={() => {
            dispatch(setModalAdd(true));
          }}>
          <BiPlus />
          Tambah Alamat Baru
        </button>
      </div>
      <div className='divide-y border border-gray-300 p-7 mt-7 rounded-md space-y-6'>
        <div className='flex flex-col space-y-4'>
          {listAddress?.length > 0 &&
            listAddress.map((item) => (
              <div
                className={
                  item?.is_default
                    ? "address rounded-md w-full space-y-2 p-7 primaryBorderBold"
                    : "address rounded-md w-full space-y-2 shadowLow p-7"
                }
                key={item?.id}>
                <div className='flex justify-between items-center'>
                  <div className='left space-y-2'>
                    <div className='desc'>
                      <p className='bold primaryColor'>
                        {item?.label}{" "}
                        {item?.is_default && (
                          <span className='scale3Color'>(Utama)</span>
                        )}
                      </p>
                      <p className='TextMedium semiBold'>{item?.name}</p>
                      <p className='mb-2'>{item?.phone}</p>
                      <p>{item?.address}</p>
                    </div>
                    <div className='action flex space-x-3'>
                      <button
                          className='semiBold primaryColor'
                          onClick={() => {
                              handleEditAddress(item.id)}}>
                        Ubah Alamat
                      </button>
                      <button
                        className='semiBold BgDangerColor'
                        onClick={() => {
                          dispatch(fetchDeleteAddress(item?.id)).then(() => {
                            dispatch(fetchAddress());
                          });
                        }}>
                        Hapus
                      </button>
                    </div>
                  </div>
                  <div className='right'>
                    {item?.is_default ? (
                      <BiCheck className='text-4xl primaryColor' />
                    ) : (
                      <button
                        className='primary1 semiBOld rounded-md text-white px-6 py-2 w-fit'
                        onClick={() => {
                          dispatch(fetchSetDefaultAddress(item?.id)).then(
                            () => {
                              dispatch(fetchAddress());
                            }
                          );
                        }}>
                        Pilih
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
