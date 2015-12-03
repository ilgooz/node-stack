import UserModel from '../model/user'

var TOKEN_HEADER = 'X-Auth-Token'

export function authRequired(req, res, next){
  var token = req.get(TOKEN_HEADER);

  if(token == "") {
    res.sendStatus(401);
    return;
  }

  UserModel.findByToken(token, function(err, user){
    if(err){
      res.sendStatus(500);
      console.log(err);
      return;
    }
    if(!user) {
      res.sendStatus(401);
      return;
    }

    req.user = user;
    next();
  })
};
