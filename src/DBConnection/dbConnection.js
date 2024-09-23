import mongoose  from "mongoose";
import EnvConfig from "../config/Config.js";
import { DB_Name } from "../constant.js";


const DataBaseConnection= async ()=>{

    try {
        const DbInstance= await mongoose.connect(`${EnvConfig.ENV_MONGODB_STRING}/${DB_Name}`);
//  S.B:Dont use special character in mongo db string password if use make sure this special character is encoded in base64.
         
      const HostId=DbInstance.connection.host;

      console.log(`your mongodb connection Host id is:  ${HostId}`)

        
    } catch (error) {
        
        cconsole.error("Mongodb Connection Faield ! in DbConnection...: ",error);
     
     process.exit(1);
        
        
    }
}


export default DataBaseConnection;