const { query, querySingle, execute } = require('../../dal/data-access');

const getMaterias = async(req, res) => {
    let materias = await query('stp_materias_getall');
    if (materias) {
        res.json({
            status: true,
            message: 'Listado de Materias',
            data: materias
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrió un error',
            data: null
        });
    }
}

const getMateria = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idMateria',
        'value': id
    }];

    let materia = await querySingle('stp_materias_getbyid', sqlParams);
    if (materia) {
        res.json({
            status: true,
            message: 'Materia consultada',
            data: materia
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrió un error',
            data: null
        });
    }
}

const addMateria = async(req, res) => {
    const { nombre, horas, creditos } = req.body;
    const horasP = horas * 3;
    const horasT = horasP * 2;
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'horas',
            'value': horas
        },
        {
            'name': 'horasP',
            'value': horasP
        },
        {
            'name': 'horasT',
            'value': horasT
        },
        {
            'name': 'creditos',
            'value': creditos
        }
    ];

    const materia = await querySingle('stp_materias_add', sqlParams);
    if (materia != 0) {
        res.json({
            status: true,
            message: 'Registro exitoso',
            data: materia
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrió un error',
            data: 0
        });
    }
}

const updateMateria = async(req, res) => {
    const { id } = req.params;
    const { nombre, horas, creditos } = req.body;
    const horasP = horas * 4;
    const horasT = horasP * 3;
    const sqlParams = [{
            'name': 'idMateria',
            'value': id
        },
        {
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'horas',
            'value': horas
        },
        {
            'name': 'horasP',
            'value': horasP
        },
        {
            'name': 'horasT',
            'value': horasT
        },
        {
            'name': 'creditos',
            'value': creditos
        }
    ];

    const materia = await querySingle('stp_materias_update', sqlParams);

    if (materia != 0) {
        res.json({
            status: true,
            message: 'Actualización exitosa',
            data: materia
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrió un error',
            data: 0
        });
    }
}

const deleteMateria = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idMateria',
        'value': id
    }];

    let materia = await execute('stp_materias_delete', sqlParams);
    if (materia != 0) {
        res.json({
            status: true,
            message: 'Eliminada exitosamente',
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
    getMaterias,
    getMateria,
    addMateria,
    updateMateria,
    deleteMateria
}