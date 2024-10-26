/** @format */

import React, { useEffect } from "react";
import Layout from "../../../components/layout";
import { BsFilterLeft } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchCategories,
  fetchFilteredProducts,
  fetchProducts,
  setFilterCategory,
  setFilterSort,
} from "../../../features/product/ProductSlice";
import Image from "next/image";
import { BiCart, BiSearch, BiSearchAlt2, BiSortAlt2 } from "react-icons/bi";
import Link from "next/link";
import SkeletonProductCard from "../../../components/SkeletonProductCard";
import { Rating } from "react-simple-star-rating";
import { fetchAddCart, fetchListCart } from "../../../features/cart/cartSlice";
import { useRouter } from "next/router";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import {
  setFilterOpen,
  setMobileFilterOpen,
} from "../../../features/layout/LayoutSlice";
import MobileFIlter from "../../../components/MobileFIlter";

export default function index() {
  const product = useAppSelector((state) => state.product);
  console.log("product", product);
  const router = useRouter();

  const filterInfo = useAppSelector((state) => state.product.filter);
  console.log("filterInfo", filterInfo);

  const filterOpen = useAppSelector((state) => state.layout.filter);
  const sortInfo = useAppSelector((state) => state.product.filter.sort);
  console.log("sortInfo", sortInfo);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (product?.products.length === 0) dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  let skeletonCards = Array(6).fill(0);

  const handleFilterCategory = (e: any) => {
    dispatch(setFilterCategory(e.target.value));

    dispatch(
      fetchFilteredProducts({
        q: filterInfo.q,
        category: e.target.value,
        sort: filterInfo.sort,
      })
    );
  };

  const handleFilterSort = () => {
    dispatch(
      setFilterSort(
        filterInfo.sort === "price_asc" ? "price_desc" : "price_asc"
      )
    );

    dispatch(
      fetchFilteredProducts({
        q: filterInfo.q,
        category: filterInfo.category,
        sort: filterInfo.sort,
      })
    );
  };

  return (
    <Layout>
      <MobileFIlter />
      <section className="mx-auto lg:max-w-6xl px-8 md:px-16 text-sm my-5">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href="/public">
                <strong>Home</strong>
              </Link>
            </li>
            <li>List Produk Test</li>
          </ul>
        </div>

        <div className="divider hidden md:block"></div>
        <div className="grid grid-cols-1 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="card hidden md:block border-2 border-gray-200 text-sm h-fit">
            <div className="card-body">
              <div className="filter divide-y">
                <div className="text-gray-400 text-lg pb-2">Filter</div>
                <div className="filter-item text-xs">
                  <div className="category my-2">
                    <label className="label-text font-medium text-gray-400">
                      Kategori
                    </label>

                    {product.categories.length > 0
                      ? product.categories.map((item) => (
                          <div className="form-control" key={item?.id}>
                            <label className="label cursor-pointer">
                              <span className="label-text">{item?.name}</span>
                              <input
                                type="radio"
                                name="radio-10"
                                value={item?.id}
                                onChange={handleFilterCategory}
                                className="radio checked:bg-blue-500"
                              />
                            </label>
                          </div>
                        ))
                      : null}
                  </div>
                  {/*<div className="condition my-2">
                    <label className="label-text font-medium text-gray-400">
                      Rating
                    </label>
                    <div className="item">
                      <label className="cursor-pointer label">
                        <Rating
                          initialValue={5}
                          size={20}
                          transition
                          allowFraction
                          emptyStyle={{ display: "flex" }}
                          fillStyle={{ display: "-webkit-inline-box" }}
                          readonly
                        />
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm checkbox-accent"
                        />
                      </label>
                    </div>
                    <div className="item">
                      <label className="cursor-pointer label">
                        <Rating
                          initialValue={4}
                          size={20}
                          transition
                          allowFraction
                          emptyStyle={{ display: "flex" }}
                          fillStyle={{ display: "-webkit-inline-box" }}
                          readonly
                        />
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm checkbox-accent"
                        />
                      </label>
                    </div>
                    <div className="item">
                      <label className="cursor-pointer label">
                        <Rating
                          initialValue={3}
                          size={20}
                          transition
                          allowFraction
                          emptyStyle={{ display: "flex" }}
                          fillStyle={{ display: "-webkit-inline-box" }}
                          readonly
                        />
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm checkbox-accent"
                        />
                      </label>
                    </div>
                    <div className="item">
                      <label className="cursor-pointer label">
                        <Rating
                          initialValue={2}
                          size={20}
                          transition
                          allowFraction
                          emptyStyle={{ display: "flex" }}
                          fillStyle={{ display: "-webkit-inline-box" }}
                          readonly
                        />
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm checkbox-accent"
                        />
                      </label>
                    </div>
                    <div className="item">
                      <label className="cursor-pointer label">
                        <Rating
                          initialValue={1}
                          size={20}
                          transition
                          allowFraction
                          emptyStyle={{ display: "flex" }}
                          fillStyle={{ display: "-webkit-inline-box" }}
                          readonly
                        />
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm checkbox-accent"
                        />
                      </label>
                    </div>
                  </div>*/}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 mt-2">
            <div className="sort-filter scale6Bg p-2 rounded-md">
              <div className="flex flex-row justify-between items-center">
                <p className="TextXSmall text-left md:text-sm col-span-2 text2">
                  Terdapat{" "}
                  <span className="bold">{product.products.length} produk</span>{" "}
                  dari hasil Pencarian
                  {filterInfo.q === "" ? null : (
                    <>
                      : <span className="bold">{filterInfo.q}</span>
                    </>
                  )}
                </p>
                <div className="block md:hidden">
                  <button
                    type="button"
                    className="flex w-full primaryColor TextXSmall regular items-center gap-x-1 rounded-md bg-white px-3 py-1"
                    onClick={() => {
                      dispatch(setMobileFilterOpen(true));
                    }}
                  >
                    <div className="relative h-4 w-4">
                      <Image
                        src="/icons/sortMobile.png"
                        layout="fill"
                        objectFit="contain"
                        alt="sort"
                      />
                    </div>
                    <span>Filter</span>
                  </button>
                </div>
                <div className="relative inline-block text-left">
                  <div className="hidden md:block">
                    <button
                      type="button"
                      className="flex primaryColor regular items-center w-full justify-center gap-x-1 rounded-md bg-white px-3 py-1"
                      onClick={() => {
                        if (filterOpen) {
                          dispatch(setFilterOpen(false));
                        } else {
                          dispatch(setFilterOpen(true));
                        }
                      }}
                    >
                      <div className="relative h-4 w-4">
                        <Image
                          src="/icons/sort.png"
                          layout="fill"
                          objectFit="contain"
                          alt="sort"
                        />
                      </div>
                      <span>
                        Urutkan :{" "}
                        {sortInfo === "price_asc"
                          ? "Harga Termurah"
                          : sortInfo === "price_desc"
                          ? "Harga Termahal"
                          : sortInfo === "newest"
                          ? "Terbaru"
                          : sortInfo === "oldest"
                          ? "Terlama"
                          : "filter"}
                      </span>
                      {filterOpen ? (
                        <MdOutlineKeyboardArrowUp className="w-6 h-6" />
                      ) : (
                        <MdOutlineKeyboardArrowDown className="w-6 h-6" />
                      )}
                    </button>
                  </div>

                  <div
                    className={
                      filterOpen
                        ? "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadowLow"
                        : "hidden"
                    }
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                  >
                    <div className="py-1" role="none">
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text">Harga Termahal</span>
                          <input
                            type="radio"
                            name="radio-10"
                            onClick={() => {
                              dispatch(setFilterSort("price_desc"));
                              dispatch(
                                fetchFilteredProducts({
                                  q: filterInfo.q,
                                  category: filterInfo.category,
                                  sort: filterInfo.sort,
                                })
                              );
                              dispatch(setFilterOpen(false));
                            }}
                            className="radio radio-xs checked:bg-blue-500"
                          />
                        </label>
                      </div>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text">Harga Termurah</span>
                          <input
                            type="radio"
                            name="radio-10"
                            value="price_asc"
                            onClick={() => {
                              dispatch(setFilterSort("price_asc"));
                              dispatch(
                                fetchFilteredProducts({
                                  q: filterInfo.q,
                                  category: filterInfo.category,
                                  sort: filterInfo.sort,
                                })
                              );
                              dispatch(setFilterOpen(false));
                            }}
                            className="radio radio-xs checked:bg-blue-500"
                          />
                        </label>
                      </div>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text">Terbaru</span>
                          <input
                            type="radio"
                            name="radio-10"
                            value="newest"
                            onClick={() => {
                              dispatch(setFilterSort("newest"));
                              dispatch(
                                fetchFilteredProducts({
                                  q: filterInfo.q,
                                  category: filterInfo.category,
                                  sort: filterInfo.sort,
                                })
                              );
                              dispatch(setFilterOpen(false));
                            }}
                            className="radio radio-xs checked:bg-blue-500"
                          />
                        </label>
                      </div>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text">Terdahulu</span>
                          <input
                            type="radio"
                            name="radio-10"
                            value="oldest"
                            onClick={() => {
                              dispatch(setFilterSort("oldest"));
                              dispatch(
                                fetchFilteredProducts({
                                  q: filterInfo.q,
                                  category: filterInfo.category,
                                  sort: filterInfo.sort,
                                })
                              );
                              dispatch(setFilterOpen(false));
                            }}
                            className="radio radio-xs checked:bg-blue-500"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <button
                  className='bg-white flex w-full md:w-fit'
                  onClick={handleFilterSort}>
                  <BiSortAlt2 className='text-2xl' />
                  Urutkan :{" "}
                  {filterInfo.sort === "price_asc"
                    ? "Harga Terendah"
                    : "Harga Tertinggi"}
                </button> */}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 my-5">
              {product.loading &&
                skeletonCards.map((_, index) => (
                  <SkeletonProductCard key={index} />
                ))}
              {!product.loading && product.error ? (
                <div>Error: {product.error}</div>
              ) : null}
              {product.products.length ? (
                product.products.map((product) => (
                  <div
                    className="flex flex-col items-center bg-white rounded-lg shadowSm hover:shadowMd transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-xs"
                    key={product.id}
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      className="relative w-full h-32 md:h-40 overflow-hidden rounded-t-lg cursor-pointer"
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
                        className="TextXSmall md:text-sm semiBold black cursor-pointer"
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
                          ({product.stock})
                        </span>
                      </div>
                      <p className="TextXSmall text1 semiBold">
                        {product.category_name}
                      </p>
                    </div>
                    <div className="flex items-center justify-between w-full p-3 pt-0">
                      <div className="price w-full">
                        <div className="discount flex items-center justify-between">
                          <div className="left">
                            <p className="black TextSmall md:text-base semiBold mb-1">
                              Rp.{product.price}
                            </p>
                            {product?.discount === "0" ? (
                              <></>
                            ) : (
                              <div className="flex items-center">
                                <p className="text1 TextXSmall light scale6Bg text3 px-1 py-0.5 rounded-sm mr-1">
                                  {product.discount || 0} %
                                </p>
                                <p className="text1 line-through TextXSmall light">
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
                                );
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
              ) : (
                <div className="col-span-full flex justify-center">
                  <div className="img relative h-96 w-96">
                    <Image
                      src="/images/productNotFound.png"
                      alt="empty"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
