/** @format */

import { useEffect, useCallback, useMemo, useState } from "react";
import { useDropzone, FileWithPath, DropzoneState } from "react-dropzone";
import Link from "next/link";
import PrivateRoute from "../../components/PrivateRoute";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Image from "next/image";

export default function avatar() {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  return (
    <PrivateRoute>
      <div className='black h-screen TextXSmall black'>
        <Link
          href={"/account"}
          className='topBar fixed z-50 border-b-2 bg-white top-0 right-0 left-0 flex space-x-3.5 py-4 px-8'>
          <AiOutlineArrowLeft className='w-6 h-6' />
          <p className='TextMedium semiBold'>Upload Foto</p>
        </Link>

        <div className='mx-8 mt-20'>
          <section className='h-fit'>
            <div {...getRootProps({ className: "dropzone dropzoneBorder space-y-4" })}>
              <input {...getInputProps()} />
              <div className='icon relative h-10 w-10'>
                <Image
                  src='/icons/dropzone.png'
                  alt='uploadIcon'
                  layout='fill'
                  objectFit='contain'
                />
              </div>
              <div className='desc space-y-2 text-center'>
                <p className='primaryColor'>
                  Select a file or drag and drop here
                </p>
                <p className='scale4Color'>
                  JPG, PNG or PDF, file size no more than 10MB
                </p>
              </div>
            </div>
            <aside>{thumbs}</aside>
          </section>

          <div className="gird mt-8">
            <button className="primary1 w-full TextSmall semiBold text-white py-2 rounded-md">Simpan</button>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
