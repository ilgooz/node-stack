import mongoose, {Schema} from 'mongoose'
import crypto from 'crypto'
import moment from 'moment'

var TokenSchema = new Schema({
   userId: { type: Schema.ObjectId },
   token: { type: String, index: true },
   activity: { type: Date, expires: '3h', default: Date.now },
});

TokenSchema.statics.new = function(userId, forever, fn) {
 var token = new this;
 token.userId = userId;

 if(forever){
   token.activity = moment().add(3, 'month')
 }

 crypto.randomBytes(48, function(ex, buf) {
   //todo: hash token before save
   token.token = buf.toString('hex');
   token.save(fn);
 });
};

TokenSchema.methods.extend = function(cb) {
  this.activity = new Date;
  this.save(cb)
};

export default mongoose.model('Token', TokenSchema);
