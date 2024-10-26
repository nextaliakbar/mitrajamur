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
import { useEffect } from "react";

const AddAddressSchema = Yup.object().shape({
    label: Yup.string().required("Label harus diisi"),
    name: Yup.string().required("Nama harus diisi"),
    phone: Yup.string().required("Nomor telepon harus diisi"),
    province_id: Yup.number().required("Provinsi harus diisi"),
    province_name: Yup.string().required("Provinsi harus diisi"),
    city_id: Yup.number().required("Kota harus diisi"),
    city_name: Yup.string().required("Kota harus diisi"),
    subdistrict_id: Yup.number().required("Kecamatan harus diisi"),
    subdistrict_name: Yup.string().required("Kecamatan harus diisi"),
    address: Yup.string().required("Alamat harus diisi"),
    postal_code: Yup.string().required("Kode pos harus diisi"),
    notes: Yup.string().required("Catatan harus diisi"),
    is_default: Yup.boolean().required("Default harus diisi"),
});

export default function AddAddress() {
    const dispatch = useAppDispatch();
    const modalAdd = useAppSelector((state) => state.address.modalAdd);

    const listProvince = useAppSelector((state) => state.address.listProvince);
    // console.log("listProvince", listProvince);

    const listCity = useAppSelector((state) => state.address.listCities);
    // console.log("listCity", listCity);

    const listSubdistrict = useAppSelector(
        (state) => state.address.listSubdistrict
    );
    // console.log("listSubdistrict", listSubdistrict);

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

    const handleSubmit = (values: any) => {
        // console.log(values);
        dispatch(fetchAddAddress(values)).then(() => {
          dispatch(setModalAdd(false));
        });
    };

    const formik = useFormik({
        initialValues: {
            label: "",
            name: "",
            phone: "",
            province_id: "",
            province_name:"",
            city_id: "",
            city_name:"",
            subdistrict_id: "",
            subdistrict_name:"",
            address: "",
            postal_code: "",
            notes: "",
            is_default: false,
        },
        validationSchema: AddAddressSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div className='relative z-10'>
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

            <div className='fixed inset-0 z-10 overflow-y-auto'>
                <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                    <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                        <div className='bg-white p-3'>
                            <div className='content text-xs'>
                                <div className='title flex justify-between'>
                                    <p className='text-sm font-semibold'>Tambah Alamat</p>
                                    <button
                                        className='text-gray-500 hover:text-red-500'
                                        onClick={handleClose}>
                                        <BiX className='text-2xl' />
                                    </button>
                                </div>
                                <form onSubmit={formik.handleSubmit}>
                                    <label className='label'>Label</label>
                                    <input
                                        type='text'
                                        name='label'
                                        id='label'
                                        className='input input-bordered input-sm w-full'
                                        placeholder='Alamat rumah,kantor,etc...'
                                        onChange={formik.handleChange}
                                        value={formik.values.label}
                                    />
                                    {formik.errors.label && formik.touched.label ? (
                                        <div className='text-red-500 text-xs'>
                                            {formik.errors.label}
                                        </div>
                                    ) : null}

                                    <label className='label'>Nama</label>
                                    <input
                                        type='text'
                                        name='name'
                                        id='name'
                                        className='input input-bordered input-sm w-full'
                                        placeholder='John Doe'
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    />
                                    {formik.errors.name && formik.touched.name ? (
                                        <div className='text-red-500 text-xs'>
                                            {formik.errors.name}
                                        </div>
                                    ) : null}

                                    <label className='label'>Nomor Telepon</label>
                                    <input
                                        type='text'
                                        name='phone'
                                        id='phone'
                                        placeholder='08123456789'
                                        className='input input-bordered input-sm w-full'
                                        onChange={formik.handleChange}
                                        value={formik.values.phone}
                                    />
                                    {formik.errors.phone && formik.touched.phone ? (
                                        <div className='text-red-500 text-xs'>
                                            {formik.errors.phone}
                                        </div>
                                    ) : null}

                                    <label className='label'>Provinsi</label>
                                    <select
                                        name='province_id'
                                        id='province_id'
                                        className='input input-bordered input-sm w-full'
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            formik.setFieldValue("province_name", e.target.selectedOptions[0].getAttribute('data-name'));
                                            fetchCities(Number(e.target.value));
                                        }}
                                        value={formik.values.province_id}
                                    >
                                        <option value=''>Pilih Provinsi</option>
                                        {listProvince.map((item: any) => (
                                            <option
                                                key={item.province_id}
                                                value={item.province_id}
                                                data-name={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>

                                    <label className='label'>Kota</label>
                                    <select
                                        name='city_id'
                                        id='city_id'
                                        className='input input-bordered input-sm w-full'
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            formik.setFieldValue("city_name", e.target.selectedOptions[0].getAttribute('data-name'));
                                            fetchSubdistricts(Number(e.target.value));
                                        }}
                                        value={formik.values.city_id}
                                    >
                                        <option value=''>Pilih Kota</option>
                                        {listCity.map((item: any) => (
                                            <option
                                                key={item.city_id}
                                                value={item.city_id}
                                                data-name={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>

                                    <label className='label'>Kecamatan</label>
                                    <select
                                        name='subdistrict_id'
                                        id='subdistrict_id'
                                        className='input input-bordered input-sm w-full'
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            formik.setFieldValue("subdistrict_name", e.target.selectedOptions[0].getAttribute('data-name'));
                                        }}
                                        value={formik.values.subdistrict_id}
                                    >
                                        <option value=''>Pilih Kecamatan</option>
                                        {listSubdistrict.map((item: any) => (
                                            <option
                                                key={item.subdistrict_id}
                                                value={item.subdistrict_id}
                                                data-name={item.name}>
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

                                    <label className='label'>Alamat Lengkap</label>
                                    <input
                                        type='text'
                                        name='address'
                                        id='address'
                                        className='input input-bordered input-sm w-full'
                                        placeholder='Dusun.....,RT/RW...'
                                        onChange={formik.handleChange}
                                        value={formik.values.address}
                                    />
                                    {formik.errors.address && formik.touched.address ? (
                                        <div className='text-red-500 text-xs'>
                                            {formik.errors.address}
                                        </div>
                                    ) : null}

                                    <label className='label'>Kode Pos</label>
                                    <input
                                        type='text'
                                        name='postal_code'
                                        id='postal_code'
                                        className='input input-bordered input-sm w-full'
                                        placeholder='1234'
                                        onChange={formik.handleChange}
                                        value={formik.values.postal_code}
                                    />
                                    {formik.errors.postal_code && formik.touched.postal_code ? (
                                        <div className='text-red-500 text-xs'>
                                            {formik.errors.postal_code}
                                        </div>
                                    ) : null}

                                    <label className='label'>Catatan</label>
                                    <input
                                        type='text'
                                        name='notes'
                                        id='notes'
                                        className='input input-bordered input-sm w-full'
                                        placeholder='Masuk gang merah putih....'
                                        onChange={formik.handleChange}
                                        value={formik.values.notes}
                                    />
                                    {formik.errors.notes && formik.touched.notes ? (
                                        <div className='text-red-500 text-xs'>
                                            {formik.errors.notes}
                                        </div>
                                    ) : null}

                                    <label className='label'>Jadikan Alamat Utama</label>
                                    <input
                                        type='checkbox'
                                        name='is_default'
                                        id='is_default'
                                        className='input input-bordered input-sm w-full'
                                        onChange={formik.handleChange}
                                        // value={formik.values.is_default}
                                    />

                                    {formik.errors.is_default && formik.touched.is_default ? (
                                        <div className='text-red-500 text-xs'>
                                            {formik.errors.is_default}
                                        </div>
                                    ) : null}

                                    <button className='btn btn-md' type='submit'>
                                        Tambah Alamat
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}