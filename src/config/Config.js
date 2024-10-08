import Dotenv  from "dotenv";


Dotenv.config()


const ___envConfig={

    ENV_PORT:process.env.PORT,
    ENV_MONGODB_STRING:process.env.MONGODB_STRING,
    ENV_CORS_ORIGIN:process.env.CORS_ORIGIN,
    ENV_APP_MOOD:process.env.APP_MOOD,
    ENV_JWT_SECRET:process.env.JWT_SECRET,
    ENV_MAIL_TRAP_TOKEN:process.env.MAIL_TRAP_TOKEN,

}

const EnvConfig=Object.freeze(___envConfig);
  

export default EnvConfig;