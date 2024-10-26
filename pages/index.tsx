/** @format */

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
import SkeletonProductCard from "../components/SkeletonProductCard";
import Layout from "../components/layout";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  fetchNewProducts,
  fetchProducts,
  fetchSelectedProducts,
} from "../features/product/ProductSlice";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
import { BsArrowRightCircle } from "react-icons/bs";
import { fetchAddCart, fetchListCart } from "../features/cart/cartSlice";

export default function Home() {
  const product = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchNewProducts());
    dispatch(fetchSelectedProducts());
  }, [dispatch]);

  let skeletonCards = Array(5).fill(0);

  return (
    <Layout>
      <section id="hero">
        <div className="mx-auto lg:max-w-6xl px-8 w-full h-36 md:h-64 md:px-16 my-5">
          <div className="hidden md:block h-64">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={2}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >
              <SwiperSlide>
                <div className="relative rounded-lg overflow-hidden w-full h-20 md:h-52 lg:h-64">
                  <Image
                    src="/images/banner/banner1.png"
                    alt="hero-1"
                    fill
                    objectFit="cover"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative rounded-lg overflow-hidden w-full h-20 md:h-52 lg:h-64">
                  <Image
                    src="/images/banner/banner2.png"
                    alt="hero-2"
                    fill
                    objectFit="cover"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative rounded-lg overflow-hidden w-full h-20 md:h-52 lg:h-64">
                  <Image
                    src="/images/banner/banner3.png"
                    alt="hero-2"
                    fill
                    objectFit="cover"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="block md:hidden h-36">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={2}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >
              <SwiperSlide>
                <div className="relative rounded-lg overflow-hidden w-full h-36">
                  <Image
                    src="/images/banner/bannerMobile1.png"
                    alt="hero-1"
                    fill
                    objectFit="cover"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
      <main>
        <section id="products">
          <div className="mx-auto lg:max-w-6xl px-8 md:px-16 my-5">
            <div className="flex mb-5">
              <h5 className="TextMedium bold md:text-xl black">
                Produk Pilihan
              </h5>
            </div>

            {/* Kontainer untuk Grid di mobile */}
            <div className="grid grid-cols-2 gap-4 md:hidden">
              {product.loading &&
                skeletonCards.map((_, index) => (
                  <SkeletonProductCard key={index} />
                ))}
              {!product.loading && product.error ? (
                <div>Error: {product.error}</div>
              ) : null}
              {!product.loading && product.newProducts.length
                ? product.newProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col items-center bg-white rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-xs"
                    >
                      <Link
                        href={`/product/${product.slug}`}
                        className="relative w-full h-40 overflow-hidden rounded-t-lg cursor-pointer"
                      >
                        <Image
                          src={product.thumbnail}
                          alt={product.name}
                          fill
                          objectFit="cover"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-col w-full p-3 pt-2">
                        <Link
                          href={`/product/${product.slug}`}
                          className="TextSmall semiBold black cursor-pointer"
                        >
                          {product.name.length > 20 ? (
                            <span>{product.name.substring(0, 20)}...</span>
                          ) : (
                            product.name
                          )}
                        </Link>
                        <div className="flex items-center">
                          <Rating
                            initialValue={product.rating_avg}
                            size={14}
                            transition
                            allowFraction
                            emptyStyle={{ display: "flex" }}
                            fillStyle={{ display: "-webkit-inline-box" }}
                            readonly
                          />
                          <span className="TextXSmall light font-light ml-2">
                            ({product?.review_count || 0})
                          </span>
                        </div>
                        <p className="TextXSmall semiBold">
                          {product.category_name}
                        </p>
                      </div>
                      <div className="flex items-center justify-between w-full p-3 pt-0">
                        <div className="price w-full">
                          <div className="discount flex items-center justify-between">
                            <div className="left">
                              <p className="black TextMedium semiBold text-sm mb-1">
                                Rp.{product.price}
                              </p>
                              {product?.discount === "0" ? null : (
                                <div className="flex items-center">
                                  <p className="text1 TextMedium light scale6Bg text3 px-1 py-0.5 rounded-sm mr-1">
                                    {product.discount || 0} %
                                  </p>
                                  <p className="text1 line-through TextMedium light">
                                    Rp.{product.price}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="right">
                              <button
                                className="py-1 px-2 rounded-md font-semibold text-white primaryBg border-none"
                                onClick={() => {
                                  dispatch(
                                    fetchAddCart({
                                      product_id: product.id,
                                      quantity: 1,
                                    })
                                  ).then(() => {
                                    dispatch(fetchListCart());
                                  });
                                }}
                              >
                                Tambah
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>

            {/* Grid untuk tampilan desktop */}
            <div className="hidden md:grid grid-cols-4 gap-6">
              {product.loading &&
                skeletonCards.map((_, index) => (
                  <SkeletonProductCard key={index} />
                ))}
              {!product.loading && product.error ? (
                <div>Error: {product.error}</div>
              ) : null}
              {!product.loading && product.newProducts.length
                ? product.newProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col items-center bg-white rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-xs"
                    >
                      <Link
                        href={`/product/${product.slug}`}
                        className="relative w-full h-40 overflow-hidden rounded-t-lg cursor-pointer"
                      >
                        <Image
                          src={product.thumbnail}
                          alt={product.name}
                          fill
                          objectFit="cover"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-col w-full p-3 pt-2">
                        <Link
                          href={`/product/${product.slug}`}
                          className="TextSmall semiBold black cursor-pointer"
                        >
                          {product.name.length > 20 ? (
                            <span>{product.name.substring(0, 20)}...</span>
                          ) : (
                            product.name
                          )}
                        </Link>
                        <div className="flex items-center">
                          <Rating
                            initialValue={product.rating_avg}
                            size={14}
                            transition
                            allowFraction
                            emptyStyle={{ display: "flex" }}
                            fillStyle={{ display: "-webkit-inline-box" }}
                            readonly
                          />
                          <span className="TextXSmall light font-light ml-2">
                            ({product?.review_count || 0})
                          </span>
                        </div>
                        <p className="TextXSmall semiBold">
                          {product.category_name}
                        </p>
                      </div>
                      <div className="flex items-center justify-between w-full p-3 pt-0">
                        <div className="price w-full">
                          <div className="discount flex items-center justify-between">
                            <div className="left">
                              <p className="black TextMedium semiBold text-sm mb-1">
                                Rp.{product.price}
                              </p>
                              {product?.discount === "0" ? null : (
                                <div className="flex items-center">
                                  <p className="text1 TextMedium light scale6Bg text3 px-1 py-0.5 rounded-sm mr-1">
                                    {product.discount || 0} %
                                  </p>
                                  <p className="text1 line-through TextMedium light">
                                    Rp.{product.price}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="right">
                              <button
                                className="py-1 px-2 rounded-md font-semibold text-white primaryBg border-none"
                                onClick={() => {
                                  dispatch(
                                    fetchAddCart({
                                      product_id: product.id,
                                      quantity: 1,
                                    })
                                  ).then(() => {
                                    dispatch(fetchListCart());
                                  });
                                }}
                              >
                                Tambah
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <div className="flex justify-center">
              <Link
                href="/product"
                className="primary1 TextMedium semiBold text-white font-semibold my-12 py-2 px-4 rounded-md border-none"
              >
                Lihat lebih banyak
              </Link>
            </div>
          </div>
        </section>
        {/* <section id="olahan">
          <div className="mx-auto lg:max-w-6xl px-8 md:px-16 mb-5 mt-10">
            <div className="flex mb-5">
              <h5 className="TextMedium bold md:text-xl black">
                Olahan Jamur Tiram Kreatif
              </h5>
            </div>
            <Swiper
              className="block md:hidden h-72"
              spaceBetween={12}
              slidesPerView={2.5}
            >
              {product.loading &&
                skeletonCards.map((_, index) => (
                  <SkeletonProductCard key={index} />
                ))}
              {!product.loading && product.error ? (
                <div>Error: {product.error}</div>
              ) : null}
              {!product.loading && product.newProducts.length
                ? product.newProducts.map((product) => (
                    <SwiperSlide>
                      <div
                        className="flex flex-col justify-between h-full items-center bg-white rounded-lg shadowSm hover:shadowMd transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-xs"
                        key={product.id}
                      >
                        <Link
                          href={`/product/${product.slug}`}
                          className="relative w-full h-24 shrink-0 overflow-hidden rounded-t-lg cursor-pointer"
                        >
                          <Image
                            src={product.thumbnail}
                            alt="product-1"
                            fill
                            objectFit="cover"
                          />
                        </Link>
                        <div className="TextXSmall regular flex flex-col w-full p-2">
                          <Link
                            href={`/product/${product.slug}`}
                            className="black TextXSmall regular cursor-pointer"
                          >
                            {product.name.length > 20 ? (
                              <span>{product.name.substring(0, 20)}...</span>
                            ) : (
                              product.name
                            )}
                          </Link>
                          <div className="flex items-center">
                            <Rating
                              initialValue={product.rating_avg}
                              size={12}
                              transition
                              allowFraction
                              emptyStyle={{ display: "flex" }}
                              fillStyle={{ display: "-webkit-inline-box" }}
                              readonly
                            />

                            <span className="TextXSmall light font-light ml-2">
                              ({product?.review_count || 0})
                            </span>
                          </div>
                          <p className="TextXSmall semiBold">
                            {product.category_name}
                          </p>
                        </div>
                        <div className="flex items-center justify-between w-full p-3 pt-0">
                          <div className="price w-full">
                            <div className="discount space-y-2">
                              <div className="left">
                                <p className="black TextSmall semiBold mb-1">
                                  Rp.{product.price}
                                </p>
                                {product?.discount === "0" ? (
                                  <></>
                                ) : (
                                  <div className="flex items-center">
                                    <p className="text1 TextXSmall light scale6Bg text3 px-0.5 py-0.5 rounded-sm mr-1">
                                      {product.discount || 0} %
                                    </p>
                                    <p className="text1 line-through TextXSmall light">
                                      Rp.{product.price}
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="right block">
                                <button
                                  className="flex justify-center space-x-2 py-1 px-2 rounded-md font-semibold text-white primary1 border-none w-full"
                                  onClick={() => {
                                    dispatch(
                                      fetchAddCart({
                                        product_id: product.id,
                                        quantity: 1,
                                      })
                                    ).then(() => {
                                      dispatch(fetchListCart());
                                    });
                                  }}
                                >
                                  Tambah
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                : null}
            </Swiper>
            <div className="md:grid hidden grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
              {product.loading &&
                skeletonCards.map((_, index) => (
                  <SkeletonProductCard key={index} />
                ))}
              {!product.loading && product.error ? (
                <div>Error: {product.error}</div>
              ) : null}
              {!product.loading && product.newProducts.length
                ? product.newProducts.map((product) => (
                    <div
                      className="flex flex-col items-center bg-white rounded-lg shadowSm hover:shadowMd transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-xs"
                      key={product.id}
                    >
                      <Link
                        href={`/product/${product.slug}`}
                        className="relative w-full h-40 overflow-hidden rounded-t-lg cursor-pointer"
                      >
                        <Image
                          src={product.thumbnail}
                          alt="product-1"
                          fill
                          objectFit="cover"
                        />
                      </Link>
                      <div className="flex flex-col w-full p-3 pt-2">
                        <Link
                          href={`/product/${product.slug}`}
                          className="TextSmall semiBold black cursor-pointer"
                        >
                          {product.name.length > 20 ? (
                            <span>{product.name.substring(0, 20)}...</span>
                          ) : (
                            product.name
                          )}
                        </Link>
                        <div className="flex items-center">
                          <Rating
                            initialValue={product.rating_avg}
                            size={14}
                            transition
                            allowFraction
                            emptyStyle={{ display: "flex" }}
                            fillStyle={{ display: "-webkit-inline-box" }}
                            readonly
                          />

                          <span className="TextXSmall light font-light ml-2">
                            ({product?.review_count || 0})
                          </span>
                        </div>
                        <p className="TextXSmall semiBold">
                          {product.category_name}
                        </p>
                      </div>
                      <div className="flex items-center justify-between w-full p-3 pt-0">
                        <div className="price w-full">
                          <div className="discount flex items-center justify-between">
                            <div className="left">
                              <p className="black TextMedium semiBold text-sm mb-1">
                                Rp.{product.price}
                              </p>
                              {product?.discount === "0" ? (
                                <></>
                              ) : (
                                <div className="flex items-center">
                                  <p className="text1 TextMedium light scale6Bg text3 px-1 py-0.5 rounded-sm mr-1">
                                    {product.discount || 0} %
                                  </p>
                                  <p className="text1 line-through TextMedium light">
                                    Rp.{product.price}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="right">
                              <button
                                className="py-1 px-2 rounded-md font-semibold text-white primaryBg border-none"
                                onClick={() => {
                                  dispatch(
                                    fetchAddCart({
                                      product_id: product.id,
                                      quantity: 1,
                                    })
                                  ).then(() => {
                                    dispatch(fetchListCart());
                                  });
                                }}
                              >
                                <Image
                                  alt="cart"
                                  src="/icons/cart.svg"
                                  width={16}
                                  height={16}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </section> */}
        {/* <section id="budidaya">
          <div className="mx-auto lg:max-w-6xl px-8 md:px-16 mb-5 mt-10">
            <div className="flex mb-5">
              <h5 className="TextMedium bold md:text-xl black">
                Budidaya Jamur Tiram
              </h5>
            </div>
            <Swiper
              className="block md:hidden h-72"
              spaceBetween={12}
              slidesPerView={2.5}
            >
              {product.loading &&
                skeletonCards.map((_, index) => (
                  <SkeletonProductCard key={index} />
                ))}
              {!product.loading && product.error ? (
                <div>Error: {product.error}</div>
              ) : null}
              {!product.loading && product.newProducts.length
                ? product.newProducts.map((product) => (
                    <SwiperSlide>
                      <div
                        className="flex flex-col justify-between h-full items-center bg-white rounded-lg shadowSm hover:shadowMd transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-xs"
                        key={product.id}
                      >
                        <Link
                          href={`/product/${product.slug}`}
                          className="relative w-full h-24 shrink-0 overflow-hidden rounded-t-lg cursor-pointer"
                        >
                          <Image
                            src={product.thumbnail}
                            alt="product-1"
                            fill
                            objectFit="cover"
                          />
                        </Link>
                        <div className="TextXSmall regular flex flex-col w-full p-2">
                          <Link
                            href={`/product/${product.slug}`}
                            className="black TextXSmall regular cursor-pointer"
                          >
                            {product.name.length > 20 ? (
                              <span>{product.name.substring(0, 20)}...</span>
                            ) : (
                              product.name
                            )}
                          </Link>
                          <div className="flex items-center">
                            <Rating
                              initialValue={product.rating_avg}
                              size={12}
                              transition
                              allowFraction
                              emptyStyle={{ display: "flex" }}
                              fillStyle={{ display: "-webkit-inline-box" }}
                              readonly
                            />

                            <span className="TextXSmall light font-light ml-2">
                              ({product?.review_count || 0})
                            </span>
                          </div>
                          <p className="TextXSmall semiBold">
                            {product.category_name}
                          </p>
                        </div>
                        <div className="flex items-center justify-between w-full p-3 pt-0">
                          <div className="price w-full">
                            <div className="discount space-y-2">
                              <div className="left">
                                <p className="black TextSmall semiBold mb-1">
                                  Rp.{product.price}
                                </p>
                                {product?.discount === "0" ? (
                                  <></>
                                ) : (
                                  <div className="flex items-center">
                                    <p className="text1 TextXSmall light scale6Bg text3 px-0.5 py-0.5 rounded-sm mr-1">
                                      {product.discount || 0} %
                                    </p>
                                    <p className="text1 line-through TextXSmall light">
                                      Rp.{product.price}
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="right block">
                                <button
                                  className="flex justify-center space-x-2 py-1 px-2 rounded-md font-semibold text-white primary1 border-none w-full"
                                  onClick={() => {
                                    dispatch(
                                      fetchAddCart({
                                        product_id: product.id,
                                        quantity: 1,
                                      })
                                    ).then(() => {
                                      dispatch(fetchListCart());
                                    });
                                  }}
                                >
                                  Tambah
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                : null}
            </Swiper>
            <div className="md:grid hidden grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
              {product.loading &&
                skeletonCards.map((_, index) => (
                  <SkeletonProductCard key={index} />
                ))}
              {!product.loading && product.error ? (
                <div>Error: {product.error}</div>
              ) : null}
              {!product.loading && product.newProducts.length
                ? product.newProducts.map((product) => (
                    <div
                      className="flex flex-col items-center bg-white rounded-lg shadowSm hover:shadowMd transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-xs"
                      key={product.id}
                    >
                      <Link
                        href={`/product/${product.slug}`}
                        className="relative w-full h-40 overflow-hidden rounded-t-lg cursor-pointer"
                      >
                        <Image
                          src={product.thumbnail}
                          alt="product-1"
                          fill
                          objectFit="cover"
                        />
                      </Link>
                      <div className="flex flex-col w-full p-3 pt-2">
                        <Link
                          href={`/product/${product.slug}`}
                          className="TextSmall semiBold black cursor-pointer"
                        >
                          {product.name.length > 20 ? (
                            <span>{product.name.substring(0, 20)}...</span>
                          ) : (
                            product.name
                          )}
                        </Link>
                        <div className="flex items-center">
                          <Rating
                            initialValue={product.rating_avg}
                            size={14}
                            transition
                            allowFraction
                            emptyStyle={{ display: "flex" }}
                            fillStyle={{ display: "-webkit-inline-box" }}
                            readonly
                          />

                          <span className="TextXSmall light font-light ml-2">
                            ({product?.review_count || 0})
                          </span>
                        </div>
                        <p className="TextXSmall semiBold">
                          {product.category_name}
                        </p>
                      </div>
                      <div className="flex items-center justify-between w-full p-3 pt-0">
                        <div className="price w-full">
                          <div className="discount flex items-center justify-between">
                            <div className="left">
                              <p className="black TextMedium semiBold text-sm mb-1">
                                Rp.{product.price}
                              </p>
                              {product?.discount === "0" ? (
                                <></>
                              ) : (
                                <div className="flex items-center">
                                  <p className="text1 TextMedium light scale6Bg text3 px-1 py-0.5 rounded-sm mr-1">
                                    {product.discount || 0} %
                                  </p>
                                  <p className="text1 line-through TextMedium light">
                                    Rp.{product.price}
                                  </p>
                                </div>
                              )}
                            </div> 
                            <div className="right">
                              <button
                                className="py-1 px-2 rounded-md font-semibold text-white primaryBg border-none"
                                onClick={() => {
                                  dispatch(
                                    fetchAddCart({
                                      product_id: product.id,
                                      quantity: 1,
                                    })
                                  ).then(() => {
                                    dispatch(fetchListCart());
                                  });
                                }}
                              >
                                <Image
                                  alt="cart"
                                  src="/icons/cart.svg"
                                  width={16}
                                  height={16}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <div className="flex justify-center">
              <Link
                href="/product"
                className="primary1 TextMedium semiBold text-white font-semibold my-12 py-2 px-4 rounded-md border-none"
              >
                Lihat lebih banyak
              </Link>
            </div>
          </div>
        </section> */}
        <section>
          <div className="bgDiscount mx-auto lg:max-w-5xl px-8 md:px-12 my-5 flex justify-between scale6Bg shadowSm rounded-md py-5 items-center">
            <div className="text">
              <h5 className="TextLarge semiBold md:text-4xl text1">
                Dapatkan diskon terbaikmu!
              </h5>
              <p className="black TextXSmall regular md:text-lg">
                Nikmati Hingga 50% Diskon untuk Produk Pilihanmu dan <br />{" "}
                Berbelanja dengan Harga yang Lebih Hemat!
              </p>
            </div>

            <div className="relative h-20 md:h-40 w-20 md:w-40">
              <Image
                src="/icons/discount.svg"
                alt="discount"
                fill
                objectFit="cover"
              />
            </div>
          </div>
        </section>
        <section
          id="order-way"
          className="mx-auto lg:max-w-6xl px-8 md:px-16 my-8"
        >
          <h5 className="text-center black TextLarge bold md:text-4xl">
            Ingin memesan produk kami?
          </h5>
          <div className="flex justify-around flex-col md:flex-row text-center">
            <div className="flex flex-col items-center p-4 md:p-12">
              <Image src="/icons/buy.svg" height={80} width={80} alt="buy" />
              <p className="TextMedium md:text-xl bold my-1 md:my-3">
                Pilih Produk
              </p>
              <p className="TextXSmall md:text-sm regular">
                Pilih produk yang Anda inginkan dari katalog kami yang beragam.
                Kami menawarkan berbagai macam pilihan produk berkualitas tinggi
                yang bisa Anda nikmati.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 md:p-12">
              <Image
                src="/icons/shipment.svg"
                height={80}
                width={80}
                alt="delivery"
              />
              <p className="TextMedium md:text-xl bold my-1 md:my-3">
                Metode Pengiriman
              </p>
              <p className="TextXSmall md:text-sm regular">
                Pilih metode pengiriman yang sesuai dengan kebutuhan Anda. Kami
                bekerja sama dengan mitra pengiriman terpercaya untuk memastikan
                produk kami sampai ke tangan Anda dengan aman dan tepat waktu.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 md:p-12">
              <Image
                src="/icons/pay.svg"
                height={80}
                width={80}
                alt="payment"
              />
              <p className="TextMedium md:text-xl bold my-1 md:my-3">
                Pembayaran
              </p>
              <p className="TextXSmall md:text-sm regular">
                Lakukan pembayaran dengan mudah dan praktis. Kami terintegrasi
                dengan berbagai macam pembayaran. Setelah pembayaran Anda kami
                terima, kami akan segera memproses pesanan Anda.
              </p>
            </div>
          </div>
        </section>
        <section id="faq" className="mx-auto lg:max-w-6xl px-8 md:px-16 my-5">
          <div className="flex md:justify-between md:flex-row flex-col text-center md:text-left justify-center">
            <div className="desc">
              <p className="TextLarge bold md:text-2xl">
                Frequently Ask Question (FAQ)
              </p>
              <p className="TextXSmall md:text-sm regular text-gray-600">
                Jangan ragu untuk menghubungi kami jika Anda membutuhkan bantuan
                atau informasi lebih lanjut. Tim kami siap membantu Anda dengan
                sepenuh hati. Terima kasih telah memilih produk kami!
              </p>
            </div>
            <div className="w-full rounded-2xl bg-white TextXSmall md:text-sm regular text-gray-600 text-sm p-2 md:max-w-md">
              <div className="collapse collapse-arrow my-2 border rounded-box">
                <input type="checkbox" className="peer" />
                <div className="collapse-title">
                  Apakah jamur tiram segar bisa dikirimkan ke luar kota atau
                  luar pulau?
                </div>
                <div className="collapse-content ">
                  <p>
                    Ya, jamur tiram segar bisa dikirimkan ke luar kota atau luar
                    pulau dengan menggunakan layanan pengiriman yang cepat dan
                    menjaga kondisi penyimpanan yang sesuai.
                  </p>
                </div>
              </div>
              <div className="collapse collapse-arrow my-2 border rounded-box">
                <input type="checkbox" className="peer" />
                <div className="collapse-title">
                  Apa saja sarana produksi budidaya jamur tiram yang tersedia di
                  sini?
                </div>
                <div className="collapse-content ">
                  <p>
                    Sarana produksi yang tersedia meliputi ruang tanam, baglog,
                    media tanam, rak jamur, alat penyiram, dan fasilitas
                    pengendalian suhu serta kelembaban.
                  </p>
                </div>
              </div>
              <div className="collapse collapse-arrow my-2 border rounded-box">
                <input type="checkbox" className="peer" />
                <div className="collapse-title">
                  Apakah produk olahan jamur tiram aman dikonsumsi?
                </div>
                <div className="collapse-content ">
                  <p>
                    Ya, produk olahan jamur tiram aman dikonsumsi jika
                    diproduksi sesuai dengan standar kebersihan dan kesehatan
                    yang berlaku.
                  </p>
                </div>
              </div>
              <div className="collapse collapse-arrow my-2 border rounded-box">
                <input type="checkbox" className="peer" />
                <div className="collapse-title">
                  Apakah ecommerce MItra Jamur menerima pesanan dalam jumlah
                  besar untuk keperluan usaha?
                </div>
                <div className="collapse-content ">
                  <p>
                    Ya, ecommerce Mitra Jamur menerima pesanan dalam jumlah
                    besar untuk keperluan usaha.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*<section className="mx-auto lg:max-w-6xl px-8 md:px-16 mt-6">*/}
        {/*  <div className="flex p-11 md:justify-between md:items-center md:flex-row flex-col text-center md:text-left justify-center scale6Bg rounded-md space-y-3 md:space-y-0">*/}
        {/*    <div className="desc space-y-3 md:space-y-0">*/}
        {/*      <p className="TextMedium text-left semiBold md:text-2xl text1">*/}
        {/*        Tingkatkan Hasil Panenmu dengan Sistem Pakar Jamur Tiram!*/}
        {/*      </p>*/}
        {/*      <div className="flex text-left md:items-center space-x-1">*/}
        {/*        <p className="text1 TextSmall regular">*/}
        {/*          Dapatkan Bantuan Ahli untuk Memaksimalkan Hasil Panen Jamur*/}
        {/*          Tirammu. Kami akan Memberikan Rekomendasi Terbaik untuk*/}
        {/*          Meningkatkan Kualitas dan Kuantitas Panenmu.*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    <div className="w-full flex md:justify-end">*/}
        {/*      <Link*/}
        {/*        href={"https://pakar-jamur.vercel.app/"}*/}
        {/*        className="primary2 TextXSmall md:text-base semibold rounded-md px-9 py-3"*/}
        {/*        target="_blank"*/}
        {/*      >*/}
        {/*        Sistem Pakar*/}
        {/*      </Link>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}
      </main>
    </Layout>
  );
}
