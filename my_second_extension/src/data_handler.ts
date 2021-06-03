import axios from "axios";


export class FetchActiveRuns{
    //Obj of data to send in future like a dummyDb
    responseData: any;

    //POST request with body equal on data in JSON format
    getruns(){
        axios.get('http://localhost:5002/getruns')
        .then((resp: any) => {
            console.log(resp.data);
            this.responseData = resp.data;
        }).catch((error: any) => {
            console.log(error)
        });
    }
}