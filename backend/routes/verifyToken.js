const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if(err) {
                res.status(403).json({ error: "Token is invalid..." });
            } else {
                req.user = user;
                next(); // Call next callback here
            }
        });
    } else {
        return res.status(401).json({ error: "You are not authenticated..." });
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next(); // Call next callback here
        } else {
            res.status(403).json({ error: "You are not authorized to this request..." });
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next(); // Call next callback here
        } else {
            res.status(403).json({ error: "You are not authorized to this request..." });
        }
    });
};

module.exports = {
    verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin,
};
