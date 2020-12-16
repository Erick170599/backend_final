const { query, querySingle, execute } = require('../../dal/data-access');

const getDocentes = async(req, res) => {
    let docentes = await query('stp_docentes_getall');
    if (docentes) {
        res.json({
            status: true,
            message: 'Listado de Docentes',
            data: docentes
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrió un error',
            data: null
        });
    }
}

const getDocente = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idDocente',
        'value': id
    }];

    let docente = await querySingle('stp_docentes_getbyid', sqlParams);
    if (docente) {
        res.json({
            status: true,
            message: 'Docente consultado',
            data: docente
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrió un error',
            data: null
        });
    }
}

const addDocente = async(req, res) => {
    const { nombre, edad, titulo, tipo } = req.body;
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'titulo',
            'value': titulo
        },
        {
            'name': 'tipo',
            'value': tipo
        }
    ];

    const docente = await querySingle('stp_docentes_add', sqlParams);
    if (docente != 0) {
        res.json({
            status: true,
            message: 'Registro exitoso',
            data: docente
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrió un error',
            data: 0
        });
    }
}

const updateDocente = async(req, res) => {
    const { id } = req.params;
    const { nombre, edad, titulo, tipo } = req.body;
    const sqlParams = [{
            'name': 'idDocente',
            'value': id
        },
        {
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'titulo',
            'value': titulo
        },
        {
            'name': 'tipo',
            'value': tipo
        }
    ];

    const docente = await querySingle('stp_docentes_update', sqlParams);

    if (docente != 0) {
        res.json({
            status: true,
            message: 'Actualización exitosa',
            data: docente
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrió un error',
            data: 0
        });
    }
}

const deleteDocente = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idDocente',
        'value': id
    }];

    const docente = await execute('stp_docentes_delete', sqlParams);
    if (docente != 0) {
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
    getDocentes,
    getDocente,
    addDocente,
    updateDocente,
    deleteDocente
}