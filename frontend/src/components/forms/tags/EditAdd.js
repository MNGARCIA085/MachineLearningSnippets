import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { consume_service } from '../../../api/documents';
import { URL_TAGS_BASE } from '../../../api/urls';
import { useNavigate } from 'react-router-dom';



 const TagAddEditForm = () => {

   const navigate = useNavigate();

   let { id } = useParams();

   // form data
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

    // para cargar los valores iniciales
    useEffect(() => {
        // initial data
        const fetchData = async () => {
            try {
                let url = URL_TAGS_BASE;
                if (id !== undefined){
                    url += id
                }
              const response = await consume_service(url,'get',{});
              const data = await response.data;
              // valores iniciales
              setFormData({...data});
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
        let url = URL_TAGS_BASE;
        let method = 'post';
        if (id !== undefined){
                url += id;
                method='put';
        }
        await consume_service(url,method,formData);
        //
        alert('Registro actualizado');
        navigate('/tags/', { replace: true });
    } catch (error) {
      alert('Ocurrieron errores');
      
    };
  };


  



  return (


    <div class="col-md-4 offset-4">
            <div class="row">


                    {  id !== undefined ? 'EDIT' : 'ADD' } TAG
                    <br></br>
                    <hr></hr>

                    <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="title">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                type="string"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                />
                                
                            </Form.Group>
                            
                            <br></br>

                        
                            <br></br>

                            
                            <br></br>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <br></br> <br></br>
                    </Form>

                         
            </div>

            <br></br>
                    <br></br>
                    <br></br>
    </div>



  
    
    
  );
};

export default TagAddEditForm;