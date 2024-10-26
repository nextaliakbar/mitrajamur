/** @format */

import Link from "next/link";
import Image from "next/image";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { fetchSummaryCart } from "../../features/cart/cartSlice";
import {
  fetchAddress,
  fetchDefaultAddress,
} from "../../features/address/addressSlice";
import {
  fetchCheckout,
  fetchOngkir,
  setNotes,
  setOngkir,
  setShipMethod,
  setShipmentService,
} from "../../features/checkout/checkoutSlice";
import { useRouter } from "next/router";
import { setDefaultAddress } from "../../features/layout/LayoutSlice";

export default function MobileView() {
  const dispatch = useAppDispatch();
  const defaultAddress = useAppSelector(
    (state) => state.address.defaultAddress
  );
  console.log("defaultAddress", defaultAddress);

  const listCart = useAppSelector((state) => state.cart.listCart);
  const summaryCart = useAppSelector((state) => state.cart.summaryCart);
  console.log("listcart", listCart);
  console.log("summaryCart", summaryCart);

  const listOngkir = useAppSelector((state) => state.checkout.listOngkir);
  console.log("listOngkir", listOngkir);

  const shipMode = useAppSelector((state) => state.checkout.shipMethod);
  console.log("shipMode", shipMode);

  const shipmentService = useAppSelector(
    (state) => state.checkout.shipmentService
  );
  console.log("shipmentService", shipmentService);
  const ongkir = useAppSelector((state) => state.checkout.ongkir);
  console.log("ongkir", ongkir);
  const notes = useAppSelector((state) => state.checkout.notes);
  console.log("notes", notes);

  useEffect(() => {
    dispatch(fetchSummaryCart());
    dispatch(fetchDefaultAddress());
  }, [dispatch]);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const handleShipMode = (e: any) => {
    const selectedShipMode = e.target.value;

    if (selectedShipMode === 'cac') {
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
    try {
      const resultAction = dispatch(
        fetchCheckout({
          shipping_method: shipMode,
          courier: shipMode === 'cac'? "" : shipmentService,
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
        })
      );
      console.log("resultAction", resultAction);
      router.push("/transaction");
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
    <div className='black h-screen'>
      <Link
        href={"/cart"}
        className='topBar fixed z-50 border-b-2 bg-white top-0 right-0 left-0 flex space-x-3.5 py-4 px-8'>
        <AiOutlineArrowLeft className='w-6 h-6' />
        <p className='TextMedium semiBold'>Checkout</p>
      </Link>

      <div className='divide-y mx-8 mt-20'>
        <p className='TextMedium bold black'>Alamat Pengiriman</p>
        <div className='grid grid-cols-1 md:grid-cols-7 gap-4 my-5'>
          <div className='col-span-4'>
            <div className='divide-y'>
              {defaultAddress === null ? (
                <>
                  <div className='actionButton flex flex-col'>
                    <span className='TextXSmall text-red-500 mb-2'>
                      *Alamat belum ditambahkan
                    </span>
                    <Link href={'/address/add'} className='py-2 px-4 btn-custom primary1 text-white font-bold w-fit rounded-md text-xs'>
                      Tambah Alamat
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className='address TextXSmall regular py-4'>
                    <p className='TextSmall bold black'>
                      {defaultAddress?.name} ({defaultAddress?.label})
                    </p>
                    <p>{defaultAddress?.phone}</p>
                    <p>{defaultAddress?.address}</p>
                  </div>
                  <div className='actionButton py-4'>
                    <button
                      className='py-2 px-4 border4 font-bold w-fit rounded-md'
                      onClick={() => {
                        dispatch(fetchAddress()).then((res: any) => {
                          dispatch(setDefaultAddress(res.payload[0].id));
                          router.push("/address/coice");
                        });
                      }}>
                      Pilih Alamat Lainnya
                    </button>
                  </div>
                </>
              )}

              <div className='w-full py-2'>
                <div className='divide-y'>
                  <p className='TextMedium bold py-4'>RIncian Belanja</p>
                  <div className='py-2'>
                    {listCart?.length > 0
                      ? listCart?.map((item) => (
                          <div
                            className='flex space-x-2 w-full h-fit my-2'
                            key={item?.id}>
                            <div className='product-img shrink-0 relative rounded-md overflow-hidden h-16 w-16'>
                              <Image
                                src={item?.thumbnail}
                                alt='product image'
                                fill
                                objectFit='cover'
                              />
                            </div>
                            <div className='desc flex flex-col justify-between TextXSmall regular black w-full'>
                              <div className='top'>
                                <h5 className='title TextSmall'>
                                  {item?.name}
                                </h5>
                                <div className='text-desc flex items-center gap-x-1'>
                                  <p className='text1 px-1 light py-0.5 bg4 rounded-sm'>
                                    {item?.discount}%
                                  </p>
                                  <p className='line-through'>
                                    {formatter.format(item?.product_price)}
                                  </p>
                                  <p className='semiBold'>
                                    {formatter.format(
                                      item?.price_after_discount
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div className='foot flex justify-between w-full'>
                                <div className='qty'>
                                  <p>
                                    <b>{item?.quantity}</b> barang
                                  </p>
                                </div>
                                <div className='price'>
                                  <p className='text-sm font-semibold'>
                                    {formatter.format(
                                      item?.total_price_product
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </div>

              <div className='shipmentTitle py-4'>
                <p className='TextMedium bold'>Metode Pengiriman</p>
              </div>

              <div className='choseMetode flex flex-col gap-2 py-4'>
                <select
                  className='select select-bordered select-sm w-full TextXSmall semiBold'
                  onChange={handleShipMode}>
                  <option disabled selected>
                    Pilih Metode Pengiriman
                  </option>
                  <option value='cod'>Expedisi</option>
                  <option value='cac'>Ambil ditempat</option>
                </select>
                {shipMode === "cod" && (
                  <div className='btn-group flex flex-col gap-y-2 py-2'>
                    {listOngkir?.length > 0 &&
                      listOngkir?.map((item) => (
                        <div
                          className='btn-group flex flex-col gap-y-2'
                          key={item?.code}>
                          <p className='text-sm font-semibold'>{item?.name}</p>
                          {item?.costs?.length > 0 &&
                            item?.costs?.map((cost) => (
                              <button
                                className={
                                  shipmentService ===
                                  item?.name + " - " + cost?.service
                                    ? "btn-sm primaryColor primaryBorder TextXSmall rounded-md flex justify-between items-center semiBold"
                                    : "btn-sm border3 balck TextXSmall regular rounded-md flex justify-between items-center"
                                }
                                key={cost?.service}
                                onClick={() => {
                                  dispatch(setOngkir(cost?.cost[0]?.value));
                                  dispatch(
                                    setShipmentService(
                                      item?.name + " - " + cost?.service
                                    )
                                  );
                                }}>
                                <p>{cost?.service}</p>
                                <p>{formatter.format(cost?.cost[0]?.value)}</p>
                              </button>
                            ))}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className='payment divide-y'>
                <p className='TextMedium bold py-4'>
                  Catatan untuk penjual{" "}
                  <span className='text-red-500'>*opsional</span>
                </p>

                <div className='choseMetode flex flex-col gap-2 py-4'>
                  <textarea
                    className='textarea h-24 textarea-bordered textarea-sm w-full'
                    placeholder='Tulis catatan untuk penjual disini'
                    onChange={(e) => {
                      dispatch(setNotes(e.target.value));
                    }}></textarea>
                </div>
              </div>

              <div className='paymentDesc pb-4'>
                <p className='TextMedium bold py-4'>Ringkasan Pembayaran</p>
                <div className='list TextXSmall regular black'>
                  <div className='flex justify-between'>
                    <p>Total Harga ({summaryCart?.total_product} Barang)</p>
                    <p>
                      {formatter.format(
                        summaryCart?.total_price_before_discount
                      )}
                    </p>
                  </div>
                  <div className='discount flex justify-between text-sm'>
                    <p>Total Diskon</p>
                    <p>
                      -{formatter?.format(summaryCart?.total_discount_price)}
                    </p>
                  </div>
                  <div className='ongkir flex justify-between text-sm'>
                    <p>Total Ongkos Kirim</p>
                    <p>{formatter.format(ongkir)}</p>
                  </div>
                  <div className='admin flex justify-between text-sm'>
                    <p>Biayan Layanan</p>
                    <p>{formatter.format(6000)}</p>
                  </div>
                </div>
              </div>

              <div className='flex justify-between black TextSmall bold mb-32  pt-4'>
                <p>Total Tagihan</p>
                <p>{formatter.format(grand_total)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='bottom-action bg-white fixed flex justify-between bottom-0 right-0 left-0 py-4 px-8 shadowBold'>
        <div className='desc'>
          <p className='TextXSmall regular text1'>Total Tagihan</p>
          <p className='TextMedium semiBold black'>
            {formatter.format(grand_total)}
          </p>
        </div>
        <button
          className='actio TextSmall semiBold primary1 text-white py-2 px-4 rounded-md'
          onClick={handleCheckout}>
          Proses Checkout
        </button>
      </div>
    </div>
  );
}
