import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Form, Button, Modal } from 'react-bootstrap'
import {
  selectBarang,
  selectBarangAction,
  popupHide,
  deleteItem,
  setActive
} from './barangSlice';
import { BarangList } from './BarangList';
import './Barang.module.css';

export function BarangModalDelete() {
  const dispatch = useDispatch();
  const barang = useSelector(selectBarang);
  const active = useSelector(selectBarangAction);

  return (
    <div>
      <div>
        Apakah anda ingin menghapus data tersebut?  
      </div> 
      <div className="footerForm">
        <Button variant="primary" 
          onClick={() => {
            dispatch(deleteItem(active))
          }} 
        >
          Ya
        </Button>
        <Button variant="danger" onClick={() =>{ 
          dispatch(popupHide())
          dispatch(setActive(null))
        }}>
          Tidak
        </Button>
      </div>
    </div>
  );
}
