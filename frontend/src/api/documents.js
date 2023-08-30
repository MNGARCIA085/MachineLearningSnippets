import axios from 'axios';


export const consume_service = async(url, method, data) => {

        // diferentes métodos
        if (method==='post'){
            return await axios.post(
                url,
                data,
            )
        }
        else if (method==='put'){
            return await axios.put(
                url,
                data,
            )
        }
        else if (method==='patch'){
            return await axios.patch(
                url,
                data,
            )
        }
        else if (method==='get'){
            return await axios.get(url);
        }
        else if (method==='delete'){
            return await axios.delete(
                url,
            );
        }

}