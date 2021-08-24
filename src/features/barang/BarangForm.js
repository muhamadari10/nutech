import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Form, Button, Modal } from 'react-bootstrap'
import {
  uploadForm,
  updateForm,
  selectBarang,
  selectPopup,
  popupShow,
  popupHide,
  popupDesc,
  selectBarangAction
} from './barangSlice';

import './Barang.module.css';

export function BarangForm(props) {


  const indexBarang = useSelector(selectBarangAction);
  const barang = useSelector(selectBarang);

  const [imgPreview, setImgPreview] = useState("")
  const [show] = useState(useSelector(selectPopup));
  const [errorImg, setErrorImg] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorBeli, setErrorBeli] = useState(false);
  const [errorJual, setErrorJual] = useState(false);
  const [errorStok, setErrorStok] = useState(false);

  const [foto, setFoto] = useState(null);
  const [nama, setNama] = useState(null);
  const [hargaBeli, setHargaBeli] = useState(0);
  const [hargaJual, setHargaJual] = useState(0);
  const [stok, setStok] = useState(0);

  const barangRow = barang[indexBarang]
  const dispatch = useDispatch();



  useEffect(() => {
    if(props.update){
      // setFoto(barangRow['foto'])
      setNama(barangRow['nama'])
      setHargaBeli(barangRow['hargaBeli'])
      setHargaJual(barangRow['hargaJual'])
      setStok(barangRow['stok'])
      console.log("update ",barang[indexBarang])
    }
  },[props.update])
  
  const fotoChecker = (e) => {
    if(e){
      if(e.type == "image/png" || e.type == "image/jpg"){
        console.log("true ",e);
        const size = Math.floor(e.size/1000);
        if(size <= 100){
          setFoto(e)
          setErrorImg("");
          setImgPreview(URL.createObjectURL(e))
        }else{
          setErrorImg("Format foto barang yang diizinkan hanya JPG dan PNG, dan ukurannya maksimal 100KB.");
        }
      }else{
        setErrorImg("Format foto barang yang diizinkan hanya JPG dan PNG, dan ukurannya maksimal 100KB.")
      }
    }
  }

  const namaChecker = (e) => { 
    setErrorName("")
    setNama(e)
    barang.map((x)=>{
      if(x.nama.toLowerCase() == e.toLowerCase()){
        if(props.update && barangRow['nama'] == e.toLowerCase()){
          setErrorName("")
        }else{
          setErrorName("Nama barang harus unik.")
        }
      }
    })
  }

  const submit = () => {
    
    const data = {
      foto : foto,
      nama : nama,
      hargaBeli : hargaBeli,
      hargaJual : hargaJual,
      stok : stok,
    }
    if(props.update){
      console.log("updateForm 1",data)
      console.log("updateForm 1",indexBarang)
      dispatch(updateForm({ data:data, original:barangRow, index:indexBarang }))
    }else{
      if(!foto){
        setErrorImg("Silahkan Masukan Foto ");
      }
      if(
        errorImg == "" &&
        errorName == "" && 
        errorBeli == "" &&
        errorJual == "" &&
        errorStok == "" &&
        foto
      ){
        dispatch(uploadForm(data))
      }
    }
  }

  const validateNumberField = (myNumber)=> {
    const numberRegEx = /\-?\d*\.?\d{1,2}/;
    return numberRegEx.test(String(myNumber).toLowerCase());
  };

  return (
    <Form>
      { imgPreview != "" ? <img src={imgPreview}/> : <div></div>}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Foto Barang</Form.Label>
        <Form.Control type="file" placeholder="Foto Barang" 
          onChange={(e)=>{console.log("test")}} 
          onChange={(e) => fotoChecker(e.target.files[0])}
        />
        
        <Form.Text className="text-danger">
          { errorImg }
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="NamaBarang">
        <Form.Label>Nama Barang</Form.Label>
        <Form.Control type="text" placeholder="Nama Barang" 
          value={nama}
          onChange={(e) => {
            namaChecker(e.target.value)
          }}
        />
        <Form.Text className="text-danger">{errorName}</Form.Text>
      </Form.Group>
    
      <Form.Group className="mb-3" controlId="HargaBeli">
        <Form.Label>Harga Beli</Form.Label>
        <Form.Control type="number" placeholder="Harga Beli" 
          value={hargaBeli}
          onChange={(e)=>{
            setHargaBeli(e.target.value)
            const isValid = !e.target.value || validateNumberField(e.target.value);
            setErrorBeli(isValid)
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="HargaJual">
        <Form.Label>Harga Jual</Form.Label>
        <Form.Control type="number" placeholder="Harga Jual" 
          value={hargaJual}
          onChange={(e)=>{
            setHargaJual(e.target.value)
            const isValid = !e.target.value || validateNumberField(e.target.value);
            setErrorJual(isValid)
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="stok">
        <Form.Label>Stok</Form.Label>
        <Form.Control type="number" placeholder="Stok" 
          value={stok}
          onChange={(e)=>{
            setStok(e.target.value)
            const isValid = !e.target.value || validateNumberField(e.target.value);
            setErrorStok(isValid)
          }}
        />
      </Form.Group>
      <div className="footerForm">
        <Button variant="primary" onClick={() => submit()}>
          Submit
        </Button>
        <Button variant="danger" onClick={() => dispatch(popupHide())}>
          Close
        </Button>
      </div>
    </Form>
  );
}
