/** @format */

import { IoCloseOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setMobileFilterOpen } from "../features/layout/LayoutSlice";
import { AiFillStar } from "react-icons/ai";
import {
  fetchFilteredProducts,
  setFilterCategory,
} from "../features/product/ProductSlice";

export default function MobileFIlter() {
  const dispatch = useAppDispatch();

  const mobileFilter = useAppSelector((state) => state.layout.mobileFilter);
  const product = useAppSelector((state) => state.product);
  const filterInfo = useAppSelector((state) => state.product.filter);
  const handleClose = () => {
    dispatch(setMobileFilterOpen(false));
  };
  return (
    <div
      className={`${
        mobileFilter ? "bottom-0" : "-bottom-full"
      } fixed z-30 w-full h-1/2 shadowXl bg-white border-t-2 rounded-t-2xl transition-all duration-500 ease-in-out`}
    >
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold"></h1>
        <button onClick={handleClose}>
          <IoCloseOutline className="text-2xl" />
        </button>
      </div>
      <div className="overflow-y-scroll h-full">
        <div className="Category space-y-4 px-8 pt-0 pb-4">
          <p className="TextSmall semiBold">Filter Kategori</p>
          <div className="item flex flex-wrap space-y-2">
            {product?.categories?.length > 0 ? (
              product?.categories.map((item: any) => (
                <div
                  className={
                    filterInfo.category === item.id
                      ? "mr-2 cursor-pointer TextXSmall m-0 leading-none semiBold w-fit black py-2 px-4 rounded-md border-2 bg-gray-300"
                      : "mr-2 cursor-pointer TextXSmall m-0 leading-none semiBold w-fit black py-2 px-4 rounded-md border-2 border-gray-300"
                  }
                  key={item.id}
                  onClick={() => {
                    dispatch(setFilterCategory(item.id));

                    dispatch(
                      fetchFilteredProducts({
                        q: filterInfo.q,
                        category: item.id,
                        sort: filterInfo.sort,
                      }),
                    );

                    dispatch(setMobileFilterOpen(false));
                  }}
                >
                  <span>{item.name}</span>
                </div>
              ))
            ) : (
              <p className="TextXSmall black semiBold">Tidak ada kategori</p>
            )}
          </div>
        </div>
        {/* <div className='divider px-8 m-0'></div> */}
        {/* <div className='Rating space-y-4 px-8 pb-24 pt-4'>
          <p className='TextSmall semiBold'>Filter Rating</p>
          <div className='flex flex-wrap space-y-2'>
            <div className='item  mr-2 TextXSmall m-0 leading-none semiBold w-fit black py-2 px-2 rounded-md border-2 border-gray-300'>
              <div className='flex space-x-1'>
                <span>1</span>
                <AiFillStar
                  className='text-sm text-yellow-400'
                  onClick={() => {
                    dispatch(
                      fetchFilteredProducts({
                        q: filterInfo.q,
                        category: filterInfo.category,
                        sort: filterInfo.sort,
                        rating: 1,
                      })
                    );

                    dispatch(setMobileFilterOpen(false));
                  }}
                />
              </div>
            </div>
            <div className='item  mr-2 TextXSmall m-0 leading-none semiBold w-fit black py-2 px-2 rounded-md border-2 border-gray-300'>
              <div className='flex space-x-1'>
                <span>2</span>
                <AiFillStar
                  className='text-sm text-yellow-400'
                  onClick={() => {
                    dispatch(
                      fetchFilteredProducts({
                        q: filterInfo.q,
                        category: filterInfo.category,
                        sort: filterInfo.sort,
                        rating: 2,
                      })
                    );

                    dispatch(setMobileFilterOpen(false));
                  }}
                />
              </div>
            </div>
            <div className='item  mr-2 TextXSmall m-0 leading-none semiBold w-fit black py-2 px-2 rounded-md border-2 border-gray-300'>
              <div className='flex space-x-1'>
                <span>3</span>
                <AiFillStar
                  className='text-sm text-yellow-400'
                  onClick={() => {
                    dispatch(
                      fetchFilteredProducts({
                        q: filterInfo.q,
                        category: filterInfo.category,
                        sort: filterInfo.sort,
                        rating: 3,
                      })
                    );

                    dispatch(setMobileFilterOpen(false));
                  }}
                />
              </div>
            </div>
            <div className='item  mr-2 TextXSmall m-0 leading-none semiBold w-fit black py-2 px-2 rounded-md border-2 border-gray-300'>
              <div className='flex space-x-1'>
                <span>4</span>
                <AiFillStar
                  className='text-sm text-yellow-400'
                  onClick={() => {
                    dispatch(
                      fetchFilteredProducts({
                        q: filterInfo.q,
                        category: filterInfo.category,
                        sort: filterInfo.sort,
                        rating: 4,
                      })
                    );

                    dispatch(setMobileFilterOpen(false));
                  }}
                />
              </div>
            </div>
            <div className='item  mr-2 TextXSmall m-0 leading-none semiBold w-fit black py-2 px-2 rounded-md border-2 border-gray-300'>
              <div className='flex space-x-1'>
                <span>5</span>
                <AiFillStar
                  className='text-sm text-yellow-400'
                  onClick={() => {
                    dispatch(
                      fetchFilteredProducts({
                        q: filterInfo.q,
                        category: filterInfo.category,
                        sort: filterInfo.sort,
                        rating: 5,
                      })
                    );

                    dispatch(setMobileFilterOpen(false));
                  }}
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
