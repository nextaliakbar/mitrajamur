/** @format */

import React, {useEffect} from "react";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import AddReview from "../AddReview";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchDetailReview, fetchReviews} from "../../../features/review/reviewSlice";
import {setReviewOrder} from "../../../features/product/ProductSlice";
import Review from "../../transaction/components/Review";

export default function index() {
  const dispatch = useAppDispatch();

  const dataReview = useAppSelector((state) => state.review.dataReview)

  const reviewOrder = useAppSelector((state) => state.product.reviewOrder)

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <div className='col-span-3'>
      {reviewOrder && <AddReview/>}
      <p className='text-xl font-bold mb-6'>Riwayat Ulasan</p>
      <div className='rounded-xl border border-gray-300 p-4 space-y-4'>
        {dataReview.length > 0
        ? dataReview.map((item, index) => (
            <div className='reviewlist p-4 shadowLow rounded-xl space-y-4'
            key={index}
            >
              <div className='top pb-2 flex justify-between'>
                <p>30 Mei 2023</p>
                <p className='semiBold text1'>
                  {item?.transaction_invoice}
                </p>
              </div>

              {item?.orders?.map((item, index) => (
                  <div className='list flex space-x-2'>
                    <div className='itemImg flex-shrink-0 relative rounded-md h-32 w-32 overflow-hidden'>
                    <Image
                          src={item?.product_thumbnail}
                          alt='product'
                          fill
                          objectFit='cover'
                      />
                    </div>
                    <div className='itemDesc space-y-3'>
                      <p className='text-xl font-bold'>{item.product_name}</p>
                      <div className='rate flex items-center space-x-2'>

                        <Rating
                            initialValue={item?.rating}
                            size={20}
                            transition
                            allowFraction
                            emptyStyle={{display: "flex"}}
                            fillStyle={{display: "-webkit-inline-box"}}
                            readonly
                        />
                        <div className='regular leading-none'>
                          {item?.review_date}
                        </div>
                      </div>
                      {!item?.review || item?.review.trim() === "" ? (
                          <button
                              className='primary2 text1 semiBold py-1 px-4 mt-2 rounded-sm'
                              onClick={() => {
                                dispatch(fetchDetailReview(item?.order_id));
                                dispatch(setReviewOrder(true));
                              }}>
                            Beri Ulasan
                          </button>
                      ) : (
                          <p className='regular'>{item?.review}</p>
                      )}
                    </div>
                  </div>
              ))}
            </div>
            ))
            : null}
      </div>
      {/*<Review/>*/}
    </div>
  );
}
