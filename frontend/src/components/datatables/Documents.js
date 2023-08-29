import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
//import EditButton from './EditButton';
//import DeleteButton from './DeleteButton';
import { Table } from 'react-bootstrap';
import { URL_DOCUMENT_BASE } from '../../api/urls';
import './MyComponent.css';
import AdvancedPagination from './AdvancedPagination';
import DocumentFilterForm from '../forms/DocumentFilter';





const DocumentsDataTable = () => {


  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [count,setCount] = useState(0);
  const [totalPages,setTotalPages] = useState(Math.ceil(count / limit));


  // función que recupera los datos 
  const fetchData = async (limit=10,page=1,title='') => {


    const offset = (page -1)*limit;

    // obtengo los datos de los posibles filtros
    let query = `?limit=${limit}&offset=${offset}`;

    if (title !== ''){
      query += `&title__contains=${title}`
    }

    console.log(query);
    

    const response = await axios.get(`${URL_DOCUMENT_BASE}${query}`);
    setData(response.data.data);
    //setData(response.data);


    // cant. de registros
    setCount(response.data.count);

    // cant. de páginas
    setTotalPages(Math.ceil(response.data.count / limit));


  };

  useEffect(() => {
    fetchData();
  }, []);




  const handleDelete = async(id) => {
    //setData(prevData => prevData.filter(item => item.id !== id)); de borrar lo hace bien
    const confirmacion = window.confirm("Are you sure?");
          if (confirmacion) {            
            try {
              //const response = await consume_service(`${URL_USERS_BASE}changestate/${id}`,'patch',
              //                        '',{},false);
              // recargo
              fetchData(limit,page);
            } catch (error) {
              console.error("Error al eliminar el elemento:", error);
            }
          }
  };


  //
  const handleDetail = async(id) => {
    navigate(`/documents/${id}`, { replace: true });
  };

  //
  const handleEdit = async(id) => {
    navigate(`/documents/${id}`, { replace: true });
  };


  // page
  const [currentPage,setCurrentPage] = useState(1);
  const handlePageChange = async(page) => { // handlePageChnge
    setCurrentPage(page);
    fetchData(limit,page);
  };


  // limit
  const handleSelectChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setLimit(selectedValue);
    setTotalPages(Math.ceil(count / limit));
    fetchData(selectedValue,page);
  };



  // para mostrar u ocultar el form. de búsqueda
  const [isFormVisible, setFormVisible] = useState(false);
  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };



  
  
   

  return (


   
    
    
    <div class="col-md-8 offset-2">

            <div class="row">
              <div class="col-md-6 offset-md-0">
                <a href="#" onClick={toggleForm}>
                      {isFormVisible ? 'Hide filters' : 'Show filters'}
                      <br></br><br></br>
                </a>
                  {isFormVisible && (
                      <DocumentFilterForm filterData={fetchData}/>
                  )}
                  <br></br>
                  <hr></hr>
              </div>
            </div>

            <br></br>


            <Link to="/documents/add" className="btn btn-primary btn-sm">
                    Add
            </Link>

            
            <br></br> <br></br>


            <div class="row">
                <div class="col-md-2">
                <select onChange={handleSelectChange} class="form-select">
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={25}>25</option>
                </select>
                </div>
            </div>
            <br></br>



                <Table bordered hover>
                    
                    <thead>
                        <tr>
                
                            <th>Title</th>
                            <th>Description</th>
                            <th>Detail</th>
                            <th><center>Actions</center></th>
                        </tr>
                    </thead>

                    

                    <tbody>
                    {data.map((row) => {
                        return (
                                                                                    
                        <tr>    
                            <td> {row.title}</td>
                            <td> {row.description}</td>
                            <td> {row.detail}</td>


                            <td> 
                                
                                {row.tag.map((row2) => {
                                    return (<div>{row2.name}&nbsp;</div>)
                                })}
                            
                            
                            </td>
                           





                            <td>


                            <button class="btn btn-info btn-sm" onClick={() => handleDetail(row.id)}>
                                        Detail</button>                                        
                            
                                        &nbsp; &nbsp;
                            
                            <button class="btn btn-warning btn-sm" onClick={() => handleEdit(row.id)}>
                                        Edit</button>
                            
                                        &nbsp; &nbsp; 

                               
                            <button class="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
                                    Delete</button>
                                  

                            

                            </td>
                        </tr>
                        );
                    })}
                    </tbody>
                </Table>



                {count} total records




                <AdvancedPagination currentPage={currentPage} 
                      itemPerPage={limit}
                      totalPages={totalPages}
                      onPageChange={handlePageChange} />
                            

                

    </div>
  );
};

export default DocumentsDataTable;