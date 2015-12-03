import {argv} from 'yargs'

var env = argv.env || "dev", // values: dev, test, prod
    host = argv.host || "127.0.0.1",
    port = argv.port || "3000",
    mongoAddr = argv.mongo || "mongodb://127.0.0.1/api",
    saltLenght = 10;

if(env == "test") {
  mongoAddr = "mongodb://127.0.0.1/test"
}

export default {
  host,
  port,
  mongoAddr,
  env,
  saltLenght,
}
