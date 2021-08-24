import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import {
  selectBarang,
  setSearch,
  searchField,
  setPageActive
} from './barangSlice';
import styles from './Barang.module.css';
import { FormControl, Row, Col, Button, InputGroup } from 'react-bootstrap'


export function BarangSearch(props) {
  const barang = useSelector(selectBarang);
  const dispatch = useDispatch();
  const [show, setShow] = useState(barang.length > 0 ? true : false);
  
  
  useEffect(() => {  
    searchField("")
    setSearch([])  
    setShow(barang.length > 0 ? true : false)
  },[barang])


  const search = (keyword) => {
      let dataSearch = []
      barang.map((val,ind)=>{
        if(val.nama.includes(keyword)){
            dataSearch.push(val)
        }
      })
      dispatch(searchField(keyword))
      dispatch(setSearch(dataSearch))
      setPageActive(1)
      console.log(dataSearch);
  }

  return(
    <Row>
        { show ? <Col>
            <InputGroup className="mb-3">
                <Button variant="outline-secondary" 
                    onClick={()=> search()}
                >
                    Cari
                </Button>
                <FormControl
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    onChange={(e)=>{ 
                        search(e.target.value)
                    }}
                />
            </InputGroup>
        </Col> : <Col></Col>}
    </Row>
  )
}