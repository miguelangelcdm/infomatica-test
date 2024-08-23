// const jwt = require('jsonwebtoken');
// const SECRET_KEY  = process.env.JWT_SECRET;

// exports.verifyToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     console.log("🚀 ~ Receive token:", token)

//     if (!token) {
//         return res.status(403).json({ message: 'No token provided' });
//     }

//     jwt.verify(token, SECRET_KEY, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ err });
//         }
//         req.userId = decoded.id;
//         next();
//     });
// };

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};