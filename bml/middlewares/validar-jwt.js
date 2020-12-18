const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            status: false,
            message: 'No hay token en la petición',
            data: null
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: 'Token no válido',
            data: null
        });
    }
}

const validarLogin = (req, res, next) => {
    const token = req.body.token;

    if (!token) {
        return res.status(401).json({
            status: false,
            message: 'No hay token en la petición',
            data: null
        });
    }
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: 'Token no válido',
            data: null
        });
    }
}


module.exports = { validarJWT, validarLogin }