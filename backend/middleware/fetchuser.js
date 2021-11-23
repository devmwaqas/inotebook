const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {

    const token = req.header('Auth-Token');
    if(!token) {
        res.status(401).send();
    }

    try {
        const data = jwt.verify(token, 'secret');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send();
    }
}

module.exports = fetchuser;