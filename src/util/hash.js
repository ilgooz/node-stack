import bcrypt from 'bcryptjs'

import {conf} from '../conf/config'

var generate = function(password){
  var salt = bcrypt.genSaltSync(conf.saltLenght);
  var hash = bcrypt.hashSync(password, salt);
  return hash
}

var compare = function(given, hash, cb){
  return bcrypt.compareSync(given, hash);
};

export default {
  generate,
  compare,
}
