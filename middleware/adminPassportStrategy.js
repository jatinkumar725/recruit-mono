const {
  Strategy, ExtractJwt 
} = require('passport-jwt');
const { JWT, JWT_TYPES, USER_TYPES } = require('../constants/authConstant');

const adminPassportStrategy = ({ userDb }) => async (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); 
  options.secretOrKey = JWT[JWT_TYPES.Access][USER_TYPES.System_User];
  options.ignoreExpiration = true;
  passport.use('system-user-rule',
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
module.exports = adminPassportStrategy;