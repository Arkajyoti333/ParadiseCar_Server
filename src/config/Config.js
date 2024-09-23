import Dotenv  from "dotenv";


Dotenv.config()


const ___envConfig={
    ENV_PORT:process.env.PORT,
    ENV_MONGODB_STRING:process.env.MONGODB_STRING,
    ENV_CORS_ORIGIN:process.env.CORS_ORIGIN,

}
const EnvConfig=Object.freeze(___envConfig);
  

export default EnvConfig;