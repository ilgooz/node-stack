import hash from '../util/hash'
import UserModel from '../model/user'
import TokenModel from '../model/token'

var createUser = function(req, res){
  req.sanitizeBody('forever').toBoolean();

  req.checkBody('password', 'must be at least 3 chars long').isLength(3);
  req.checkBody('email', 'must be a valid email address').isEmail();

  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var forever = req.body.forever;

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({errors: errors});
    return;
  }

  var user = new UserModel();
  user.name = name;
  user.email = email;
  user.hash = hash.generate(password);

  user.save(function(err){
    if(err){
      if(err.code == 11000){
        res.status(400).send({errors: {
          message: "email already exists"
        }});
        return;
      }

      res.sendStatus(500)
      console.log(err);
      return;
    }

    TokenModel.new(user.id, forever, function(err, token){
      if(err) {
        res.sendStatus(500)
        console.log(err);
        return;
      }

      res.status(201).send({
        user: user,
        accessToken: token.token,
      });
    })
  });
};

var listUsers = function(req, res){
  var page = req.query.page;
  var limit = req.query.limit;

  UserModel.paginate({}, {
    page: page,
    limit: limit,
  }, (err, users, pageCount, itemCount) => {
    if(err){
      res.sendStatus(500)
      console.log(err);
      return;
    }

    res.status(200).send({
      currentPage: page,
      totalPages: pageCount,
      users: users,
    })
  })
};

var getMe = function(req, res){
  res.status(200).send({user: req.user});
};

export default {
  createUser,
  listUsers,
  getMe,
}
