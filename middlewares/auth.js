const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

const isAuthUser = async (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        if (!token) {
          return res.status(401).send({
            success: false,
            message: "This resources requires authorization",
          });
        }
        const decodeToken = await jwt.verify(token.split(' ')[1], jwtConfig.key)
        req.user = decodeToken
        next();
    } catch (error) {
        console.error("Auth Middleware Error ==>", error);
        return res.status(500).send(error);
    }

};

module.exports = {
  isAuthUser
}