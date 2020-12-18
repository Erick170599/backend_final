const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generateJWT, auxToken } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const { querySingle } = require('../../dal/data-access');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    let usuario = null;
    const sqlParams = [{
        'name': 'email',
        'value': email
    }];

    usuario = await querySingle('stp_usuarios_login', sqlParams);

    if (!usuario) {
        res.status(200).json({
            status: false,
            message: 'Email no encontrado',
            data: null
        });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
        return res.status(200).json({
            status: false,
            message: 'Contraseña incorrecta',
            data: null
        });
    }

    const token = await generateJWT(usuario.idUsuario);

    res.json({
        status: true,
        message: 'Acceso correcto',
        data: token,
        user: usuario
    });
}


const googleSignIn = async(req, res = response) => {
    const googleToken = req.body.token;
    let usuario = null;
    let sqlParams = null;

    try {
        const { name, email, picture } = await googleVerify(googleToken);

        sqlParams = [{
            'name': 'email',
            'value': email
        }];
        usuario = await querySingle('stp_usuarios_login', sqlParams);

        if (!usuario) {
            sqlParams = [{
                    'name': 'nombre',
                    'value': name
                },
                {
                    'name': 'email',
                    'value': email
                },
                {
                    'name': 'password',
                    'value': ''
                },
                {
                    'name': 'google',
                    'value': 1
                },
                {
                    'name': 'facebook',
                    'value': 0
                },
                {
                    'name': 'nativo',
                    'value': 0
                },
                {
                    'name': 'imagen',
                    'value': picture
                }
            ];
            usuario = await querySingle('stp_usuarios_add', sqlParams);
        } else {
            sqlParams = [{
                    'name': 'nombre',
                    'value': name
                },
                {
                    'name': 'email',
                    'value': usuario.email
                },
                {
                    'name': 'google',
                    'value': 1
                },
                {
                    'name': 'password',
                    'value': usuario.password
                },
                {
                    'name': 'facebook',
                    'value': 0
                },
                {
                    'name': 'nativo',
                    'value': 1
                },
                {
                    'name': 'imagen',
                    'value': picture
                },
                {
                    'name': 'idUsuario',
                    'value': usuario.idUsuario
                }
            ];
            usuario = await querySingle('stp_usuarios_update', sqlParams);
        }

        const token = await generateJWT(usuario.idUsuario);

        res.json({
            status: true,
            message: 'Acceso correcto',
            data: token,
            user: usuario
        });
    } catch (error) {
        res.status(200).json({
            status: false,
            message: 'Token de Google no es correcto',
            data: null
        });
    }
}

const loginToken = async(req, res = response) => {
    const token = req.body.token;

    const id = await auxToken(token);
    const tokenNew = await generateJWT(id);
    res.status(201).json({
        status: true,
        message: 'Acesso Correcto',
        data: tokenNew
    });
}

module.exports = {
    login,
    googleSignIn,
    loginToken
}