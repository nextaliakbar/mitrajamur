/** @format */

import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setModalDetail } from "../../features/checkout/checkoutSlice";
import { BiX } from "react-icons/bi";
import { AiFillPrinter } from "react-icons/ai";
import Image from "next/image";
import ReactToPrint from "react-to-print";

export default function TransactionDetail() {
  const dispatch = useAppDispatch();

  const detailTransaction = useAppSelector(
    (state) => state.checkout.detailTransaction
  );
  console.log("detailTransaction", detailTransaction);
  const handleClose = () => {
    dispatch(setModalDetail(false));
  };

  const dateFormater = (date: string) => {
    const dateFormated = new Date(date);
    const day = dateFormated.getDate();
    const month = dateFormated.getMonth();
    const year = dateFormated.getFullYear();
    const monthName = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return `${day} ${monthName[month]} ${year}`;
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const componentRef: any = useRef();

  return (
    <div className='relative z-10'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
            <div className='bg-white p-3'>
              <div className='content text-xs'>
                <div className='flex justify-between bg-white'>
                  <h3 className='text-sm font-semibold'>Detail Transaksi</h3>
                  <button onClick={handleClose} className='text-gray-500'>
                    <BiX className='text-2xl' />
                  </button>
                </div>
                <div
                  ref={componentRef}
                  className='print bg-gray-300  flex flex-col space-y-0.5 rounded-md'>
                  <div className='flex flex-col space-y-1 bg-white px-3 py-1'>
                    <div className='flex justify-between'>
                      <p className='text-gray-500'>No. Invoince</p>
                      <p>{detailTransaction[0]?.transaction_invoice}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='text-gray-500'> Tanggal Pemesanan</p>
                      <p>
                        {dateFormater(detailTransaction[0]?.transaction_date)}
                      </p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='text-gray-500'>Status</p>
                      <p className='badge badge-accent badge-sm'>
                        {detailTransaction[0]?.transaction_status}
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-col space-y-1 bg-white px-3 py-1'>
                    <p className='font-semibold'>Info Pengiriman</p>
                    <table>
                      <tr>
                        <td>Kurir</td>
                        <td>: {detailTransaction[0]?.courier}r</td>
                      </tr>
                      <tr>
                        <td>No. Resi</td>
                        <td>
                          :{" "}
                          {detailTransaction[0]?.receipt_number
                            ? detailTransaction[0]?.receipt_number
                            : "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>Alamat</td>
                        <td>: {detailTransaction[0]?.customer_address}</td>
                      </tr>
                    </table>
                  </div>
                  <div className='flex flex-col space-y-1 bg-white px-3 py-1'>
                    <p className='font-semibold'>Daftar Produk</p>
                    {detailTransaction[0]?.product?.length > 0 &&
                detailTransaction[0]?.product.map((product) => (
                          <div className='list flex justify-between my-2' key={product?.order_id}>
                            <div className='desc flex space-x-2'>
                              <div className='itemImg relative rounded-md h-14 w-14 overflow-hidden'>
                                <Image
                                  src={product?.product_thumbnail}
                                  alt='product'
                                  fill
                                  objectFit='cover'
                                />
                              </div>
                              <div className='itemDesc flex flex-col justify-between text-xs'>
                                <div className='info py-1'>
                                  <p>
                                    {product?.product_name}{" "}
                                  </p>
                                  <p>{product?.product_quantity} x   {formatter.format(Number(product?.product_price))}</p>
                                </div>
                              </div>
                            </div>
                            <div className='priceTotal pl-5'>
                              <p className=''>Total Harga</p>
                              <p className='font-semibold'>{formatter.format(Number(product?.total_product_price))}</p>
                            </div>
                          </div>
                        ))}
                  </div>
                  <div className='flex flex-col space-y-1 bg-white px-3 py-1'>
                    <p className=' font-semibold'>Rincian Pembayaran</p>
                    <div className='flex justify-between'>
                      <p className='text-gray-500'>Metode Pembayaran</p>
                      <p>{detailTransaction[0]?.payment_method}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='text-gray-500'>Harga</p>
                      <p>{formatter.format(Number(detailTransaction[0]?.total_price))}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='text-gray-500'>Ongkos Kirim</p>
                      <p>{formatter.format(Number(detailTransaction[0]?.courier_cost))}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='text-gray-500'>Total Diskon</p>
                      <p>{formatter.format(Number(detailTransaction[0]?.total_discount))}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='text-gray-500'>Biaya Layanan</p>
                      <p>{formatter.format(Number(detailTransaction[0]?.service_fee))}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='text-gray-500'>Total Pembayaran</p>
                      <p>{formatter.format(Number(detailTransaction[0]?.grand_total))}</p>
                    </div>
                  </div>
                </div>
                <div className='flex justify-end bg-white'>
                  <ReactToPrint
                    trigger={() => (
                      <button className='flex items-center space-x-1 bg-gray-500 text-white hover:bg-gray-900 px-2 py-1 rounded-sm mt-2'>
                        <AiFillPrinter />
                        <span>Cetak Invoice</span>
                      </button>
                    )}
                    content={() => componentRef.current}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
