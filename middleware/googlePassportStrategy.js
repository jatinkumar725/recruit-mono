const { USER_QUERY_TYPES, MODEL_TYPE } = require("../constants/authConstant");

// Dynamic: USER TYPE, User Db
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const googlePassportStrategy =
  ({ userDb, roleDb, userRoleDb, userType }) =>
    (passport) => {
      passport.serializeUser(function (user, cb) {
        cb(null, user);
      });

      passport.deserializeUser(function (user, cb) {
        cb(null, user);
      });

      passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET,
            callbackURL: process.env.GOOGLE_CALLBACKURL,
            proxy: true
          },
          async function (accessToken, refreshToken, profile, done) {
            try {
              if (profile) {

                const ssoAuth = { googleId: profile.id };
                let userObj = {
                  name: profile.displayName,
                  username: profile.emails !== undefined ? profile.emails[0].value : "",
                  email: profile.emails !== undefined ? profile.emails[0].value : "",
                  userType,
                  isPrimaryEmailVerified: true,
                };
                let found = await userDb.findOne({ email: userObj.email });

                if (found) {
                  const id = found.id;
                  await userDb.updateOne({ _id: id }, { ssoAuth });
                } else {

                  const userResult = await userDb.create({
                    ...userObj,
                    ssoAuth,
                  });

                  // Add user role
                  const role = await roleDb.findOne({ name: MODEL_TYPE[userType] });
                  await userRoleDb.create({
                    userId: userResult._id,
                    roleId: role._id,
                    model_type: MODEL_TYPE[userType],
                  });
                }
                let user = await userDb.findOne({
                  "ssoAuth.googleId": profile.id,
                }, { projection: USER_QUERY_TYPES[1][1].join(' ') });
                return done(null, user);
              }
              return done(null, null, "Profile Not found");
            } catch (error) {
              return done(error, null);
            }
          }
        )
      );
    };

module.exports = googlePassportStrategy;
