const response = require('express');
const bcrypt = require('bcryptjs');
const { query, querySingle, execute } = require('../../dal/data-access');

const getUsuarios = async(req, res) => {
    let usuarios = await query('stp_usuarios_getall');
    if (usuarios) {
        res.json({
            status: true,
            message: 'Listado de Usuarios',
            data: usuarios
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrió un error',
            data: null
        });
    }
};

const getUsuario = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idUsuario',
        'value': id
    }];

    let usuario = await querySingle('stp_usuarios_getbyid', sqlParams);
    if (usuario) {
        res.json({
            status: true,
            message: 'Usuario consultado',
            data: usuario
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrió un error',
            data: null
        });
    }
};

const addUsuario = async(req, res = response) => {
    const { nombre, email, password } = req.body;
    const sqlParamss = [{
        'name': 'email',
        'value': email
    }]

    let usuario = await querySingle('stp_usuarios_login', sqlParamss);
    if (!usuario) {
        const salt = bcrypt.genSaltSync();
        const newPassword = bcrypt.hashSync(password, salt);
        const sqlParams = [{
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'email',
                'value': email
            },
            {
                'name': 'password',
                'value': newPassword
            },
            {
                'name': 'google',
                'value': 0
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
                'value': ''
            }
        ];
        usuario = await querySingle('stp_usuarios_add', sqlParams);
        if (usuario) {
            res.json({
                status: true,
                message: 'Registro exitoso',
                data: usuario
            });
        } else {
            res.json({
                status: false,
                message: 'Ocurrió un error',
                data: null
            });
        }
    } else {
        res.json({
            status: false,
            message: 'El email ya fue registrado',
            data: null
        })
    }
};

const updateUsuario = async(req, res = response) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(password, salt);

    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'email',
            'value': email
        },
        {
            'name': 'password',
            'value': newPassword
        },
        {
            'name': 'google',
            'value': 0
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
            'value': null
        },
        {
            'name': 'idUsuario',
            'value': id
        }
    ];

    const usuario = await querySingle('stp_usuarios_update', sqlParams);

    if (usuario) {
        res.json({
            status: true,
            message: "Actualización exitosa",
            data: usuario,
        });
    } else {
        res.json({
            status: false,
            message: "ocurrió un error",
            data: null,
        });
    }
}

const deleteUsuario = async(req, res = response) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idUsuario',
        'value': id
    }];

    const usuario = await execute('stp_usuarios_delete', sqlParams);
    if (usuario != 0) {
        res.json({
            status: true,
            message: 'Eliminado exitosamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrió un error',
            data: 0
        });
    }
}

module.exports = {
    getUsuarios,
    getUsuario,
    addUsuario,
    updateUsuario,
    deleteUsuario
}