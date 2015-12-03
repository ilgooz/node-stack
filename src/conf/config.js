import {argv} from 'yargs'

export var conf = {
  env: argv.env || "dev", // values: dev, test, prod
  host: argv.host || "127.0.0.1",
  port: argv.port || "3000",
  mongoAddr: argv.mongo || "mongodb://127.0.0.1/api",
  saltLenght: 10,
}

export var loadEnv = function(env){
  conf.env = env;

  if(env == "test") {
    conf.mongoAddr = "mongodb://127.0.0.1/test"
  }
}
