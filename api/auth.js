const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require("express").Router();
const { createOwner, checkOwner } = require('../db/index.js');


const signToken = (id, username) => {
  const token = jwt.sign({id, username}, process.env.JWT, {expiresIn: "1d"});
  return token;
}

// Register
router.post("/register", async(req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const owner = await createOwner(username, hashedPassword);
    const token = signToken(owner.id, owner.username)

    res.send({ Status: "Registered!", token });
  } catch(error) {next(error)};
})


// Login
router.post("/login", async(req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try{
    const owner = await checkOwner(username);

    if(!owner) {
      res.status(401).send("Invalid username and/or password.");
    } else {
      const passwordMatch = await bcrypt.compare(password, owner.password);

      if(passwordMatch) {
        const token = signToken(owner.id, owner.username);
        res.send({ Status: "Logged in!", token });
      } else {
        return res.status(401).send("Invalid username and/or password.");
      }
    }
  } catch(error) {next(error)};
})


module.exports = router;