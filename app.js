const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
global.__basedir = __dirname;

// const postmanToOpenApi = require('postman-to-openapi');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const listEndpoints = require('express-list-endpoints');

const morganMiddleware = require("./middleware/morgan.middleware");
const passport = require('passport');

const { clientSeekerPassportStrategy } = require('./middleware');
const { clientRecruiterPassportStrategy } = require('./middleware');
const { adminPassportStrategy } = require('./middleware');
const { googleClientSeekerPassportStrategy } = require('./middleware');

const app = express();
// const corsOptions = { origin: process.env.ALLOW_ORIGIN, };
const corsOptions = {
  origin: "https://recruit-mono.onrender.com",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
//template engine
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'Template'));

//all routes 
const routes = require('./routes');

clientSeekerPassportStrategy(passport);
clientRecruiterPassportStrategy(passport);
adminPassportStrategy(passport);
googleClientSeekerPassportStrategy(passport);

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(session({
  secret:'my-secret',
  resave:true,
  saveUninitialized:false
}));
app.use(routes);

// Middleware to handle unsupported methods
const response = require("./utils/response");
const responseHandler = require('./utils/response/responseHandler'); 
app.use((req, res, next) => {
  return responseHandler(res, response.methodNotAllowed());
});

//swagger Documentation
let result = YAML.load('swagger/swagger.yml');
result.servers[0].url = '/';
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(result));

// app.get('/', (req, res) => {
//   res.render('index');
// });

if ( process.env.NODE_ENV !== 'test' ) {

  // ? Only uncomment when needed ( My choice )
  // const seeder = require('./seeders');
  // const allRegisterRoutes = listEndpoints(app);
  // seeder(allRegisterRoutes).then(()=>{console.log('Seeding done.');});
  app.listen(process.env.PORT,()=>{
    console.log(`your application is running on ${process.env.PORT}`);
  });
} else {
  module.exports = app;
}