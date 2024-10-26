/** @format */

import { IoCloseOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setReviewOrder } from "../../../features/product/ProductSlice";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import {
  setRating,
  setReview,
  postReview,
} from "../../../features/review/reviewSlice";
import { fetchTransaction } from "../../../features/checkout/checkoutSlice";

export default function Review() {
  const dispatch = useAppDispatch();

  const reviewOrder = useAppSelector((state) => state.product.reviewOrder);
  const detailReview = useAppSelector((state) => state.review.reviews);
  const rating = useAppSelector((state) => state.review.rating);
  const review = useAppSelector((state) => state.review.review);
  const handleClose = () => {
    dispatch(setReviewOrder(false));
  };

  return (
    <div
      className={`${
        reviewOrder ? "bottom-0" : "-bottom-full"
      } fixed z-30 w-full h-3/7 shadowXl bg-white border-t-2 rounded-t-2xl transition-all duration-500 ease-in-out`}>
      <div className='flex justify-between items-center p-4'>
        <h1 className='text-xl font-bold'></h1>
        <button onClick={handleClose}>
          <IoCloseOutline className='text-2xl' />
        </button>
      </div>
      <div className='overflow-y-scroll h-full TextXSmall ligh black px-8'>
        <div className='header flex space-x-2'>
          <div className='product-img relative h-10 w-10 rounded-md overflow-hidden'>
            <Image
              src={detailReview?.product_thumbnail}
              alt='product'
              layout='fill'
              objectFit='cover'
            />
          </div>
          <div className='desc'>
            <p className='TextSmall semiBold'>{detailReview?.product_name}</p>
            <p className=''>Bagaimana kualitas produk ini?</p>
          </div>
        </div>
        <div className='form divide-y'>
          <div className='flex justify-center py-4'>
            <Rating
              initialValue={5}
              size={32}
              transition
              allowFraction={false}
              emptyStyle={{ display: "flex" }}
              fillStyle={{ display: "-webkit-inline-box" }}
              onClick={(value) => {
                dispatch(setRating(value));
              }}
            />
          </div>
          <div className='review py-4 space-y-2'>
            <p className='semiBold'>Berikan ulasan mu terhadap produk ini.</p>
            <textarea
              className='w-full h-20 border rounded-md p-2'
              placeholder='Tulis ulasanmu disini...'
              onChange={(e) => {
                dispatch(setReview(e.target.value));
              }}
            />
          </div>
          <div className='grid pb-5'>
            <button
              className='mx-auto py-2 px-4 TextSmall semiBold text-white primary1 w-fit rounded-md'
              onClick={() => {
                dispatch(
                  postReview({
                    title: "Review " + detailReview?.product_name,
                    order_id: detailReview?.order_id,
                    rating: rating,
                    review: review,
                  })
                ).then(() => {
                  dispatch(setReviewOrder(false));
                  dispatch(fetchTransaction());
                });
              }}>
              Kirim Ulasan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
