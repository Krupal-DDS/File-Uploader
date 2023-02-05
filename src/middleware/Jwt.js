require('dotenv').config();
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../model/user.model");
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id, (err, user) => {
        if (!user){
          return res.status(401).json({ message: "Unauthorized Access !" });
        }
        if (err) {
          return done(err, null);
        }
        return done(null, user);
      });
    })
  );
};




// var JwtStrategy = require('passport-jwt').Strategy;

// // load up the user model
// var User = require('../models/user');
// var config = require('../config/database'); // get db config file

// module.exports = function(passport) {
//   var opts = {};
//   opts.secretOrKey = config.secret;
//   passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     User.findOne({id: jwt_payload.id}, function(err, user) {
//           if (err) {
//               return done(err, false);
//           }
//           if (user) {
//               done(null, user);
//           } else {
//               done(null, false);
//           }
//       });
//   }));
// };