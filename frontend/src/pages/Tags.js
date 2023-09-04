
import React from "react";
import TagsDataTable from "../components/datatables/Tags";



const Tags = () => {

      return (
          <div className="ui container" style={{ marginTop: '10px' }}>
                <center><h3><font color='blue'>TAGS</font></h3></center>
                <hr></hr>
                <div class="row">
                    <div class="col-md-10">
                        <TagsDataTable/>
                    </div>
                </div>
          </div>
      );
}

export default Tags;