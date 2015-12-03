import user from './route/user'
import token from './route/token'
import {authRequired} from './mware/auth'

export default function (app){
  app.post('/users', user.createUser)
  app.get('/users', user.listUsers)
  app.get('/me', authRequired, user.getMe)

  app.post('/tokens', token.createToken)
}
