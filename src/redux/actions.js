import axios from "axios";
import Error from "../error/Error";
import config_backend from '../backend.json'; 

const getAutharization = () => {
    let token = localStorage.getItem("token"); 
    return `basic ${token}`;
}
export const sendMessage = (textValue, arrayFiles, message) => {
        let params = new URLSearchParams(); 
        params.append("UF_SUBJECT", textValue); 
        params.append("UF_FILES[]", arrayFiles); 
        params.append("UF_MESSAGE", message);

let data = (axios.post(`${config_backend.host}api/feedback/send.php`, params,{
headers:{
    Autharization: getAutharization()
}
})).data;

if(data.success){
    return data; 

} else{
<Error> sorry </Error>

}
    

}