import mongoose from 'mongoose'
import conf from './config'

export default function(){
  mongoose.connect(conf.mongoAddr)
}
