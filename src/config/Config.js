import Dotenv  from "dotenv";


Dotenv.config()


const ___envConfig={
    ENV_PORT:process.env.PORT,
    ENV_MONGODB_STRING:process.env.MONGODB_STRING,
    ENV_CORS_ORIGIN:process.env.CORS_ORIGIN,
    ENV_APP_MOOD:process.env.APP_MOOD,
}
const EnvConfig=Object.freeze(___envConfig);
  

export default EnvConfig;