const { query, querySingle, execute } = require('../../dal/data-access');

const getAlumnos = async(req, res) => {
    let alumnos = await query('stp_alumnos_getall');
    if (alumnos) {
        res.json({
            status: true,
            message: 'Listado de Alumnos',
            data: alumnos
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrió un error',
            data: null
        });
    }
}

const getAlumno = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idAlumno',
        'value': id
    }];

    const alumno = await querySingle('stp_alumnos_getbyid', sqlParams);
    if (alumno) {
        res.json({
            status: true,
            message: 'Alumno consultado',
            data: alumno
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrió un error',
            data: null
        });
    }
}

const addAlumno = async(req, res) => {
    const { nombre, edad, sexo, semestre, carrera } = req.body;
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'sexo',
            'value': sexo
        },
        {
            'name': 'semestre',
            'value': semestre
        },
        {
            'name': 'carrera',
            'value': carrera
        }
    ];

    const alumno = await querySingle('stp_alumnos_add', sqlParams);

    if (alumno != 0) {
        res.json({
            status: true,
            message: 'Registro exitoso',
            data: alumno
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrió un error',
            data: 0
        });
    }
}

const updateAlumno = async(req, res) => {
    const { id } = req.params;
    const { nombre, edad, sexo, semestre, carrera } = req.body;
    const sqlParams = [{
            'name': 'idAlumno',
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
            'name': 'sexo',
            'value': sexo
        },
        {
            'name': 'semestre',
            'value': semestre
        },
        {
            'name': 'carrera',
            'value': carrera
        }
    ];

    const alumno = await querySingle('stp_alumnos_update', sqlParams);

    if (alumno != 0) {
        res.json({
            status: true,
            message: 'Actualización exitosa',
            data: alumno
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrió un error',
            data: 0
        });
    }
}

const deleteAlumno = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idAlumno',
        'value': id
    }];

    let alumno = await execute('stp_alumnos_delete', sqlParams);
    if (alumno) {
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
    getAlumnos,
    getAlumno,
    addAlumno,
    updateAlumno,
    deleteAlumno
}