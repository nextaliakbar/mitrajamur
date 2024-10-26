/** @format */

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { BiCart, BiHeart, BiMinus, BiPlus, BiShareAlt } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchDetailProduct,
  setShowShare,
} from "../../../features/product/ProductSlice";
import { useRouter } from "next/router";
import { fetchAddCart, setQuantity } from "../../../features/cart/cartSlice";
import { toast } from "react-hot-toast";
import { Rating } from "react-simple-star-rating";
import Share from "../../../components/Share";
import {
  fetchAddWislist,
  fetchWishlistStatus,
} from "../../../features/wishlist/WishlistSlice";
import { AiFillStar } from "react-icons/ai";

export default function detail() {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState(null) as any;
  console.log("productDeatile", product);
  const quantity = useAppSelector((state) => state.cart.quantity);
  const wishlistStatus = useAppSelector(
    (state) => state.wishlist.WishlistStatus
  );
  console.log("wishlistStatus", wishlistStatus);
  console.log("quantity", quantity);

  console.log(product, "product");

  const router = useRouter();
  const slug = router.query.slug as string;

  useEffect(() => {
    dispatch(fetchDetailProduct(slug)).then((res) => {
      setProduct(res.payload);
    });
    dispatch(fetchWishlistStatus({ slug: slug }));
  }, [dispatch, slug]);

  const thumbnail = product?.product?.thumbnail;

  const stock = Number(product?.product?.stock);

  const [thumb, setThumb] = React.useState();

  useEffect(() => {
    setThumb(thumbnail);
  }, [thumbnail]);

  const [tab, setTab] = React.useState("description");

  const tags = product?.product?.tags?.split(",").map((item: any) => {
    return item.replace(/[\[\]"]+/g, "");
  });

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    if (newQuantity <= stock) {
      dispatch(setQuantity(newQuantity));
    }
  };

  const handleDecrement = () => {
    const newQuantity = quantity - 1;
    if (quantity > 0) {
      dispatch(setQuantity(newQuantity));
    }
  };

  const handleChangeQuantity = (e: any) => {
    const newQuantity = e.target.value;
    dispatch(setQuantity(newQuantity));
  };

  const handleAddToCart = () => {
    dispatch(
      fetchAddCart({
        product_id: product?.product?.id,
        quantity: quantity,
      })
    ).then((res) => {
      // console.log("response", res);
      if (res.payload.success === true) {
        router.push("/cart");
      }
    });
  };

  const handleAddToWislist = () => {
    dispatch(
      fetchAddWislist({
        product_id: product?.product?.id,
      })
    ).then((res) => {
      if (res.payload.success === true) {
        dispatch(fetchDetailProduct(slug)).then((res) => {
          setProduct(res.payload);
        });
      }
    });
  };

  useEffect(() => {
    dispatch(setQuantity(0));
  }, [dispatch]);

  const formatQty = (qty: number) => {
    const rb = 1000;
    const jt = rb * 1000;
    const m = jt * 1000;
    const t = m * 1000;
    return qty < rb
      ? qty
      : qty < jt
      ? `${(qty / rb).toFixed(1)}rb`
      : qty < m
      ? `${(qty / jt).toFixed(1)}jt`
      : qty < t
      ? `${(qty / m).toFixed(1)}m`
      : `${(qty / t).toFixed(1)}t`;
  };

  const handleShare = () => {
    dispatch(setShowShare(true));
  };
  return (
    <Layout>
      <section className='mx-auto lg:max-w-6xl px-8 md:px-16 text-sm'>
        <div className='text-sm breadcrumbs hidden md:block'>
          <ul>
            <li>
              <Link href='/public'>Home</Link>
            </li>
            <li>
              <Link href='/product'>Product</Link>
            </li>
            <li>Detail</li>
          </ul>
        </div>
      </section>
      <div className='w-full hidden md:block'>
        <div className='divider'></div>
      </div>
      <Share />
      <section className='mx-auto lg:max-w-6xl px-8 md:px-16'>
        {product?.product?.stock === 0 ? (
          <div className='alert alert-error shadow-lg my-5'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='stroke-current flex-shrink-0 h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <div>
                <h3 className='font-bold'>Stok Habis</h3>
                <div className='text-xs'>
                  Anda tidak dapat melanjutkan proses pembelian
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 mt-5 md:mt-0'>
          <div className='productImg'>
            <div className='ThumbImg relative h-60 md:h-80 w-full rounded-md overflow-hidden'>
              <Image
                src={thumb || "https://placehold.jp/150x150.png?text=product"}
                alt='product-detail'
                fill
                objectFit='cover'
                className='cursor-pointer'
              />
            </div>
            <div className='h-16 my-2'>
              <Swiper
                spaceBetween={4}
                slidesPerView={7}
                breakpoints={{
                  1024: {
                    slidesPerView: 7,
                  },
                  768: {
                    slidesPerView: 6,
                  },
                  640: {
                    slidesPerView: 6,
                  },
                  320: {
                    slidesPerView: 4,
                  },
                  0: {
                    slidesPerView: 3,
                  },
                }}>
                {product?.product_images?.length > 0
                  ? product?.product_images?.map((item: any) => (
                      <SwiperSlide key={item.id}>
                        <div
                          className='relative h-16 w-16 rounded-md overflow-hidden'
                          onClick={() => setThumb(item?.image)}>
                          <Image
                            src={item?.image}
                            alt='product-detail'
                            fill
                            objectFit='cover'
                            className='cursor-pointer'
                          />
                        </div>
                      </SwiperSlide>
                    ))
                  : null}
              </Swiper>
            </div>
          </div>
          <div className='productDesc space-y-4'>
            <h1 className='text-lg md:text-2xl semiBold black'>
              {product?.product?.name}
            </h1>
            <div className='discount flex flex-col md:flex-row md:items-center space-y-1 md:justify-between my-2 md:my-0'>
              <div className='left flex items-center gap-x-2'>
                <p className='TextLarge md:text-xl semiBold black'>
                  {formatter.format(product?.product?.price_after_discount)}
                </p>
                {product?.product?.discount > "0" ? (
                  <>
                    <p className='font-semibold TextXSmall md:text-sm text1 bg4 py-0.5 px-2 rounded-sm'>
                      {product?.product?.discount}%
                    </p>
                    <p className='TextXSmall md:text-sm text2 font-semibold line-through leading-8'>
                      {formatter.format(product?.product?.price)}
                    </p>
                  </>
                ) : null}
              </div>
              <div className='right flex items-center gap-x-1'>
                <p className='flex items-center space-x-1 TextXSmall md:text-sm primary1 text-white py-0 px-2 light rounded-sm'>
                  <AiFillStar className='TextXSmall md:text-base text-yellow-400' />
                  <span>{product?.detailProduct?.rating_avg || 0}</span>
                </p>
                <p className='regular TextXSmall md:text-base'>
                  {formatQty(product?.product?.order_quantity || 0)} Terjual
                </p>
              </div>
            </div>

            <div className='product-detail'>
              <p className='black TextMedium md:text-base font-semibold'>
                Detail Product
              </p>
              <div className='black TextXSmall md:text-sm'>
                <div className='mt-2 grid grid-cols-3 gap-2'>
                  <span className='border-2 border-gray-200 pl-1'>SKU:</span>
                  <span className='semiBold border-2 border-gray-200 pl-1'>
                    : {product?.product?.sku || "-"}
                  </span>
                </div>
                <div className='mt-2 grid grid-cols-3 gap-2'>
                  <span className='border-2 border-gray-200 pl-1'>Stok:</span>
                  <span className='semiBold border-2 border-gray-200 pl-1'>
                    : {product?.product?.stock}
                  </span>
                </div>
                <div className='mt-2 grid grid-cols-3 gap-2'>
                  <span className='border-2 border-gray-200 pl-1'>
                    Kategori:
                  </span>
                  <span className='semiBold border-2 border-gray-200 pl-1'>
                    : {product?.product?.category_name}
                  </span>
                </div>
                <div className='mt-2 grid grid-cols-3 gap-2'>
                  <span className='border-2 border-gray-200 pl-1'>
                    Dimensi:
                  </span>
                  <span className='semiBold border-2 border-gray-200 pl-1'>
                    : {product?.product?.dimension}
                  </span>
                </div>
              </div>

              <div className='flex gap-2 my-4 items-center'>
                {tags?.length > 0 || tags !== "null"
                  ? tags?.map((item: any) => (
                      <p className='TextXSmall md:text-base bg4 py-0.5 px-3 rounded-md text1'>
                        {item}
                      </p>
                    ))
                  : "-"}
              </div>

              <div className='flex gap-4 mt-4'>
                <div className='custom-number-input h-7 w-20'>
                  <div className='flex flex-row h-8 w-full rounded-lg relative bg-transparent'>
                    <button
                      onClick={handleDecrement}
                      className={
                        product?.product?.stock === 0
                          ? "flex items-center justify-center bg-gray-200 py-2 px-2 text-gray-400 h-full w-20 rounded-l cursor-pointer"
                          : "flex items-center justify-center primary1 text-white text5 h-full w-20 rounded-l cursor-pointer"
                      }
                      disabled={
                        product?.product?.stock === 0 && quantity === 1
                          ? true
                          : false
                      }>
                      <BiMinus />
                    </button>
                    <input
                      type='number'
                      className={
                        product?.product?.stock === 0
                          ? "bg-gray-200 text-gray-400 outline-none focus:outline-none  text-center w-full font-semibold text-md flex items-center text5"
                          : "outline-none focus:outline-none  text-center w-full primary1 text-white font-semibold text-md flex items-center text5"
                      }
                      name='custom-input-number'
                      value={quantity}
                      onChange={(e) => {
                        handleChangeQuantity(e);
                      }}></input>
                    <button
                      onClick={handleIncrement}
                      className={
                        product?.product?.stock === 0
                          ? "flex items-center justify-center bg-gray-200 py-2 px-2 text-gray-400 h-full w-20 rounded-r cursor-pointer"
                          : "flex items-center justify-center primary1 text-white text5 h-full w-20 rounded-r cursor-pointer"
                      }
                      disabled={product?.product?.stock === 0 ? true : false}>
                      <BiPlus />
                    </button>
                  </div>
                </div>
                <button
                  className='primary2 text1 py-2 px-2 text5 rounded-md'
                  onClick={handleShare}>
                  <BiShareAlt />
                </button>
                <button
                  className={
                    wishlistStatus?.data === true
                      ? "bg-gray-200 py-2 px-2 text-gray-400 rounded-md"
                      : "bg-red-500 text-white py-2 px-2 text5 rounded-md"
                  }
                  onClick={handleAddToWislist}>
                  <BiHeart />
                </button>
              </div>
              <div className='flex gap-4 mt-2'>
                <button
                  className={
                    product?.product?.stock === 0
                      ? "bg-gray-200 py-1 px-2 text-gray-400 rounded-md flex mt-2 text-base regular space-x-2"
                      : "primary1 py-1 px-2 text-white rounded-md flex mt-2 text-base regular space-x-2"
                  }
                  disabled={product?.product?.stock === 0 ? true : false}
                  onClick={handleAddToCart}>
                  <BiCart className='text-2xl' />
                  <span>Keranjang</span>
                </button>
                <button
                  className={
                    product?.product?.stock === 0
                      ? "bg-gray-200 py-1 px-2 text-gray-400 primary2 rounded-md flex mt-2"
                      : "scale5Border py-1 px-2 primaryColor rounded-md flex mt-2"
                  }
                  disabled={product?.product?.stock === 0 ? true : false}>
                  Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 my-10'>
          <div className='productDesc shadowHight p-4 col-span-2'>
            <div className='flex gap-2 mb-3'>
              <button
                className={
                  tab === "description"
                    ? "bg4 TextSmall md:text-base text1 font-semibold py-0.5 px-3 rounded-md border-solid border"
                    : "bg-white text1 TextSmall md:text-base font-semibold py-0.5 px-3 rounded-md scale5Border"
                }
                onClick={() => setTab("description")}>
                Deskripsi
              </button>
              <button
                className={
                  tab === "review"
                    ? "bg4 TextSmall md:text-base text1 font-semibold py-0.5 px-3 rounded-md border-solid border"
                    : "bg-white text1 TextSmall md:text-base font-semibold py-0.5 px-3 rounded-md scale5Border"
                }
                onClick={() => setTab("review")}>
                Review
              </button>
            </div>
            {tab === "description" ? (
              <div
                className='TextXSmall md:text-sm regular'
                dangerouslySetInnerHTML={{
                  __html: product?.product?.description,
                }}
              />
            ) : (
              <div className='review space-y-3'>
                {product?.reviews.length > 0 ? (
                  product?.reviews.map((item: any, index: any) => (
                    <div
                      className='flex space-x-2 border border-gray-300 p-4 rounded-md'
                      key={index}>
                      <div className='img relative rounded-full h-14 w-14 overflow-hidden'>
                        <Image
                          src='/images/avatar-profile.jfif'
                          alt='Picture of the author'
                          fill
                          objectFit='cover'
                        />
                      </div>
                      <div className='desc'>
                        <Rating
                          initialValue={item.rating}
                          size={18}
                          transition
                          allowFraction
                          emptyStyle={{ display: "flex" }}
                          fillStyle={{ display: "-webkit-inline-box" }}
                          readonly
                        />
                        <p className='name TextXSmall md:text-sm font-semibold mb-1'>
                          {item.customer_name}
                        </p>
                        <p className='name TextXSmall regular italic'>
                          {item.review}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='TextSmall md:text-base'>Belum ada review</p>
                )}
              </div>
            )}
          </div>
          <div className='productRecomendation shadowHight p-4 w-full'>
            <p className='font-bold'>Produk Terkait</p>

            <div className='items divide-y'>
              {product?.related_products?.map((item: any) => (
                <div className='item grid gap-2 grid-cols-3 py-2' key={item.id}>
                  <div className='img relative h-20 w-20 rounded-md overflow-hidden'>
                    <Image
                      src={item?.thumbnail}
                      alt='Picture of the author'
                      fill
                      objectFit='cover'
                    />
                  </div>
                  <div className='desc col-span-2'>
                    <h5 className='text-sm'>{item?.name}</h5>
                    <p className='text-xs'>{item?.category_name}</p>
                    <div className='flex items-center justify-between'>
                      <div className='left'>
                        <p className='font-bold'>
                          {formatter.format(item?.price_after_discount)}
                        </p>
                        {item?.discount !== "0" ? (
                          <div className='flex gap-2 items-center'>
                            <p className='text-xs scale0Bg px-2 py-0.5 text5 rounded-full'>
                              {item?.discount}%
                            </p>
                            <p className='text-sm line-through leading-8'>
                              {formatter.format(item?.price)}
                            </p>
                          </div>
                        ) : null}
                      </div>
                      <div className='right'>
                        <button
                          className='scale0Bg p-2 text5 rounded-md'
                          onClick={() => {
                            dispatch(
                              fetchAddCart({
                                product_id: item.id,
                                quantity: 1,
                              })
                            ).then((res) => {
                              if (res.payload.success === true) {
                                router.push("/cart");
                              }
                            });
                          }}>
                          <BiCart className='' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
