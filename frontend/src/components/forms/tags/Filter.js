import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';



const TagsFilterForm = (props) => {
  
   // variables del form. 
   const [formData, setFormData] = useState({
        name: '',
   });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };


   // submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logic to send data to the server
    try {
      // fn. del padre  
      props.filterData(10,1,formData.name);
    } catch (error) {
      console.error(error);
    }
  };




  return (
    
    <Form onSubmit={handleSubmit}>
        
        <div class="form-row row">
                <div class="col-md-6">
                    <div class="form-group">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
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

export default TagsFilterForm;