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
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

const AddAddressSchema = Yup.object().shape({
  label: Yup.string().required("Label harus diisi"),
  name: Yup.string().required("Nama harus diisi"),
  phone: Yup.string().required("Nomor telepon harus diisi"),
  subdistrict_id: Yup.number().required("Kecamatan harus diisi"),
  address: Yup.string().required("Alamat harus diisi"),
  postal_code: Yup.string().required("Kode pos harus diisi"),
  pinpoint: Yup.string().required("Pinpoint harus diisi"),
  notes: Yup.string().required("Catatan harus diisi"),
  is_default: Yup.boolean().required("Default harus diisi"),
  province_id: Yup.number().required("Provinsi harus diisi"),
});

export default function AddAddress() {
  const dispatch = useAppDispatch();
  const modalAdd = useAppSelector((state) => state.address.modalAdd);
  console.log("modalAdd", modalAdd);
  const [loading, setLoading] = useState(false);

  const listProvince = useAppSelector((state) => state.address.listProvince);
  console.log("listProvince", listProvince);

  const listCity = useAppSelector((state) => state.address.listCities);
  console.log("listCity", listCity);

  const listSubdistrict = useAppSelector(
    (state) => state.address.listSubdistrict
  );
  console.log("listSubdistrict", listSubdistrict);

  useEffect(() => {
    dispatch(fetchProvince());
  }, []);

  const handleClose = () => {
    dispatch(setModalAdd(false));
  };

  const fetchCities = (id: number) => {
    dispatch(fetchCity(id));
  };

  const fetchSubdistricts = (id: number) => {
    dispatch(fetchSubdistrict(id));
  };

  console.log("subdistrict", fetchSubdistricts);

  const handleSubmit = (values: any) => {
    console.log("values", values);
    // dispatch(fetchAddAddress(values)).then(() => {
    //   dispatch(setModalAdd(false));
    // });
  };

  const formik = useFormik({
    initialValues: {
      label: "",
      name: "",
      phone: "",
      subdistrict_id: "",
      address: "",
      postal_code: "",
      pinpoint: "",
      notes: "",
      is_default: false,
    },
    validationSchema: AddAddressSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div
      className={`${
        modalAdd ? "right-0 top-0 bottom-0" : "-right-full"
      } absolute z-30 w-full h-full bg-white border-l-2 rounded-l-2xl transition-all duration-500 ease-in-out`}>
      <div className='bg-white p-3'>
        <div className='content text-xs'>
          <div className='title flex justify-between'>
            <button
              className='text-gray-500 hover:text-red-500'
              onClick={handleClose}>
              <BiX className='text-2xl' />
            </button>
            <p className='text-sm font-semibold'>Tambah Alamat</p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className='grid grid-cols-3 gap-2'>
              <div className='span-1'>
                <label className='label'>Label</label>
                <input
                  type='text'
                  name='label'
                  id='label'
                  className='input input-bordered input-sm w-full'
                  onChange={formik.handleChange}
                  value={formik.values.label}
                />
                {formik.errors.label && formik.touched.label ? (
                  <div className='text-red-500 text-xs'>
                    {formik.errors.label}
                  </div>
                ) : null}
              </div>

              <div className='span-1'>
                {" "}
                <label className='label'>Nama</label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  className='input input-bordered input-sm w-full'
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className='text-red-500 text-xs'>
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>

              <div className='span-1'>
                <label className='label'>Nomor Telepon</label>
                <input
                  type='text'
                  name='phone'
                  id='phone'
                  className='input input-bordered input-sm w-full'
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <div className='text-red-500 text-xs'>
                    {formik.errors.phone}
                  </div>
                ) : null}
              </div>

              <div className='span-1'>
                <label className='label'>Provinsi</label>
                <select
                  name='province_id'
                  id='province_id'
                  className='input input-bordered input-sm w-full'
                  onChange={
                    (formik.handleChange,
                    (e: any) => fetchCities(e.target.value))
                  }>
                  <option value=''>Pilih Provinsi</option>
                  {listProvince.map((item: any) => (
                    <option key={item.province_id} value={item.province_id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {/* {formik.errors.province_id &&
                  formik.touched.province_id ? (
                    <div className='text-red-500 text-xs'>
                      {formik.errors.province_id}
                    </div>
                  ) : null} */}
              </div>

              <div className='span-1'>
                <label className='label'>Kota</label>
                <select
                  name='city_id'
                  id='city_id'
                  className='input input-bordered input-sm w-full'
                  onChange={
                    (formik.handleChange,
                    (e: any) => fetchSubdistricts(e.target.value))
                  }>
                  <option value=''>Pilih Kota</option>
                  {listCity.map((item: any) => (
                    <option key={item.city_id} value={item.city_id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='span-1'>
                <label className='label'>Kecamatan</label>
                <select
                  name='subdistrict_id'
                  id='subdistrict_id'
                  className='input input-bordered input-sm w-full'
                  onChange={formik.handleChange}>
                  <option value=''>Pilih Kecamatan</option>
                  {listSubdistrict.map((item: any) => (
                    <option
                      key={item.subdistrict_id}
                      value={item.subdistrict_id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {formik.errors.subdistrict_id &&
                formik.touched.subdistrict_id ? (
                  <div className='text-red-500 text-xs'>
                    {formik.errors.subdistrict_id}
                  </div>
                ) : null}
              </div>

              <div className='span-1'>
                <label className='label'>Alamat</label>
                <input
                  type='text'
                  name='address'
                  id='address'
                  className='input input-bordered input-sm w-full'
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                {formik.errors.address && formik.touched.address ? (
                  <div className='text-red-500 text-xs'>
                    {formik.errors.address}
                  </div>
                ) : null}
              </div>

              <div className='span-1'>
                <label className='label'>Kode Pos</label>
                <input
                  type='text'
                  name='postal_code'
                  id='postal_code'
                  className='input input-bordered input-sm w-full'
                  onChange={formik.handleChange}
                  value={formik.values.postal_code}
                />
                {formik.errors.postal_code && formik.touched.postal_code ? (
                  <div className='text-red-500 text-xs'>
                    {formik.errors.postal_code}
                  </div>
                ) : null}
              </div>

              <div className='span-1'>
                <label className='label'>Pinpoint</label>
                <input
                  type='text'
                  name='pinpoint'
                  id='pinpoint'
                  className='input input-bordered input-sm w-full'
                  onChange={formik.handleChange}
                  value={formik.values.pinpoint}
                />
                {formik.errors.pinpoint && formik.touched.pinpoint ? (
                  <div className='text-red-500 text-xs'>
                    {formik.errors.pinpoint}
                  </div>
                ) : null}
              </div>

              <div className='span-1'>
                <label className='label'>Catatan</label>
                <input
                  type='text'
                  name='notes'
                  id='notes'
                  className='input input-bordered input-sm w-full'
                  onChange={formik.handleChange}
                  value={formik.values.notes}
                />
                {formik.errors.notes && formik.touched.notes ? (
                  <div className='text-red-500 text-xs'>
                    {formik.errors.notes}
                  </div>
                ) : null}
              </div>

              <div className='span-1 flex items-center'>
                <label className='label w-full'>Jadikan Alamat Utama</label>
                <input
                  type='checkbox'
                  name='is_default'
                  id='is_default'
                  className='input input-sm'
                  onChange={formik.handleChange}
                  // value={formik.values.is_default}
                />

                {formik.errors.is_default && formik.touched.is_default ? (
                  <div className='text-red-500 text-xs'>
                    {formik.errors.is_default}
                  </div>
                ) : null}
              </div>

              <div className='col-span-full'>
                <button
                  type='submit'
                  className='btn btn-primary w-full mt-3'
                  disabled={loading}>
                  {loading ? (
                    <div className='flex justify-center'>
                      <div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-5 w-5'></div>
                    </div>
                  ) : (
                    "Tambah Alamat"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
