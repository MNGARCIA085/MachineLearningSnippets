import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { URL_TAGS_BASE } from '../../api/urls';
import { consume_service } from '../../api/documents';


const DocumentFilterForm = (props) => {
  
   // variables del form. 
   const [formData, setFormData] = useState({
        title: '',
        tags:'',
   });

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  //
  // campo tipo select
  const [options, setOptions] = useState([]);
  const getOptionValue = (option) => option.id;
  const getOptionLabel = (option) => option.name;

  // tags
  const handleTags = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: data
    }));
  };




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
    }, []);



    // submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logic to send data to the server
    try {
      // paso solamente ids
      const selectedOptions = Array.from(formData.tags, option => option.id);
      // fn. del padre  
      props.filterData(10,1,formData.title,selectedOptions);
    } catch (error) {
      console.error(error);
    }
  };




  return (
    
    <Form onSubmit={handleSubmit}>
        
        
        <div class="form-row row">
                <div class="col-md-6">
                    <div class="form-group">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            />
                    </div>
                </div>
        </div>






      <br></br>

      <div class="form-row row">
          <div class="col-md-8">
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
              </div>
        </div>



                        




      <br></br>
      <Button variant="secondary" type="submit" size="sm">
            Search
      </Button>
    </Form>
  );
};

export default DocumentFilterForm;