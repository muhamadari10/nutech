import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button, Modal, InputGroup, FormControl } from 'react-bootstrap'
import {
  selectBarang,
  selectPopup,
  popupShow,
  popupHide,
  popupDesc,
  selectModalDesc
} from './barangSlice';
import { BarangSearch } from './BarangSearch';
import { BarangList } from './BarangList';
import { BarangForm } from './BarangForm';
import { BarangModalDelete } from './BarangModalDelete';
import './Barang.module.css';

export function Barang() {
  const barang = useSelector(selectBarang);
  const show = useSelector(selectPopup)
  const modalDesc = useSelector(selectModalDesc)

  
  const dispatch = useDispatch();
  const handleClose = () => dispatch(popupHide());
  const handleShow = () => {
    dispatch(popupShow());
    dispatch(popupDesc("Insert Data"))
  }

  return (
    <Container>
      <BarangSearch />  
      <Row>
        <BarangList />  
      </Row>
      <Row>
        <Col>
          <Button variant="flat" onClick={handleShow}>Create Data</Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalDesc}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { modalDesc == "Insert Data" ? <BarangForm/> : modalDesc == "Update Data" ? <BarangForm update/> : <BarangModalDelete/> }
        </Modal.Body>
      </Modal>

    </Container>
  );
}
