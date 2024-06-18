const {
  Strategy, ExtractJwt 
} = require('passport-jwt');
const { JWT, JWT_TYPES, USER_TYPES, JWT_SECRET_TYPE } = require("../constants/authConstant");
const { cookieExtractor } = require('../utils/cookieExtractor');

const clientRecruiterPassportStrategy = ({ userDb }) => async (passport) => {

  const options = {};

  // Pass the function itself, not the result of the function call
  options.jwtFromRequest = ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    (req) => cookieExtractor(req, 'rpc_rt')
  ]);

  options.secretOrKey = JWT[JWT_TYPES.Access][USER_TYPES.Recruiter];
  options.ignoreExpiration = true;
  
  passport.use('client-recruiter-rule',
    new Strategy(options, async (payload, done) => {
      try {

        const user = await userDb.findOne({ userId: payload.userId });
        if (!user) {
          return done('No User Found', {});
        }
        
        if ( payload.exp <= Date.now() / 1000 ) {
          return done(null, user.toJSObject(), 'Access token expired');
        }

        return done(null, user.toJSObject());
      } catch (error) {
        return done(error,{});
      }
    })
  );
};

module.exports = clientRecruiterPassportStrategy;