/** @format */

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PrivateRoute from "../../components/PrivateRoute";
import { fetchTransactionDetail } from "../../features/checkout/checkoutSlice";

export default function Detail() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const slug = router.query.slug as string;

  const detailTransaction = useAppSelector(
    (state) => state.checkout.detailTransaction
  );

  console.log("detailTransaction", detailTransaction);

  useEffect(() => {
    dispatch(fetchTransactionDetail(slug));
  }, []);

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

  return (
    <PrivateRoute>
      <div className='black h-screen'>
        <Link
          href={"/transaction"}
          className='topBar fixed z-50 border-b-2 bg-white top-0 right-0 left-0 flex space-x-3.5 py-4 px-8'>
          <AiOutlineArrowLeft className='w-6 h-6' />
          <p className='TextMedium semiBold'>Detail Transaksi</p>
        </Link>
        <div className='divide-y mx-8 mt-20 TextXSmall regular black'>
          <div className='header grid grid-cols-3 gap-y-1 pb-4'>
            <p className='col-span-1'>No. Invoice</p>
            <p className='col-span-2'>
              : {detailTransaction[0]?.transaction_invoice}
            </p>
            <p className='col-span-1'>Tanggal</p>
            <p className='col-span-2'>
              : {dateFormater(detailTransaction[0]?.transaction_date)}
            </p>
            <p className='col-span-1'>Status</p>
            <p className='col-span-2'>
              :{" "}
              <span className='bg4 px-1 py-0.5 rounded-sm text1'>
                {detailTransaction[0]?.payment_method === 'COD' && detailTransaction[0]?.transaction_status === 'Pending'
                  ? 'Menunggu Pembayaran di Tempat'
                  : detailTransaction[0]?.transaction_status}
              </span>
            </p>
          </div>
          <div className='shipment py-4'>
            <p className='TextSmall semiBold pb-2'>Informasi Pengiriman</p>
            <div className='desc'>
              <div className='header grid grid-cols-3 gap-y-1 pb-4'>
                <p className='col-span-1'>Kurir</p>
                <p className='col-span-2'>: {detailTransaction[0]?.courier}</p>
                <p className='col-span-1'>No. Resi</p>
                <p className='col-span-2'>
                  : {detailTransaction[0]?.receipt_number}
                </p>
                <p className='col-span-1'>Alamat</p>
                <p className='col-span-2'>
                  : {detailTransaction[0]?.customer_address}
                </p>
              </div>
            </div>
          </div>
          <div className='product py-4'>
            <p className='TextSmall semiBold'>Daftar Produk</p>
            <div className='items divide-y w-full'>
              {detailTransaction[0]?.product?.length > 0 &&
                detailTransaction[0]?.product.map((product) => (
                  <div
                    className='item flex space-x-3 py-2'
                    key={product?.order_id}>
                    <div className='img relative h-16 w-16 rounded-xl overflow-hidden shrink-0'>
                      <Image
                        src={product?.product_thumbnail}
                        layout='fill'
                        objectFit='cover'
                        alt='produk'
                      />
                    </div>
                    <div className='desc w-full'>
                      <p className='TextSmall regular truncate'>
                        {product?.product_name}
                      </p>
                      <p className='TextXSmall semiBold'>
                        {product?.product_quantity} x {product?.product_price}
                      </p>
                      <p className='TextSmall semiBold text-end'>
                        {formatter.format(product?.total_product_price)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className='payment py-4'>
            <p className='TextSmall semiBold'>Rincian Pembayaran</p>
            <div className='grid grid-cols-5 gap-y-1'>
              <p className='col-span-2'>Metode Pembayaran</p>
              <p className='col-span-3'>
                : {detailTransaction[0]?.payment_method === 'COD' ? 'Cash On Delivery' : detailTransaction[0]?.payment_method}
              </p>
              <p className='col-span-2'>Harga</p>
              <p className='col-span-3'>
                : {formatter.format(detailTransaction[0]?.total_price)}
              </p>
              <p className='col-span-2'>Ongkos Kirim</p>
              <p className='col-span-3'>
                : {formatter.format(detailTransaction[0]?.courier_cost)}
              </p>
              <p className='col-span-2'>Total Diskon</p>
              <p className='col-span-3'>
                : {formatter.format(detailTransaction[0]?.total_discount)}
              </p>
              <p className='col-span-2'>Biaya Layanan</p>
              <p className='col-span-3'>
                : {formatter.format(detailTransaction[0]?.service_fee)}
              </p>
              <p className='col-span-2'>Total Pembayaran</p>
              <p className='col-span-3'>
                : {formatter.format(detailTransaction[0]?.grand_total)}
              </p>
              {detailTransaction[0]?.payment_method === 'COD' && (
                <p className='col-span-5 text-center text-yellow-500 mt-2'>
                  <strong>Pembayaran akan dilakukan di lokasi pengiriman.</strong>
                </p>
              )}
            </div>
          </div>

          {/*<div className='grid py-4'>*/}
          {/*  <button className='primaryBg text-white TextSmall semiBold rounded-md py-2'>*/}
          {/*    Cetak*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      </div>
    </PrivateRoute>
  );
}
