import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import WysiwygEditor from './WysiwigEditor';




 const DocumentAddForm = () => {
   


  const [formData, setFormData] = useState({
      title: '',
      description: '',
      detail:''
  });


  // errores
  const [titleError, setTitleError] = useState('');



  const [message, setMessage] = useState('');  



  // editores
  const [detail, setDetail] = useState('');
  const [description, setDescription] = useState('');

  const handleEditor1Change = (content) => {
    setDetail(content);
  };

  const handleEditor2Change = (content) => {
    setDescription(content);
  };



  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logic to send data to the server
    try {


        // limpio errores
        //setScoreError('');
        console.log(detail);


        let aux = {...formData}; // + tags
        //const response = await consume_service(URL_REVIEWS_BASE,'post',accessToken,aux,true);


    } catch (error) {
      console.log(error);
    };
  };


  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
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
                            <WysiwygEditor onChange={handleEditor1Change} />

                            <br></br>

                            Description
                            <WysiwygEditor onChange={handleEditor2Change} />


                            <div  class="text-danger">
                                    {message}
                            </div>
                            <br></br>
                            <br></br>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                    </Form>
            </div>
    </div>



  
    
    
  );
};

export default DocumentAddForm;