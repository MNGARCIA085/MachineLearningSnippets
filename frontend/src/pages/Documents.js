
import React from "react";
import DocumentsDataTable from "../components/datatables/Documents";


const Documents = () => {

      return (
          <div className="ui container" style={{ marginTop: '10px' }}>
                <center><h2><font color='red'>DOCUMENTS</font></h2></center>
                <hr></hr>
                <div class="row">
                    <div class="col-md-10">
                        <DocumentsDataTable/>
                    </div>
                </div>
          </div>
      );
}

export default Documents;