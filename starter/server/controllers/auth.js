require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const { User } = require("../models/user");

const createToken = (username, id) => {
  const payload = { username, id };
  return jwt.sign(payload, SECRET);
};

module.exports = {
  register: async (req, res) => {
    try {
      let { username, password } = req.body;
      let foundUser = await User.findOne({ where: { username: username } });
      if (foundUser) {
        res.status(400).send("username already exists");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ username, hashedPass: hash });
        console.log(newUser);
        console.log("yay");

        const token = createToken(
          newUser.dataValues.username,
          newUser.dataValues.id
        );
        const exp = Date.now() + 1000 * 60 * 60 * 48;
        let bodyObj = {
          username: newUser.dataValues.username,
          userId: newUser.dataValues.id,
          token: token,
          exp: exp,
        };
        res.status(200).send(bodyObj);
      }
    } catch (err) {
      console.log("error in reg");
      console.log(err);
      res.sendStatus(400);
    }
  },

  login: async (req, res) => {
    try{
        const {username, password} = req.body
        let foundUser = await User.findOne({ where: { username: username } });
        if(foundUser){
            const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)
            if(isAuthenticated){
                let token = createToken(foundUser.dataValues.username, foundUser.dataValues.id)
                const exp = Date.now() + 1000 * 60 * 60 * 48;
                let bodyObj = {
                    username: newUser.dataValues.username,
                    userId: newUser.dataValues.id,
                    token: token,
                    exp: exp,
                  };
                  console.log("yay that's good")
                  res.status(200).send(bodyObj);
            }else{
                res.status(400).send("Incorrect username or password")
            }
        }else{
            res.status(400).send("Incorrect username or password")
        }
    } catch (err) {
        console.log("error in login");
        console.log(err);
        res.sendStatus(400);
      }

  },
};
