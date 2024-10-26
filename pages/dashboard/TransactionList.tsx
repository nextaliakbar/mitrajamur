/** @format */
import Image from "next/image";
import TransactionDetail from "./TransactionDetail";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchTracking,
  fetchTransaction,
  fetchTransactionDetail,
  setModalDetail,
  setModalTracking,
} from "../../features/checkout/checkoutSlice";
import { useEffect } from "react";
import Script from "next/script";
import Lacak from "../../components/Lacak";

export default function TransactionList() {
  const dispatch = useAppDispatch();
  const modalDetail = useAppSelector((state) => state.checkout.modalDetail);
  const modalTracking = useAppSelector((state) => state.checkout.modalTracking);

  const listTransaction = useAppSelector(
    (state) => state.checkout.listTransaction
  );

  useEffect(() => {
    dispatch(fetchTransaction());
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

  useEffect(() => {
    const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = "SB-Mid-client-0H--sK_7opBV4J_s"; //change this according to your client-key

    const script = document.createElement("script");
    script.src = snapSrcUrl;
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className='col-span-3 TextSmall regular black'>
      <p className='font-bold text-2xl mb-7'>Riwayat Transaksi</p>
      <div className='divide-y border border-gray-300 p-7 rounded-md space-y-6'>
        {listTransaction.length > 0 &&
          listTransaction.map((item) => (
            <div className='ordered shadowLow p-7 rounded-md' key={item?.id}>
              <p className='pb-2'>
                <span className='primary2 semiBold text1 px-2 py-0.5 rounded-md mr-1'>
                  {item?.transaction_status}
                </span>{" "}
                {dateFormater(item?.transaction_date)}{" "}
                {item?.transaction_invoice}
              </p>
              {item?.product?.length > 0 &&
                item?.product.map((product) => (
                  <div
                    className='list flex justify-between divide-x py-2'
                    key={product?.order_id}>
                    <div className='desc flex space-x-3.5'>
                      <div className='itemImg relative rounded-md h-28 w-28 overflow-hidden'>
                        <Image
                          src={product?.product_thumbnail}
                          alt='product'
                          fill
                          objectFit='cover'
                        />
                      </div>
                      <div className='itemDesc flex flex-col justify-between TextLarge semiBold'>
                        <div className='info py-1'>
                          <p>{product?.product_name}</p>
                          <p className='TextMedium'>
                            {product?.product_quantity}{" "}
                            <span className='text3'>barang</span> x{" "}
                            {formatter.format(Number(product?.product_price))}
                          </p>
                        </div>
                        {/* <button className='bg-gray-700 hover:bg-gray-900 rounded-md text-white px-2 py-0.5 w-fit'>
                          Beri Ulasan
                        </button> */}
                      </div>
                    </div>
                    <div className='priceTotal pl-8'>
                      <p className='TextMedium text3 regular'>Total</p>
                      <p className='TextLarge bold'>
                        {formatter.format(Number(product?.total_product_price))}
                      </p>
                    </div>
                  </div>
                ))}

              <div className='flex justify-end items-center'>
                <div className='flex space-x-4'>
                  {modalDetail && <TransactionDetail />}
                  {modalTracking && <Lacak />}
                  <button
                    className='scale5Border primaryColor semiBold rounded-md  px-3.5 py-1'
                    onClick={() => {
                      dispatch(fetchTransactionDetail(item?.id));
                      dispatch(setModalDetail(true));
                    }}>
                    Detail Transaksi
                  </button>
                  {item?.transaction_status === "Menunggu Pembayaran" ? (
                    <button
                      className='primary1 semiBold rounded-md text-white px-3.5 py-1'
                      onClick={() => {
                        (window as any).snap.pay(item?.snap_token, {
                          onSuccess: function (result: any) {
                            // console.log("success", result);
                          },
                        });
                      }}>
                      Bayar Sekarang
                    </button>
                  ) : item?.transaction_status === "Pengiriman" ? (
                    <button
                      className='primary1 semiBold rounded-md text-white px-3.5 py-1'
                      onClick={() => {
                        dispatch(fetchTracking(item?.id)).then((res) => {
                          dispatch(setModalTracking(true));
                        });
                      }}>
                      Lacak
                    </button>
                  ) : null}
                </div>
                <div className='priceTotal pl-5'>
                  <p className='TextMedium text3 regular'> Total Belanja</p>
                  <p className='TextLarge bold'>
                    {formatter.format(Number(item?.grand_total))}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
