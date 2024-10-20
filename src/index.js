import app from "./app.js"
import {constant_Port} from "./constant.js"
import EnvConfig from "./config/Config.js"; //import Env data
import DataBaseConnection from "./DBConnection/dbConnection.js";



const port= EnvConfig.ENV_PORT||constant_Port;

DataBaseConnection()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Mongodb server error in app On",error);
        throw(error);
    })
    app.listen(port,()=>{

    
        console.log(`server is running : http://url:${port}`);
    })
})
.catch((Error)=>{
    console.log("Mongodb connection Error ! in index...",Error);
    throw Error;
})




// app.listen(port,()=>{
//      console.log(`server is running : http://localhost:${port}`);
     
// })
