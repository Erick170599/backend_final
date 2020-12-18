const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id,
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        })
    });
}

const auxToken = (token) => {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    return decoded.id;
}

module.exports = { generateJWT, auxToken }