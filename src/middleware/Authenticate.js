const passport = require("passport");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", function (err, user, info) {
    if (err) return next(err);

    if (!user)
      return res.status(401).json({ message: "Unauthorized Access !" });

    req.user = user;

    next();
  })(req, res, next);
};




// const passport = require('passport')

// module.exports = function(req, res, next){
//     passport.authenticate('jwt', function (err, user){
//         if (err || !user){
//             res.status(403).send({
//             error: "you dont have access to this resource"                
//             })
//         }else{
//             req.user = user
//             next()
//         }
//     })(req, res, next)
// }