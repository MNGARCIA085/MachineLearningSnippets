import React, { useState, useEffect } from 'react';
import { consume_service } from '../api/documents';
import { URL_DOCUMENT_BASE } from '../api/urls';
import { useParams } from "react-router-dom";
import HTMLFilter from '../components/datatables/HTMLFilter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


const DocumentDetail = () => {

    let { id } = useParams();

    // general data
    const [data,setData] = useState('');



    const [aux,setAux] = useState('');


    // obtengo los datos
    useEffect(() => {
        const fetchData = async() => {
            const response = await consume_service(`${URL_DOCUMENT_BASE}${id}`,'get',{});
            setData(response.data);
            
            //
            const cleanContent = response.data.tf
                .replace(/<p>/g, '')    // Eliminar etiquetas <p>
                .replace(/<\/p>/g, '')  // Eliminar cierre de etiquetas </p>
                .replace(/<br>/g, '\n') // Reemplazar <br> con \n de Python
                .trim();                // Eliminar espacios en blanco al principio y al final


            setAux(cleanContent);


        }
        fetchData();
    }, []);



    return (
  
        <div class="col-md-4 offset-4">
            <h3><font color='orange'><center>{data.title}</center></font></h3>
            <hr></hr>

                <b>Description: </b>  <HTMLFilter htmlContent={data.description} /> <br></br> <br></br>
                <b>Detail:</b>                 
                        <HTMLFilter htmlContent={data.detail} />
                        <br></br>


                
                    

                <br></br>
                <b>TensorFlow:</b>                 
                    

                    <br></br> <br></br>
                    

                        
                    <SyntaxHighlighter language="python">
      {aux}
    </SyntaxHighlighter>

                    <br></br>


                    <br></br>
                    <b>PyTorch: </b> 
                        {
                            data.pytorch === '' ?
                                'hacr' :
                                'Inactive'
                        }
                
                         <br></br> <br></br>
        </div>
    
  );
};

export default DocumentDetail;



/**
                <b>Tags: </b>
                    {data.tag.map(item => (
                            <div class="offset-1">{item.name}</div>
                    ))}
                    */