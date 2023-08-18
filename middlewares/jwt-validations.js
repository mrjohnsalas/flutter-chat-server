const jwt = require('jsonwebtoken');

const jwtValidations = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token not found'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }
}

module.exports = { jwtValidations };