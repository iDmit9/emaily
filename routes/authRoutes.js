const passport = require("passport");

module.exports = app => {
   app.get(
      "/auth/google",
      passport.authenticate("google", {
         scope: ["profile", "email"]
      })
   );

   app.get(
      "/auth/google/callback",
      passport.authenticate("google")
   );

   app.get("/api/logout", (req, res) => {
      req.logout();
      res.send(req.user);//not exist after logout
   });

   app.get("/api/current_user", (req, res) => {
      res.send(req.user);
      // console.log("res", res.user);
      // console.log("req.user", req.user);
   });
}