/** @format */

import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PrivateRoute from "../../components/PrivateRoute";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import {
  fetchCity,
  fetchDetailAddress,
  fetchEditAddress,
  fetchProvince,
  fetchSubdistrict,
} from "../../features/address/addressSlice";
import { Toaster } from "react-hot-toast";

const addAddressSchema = Yup.object().shape({
  label: Yup.string().required("Harus diisi"),
  name: Yup.string().required("Harus diisi"),
  phone: Yup.string().required("Harus diisi"),
  subdistrict_id: Yup.string().required("Harus diisi"),
  address: Yup.string().required("Harus diisi"),
  postal_code: Yup.string().required("Harus diisi"),
  notes: Yup.string().required("Harus diisi"),
});
interface AddAddress {
  id: string;
  label: string;
  name: string;
  phone: string;
  province_id: number;
  province_name: string;
  city_id: number;
  city_name: string;
  subdistrict_id: number;
  subdistrict_name: string;
  address: string;
  postal_code: string;
  notes: string;
  is_default: boolean;
}

export default function add() {
  const dispatch = useAppDispatch();
  const listProvince = useAppSelector((state) => state.address.listProvince);

  const listCity = useAppSelector((state) => state.address.listCities);
  const listDetailAddress = useAppSelector(
    (state) => state.address.detailAddress
  );

  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    dispatch(fetchProvince());
    dispatch(fetchDetailAddress(id));
  }, []);

  console.log("listDetailAddress", listDetailAddress);

  const listSubdistrict = useAppSelector(
    (state) => state.address.listSubdistrict
  );

  const initialValues: AddAddress = {
    id: listDetailAddress?.id,
    label: listDetailAddress?.label,
    name: listDetailAddress?.name,
    phone: listDetailAddress?.phone,
    province_id: Number(listDetailAddress?.province_id),
    province_name: listDetailAddress?.province_name,
    city_id: Number(listDetailAddress?.city_id),
    city_name: listDetailAddress?.city_name,
    subdistrict_id: Number(listDetailAddress?.subdistrict_id),
    subdistrict_name: listDetailAddress?.subdistrict_name,
    address: listDetailAddress?.address,
    postal_code: listDetailAddress?.postal_code,
    notes: listDetailAddress?.notes,
    is_default: listDetailAddress?.is_default,
  };

  const fetchSubdistricts = (id: number) => {
    dispatch(fetchSubdistrict(id));
  };

  const fetchCities = (id: number) => {
    dispatch(fetchCity(id));
  };

  return (
    <PrivateRoute>
      <div className='black black TextXSmall regular'>
        <Toaster position='bottom-center' reverseOrder={false} />
        <Link
          href={"/address"}
          className='topBar fixed z-50 border-b-2 bg-white top-0 right-0 left-0 flex space-x-3.5 py-4 px-8'>
          <AiOutlineArrowLeft className='w-6 h-6' />
          <p className='TextMedium semiBold'>Edit Alamat</p>
        </Link>

        <div className='mx-8 mt-20'>
          <Formik
            initialValues={initialValues}
            validationSchema={addAddressSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              dispatch(fetchEditAddress(values));
            }}>
            {({ errors, touched, values}) => (
              <Form>
                <div className='formField pt-2 space-y-4 divide-y'>
                  <div className='space-y-4'>
                    <div className='label flex flex-col items-start space-y-2'>
                      <label htmlFor='' className='semiBold'>
                        Label
                      </label>
                      <Field
                        type='text'
                        id='label'
                        name='label'
                        className='h-10 w-full p-2 border4 rounded-md'
                      />
                      {errors.label && touched.label ? (
                        <div className='BgDangerColor'>{errors.label}</div>
                      ) : null}
                    </div>
                    <div className='nama space-y-2'>
                      <label htmlFor='' className='semiBold'>
                        Nama
                      </label>
                      <Field
                        type='text'
                        id='name'
                        name='name'
                        className='h-10 w-full p-2 border4 rounded-md'
                      />
                      {errors.name && touched.name ? (
                        <div className='BgDangerColor'>{errors.name}</div>
                      ) : null}
                    </div>
                    <div className='phone space-y-2'>
                      <label htmlFor='' className='semiBold'>
                        Nomor Handphone
                      </label>
                      <Field
                        type='number'
                        id='phone'
                        name='phone'
                        className='h-10 w-full p-2 border4 rounded-md'
                      />
                      {errors.phone && touched.phone ? (
                        <div className='BgDangerColor'>{errors.phone}</div>
                      ) : null}
                    </div>
                    <div className='prov space-y-2'>
                      <label htmlFor='' className='semiBold'>
                        Provinsi
                      </label>
                      <select
                        className='h-10 w-full p-2 border4 rounded-md'
                        defaultValue={"default"}
                        onChange={(e: any) => {
                          fetchCities(e.target.value);
                        }}>
                        <option value={"default"} disabled>
                          {values.province_name}
                        </option>
                        {listProvince.map((item: any) => (
                          <option
                            key={item.province_id}
                            value={item.province_id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='kab space-y-2'>
                      <label htmlFor='' className='semiBold'>
                        Kabupaten / Kota
                      </label>
                      <select
                        name=''
                        id=''
                        className='h-10 w-full p-2 border4 rounded-md'
                        defaultValue={"default"}
                        onChange={(e: any) => {
                          fetchSubdistricts(e.target.value);
                        }}>
                        <option value={"default"} disabled>
                          {values.city_name}
                        </option>
                        {listCity.map((item: any) => (
                          <option key={item.city_id} value={item.city_id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='kec space-y-2'>
                      <label htmlFor='' className='semiBold'>
                        Kecamatan
                      </label>
                      <Field
                        as='select'
                        name='subdistrict_id'
                        id='subdistrict_id'
                        defaultValue={"default"}
                        className='h-10 w-full p-2 border4 rounded-md'>
                        <option value={"default"} disabled>
                          {values.subdistrict_name}
                        </option>
                        {listSubdistrict.map((item: any) => (
                          <option
                            key={Number(item.subdistrict_id)}
                            value={Number(item.subdistrict_id)}>
                            {item.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <div className='pos space-y-2'>
                      <label htmlFor='' className='semiBold'>
                        Kode Pos
                      </label>
                      <Field
                        type='text'
                        name='postal_code'
                        className='h-10 w-full p-2 border4 rounded-md'
                      />
                    </div>
                    <div className='address space-y-2'>
                      <label htmlFor='' className='semiBold'>
                        Alamat Lengkap
                      </label>
                      <Field
                        as='textarea'
                        name='address'
                        cols={30}
                        rows={10}
                        className='h-20 w-full p-2 border4 rounded-md'
                      />
                    </div>
                    <div className='note space-y-2'>
                      <label htmlFor='' className='semiBold'>
                        Catatan
                      </label>
                      <Field
                        as='textarea'
                        name='notes'
                        cols={30}
                        rows={10}
                        className='h-20 w-full p-2 border4 rounded-md'
                      />
                    </div>
                    <div className='note flex items-center mb-4'>
                      <Field
                        type='checkbox'
                        as='input'
                        name='is_default'
                        className='mr-2'
                      />
                      <label htmlFor='' className='semiBold'>
                        Jadikan sebagai alamat utama
                      </label>
                    </div>
                  </div>

                  <div className='grid py-4'>
                    <button className='w-ful py-2 primary1 TextSmall rounded-md text-white mb-11'>
                      Simpan
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </PrivateRoute>
  );
}
