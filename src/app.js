import app from './conf/express';
import {conf} from './conf/config';
import runMongo from './conf/mongo';
import registerEndpoints from './endpoints';

registerEndpoints(app);

export { app }

export default function(){
  runMongo()

  app.listen(conf.port, conf.host, () => {
    console.log('api server running at http://'+conf.host+':'+conf.port,
    'in '+conf.env);
  });
}
