const requireOwner = (req, res, next) => {
  if(req.user) {
    next();
  } else {
    res.status(401).send("You must be logged in to make changes.");
  };
};

module.exports = {
  requireOwner
}