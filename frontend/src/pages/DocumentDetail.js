import React, { useState, useEffect } from 'react';
import { consume_service } from '../api/documents';
import { URL_DOCUMENT_BASE } from '../api/urls';
import { useParams } from "react-router-dom";
import HTMLFilter from '../components/datatables/HTMLFilter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CodeCopyBox from '../components/CodeCopyBox';


const DocumentDetail = () => {

    let { id } = useParams();

    // general data
    const [data,setData] = useState('');

    const [tags,setTags] = useState([]);

    const [aux,setAux] = useState('');

    const [pandas,setPandas] = useState('');

    const [numpy,setNumpy] = useState('');

    const [pyspark,setPySpark] = useState('');

    const [scikitlearn,setScikitLearn] = useState('')

    const [keras,setKeras] = useState('');

    const [tensorflow,setTensorFlow] = useState('');

    const [pytorch,setPyTorch] = useState('');

    const [trax,setTrax] = useState('');



    // remplazar etiquetas
    function remplazar(data){
            return data.replace(/<p>/g, '')    // Eliminar etiquetas <p>
                    .replace(/<\/p>/g, '')  // Eliminar cierre de etiquetas </p>
                    .replace(/<br>/g, '\n') // Reemplazar <br> con \n de Python
                    .trim();
    }



    // obtengo los datos
    useEffect(() => {
        const fetchData = async() => {
            const response = await consume_service(`${URL_DOCUMENT_BASE}${id}`,'get',{});
            setData(response.data);

            setTags(response.data.tag);
            
            setPandas(remplazar(response.data.pandas));
            setNumpy(remplazar(response.data.numpy));
            setPySpark(remplazar(response.data.pyspark));
            setScikitLearn(remplazar(response.data.scikitlearn));
            setKeras(remplazar(response.data.keras));
            setTensorFlow(remplazar(response.data.tf));
            setPyTorch(remplazar(response.data.pytorch));
            setTrax(remplazar(response.data.trax));

            


        }
        fetchData();
    }, []);



    return (
  
        <div class="col-md-4 offset-4">
            <h5><font color='blue'><center>{data.title}</center></font></h5>
            <hr></hr>

                <b>Description </b>  <HTMLFilter htmlContent={data.description} /> 
                <hr></hr>
                <b>Detail</b>                 
                        <HTMLFilter htmlContent={data.detail} />
                        

                <hr></hr>
                <b>Tags </b> 
                    {tags.map(item => (
                            <div class="offset-1">{item.name}</div>
                    ))}
                <br></br>


                
                {
                    pandas !== '' ?
                            <div>
                                <hr></hr>
                                <b>Pandas </b> 
                                <CodeCopyBox code={pandas} />
                            </div>
                            :
                            ''
                }

                
               
                {
                    numpy !== '' ?
                            <div>
                                 <hr></hr>
                                <b>Numpy </b>
                                <CodeCopyBox code={numpy} />
                            </div>
                            :
                            ''
                }

               


                {
                    pyspark !== '' ?
                            <div>
                                 <hr></hr>
                                <b>PySpark </b>
                                <CodeCopyBox code={pyspark} />

                            </div>
                            :
                            ''
                }

                

                {
                    scikitlearn !== '' ?
                            <div>
                                 <hr></hr>
                                <b>ScikitLearn </b>
                                <CodeCopyBox code={scikitlearn} />
                            </div>
                            :
                            ''
                }

                


                {
                    keras !== '' ?
                            <div>
                                 <hr></hr>
                                <b>Keras </b>
                                <CodeCopyBox code={keras} />
                            </div>
                            :
                            ''
                }

                

                {
                    tensorflow !== '' ?
                            <div>
                                 <hr></hr>
                                <b>TensorFlow </b>
                                <CodeCopyBox code={tensorflow} />
                            </div>
                            :
                            ''
                }

               


                {
                    pytorch !== '' ?
                            <div>
                                 <hr></hr>
                                <b>PyTorch </b>
                                <CodeCopyBox code={pytorch} />
                            </div>
                            :
                            ''
                }

               

                {
                    trax !== '' ?
                            <div>
                                 <hr></hr>
                                <b>Trax </b>
                                <CodeCopyBox code={setTrax} />
                            </div>
                            :
                            ''
                }
                



                <br></br>
                <hr></hr>
                <b>Observaciones:</b>                 
                    <HTMLFilter htmlContent={data.detail} />
                    <br></br>


                
                    

               
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