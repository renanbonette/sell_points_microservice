import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

export default (app) => {
  const config = app.config;
  const Users = app.datasource.models.users;

  app.post('/login', (req, res) => {
    if (req.body.username && req.body.password) {
      const username = req.body.username;
      const password = req.body.password;
      Users.findOne({ attributes: ['id', 'name', 'email', 'username', 'role', 'password'], where: { username } })
               .then((usr) => {
                 if (Users.isPassword(usr.password, password)) {
                   const payload = { id: usr.id };
                   const user = {
                     id: usr.id,
                     name: usr.name,
                     email: usr.email,
                     username: usr.username,
                     role: usr.role,
                   };
                   res.json({
                     user,
                     token: jwt.encode(payload, config.jwtSecret),
                   });
                 } else {
                   res.sendStatus(HttpStatus.UNAUTHORIZED);
                 }
               })
               .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED));
    } else {
      res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
  });
};
