/** @format */

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setShowShare } from "../features/product/ProductSlice";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  LineShareButton,
  LineIcon,
  EmailShareButton,
  EmailIcon,
  InstapaperShareButton,
  InstapaperIcon,
} from "next-share";
import { IoCloseOutline } from "react-icons/io5";

export default function Share() {
  const dispatch = useAppDispatch();
  const showShare = useAppSelector((state) => state.product.showShare);

  const handleShareClose = () => {
    dispatch(setShowShare(false));
  };

  const urlShare = typeof window !== "undefined" ? window.location.href : "";
  const slug = urlShare.split("/").pop();
  const titleShare = `Belanja *${slug}* di Mitra Jamur Indonesia`;

  return (
    <div
      className={`${
        showShare ? "bottom-0" : "-bottom-full"
      } fixed z-30 w-full h-1/4 bg-white border-t-2 rounded-t-2xl transition-all duration-500 ease-in-out`}>
      <div className='flex justify-between items-center p-4'>
        <h1 className='text-xl font-bold'>Share</h1>
        <button onClick={handleShareClose}>
          <IoCloseOutline className="text-xl"/>
        </button>
      </div>
      <div className='grid grid-flow-col-dense'>
        <div className='flex flex-col justify-center items-center'>
          <FacebookShareButton
            url={urlShare}
            quote={titleShare}
            hashtag='#mitrajamurindonesia'>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <p className='text-xs'>Facebook</p>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <WhatsappShareButton url={urlShare} title={titleShare} separator=': '>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <p className='text-xs'>Whatsapp</p>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <TwitterShareButton
            url={urlShare}
            title={titleShare}
            hashtags={["mitrajamurindonesia"]}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <p className='text-xs'>Twitter</p>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <TelegramShareButton url={urlShare} title={titleShare}>
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
          <p className='text-xs'>Telegram</p>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <LineShareButton url={urlShare} title={titleShare}>
            <LineIcon size={32} round={true} />
          </LineShareButton>
          <p className='text-xs'>Line</p>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <EmailShareButton
            url={urlShare}
            title={titleShare}
            subject='Mitra Jamur Indonesia'
            body={titleShare}>
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
          <p className='text-xs'>Email</p>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <InstapaperShareButton url={urlShare} title={titleShare}>
            <InstapaperIcon size={32} round={true} />
          </InstapaperShareButton>

          <p className='text-xs'>Instapaper</p>
        </div>
      </div>
    </div>
  );
}
