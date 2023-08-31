
import React from "react";
import DocumentsDataTable from "../components/datatables/Documents";


const Documents = () => {

      return (
          <div className="ui container" style={{ marginTop: '10px' }}>
                <center><h3><font color='blue'>DOCUMENTS</font></h3></center>
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