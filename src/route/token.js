import hash from '../util/hash'
import UserModel from '../model/user'
import TokenModel from '../model/token'

var createToken = function(req, res){
  req.sanitizeBody('forever').toBoolean();

  req.checkBody('email', 'required').notEmpty();
  req.checkBody('password', 'required').notEmpty();

  var email = req.body.email;
  var password = req.body.password;
  var forever = req.body.forever;

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({errors: errors});
    return;
  }

  UserModel.findOne({email: email}, (err, user) => {
    if(err){
      res.sendStatus(500)
      console.log(err);
      return;
    }

    if(!user){
      res.status(400).send({errors: {
        message: "invalid credentials",
      }});
      return;
    }

    if(!hash.compare(password, user.hash)){
      res.status(400).send({errors: {
        message: "invalid credentials",
      }});
      return;
    }

    TokenModel.new(user.id, forever, function(err, token){
      if(err) {
        res.sendStatus(500)
        console.log(err);
        return;
      }

      res.status(201).send({
        accessToken: token.token,
      });
    })
  });
};

export default {
  createToken,
}
