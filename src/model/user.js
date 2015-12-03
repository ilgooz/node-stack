import mongoose, {Schema} from 'mongoose'
import paginate from 'mongoose-paginate'

import TokenModel from './token'

var UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  hash: { type: String },
});

UserSchema.options.toJSON = {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.hash;
  }
};

UserSchema.plugin(paginate);

UserSchema.statics.findByToken = function(t, fn){
  TokenModel.findOne({token: t}, (err, token) => {
    if(err) return fn(err);
    if(!token) return fn();
    this.findOne({_id: token.userId}, fn);
  });
};

export default mongoose.model('User', UserSchema);
