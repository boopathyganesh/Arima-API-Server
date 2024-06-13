const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(200).json({ "status": false, message: "Auth Error" });
    const split_token = token.split(' ');
    const bearer_token = split_token[1];
    if (!bearer_token) return res.status(200).json({ "status": false, message: "Auth Error" });

    try {
        const decoded = jwt.verify(bearer_token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (e) {
        console.error(e);
        res.status(200).send({ "status": false, message: "Invalid Token" });
    }
};