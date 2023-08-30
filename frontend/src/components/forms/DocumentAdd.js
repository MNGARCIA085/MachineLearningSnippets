import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import WysiwygEditor from './WysiwigEditor';
import { consume_service } from '../../api/documents';
import { URL_DOCUMENT_BASE, URL_TAGS_BASE } from '../../api/urls';
import Select from 'react-select';

 const DocumentAddForm = () => {
   


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




  // errores
  const [titleError, setTitleError] = useState('');
  const [message, setMessage] = useState('');  



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
        setMessage('Ingresado');

    } catch (error) {
      console.log(error);
      setMessage('Ocurrieron errores');
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


                            

                            Detail
                            <WysiwygEditor value={formData.detail} onChange={handleEditorDetail} />

                            <br></br>

                            Description
                            <WysiwygEditor value={formData.description} onChange={handleEditorDescription} />

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
                            <br></br>

                            Obs
                            <WysiwygEditor value={formData.obs} onChange={handleEditorObs} />

                            <br></br>

                            Pandas
                            <WysiwygEditor value={formData.pandas} onChange={handleEditorPandas} />

                            Numpy
                            <WysiwygEditor value={formData.mumpy} onChange={handleEditorNumpy} />

                            <br></br>
                           
                            PySpark
                            <WysiwygEditor value={formData.pyspark} onChange={handleEditorPySpark} />

                            <br></br>

                            ScikitLearn
                            <WysiwygEditor value={formData.scikitlearn} onChange={handleEditorScikitLearn} />

                            <br></br>

                            Keras
                            <WysiwygEditor value={formData.keras} onChange={handleEditorKeras} />

                            <br></br>

                            TF
                            <WysiwygEditor value={formData.tf} onChange={handleEditorTF} />

                            <br></br>

                            PyTorch
                            <WysiwygEditor value={formData.pytorch} onChange={handleEditorPyTorch} />

                            <br></br>

                            Trax
                            <WysiwygEditor value={formData.trax} onChange={handleEditorTrax} />

                            <br></br>

                        
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                    </Form>

                    <br></br>
                    <br></br>
                    {message}

            </div>

            <br></br>
            <br></br>
    </div>



  
    
    
  );
};

export default DocumentAddForm;