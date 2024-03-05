const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
    const { user } = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!user) {
      return res.status(400).json({
        message: "Invalid user",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};

module.exports = verify;