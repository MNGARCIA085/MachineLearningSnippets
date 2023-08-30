import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { consume_service } from '../../api/documents';
import { URL_DOCUMENT_BASE, URL_TAGS_BASE } from '../../api/urls';
import Select from 'react-select';
import ReactQuill from 'react-quill';




 const DocumentEditForm = () => {

  const modules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        
      ],
    },
    // ...otros módulos
  };

   
   let { id } = useParams();


  // mensaje
  const [message,setMessage] = useState('');

   // form data
  const [formData, setFormData] = useState({
      title: '',
      detail:'',
      description:'',
      obs:'',
      pandas:'',
      numpy:'',
      pyspark:'',
      scikitlearn:'',
      keras:'',
      tf:'',
      pytorch:'',
      trax:'',
      tags:[],
  });



  // campo tipo select
  const [options, setOptions] = useState([]);
  const getOptionValue = (option) => option.id;
  const getOptionLabel = (option) => option.name;
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };


  // tags
  const handleTags = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: data
    }));
  };

  // Detail
  const handleEditorDetail = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      detail: content
    }));
  }

  const handleEditorDescription = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: content
    }));
  }

  const handleEditorObs = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      obs: content
    }));
  }

  const handleEditorPandas = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      pandas: content
    }));
  }

  const handleEditorNumpy = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      numpy: content
    }));
  }


  const handleEditorPySpark = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      pyspark: content
    }));
  }


  const handleEditorScikitLearn = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      scikitlearn: content
    }));
  }

  const handleEditorKeras = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      keras: content
    }));
  }

  const handleEditorTF = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tf: content
    }));
  }

  const handleEditorPyTorch = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      pytorch: content
    }));
  }

  const handleEditorTrax = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      trax: content
    }));
  }



 



    // para cargar los valores iniciales
    useEffect(() => {
      // géneros
      const fetchOptions = async () => {
          try {
            const response = await consume_service(URL_TAGS_BASE,'get',{});
            const data = await response.data;
            setOptions(data);
          } catch (error) {
            console.error('Error fetching options from API:', error);
          }
        };
        fetchOptions();



        // initial data
        const fetchData = async () => {
            try {
              const response = await consume_service(`${URL_DOCUMENT_BASE}${id}`,'get',{});
              const data = await response.data;
              // valores iniciales
              setFormData({...data,tags:data.tag});
            } catch (error) {
              console.error('Error fetching data from API:', error);
            }
          };
          fetchData();
        // fin
      }, []);
  



  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logic to send data to the server
    try {
        // limpio errores
        //setScoreError('');
        // de tags solamente los ids
        const selectedOptions = Array.from(formData.tags, option => option.id);
        //
        let aux = {...formData,tags:selectedOptions}; // + tags
        //
        await consume_service(`${URL_DOCUMENT_BASE}${id}`,'put',aux);
        //
        setMessage('Registro actualizado');
    } catch (error) {
      console.log(error);
      setMessage('Ocurrieron errores');
    };
  };


  



  return (


    <div class="col-md-4 offset-4">
            <div class="row">


                    EDIT DOCUMENT 
                    <br></br>
                    <hr></hr>

                    <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                type="string"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                />
                                
                            </Form.Group>
                            
                            <br></br>

                            Detail
                            <ReactQuill
                              modules={modules}
                              value={formData.detail}
                              onChange={handleEditorDetail}
                            />
                            <br></br>


                          Description
                          <ReactQuill
                              modules={modules}
                              value={formData.description}
                              onChange={handleEditorDescription}
                            />
                            <br></br>

                            <div className="form-group">
                                  <label>Géneros:</label>
                                  <Select
                                    isMulti
                                    options={options}
                                    value={formData.tags}
                                    onChange={handleTags}
                                    getOptionValue={getOptionValue} // Especifica cómo obtener el valor de cada opción
                                    getOptionLabel={getOptionLabel} // Especifica cómo obtener la etiqueta de cada opción
                                    className="selectpicker" // Clase para habilitar Bootstrap Select Picker
                                    data-live-search="true" // Habilitar búsqueda en tiempo real
                                    data-actions-box="true" // Mostrar las opciones seleccionadas en una caja
                                    required
                                  />       
                            </div>
                            <br></br>
                            
                            
                            Obs
                            <ReactQuill
                              modules={modules}
                              value={formData.obs}
                              onChange={handleEditorObs}
                            />
                            <br></br>

                            Pandas
                            <ReactQuill
                              modules={modules}
                              value={formData.pandas}
                              onChange={handleEditorPandas}
                            />
                            <br></br>

                            Numpy
                            <ReactQuill
                              modules={modules}
                              value={formData.numpy}
                              onChange={handleEditorNumpy}
                            />
                            <br></br>

                            PySpark
                            <ReactQuill
                              modules={modules}
                              value={formData.pyspark}
                              onChange={handleEditorPySpark}
                            />
                            <br></br>

                            ScikitLearn
                            <ReactQuill
                              modules={modules}
                              value={formData.scikitlearn}
                              onChange={handleEditorScikitLearn}
                            />
                            <br></br>

                            Keras
                            <ReactQuill
                              modules={modules}
                              value={formData.keras}
                              onChange={handleEditorKeras}
                            />
                            <br></br>

                            Tensor Flow
                            <ReactQuill
                              modules={modules}
                              value={formData.tf}
                              onChange={handleEditorTF}
                            />
                            <br></br>

                            PyTorch
                            <ReactQuill
                              modules={modules}
                              value={formData.pytorch}
                              onChange={handleEditorPyTorch}
                            />
                            <br></br>

                            Trax
                            <ReactQuill
                              modules={modules}
                              value={formData.trax}
                              onChange={handleEditorTrax}
                            />
                            
                            
                            <br></br>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <br></br> <br></br>
                    </Form>

                    


                    {message}

                    
            </div>

            <br></br>
                    <br></br>
                    <br></br>
    </div>



  
    
    
  );
};

export default DocumentEditForm;