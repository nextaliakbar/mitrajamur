/** @format */

import Layout from "../../components/layout";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { setPrivaccyPolicy } from "../../features/layout/LayoutSlice";


export default function index() {
  const dispatch = useDispatch();

  const privacyPolicy = useAppSelector((state) => state.layout.privacyPolicy);

  return (
    <Layout>
      <section className='mx-auto lg:max-w-6xl px-8 md:px-16 text-sm'>
        {/* <Link href='/'>
          <HiOutlineArrowLeft className='text-xl' />
        </Link> */}
        <div className='border3 p-7 rounded-md grid grid-cols-4 md:space-x-9'>
          <div className='col-span-full md:col-span-1 space-y-3'>
            <div
              className={
                privacyPolicy === "privacy-policy"
                  ? "cursor-pointer bg4 text1 font-semibold p-5 rounded-sm"
                  : "cursor-pointer border4 p-5 rounded-sm"
              }
              onClick={() => {
                dispatch(setPrivaccyPolicy("privacy-policy"));
              }}>
              <p>Kebijakan Privasi</p>
            </div>
            <div
              className={
                privacyPolicy === "terms-condition"
                  ? "cursor-pointer bg4 text1 font-semibold p-5 rounded-sm"
                  : "cursor-pointer border4 p-5 rounded-sm"
              }
              onClick={() => {
                dispatch(setPrivaccyPolicy("terms-condition"));
              }}>
              <p>Syarat & Ketentuan</p>
            </div>

            <div
              className={
                privacyPolicy === "contacts-suggestions"
                  ? "cursor-pointer bg4 text1 font-semibold p-5 rounded-sm"
                  : "cursor-pointer border4 p-5 rounded-sm"
              }
              onClick={() => {
                dispatch(setPrivaccyPolicy("contacts-suggestions"));
              }}>
              <p>Kontak dan Saran</p>
            </div>
          </div>
          <div className='col-span-full md:col-span-3'>
            {privacyPolicy === "privacy-policy" && (
              <>
                <h1 className='text-2xl font-bold mb-3'>Kebijakan Privasi</h1>
                <p>
                  Adanya Kebijakan Privasi ini adalah komitmen nyata dari
                  Tokopedia untuk menghargai dan melindungi setiap data atau
                  informasi pribadi Pengguna situs www.mitrajamur.com,
                  situs-situs turunannya, serta aplikasi gawai Tokopedia
                  (selanjutnya disebut sebagai "Situs").
                </p>
                <br />
                <p>
                  Kebijakan Privasi ini (beserta syarat-syarat penggunaan dari
                  situs Tokopedia sebagaimana tercantum dalam Syarat & Ketentuan
                  dan informasi lain yang tercantum di Situs) menetapkan dasar
                  atas perolehan, pengumpulan, pengolahan, penganalisisan,
                  penampilan, pengiriman, pembukaan, penyimpanan, perubahan,
                  penghapusan dan/atau segala bentuk pengelolaan yang terkait
                  dengan data atau informasi yang mengidentifikasikan atau dapat
                  digunakan untuk mengidentifikasi Pengguna yang Pengguna
                  berikan kepada Tokopedia atau yang Tokopedia kumpulkan dari
                  Pengguna maupun pihak ketiga (selanjutnya disebut sebagai
                  "Data Pribadi").F
                </p>
                <br />
                  <p>Dengan mengklik “Daftar” (Register) atau pernyataan serupa yang tersedia di laman pendaftaran Situs, Pengguna menyatakan bahwa setiap Data Pribadi Pengguna merupakan data yang benar dan sah, Pengguna mengakui bahwa ia telah diberitahukan dan memahami ketentuan Kebijakan Privasi ini serta Pengguna memberikan persetujuan kepada Tokopedia untuk memperoleh, mengumpulkan, mengolah, menganalisis, menampilkan, mengirimkan, membuka, menyimpan, mengubah, menghapus, mengelola dan/atau mempergunakan data tersebut untuk tujuan sebagaimana tercantum dalam Kebijakan Privasi.</p>
                  <br />
              </>
            )}
            {privacyPolicy === "terms-condition" && (
              <>
                <h1 className='text-2xl font-bold mb-3'>Syarat & Ketentuan</h1>
                <p>Selamat datang di www.belanja.mitrajamur.com</p>
                <br />
                <p>
                  Syarat & ketentuan yang ditetapkan di bawah ini mengatur
                  pemakaian jasa yang ditawarkan oleh PT. Mitra Jamur Indonesia
                  terkait penggunaan situs www.belanja.mitrajamur.com. Pengguna
                  disarankan membaca dengan seksama karena dapat berdampak
                  kepada hak dan kewajiban Pengguna di bawah hukum.
                </p>
                <br />
                <p>Dengan mendaftar dan/atau menggunakan situs www.mitrajamur.com, maka pengguna dianggap telah membaca, mengerti, memahami dan menyetujui semua isi dalam Syarat & ketentuan. Syarat & ketentuan ini merupakan bentuk kesepakatan yang dituangkan dalam sebuah perjanjian yang sah antara Pengguna dengan UD. Mitra Jamur. </p>
                <br />
                <p>Jika pengguna tidak menyetujui salah satu, pesebagian, atau seluruh isi Syarat & ketentuan, maka pengguna tidak diperkenankan menggunakan layanan di www.mitrajamur.com.</p>
              </>
            )}
            {privacyPolicy === "contacts-suggestions" && (
              <>
                <h1 className='text-2xl font-bold mb-3'>Kontak dan Saran</h1>
                <p>
                  Di www.belanja.mitrajamur.com, kami memprioritaskan kepuasan
                  pelanggan dan pengunjung kami. Kami menyadari bahwa berbelanja
                  online bisa jadi rumit dan membingungkan, terutama jika kamu
                  membutuhkan bantuan atau memiliki pertanyaan. Karena itu, tim
                  kami selalu siap membantu dan mendengarkan setiap masukan atau
                  saran yang kamu berikan.
                </p>
                <br />
                <p>
                  Kami percaya bahwa setiap pengalaman berbelanja yang sukses
                  dimulai dari pelayanan yang baik. Oleh karena itu, kami
                  menawarkan berbagai cara untuk kamu menghubungi kami dan
                  mendapatkan bantuan yang kamu butuhkan. Kamu bisa menghubungi
                  kami melalui kontak yang tersedia di situs kami, atau melalui
                  media sosial yang kami miliki.
                </p>
                <p>
                  Apapun pertanyaanmu, baik itu seputar cara berbelanja,
                  pengiriman, atau pembayaran, tim kami akan berusaha memberikan
                  jawaban yang jelas dan membantu kamu menyelesaikan masalah
                  yang sedang kamu alami. Kami juga akan memberikan rekomendasi
                  produk yang sesuai dengan kebutuhanmu, serta saran yang
                  berguna untuk meningkatkan pengalaman berbelanjamu.
                </p>
                <br />
                <p>
                  Kami sangat menghargai setiap masukan dan saran yang kamu
                  berikan, karena itu akan membantu kami terus meningkatkan
                  layanan dan pengalaman berbelanja yang kami tawarkan. Kamu
                  bisa memberikan saran atau masukan kapan saja, dan kami akan
                  dengan senang hati mendengarkan dan mempertimbangkannya.
                </p>
                <br />
                <p>
                  Jangan ragu untuk menghubungi kami jika kamu membutuhkan
                  bantuan atau memiliki saran untuk kami. Kami berkomitmen untuk
                  memberikan pelayanan terbaik dan pengalaman berbelanja yang
                  menyenangkan untuk setiap pelanggan dan pengunjung kami.
                  Terima kasih telah mempercayakan belanja onlinemu di
                  www.belanja.mitrajamur.com!
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
