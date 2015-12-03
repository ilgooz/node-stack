import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import expressValidator from 'express-validator'
import expressPaginate from 'express-paginate'

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(expressPaginate.middleware(10, 50));

export default app
