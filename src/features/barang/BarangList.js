import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import {
  setActive,
  selectBarang,
  popupShow,
  popupDesc,
  selectBarangSearch,
  selectBarangSearchField,
  selectPageActive,
  setPageActive
} from './barangSlice';
import { Row, Button, Pagination } from 'react-bootstrap'


export function BarangList(props) {
  const barang = useSelector(selectBarang);
  const barangSearch = useSelector(selectBarangSearch);
  const barangSearchField = useSelector(selectBarangSearchField);
  const pageActive = useSelector(selectPageActive);
  const dispatch = useDispatch();

  const [list, setList] = useState(barangSearchField === "" ? barang: barangSearch)
  const [page, setPage] = useState(4)
  const [totalPage, setTotalPage] = useState(0)
  // const [pageActive, setPageActive] = useState(1)
  const [listPaginate, setListPaginate] = useState([])
  const [first, setFirst] = useState(false)
  const [last, setLast] = useState(false)
  const [next, setNext] = useState(false)
  const [prev, setPrev] = useState(false)

  useEffect(() => {
    setList(barangSearchField === "" ? barang: barangSearch)
    const dataSisa = barangSearchField === "" ? barang: barangSearch;
    const sisa = dataSisa.length % page
    console.log("dataSisa ",dataSisa)
    console.log("sisa ",sisa)
    let total = Math.floor(dataSisa.length/page) 

    if(sisa > 0){
      total++
    }
    console.log("tota ",total)

    setTotalPage(total)
    const array = [...dataSisa];
    var pageActiveUI = pageActive
      const newVar= array.slice(((pageActiveUI-1)*page), (pageActive*page));
    setListPaginate(newVar)
  },[barangSearchField,barang,barangSearch,pageActive])

  useEffect(() => {
    if(pageActive == 1){
      setFirst(true)
      setPrev(true)
      console.log("total page",totalPage);
      if(totalPage == 1){
        setLast(true)
        setNext(true)
      }else{
        setLast(false)
        setNext(false)
      }
    }else if(pageActive == totalPage){
      setLast(true)
      setNext(true)
      setFirst(false)
      setPrev(false)
      if(pageActive == 1){
        setLast(true)
        setNext(true)
      }
    }else if(pageActive < totalPage){
      setLast(false)
      setNext(false)
      if(pageActive > 1){
        setFirst(false)
        setPrev(false)
      }
    }else{
      setLast(false)
      setNext(false)
      setLast(false)
      setNext(false)
    }

    setListUI()
  },[pageActive, totalPage])

  const setListUI = () => {
    const array = [...list];
    var pageActiveUI = pageActive
      console.log("array barang",barang);
      console.log("array list",list);
      console.log("array ",array);
      const newVar= array.slice(((pageActiveUI-1)*page), (pageActive*page));
      console.log("newVar ",newVar);
      console.log("pageActive ",pageActive);
      console.log("total ",totalPage);
    setListPaginate(newVar)
  }

  const nextList = () => {
    var pActive = pageActive + 1
    dispatch(setPageActive(pActive))
  }
  
  const prevList = () => {
    var pActive = pageActive - 1
    dispatch(setPageActive(pActive))
  }

  const updateRow = (row) => {
    var index = 0
    barang.map((val,i)=>{
      if(row['nama'] === val.nama){
        index = i
      }
    })
    
    dispatch(popupShow())
    dispatch(popupDesc("Update Data"))
    dispatch(setActive(index))
  }

  const deleteRow = (row) => {
    var index = 0
    barang.map((val,i)=>{
      if(row['nama'] === val.nama){
        index = i
      }
    })

    dispatch(popupShow())
    dispatch(popupDesc("Delete Data"))
    dispatch(setActive(index))
  }

  const paginate = () => {
    let paging = []
    for (let index = 1; index <= totalPage; index++) {
      paging.push(<Pagination.Item 
        active={pageActive == index ? true : false} 
        key={index}
        onClick={()=>{dispatch(setPageActive(index))}}
      >{index}</Pagination.Item>)
    }
    return paging
  }

  return (
    <Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Foto</th>
            <th>Harga Beli</th>
            <th>Harga Jual</th>
            <th>Stok</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listPaginate.length > 0 ?
            listPaginate.map((val, index) =>
              <tr key={index}>
                <td>{val.nama}</td>
                <td>{val.foto}</td>
                <td>{val.hargaBeli}</td>
                <td>{val.hargaJual}</td>
                <td>{val.stok}</td>
                <td>
                  <Button variant="info"
                    onClick={()=>{ 
                      updateRow(val)
                    }}
                  >Update Data</Button>
                  <Button variant="danger" onClick={()=>{ 
                    deleteRow(val)
                  }}>Delete Data</Button>
                </td>
              </tr>
            ):<tr>
              <td colSpan="6">Data Tidak ada</td>
            </tr>
          }
        </tbody>
      </Table>
      {listPaginate.length > 0 ?
      <Pagination>
        <Pagination.First onClick={()=>{dispatch(setPageActive(1))}} disabled={first} />
        <Pagination.Prev disabled={prev} onClick={()=>{prevList()}} />
        {paginate()}
        <Pagination.Next disabled={next} onClick={()=>{nextList()}} />
        <Pagination.Last onClick={()=>{dispatch(setPageActive(totalPage))}} disabled={last} />
      </Pagination>:<div></div>}
    </Row>
  );
}
