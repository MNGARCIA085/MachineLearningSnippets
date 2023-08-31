import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import WysiwygEditor from './WysiwigEditor';
import { consume_service } from '../../api/documents';
import { URL_DOCUMENT_BASE, URL_TAGS_BASE } from '../../api/urls';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';



 const DocumentAddForm = () => {
   
  const navigate = useNavigate();

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
      tags:'',
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
    console.log(data);
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


  // errores
  const [titleError, setTitleError] = useState('');


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
        await consume_service(URL_DOCUMENT_BASE,'post',aux);
        //
        alert('Ingresado');
        // todo ok, redirect a ver todos los datos
        navigate('/documents/', { replace: true });

    } catch (error) {
      console.log(error);
      alert('Ocurrieron errores');
    };
  };


  



  return (


    <div class="col-md-4 offset-4">
            <div class="row">


                    ADD DOCUMENT 
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
                                <small class="text-danger">
                                    {titleError}
                                </small> 
                            </Form.Group>
                            
                            <br></br>


                            Description
                            <WysiwygEditor value={formData.description} onChange={handleEditorDescription} />

                            <br></br>

                            Detail
                            <WysiwygEditor value={formData.detail} onChange={handleEditorDetail} />

                            <br></br>

                            
                            
                            <div className="form-group">
                                  <label>Tags:</label>
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
                            <br></br>

                            Obs
                            <WysiwygEditor value={formData.obs} onChange={handleEditorObs} />

                            <br></br>


                            Pandas
                            <br></br>

                            <textarea
                                  class="form-control"
                                  name='pandas'
                                  value={formData.pandas}
                                  onChange={handleChange} rows={4} cols={40} />


                            <br></br>
                       
                            Numpy
                            <br></br>

                            <textarea
                                  class="form-control"
                                  name='numpy'
                                  value={formData.numpy}
                                  onChange={handleChange} rows={4} cols={40} />

              
                            <br></br>



                            PySpark
                            <br></br>

                            <textarea
                                  class="form-control"
                                  name='pyspark'
                                  value={formData.pyspark}
                                  onChange={handleChange} rows={4} cols={40} />

              
                            <br></br>


                            ScikitLearn
                            <br></br>

                            <textarea
                                  class="form-control"
                                  name='scikitlearn'
                                  value={formData.scikitlearn}
                                  onChange={handleChange} rows={4} cols={40} />

              
                            <br></br>

                            Keras
                            <br></br>

                            <textarea
                                  class="form-control"
                                  name='keras'
                                  value={formData.keras}
                                  onChange={handleChange} rows={4} cols={40} />

              
                            <br></br>

                            Tensor Flow
                            <br></br>

                            <textarea
                                  class="form-control"
                                  name='tf'
                                  value={formData.tf}
                                  onChange={handleChange} rows={4} cols={40} />

              
                            <br></br>

                            PyTorch
                            <br></br>

                            <textarea
                                  class="form-control"
                                  name='pytorch'
                                  value={formData.pytorch}
                                  onChange={handleChange} rows={4} cols={40} />

              
                            <br></br>

                            Trax
                            <br></br>

                            <textarea
                                  class="form-control"
                                  name='trax'
                                  value={formData.trax}
                                  onChange={handleChange} rows={4} cols={40} />

              
                            <br></br>

                        
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                    </Form>

                    <br></br>
                    

            </div>

            <br></br>
            <br></br>
    </div>



  
    
    
  );
};

export default DocumentAddForm;