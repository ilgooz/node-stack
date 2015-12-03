import 'should';
import request from 'supertest';
import mongoose from 'mongoose';

import {loadEnv} from '../src/conf/config'
import runMongo from '../src/conf/mongo';
import {app} from '../src/app';

loadEnv("test");
runMongo();

// drop database first
before((done) => {
  mongoose.connection.on('open', () => {
    mongoose.connection.db.dropDatabase((err) =>  {
      done(err);
    });
  });
})

export var agent = request.agent(app)

export var checkErr = function(done) {
  return function(err){
    if (err) done(err);
  }
};

export var user = {
  name: "İlker",
  email: "ilkergoktugozturk@gmail.com",
  password: 123,
};
