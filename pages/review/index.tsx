/** @format */

import Link from "next/link";
import PrivateRoute from "../../components/PrivateRoute";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import {fetchDetailReview, fetchReviews, postReview} from "../../features/review/reviewSlice";
import Review from "../transaction/components/Review";
import { setReviewOrder } from "../../features/product/ProductSlice";
import {data} from "autoprefixer";

export default function index() {
  const dispatch = useAppDispatch();
  const dataReview = useAppSelector((state) => state.review.dataReview)

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const formatDate = (invoice: string): string => {
    if (!invoice) return "Tanggal tidak tersedia";
  const parts = invoice.split('/');
  if (parts.length < 2) return "Tanggal tidak valid";

  const dateCode = parts[1];
  if (dateCode.length !== 8) return "Tanggal tidak valid";

  const year = dateCode.slice(0, 4);
  const month = dateCode.slice(4, 6);
  const day = dateCode.slice(6, 8);

  return `${day}-${month}-${year}`;
  };

  return (
    <PrivateRoute>
      <div className='black h-screen TextXSmall regular black'>
        <Link
          href={"/dashboard"}
          className='topBar fixed z-50 border-b-2 bg-white top-0 right-0 left-0 flex space-x-3.5 py-4 px-8'>
          <AiOutlineArrowLeft className='w-6 h-6' />
          <p className='TextMedium semiBold'>Riwayat Ulasan</p>
        </Link>

        <div className='items mx-8 mt-20 space-y-4'>
          {dataReview.length > 0
            ? dataReview.map((item, index) => (
                <div
                  className='item shadowLow p-4 rounded-md divide-y'
                  key={index}>
                  <div className='top pb-2 flex justify-between'>
                    <p>{formatDate(item?.transaction_invoice)}</p>
                    <p className='semiBold text1'>
                      {item?.transaction_invoice}
                    </p>
                  </div>

                  <div className='items py-2 space-y-2'>
                    {item?.orders?.map((item) => (
                      <div
                        className='item flex space-x-3.5'
                        key={item?.order_id}>
                        <div className='product-img shrink-0 relative h-16 w-16 rounded-lg overflow-hidden'>
                          <Image
                            src={item?.product_thumbnail}
                            alt='product image'
                            fill
                            objectFit='cover'
                          />
                        </div>
                        <div className='desc'>
                          <p className='TextSmall semiBold'>{item.product_name}</p>
                          <div className='rate flex items-center space-x-1'>
                            <Rating
                              initialValue={item?.rating}
                              size={16}
                              transition
                              allowFraction
                              emptyStyle={{ display: "flex" }}
                              fillStyle={{ display: "-webkit-inline-box" }}
                              readonly
                            />
                            <div className='regular leading-none'>
                              {item?.review_date}
                            </div>
                          </div>
                          {item?.review !== "" ? (
                            <p className='regular'>{item?.review}</p>
                          ) : (
                            <button
                              className='primary2 text1 semiBold py-1 px-4 mt-2 rounded-sm'
                              onClick={() => {
                                dispatch(fetchDetailReview(item?.order_id));
                                dispatch(setReviewOrder(true));
                              }}>
                              Beri Ulasan
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            : null}
        </div>
        <Review />
      </div>
    </PrivateRoute>
  );
}
