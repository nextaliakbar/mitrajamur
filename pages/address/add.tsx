/** @format */

import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PrivateRoute from "../../components/PrivateRoute";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import {
  fetchAddAddress,
  fetchCity,
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

  const listSubdistrict = useAppSelector(
    (state) => state.address.listSubdistrict
  );

  const initialValues: AddAddress = {
    label: "",
    name: "",
    phone: "",
    province_id: 0,
    province_name: "",
    city_id: 0,
    city_name: "",
    subdistrict_id: 0,
    subdistrict_name: "",
    address: "",
    postal_code: "",
    notes: "",
    is_default: false,
  };

  const fetchSubdistricts = (id: number) => {
    dispatch(fetchSubdistrict(id));
  };

  const fetchCities = (id: number) => {
    dispatch(fetchCity(id));
  };

  useEffect(() => {
    dispatch(fetchProvince());
  }, []);
  return (
    <PrivateRoute>
      <div className='black black TextXSmall regular'>
        <Toaster position='bottom-center' reverseOrder={false} />
        <Link
          href={"/address"}
          className='topBar fixed z-50 border-b-2 bg-white top-0 right-0 left-0 flex space-x-3.5 py-4 px-8'>
          <AiOutlineArrowLeft className='w-6 h-6' />
          <p className='TextMedium semiBold'>Tambah Alamat</p>
        </Link>

        <div className='mx-8 mt-20'>
          <Formik
            initialValues={initialValues}
            validationSchema={addAddressSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              dispatch(fetchAddAddress(values));
            }}>
            {({ errors, touched, setFieldValue, handleChange}) => (
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
                        placeholder='Alamat rumah,kantor,etc...'
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
                        placeholder='John Doe'
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
                        type='text'
                        id='phone'
                        name='phone'
                        className='h-10 w-full p-2 border4 rounded-md'
                        placeholder='08123456789'
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
                          setFieldValue('province_id', Number(e.target.value));
                          setFieldValue('province_name', e.target.selectedOptions[0].getAttribute(('data-name')))
                          fetchCities(e.target.value);
                        }}>
                        <option value={"default"} disabled>
                          --- Pilih provinsi ---
                        </option>
                        {listProvince.map((item: any) => (
                          <option
                            key={item.province_id}
                            value={item.province_id}
                            data-name={item.name}>
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
                          setFieldValue('city_id', Number(e.target.value));
                          setFieldValue('city_name', e.target.selectedOptions[0].getAttribute('data-name'))
                          fetchSubdistricts(e.target.value);
                        }}>
                        <option value={"default"} disabled>
                          --- Pilih kabupaten / kota ---
                        </option>
                        {listCity.map((item: any) => (
                          <option key={item.city_id} value={item.city_id} data-name={item.name}>
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
                        className='h-10 w-full p-2 border4 rounded-md'
                        onChange={(e:any) => {
                          handleChange(e);
                          setFieldValue("subdistrict_name", e.target.selectedOptions[0].getAttribute('data-name'));
                        }}>
                        <option value={"default"} disabled>
                          --- Pilih kecamatan ---
                        </option>
                        {listSubdistrict.map((item: any) => (
                          <option
                            key={Number(item.subdistrict_id)}
                            value={Number(item.subdistrict_id)}
                            data-name={item.name}>
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
                        placeholder='1234'
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
                        placeholder='Dusun.....,RT/RW...'
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
                        placeholder='Masuk gang merah putih....'
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
