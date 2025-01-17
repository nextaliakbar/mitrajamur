/** @format */

import Link from "next/link";
import { AiOutlineArrowLeft, AiOutlineClockCircle, AiOutlineSync, AiOutlineCar, AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import PrivateRoute from "../../components/PrivateRoute";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import {
  fetchTransaction,
  fetchTransactionDetail,
} from "../../features/checkout/checkoutSlice";
import Review from "./components/Review";
import { setReviewOrder } from "../../features/product/ProductSlice";
import { fetchDetailReview } from "../../features/review/reviewSlice";
import { Toaster, toast } from "react-hot-toast";

export default function index() {
  const dispatch = useAppDispatch();

  const listTransaction = useAppSelector(
    (state) => state.checkout.listTransaction
  );
  const isLoading = useAppSelector((state) => state.checkout.isLoading);

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

  const handlePayment = (snapToken: string) => {
    if (confirm("Apakah Anda yakin ingin melakukan pembayaran?")) {
      (window as any).snap.pay(snapToken, {
        onSuccess: function (result: any) {
          toast.success("Pembayaran berhasil!");
        },
        onError: function (error: any) {
          toast.error("Pembayaran gagal. Silakan coba lagi.");
        },
      });
    }
  };

  useEffect(() => {
    dispatch(fetchTransaction())
      .unwrap()
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        toast.error("Gagal memuat daftar transaksi, silakan coba lagi.");
      });

    const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY; // Gunakan environment variable

    const script = document.createElement("script");
    script.src = snapSrcUrl;
    script.setAttribute("data-client-key", myMidtransClientKey || "");
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [dispatch]);

  return (
    <PrivateRoute>
      <div className='black h-screen TextXSmall regular black'>
        <Link
          href={'/dashboard'}
          className='topBar fixed z-50 border-b-2 bg-white top-0 right-0 left-0 flex space-x-3.5 py-4 px-8'>
          <AiOutlineArrowLeft className='w-6 h-6' />
          <p className='TextMedium semiBold'>Daftar Transaksi</p>
        </Link>

        <Toaster position='bottom-center' reverseOrder={true} />

        <div className='items mx-8 mt-20 space-y-4'>
          {isLoading ? (
            <div className='text-center'>
              <div className='loader'></div> {/* Atur CSS untuk spinner */}
              <p className='text-gray-500'>Memuat transaksi...</p>
            </div>
          ) : listTransaction.length > 0 ? (
            listTransaction.map((item) => (
              <div
                className='item shadowLow p-4 rounded-md divide-y'
                key={item?.id}>
                <div className='top pb-2 flex justify-between'>
                  <p>{dateFormater(item?.transaction_date)}</p>
                  <p
                    className={`text-white semiBold px-2 py-0.5 rounded-md ${
                      item?.transaction_status === "Menunggu Pembayaran"
                        ? "bg-yellow-500"
                        : item?.transaction_status === "Sedang Diproses"
                        ? "bg-blue-500"
                        : item?.transaction_status === "Pengiriman"
                        ? "bg-orange-500"
                        : item?.transaction_status === "Selesai"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}>
                    <span className='icon mr-2'>
                      {item?.transaction_status === "Menunggu Pembayaran" && <AiOutlineClockCircle />}
                      {item?.transaction_status === "Sedang Diproses" && <AiOutlineSync />}
                      {item?.transaction_status === "Pengiriman" && <AiOutlineCar />}
                      {item?.transaction_status === "Selesai" && <AiOutlineCheckCircle />}
                      {item?.transaction_status === "Dibatalkan" && <AiOutlineCloseCircle />}
                    </span>
                    {item?.transaction_status}
                  </p>
                </div>

                <div className='items py-2 space-y-2'>
                  {item?.product?.length > 0 &&
                    item?.product.map((product) => (
                      <div
                        className='item flex space-x-3.5'
                        key={product?.order_id}>
                        <div className='product-img relative h-16 w-16 rounded-lg overflow-hidden shrink-0'>
                          <Image
                            src={product?.product_thumbnail}
                            alt='product image'
                            fill
                            objectFit='cover'
                          />
                        </div>
                        <div className='desc'>
                          <p className='semiBold'>
                            {product?.product_name.length > 20
                              ? product?.product_name.substring(0, 20) + "..."
                              : product?.product_name}
                          </p>
                          <p className='semiBold'>
                            {product?.product_quantity}{" "}
                            <span className='text3'>barang</span> x{" "}
                            {formatter.format(Number(product?.product_price))}
                          </p>

                          <div className='grid'>
                            {product?.rating === true ? (
                              <Link
                                href={'/review'}
                                className='rounded-md primaryBorder py-0.5 px-4 TextXSmall semiBold text1 mt-1 w-fit'>
                                Lihat Ulasan
                              </Link>
                            ) : null}
                          </div>
                          {item?.transaction_status === "Selesai" &&
                          product?.rating !== true ? (
                            <button
                              className='rounded-md py-0.5 px-4 primary2 TextXSmall semiBold text1 mt-1'
                              onClick={() => {
                                dispatch(fetchDetailReview(product?.order_id));
                                dispatch(setReviewOrder(true));
                              }}>
                              Berikan Ulasan
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ))}
                </div>
                <div className='bottom flex justify-between pt-2'>
                  <div className='left'>
                    <p className='text3 regular'>Total Belanja</p>
                    <p className='TextSmall semiBold'>
                      {formatter.format(Number(item?.grand_total))}
                    </p>
                  </div>
                  <div className='right flex space-x-2'>
                    {item?.transaction_status === "Menunggu Pembayaran" ? (
                      <button
                        className='rounded-md py-2 px-4 primary1 semiBold text-white'
                        onClick={() => handlePayment(item?.snap_token)}>
                        Bayar
                      </button>
                    ) : (
                      <Link
                        href={`/transaction/tracking/${item?.id}`}
                        className='rounded-md py-2 px-4 primary1 semiBold text-white'>
                        Lacak
                      </Link>
                    )}
                    <Link
                      href={`/transaction/${item?.id}`}
                      onClick={() => {
                        dispatch(fetchTransactionDetail(item?.id));
                      }}
                      className='rounded-md py-2 px-4 primaryColor scale5Border'>
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center text-gray-500'>Belum ada transaksi.</p>
          )}
        </div>
        <Review />
      </div>
    </PrivateRoute>
  );
}
