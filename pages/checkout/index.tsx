/** @format */

import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import { BiMinus, BiPlus } from "react-icons/bi";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchDefaultAddress } from "../../features/address/addressSlice";
import {
  fetchCheckout,
  fetchOngkir,
  setNotes,
  setOngkir,
  setShipMethod,
  setShipmentService,
} from "../../features/checkout/checkoutSlice";
import { fetchSummaryCart } from "../../features/cart/cartSlice";
import PrivateRoute from "../../components/PrivateRoute";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import MobileView from "./MobileView";

export default function index() {
  const dispatch = useAppDispatch();
  const defaultAddress = useAppSelector(
    (state) => state.address.defaultAddress
  );
  const listCart = useAppSelector((state) => state.cart.listCart);
  const summaryCart = useAppSelector((state) => state.cart.summaryCart);
  const listOngkir = useAppSelector((state) => state.checkout.listOngkir);
  const shipMode = useAppSelector((state) => state.checkout.shipMethod);
  const shipmentService = useAppSelector(
    (state) => state.checkout.shipmentService
  );
  const ongkir = useAppSelector((state) => state.checkout.ongkir);
  const notes = useAppSelector((state) => state.checkout.notes);

  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    dispatch(fetchSummaryCart());
    dispatch(fetchDefaultAddress());
  }, [dispatch]);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const handleShipMode = (e) => {
    const selectedShipMode = e.target.value;

    if (selectedShipMode === "cac") {
      dispatch(setOngkir(0));
    } else {
      dispatch(
        fetchOngkir({
          destination: defaultAddress?.subdistrict_id,
          weight: summaryCart?.total_weight,
        })
      );
    }

    dispatch(setShipMethod(selectedShipMode));
  };

  const router = useRouter();

  const handleCheckout = () => {
    if (!paymentMethod) {
      toast.error("Harap pilih metode pembayaran.");
      return;
    }

    try {
      const resultAction = dispatch(
        fetchCheckout({
          shipping_method: shipMode,
          courier: shipMode === "cac" ? "" : shipmentService,
          courier_cost: ongkir,
          weight: summaryCart?.total_weight,
          total_price: summaryCart?.total_price,
          total_discount: summaryCart?.total_discount_price,
          total_shipping: ongkir,
          service_fee: 6000,
          grand_total:
            summaryCart?.total_price +
            ongkir +
            6000 -
            summaryCart?.total_discount_price,
          notes: notes,
          payment_method: paymentMethod, // Kirim metode pembayaran
        })
      );
      console.log("resultAction", resultAction);
      router.push("/dashboard");
    } catch (error) {
      console.log("error", error);
    }
  };

  const grand_total =
    summaryCart?.total_price +
    ongkir -
    summaryCart?.total_discount_price +
    6000;

  return (
    <PrivateRoute>
      <div className="hidden md:block">
        <Layout>
          <section className="mx-auto lg:max-w-6xl px-8 md:px-16 TextSmall regular black">
            <div className="TextSmall breadcrumbs">
              <ul>
                <li>
                  <Link href="/">
                    <strong>Home</strong>
                  </Link>
                </li>
                <li>
                  <Link href="/cart">
                    <strong>Keranjang Belanja</strong>
                  </Link>
                </li>
                <li>Checkout</li>
              </ul>
            </div>
            <div className="divider"></div>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 my-5">
              <div className="col-span-4">
                <div className="divide-y">
                  <p className="TextLarge bold m-0 pb-4">Alamat Pengiriman</p>
                  {defaultAddress === null ? (
                    <>
                      <div className="actionButton flex flex-col">
                        <span className="text-red-500 mb-2">
                          *Alamat belum ditambahkan
                        </span>
                        <button className="py-2 px-4 btn-custom primary1 text-white bold w-fit rounded-md">
                          Tambah Alamat
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="address py-3">
                        <p className="TextMedium bold">
                          {defaultAddress?.name} ({defaultAddress?.label})
                        </p>
                        <p>{defaultAddress?.phone}</p>
                        <p>{defaultAddress?.address}</p>
                      </div>
                      <div className="actionButton py-3">
                        <button className="py-1.5 px-4 btn-custom border3 font-bold w-fit rounded-md text-xs">
                          Pilih Alamat Lainnya
                        </button>
                      </div>
                    </>
                  )}
                  <div className="shipmentTitle py-3">
                    <p className="TextLarge bold">Metode Pengiriman</p>
                  </div>

                  <div className="choseMetode flex flex-col gap-2 py-3">
                    <select
                      className="select select-bordered select-sm w-full"
                      onChange={handleShipMode}
                    >
                      <option className="semiBold" disabled selected>
                        Pilih Metode Pengiriman
                      </option>
                      <option value="cod">Expedisi</option>
                      <option value="cac">Ambil ditempat</option>
                    </select>
                    {shipMode === "cod" && (
                      <div className="btn-group flex flex-col gap-y-2">
                        {listOngkir?.length > 0 &&
                          listOngkir?.map((item) => (
                            <div
                              className="btn-group flex flex-col gap-y-2"
                              key={item?.code}
                            >
                              <p className="text-sm font-semibold">
                                {item?.name}
                              </p>
                              {item?.costs?.length > 0 &&
                                item?.costs?.map((cost) => (
                                  <button
                                    className={
                                      shipmentService ===
                                      item?.name + " - " + cost?.service
                                        ? "btn-sm primaryColor primaryBorder rounded-md flex justify-between items-center semiBold"
                                        : "btn-sm outline outline-1 outline-gray-300 rounded-md flex justify-between items-center"
                                    }
                                    key={cost?.service}
                                    onClick={() => {
                                      dispatch(setOngkir(cost?.cost[0]?.value));
                                      dispatch(
                                        setShipmentService(
                                          item?.name + " - " + cost?.service
                                        )
                                      );
                                    }}
                                  >
                                    <p>{cost?.service}</p>
                                    <p>
                                      {formatter.format(cost?.cost[0]?.value)}
                                    </p>
                                  </button>
                                ))}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  <div className="payment">
                    <p className="TextLarge bold py-3">
                      Catatan untuk penjual <span className="text-red-500">*opsional</span>
                    </p>

                    <div className="choseMetode flex flex-col gap-2 py-2">
                      <textarea
                        className="textarea h-24 textarea-bordered textarea-sm w-full"
                        placeholder="Tulis catatan untuk penjual disini"
                        onChange={(e) => {
                          dispatch(setNotes(e.target.value));
                        }}
                      ></textarea>
                    </div>
                  </div>

                  <div className="paymentMethod py-3">
                    <p className="TextLarge bold">Metode Pembayaran</p>
                    <select
                      className="select select-bordered select-sm w-full"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option disabled selected>
                        Pilih Metode Pembayaran
                      </option>
                      <option value="COD">Cash On Delivery (COD)</option>
                      <option value="Transfer">Transfer Bank</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-span-3 p-6 rounded-xl shadowHight h-fit">
                <div className="divide-y">
                  <p className="TextLarge semiBold mb-3">Rincian Belanja</p>
                  {listCart?.length > 0
                    ? listCart?.map((item) => (
                        <div className="" key={item?.id}>
                          <div className="flex justify-between items-center py-3">
                            <div className="flex space-x-3 items-center">
                              <div className="product-img shrink-0 relative rounded-md overflow-hidden h-12 w-12">
                                <Image
                                  src={item?.thumbnail}
                                  alt="product image"
                                  fill
                                  objectFit="cover"
                                />
                              </div>
                              <div className="desc text-xs">
                                <h5 className="TextXSmall mb-2">
                                  <strong>{item?.quantity} x</strong> {item?.name}
                                </h5>
                                <div className="text-desc flex items-center gap-x-1">
                                  <p className="bg4 Text1 px-1 TextXSmall rounded-sm">
                                    {item?.discount}%
                                  </p>
                                  <p className="line-through TextXSmall">
                                    {formatter.format(item?.product_price)}
                                  </p>
                                  <p className="TextXSmall font-bold">
                                    {formatter.format(item?.price_after_discount)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : null}
                  <div className="Pricing py-3 TextMedium regular">
                    <div className="price flex justify-between">
                      <p>Total Harga ({summaryCart?.total_product} Barang)</p>
                      <p>
                        {formatter.format(
                          summaryCart?.total_price_before_discount
                        )}
                      </p>
                    </div>
                    <div className="discount flex justify-between">
                      <p>Total Diskon</p>
                      <p>
                        -{formatter?.format(summaryCart?.total_discount_price)}
                      </p>
                    </div>
                    <div className="ongkir flex justify-between">
                      <p>Total Ongkos Kirim</p>
                      <p>{formatter.format(ongkir)}</p>
                    </div>
                    <div className="admin flex justify-between">
                      <p>Biaya Layanan</p>
                      <p>{formatter.format(6000)}</p>
                    </div>
                  </div>

                  <div className="cashAction py-2 text-xl font-bold">
                    <div className="PriceTotal flex justify-between mb-2">
                      <p>Total Pembayaran</p>
                      <p>{formatter.format(grand_total)}</p>
                    </div>
                    <div className="btn-group flex flex-col space-y-2 TextLarge semiBold">
                      <button
                        className="btn-sm flex items-center justify-center primary1 text-white py-2 px-4 rounded-md"
                        onClick={handleCheckout}
                      >
                        Proses Pembayaran
                      </button>

                      <button className="btn-sm flex items-center justify-center scale5Border primaryColor py-2 px-4 rounded-md">
                        Lanjut Belanja
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </div>
      <div className="block md:hidden">
        <MobileView />
      </div>
    </PrivateRoute>
  );
}
