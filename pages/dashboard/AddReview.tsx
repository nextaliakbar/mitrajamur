/** @format */

import { BiX } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    fetchAddAddress,
    fetchCity,
    fetchProvince,
    fetchSubdistrict,
    setModalAdd,
} from "../../features/address/addressSlice";
import {setReviewOrder} from "../../features/product/ProductSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import {postReview, setRating, setReview} from "../../features/review/reviewSlice";
import {fetchTransaction} from "../../features/checkout/checkoutSlice";
import {Rating} from "react-simple-star-rating";
import Image from "next/image";

const AddReviewSchema = Yup.object().shape({
    title: Yup.string().required("Judul harus diisi"),
    order_id: Yup.string().required("Order ID harus diisi"),
    rating: Yup.string().required("Silahkan pilih rating 1 - 5"),
    review: Yup.string().required("Review harus diisi"),
});

export default function AddReview() {
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setReviewOrder(false));
    };

    const detailReview = useAppSelector((state) => state.review.reviews);

    const rating = useAppSelector((state) => state.review.rating);
    const review = useAppSelector((state) => state.review.review);

    return (
        <div className='relative z-10'>
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

            <div className='fixed inset-0 z-10 overflow-y-auto'>
                <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                    <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                        <div className='bg-white p-3'>
                            <div className='content text-xs'>
                                <div className='title flex justify-between'>
                                    <p className='text-sm font-semibold'>Tambah Ulasan</p>
                                    <button
                                        className='text-gray-500 hover:text-red-500'
                                        onClick={handleClose}>
                                        <BiX className='text-2xl' />
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
                                                    emptyStyle={{display: "flex"}}
                                                    fillStyle={{display: "-webkit-inline-box"}}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}