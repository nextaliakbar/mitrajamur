/** @format */

import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Layout from "../../components/layout";
import PrivateRoute from "../../components/PrivateRoute";
import TransactionList from "./TransactionList";
import {
  logoutUser,
  setOnLogin,
  setSidebar,
} from "../../features/auth/authSlice";
import AddressList from "./AddressList";
import { fetchAddress } from "../../features/address/addressSlice";
import Account from "./account";
import Review from "./review";
import ChangePassword from "./changePassword";
import Wishlist from "./wishlist";
import { BiLogOutCircle } from "react-icons/bi";
import BottomNav from "../../components/BottomNav";
import { BsFillHeartFill } from "react-icons/bs";
import { useEffect } from "react";
import { fetchProfile } from "../../features/profile/ProfileSlice";
import { fetchWishlist } from "../../features/wishlist/WishlistSlice";

export default function index() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userInfo = useAppSelector((state) => state.user.userData);

  const sidebar = useAppSelector((state) => state.auth.sidebar);

  const handleSidebar = (e: any) => {
    dispatch(setSidebar(e.target.value));
    dispatch(fetchAddress());
  };

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser()).then((res) => {
      if (res.payload) {
        dispatch(setOnLogin("login"));
        router.push("/");
      }
    });
  };

  const handleLogoutMobile = () => {
    dispatch(logoutUser()).then((res) => {
      if (res.payload) {
        router.push("/login");
      }
    });
  };

  return (
    <PrivateRoute>
      <div className="hidden md:block">
        <Layout>
          <section className="mx-auto mb-5 lg:max-w-6xl px-8 md:px-16">
            <div className="TextSmall regular breadcrumbs">
              <ul>
                <li>
                  <Link href="/">
                    <strong>Home</strong>
                  </Link>
                </li>
                <li>
                  {sidebar === "transactionList" ? (
                    <span>Riwayat Transaksi</span>
                  ) : sidebar === "wishList" ? (
                    <span>Daftar Wishlist</span>
                  ) : sidebar === "reviewList" ? (
                    <span>Riwayat Ulasan</span>
                  ) : sidebar === "account" ? (
                    <span>Akun Saya</span>
                  ) : sidebar === "addressList" ? (
                    <span>Daftar Alamat</span>
                  ) : (
                    <span>Ganti Password</span>
                  )}
                </li>
              </ul>
            </div>
            <div className="divider"></div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 TextSmall regular">
              <div className="col-span-1 rounded-xl p-5 bg-base-100 border border-gray-300 text-sm h-fit">
                <div className="filter divide-y">
                  <div className="user my-2 flex space-x-2">
                    <div className="avatar relative w-12 h-12 overflow-hidden rounded-full">
                      <Image
                        src={userInfo?.avatar}
                        alt="avatar"
                        fill
                        objectFit="cover"
                      />
                    </div>
                    <div className="identity">
                      <p className="TextMedium semiBold">
                        {userInfo?.username}
                      </p>
                      <p className="TextXSmall light">
                        {userInfo?.city || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="filter-item text-xs divide-y">
                    <div className="pembelian mb-2 pt-4">
                      <p className="TextMedium bold mb-2">Pembelian</p>
                      <div className="action flex flex-col space-y-1 w-full text1">
                        <button
                          className={
                            sidebar === "transactionList"
                              ? "bg4 text2 TextSmall sembiBold flex justify-between rounded-sm py-0.5 pl-3 w-full"
                              : "bg-transparent flex justify-between rounded-sm py-0.5 pl-3 w-full"
                          }
                          value="transactionList"
                          onClick={(e) => handleSidebar(e)}
                        >
                          Riwayat Transaksi
                          {sidebar === "transactionList" && (
                            <span className="text2Bg rounded-r-full">
                              &nbsp;
                            </span>
                          )}
                        </button>
                        <button
                          className={
                            sidebar === "wishList"
                              ? "bg4 text2 TextSmall sembiBold flex justify-between rounded-sm py-0.5 pl-3 w-full"
                              : "bg-transparent flex justify-between rounded-sm py-0.5 pl-3 w-full"
                          }
                          value="wishList"
                          onClick={(e) => handleSidebar(e)}
                        >
                          Daftar Wishlist
                          {sidebar === "wishList" && (
                            <span className="text2Bg rounded-r-full">
                              &nbsp;
                            </span>
                          )}
                        </button>

                        <button
                          className={
                            sidebar === "reviewList"
                              ? "bg4 text2 TextSmall sembiBold flex justify-between rounded-sm py-0.5 pl-3 w-full"
                              : "bg-transparent flex justify-between rounded-sm py-0.5 pl-3 w-full"
                          }
                          value="reviewList"
                          onClick={(e) => handleSidebar(e)}
                        >
                          Riwayat Ulasan
                          {sidebar === "reviewList" && (
                            <span className="text2Bg rounded-r-full">
                              &nbsp;
                            </span>
                          )}
                        </button>

                      </div>
                    </div>
                    <div className="akun pb-2 pt-4">
                      <p className="TextMedium bold mb-2">Akun</p>
                      <div className="action flex flex-col space-y-1 w-full">
                        <button
                          className={
                            sidebar === "account"
                              ? "bg4 text2 TextSmall sembiBold flex justify-between rounded-sm py-0.5 pl-3 w-full"
                              : "bg-transparent flex justify-between rounded-sm py-0.5 pl-3 w-full"
                          }
                          value="account"
                          onClick={(e) => handleSidebar(e)}
                        >
                          Akun Saya
                          {sidebar === "account" && (
                            <span className="text2Bg rounded-r-full">
                              &nbsp;
                            </span>
                          )}
                        </button>
                        <button
                          className={
                            sidebar === "addressList"
                              ? "bg4 text2 TextSmall sembiBold flex justify-between rounded-sm py-0.5 pl-3 w-full"
                              : "bg-transparent flex justify-between rounded-sm py-0.5 pl-3 w-full"
                          }
                          value="addressList"
                          onClick={(e) => handleSidebar(e)}
                        >
                          Daftar Alamat
                          {sidebar === "addressList" && (
                            <span className="text2Bg rounded-r-full">
                              &nbsp;
                            </span>
                          )}
                        </button>
                        <button
                          className={
                            sidebar === "changePassword"
                              ? "bg4 text2 TextSmall sembiBold flex justify-between rounded-sm py-0.5 pl-3 w-full"
                              : "bg-transparent flex justify-between rounded-sm py-0.5 pl-3 w-full"
                          }
                          value="changePassword"
                          onClick={(e) => handleSidebar(e)}
                        >
                          Ubah Password
                          {sidebar === "changePassword" && (
                            <span className="text2Bg rounded-r-full">
                              &nbsp;
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center pt-2">
                    <button
                      className="flex items-center text-red-500 space-x-2"
                      onClick={handleLogout}
                    >
                      <span>Keluar</span>{" "}
                      <BiLogOutCircle className="text-xl font-extrabold" />
                    </button>
                  </div>
                </div>
              </div>
              {sidebar === "transactionList" && <TransactionList />}
              {sidebar === "wishList" && <Wishlist />}
              {sidebar === "reviewList" && <Review />}
              {sidebar === "account" && <Account />}
              {sidebar === "addressList" && <AddressList />}
              {sidebar === "changePassword" && <ChangePassword />}
            </div>
          </section>
        </Layout>
      </div>
      <div className="block md:hidden">
        <div className="black h-screen TextXSmall regular black">
          <div className="divide-y mx-8 mt-7">
            <div className="user flex flex-col items-center justify-center pb-4">
              <div className="relative h-36 w-36 rounded-full overflow-hidden mb-4">
                <Image
                  src={userInfo?.avatar}
                  alt="avatar"
                  fill
                  objectFit="cover"
                />
              </div>
              <p className="TextMedium semiBold">{userInfo?.name}</p>
              <p className="light">{userInfo?.email || "-"}</p>
            </div>

            <div className="menu divide-y">
              <p className="TextMedium bold py-4">Pembelian</p>

              <Link
                className="TextSmall regular flex space-x-4 py-4"
                href={"/transaction"}
              >
                <div className="icon h-5 w-5 relative">
                  <Image
                    alt="transaction"
                    src="/icons/dashboard/transaction.png"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span>Riwayat Transaksi</span>
              </Link>

              <Link
                className="TextSmall regular flex space-x-4 py-4"
                href={"/wishlist"}
              >
                <div className="icon h-5 w-5 relative">
                  <Image
                    alt="transaction"
                    src="/icons/dashboard/wishlist.png"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span>Daftar Wishlist</span>
              </Link>

              <Link
                className="TextSmall regular flex space-x-4 py-4"
                href={"/review"}
              >
                <div className="icon h-5 w-5 relative">
                  <Image
                    alt="transaction"
                    src="/icons/dashboard/review.png"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span>Riwayat Ulasan</span>
              </Link>

              <p className="TextMedium bold py-4">Akun</p>

              <Link
                className="TextSmall regular flex space-x-4 py-4"
                href={"/account"}
              >
                <div className="icon h-5 w-5 relative">
                  <Image
                    alt="transaction"
                    src="/icons/dashboard/account.png"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span>Akun Saya</span>
              </Link>

              <Link
                className="TextSmall regular flex space-x-4 py-4"
                href={"/address"}
              >
                <div className="icon h-5 w-5 relative">
                  <Image
                    alt="transaction"
                    src="/icons/dashboard/address.png"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span>Daftar Alamat</span>
              </Link>

              <Link
                className="TextSmall regular flex space-x-4 py-4"
                href={"/change-password"}
              >
                <div className="icon h-5 w-5 relative">
                  <Image
                    alt="transaction"
                    src="/icons/dashboard/password.png"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span>Ubah Password</span>
              </Link>

              <div className="flex TextSmall regular justify-center py-4">
                <button
                  className="flex items-center text-red-500 space-x-2"
                  onClick={handleLogoutMobile}
                >
                  <span>Keluar</span>{" "}
                  <BiLogOutCircle className="text-xl font-extrabold" />
                </button>
              </div>
              <div className="mb-28 pt-8">
                <div className="flex justify-center items-center space-x-1">
                  {" "}
                  <span>Made with </span>
                  <BsFillHeartFill className="inline-block text-red-500" />
                  <span>by Metafour Team</span>
                </div>
              </div>
            </div>
          </div>

          <BottomNav />
        </div>
      </div>
    </PrivateRoute>
  );
}
