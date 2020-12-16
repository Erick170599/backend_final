//Ruta api/usuarios

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, addUsuario, updateUsuario, deleteUsuario, getUsuario, getEmail } = require('../bml/controllers/usuarios');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { validarJWT } = require('../bml/middlewares/validar-jwt');

const router = Router();

//GETALL
router.get('/', getUsuarios);
//GETBYID
router.get('/:id', getUsuario);
//ADD
router.post('/', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos,
    ],
    addUsuario
);
//UPDATE
router.put('/:id', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos,
    ],
    updateUsuario
);
//DELETE
router.delete('/:id', deleteUsuario);

module.exports = router;