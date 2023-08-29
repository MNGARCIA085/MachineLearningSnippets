import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';





const DocumentFilterForm = (props) => {
  
   // variables del form. 
   const [formData, setFormData] = useState({
        title: '',
   });

  // submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logic to send data to the server
    try {
        props.filterData(10,1,formData.title);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
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
      <br></br>
      <Button variant="secondary" type="submit" size="sm">
            Search
      </Button>
    </Form>
  );
};

export default DocumentFilterForm;