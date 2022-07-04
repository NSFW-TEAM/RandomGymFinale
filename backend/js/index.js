"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cors = require("cors");
require('dotenv').config();
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Import Models and controllers
var models = require('./models/usuarios')(app, mongoose);
var modelExercise = require('./models/exercise')(app, mongoose);
var UsuariosCtrl = require('./controllers/usuarios');
var exerciseCtrl = require('./controllers/exercise');
var router = express.Router();
//Rutas usuarios
router.route('/login/:usuario/:clave') //En desuso por seguridad
    .get(UsuariosCtrl.Authenticate);
router.route('/register/user/:usuario/')
    .get(UsuariosCtrl.existenceUser);
router.route('/register/mail/:mail/')
    .get(UsuariosCtrl.existenceMail);
router.route('/register/Insert/')
    .post(UsuariosCtrl.InsertUser);
router.route('/Admin/delete/User/:mail')
    .delete(UsuariosCtrl.DeleteUser);
router.route('/profile/update/picture/:usuario')
    .put(UsuariosCtrl.UpdatePicture);
//Rutas ejercicios
router.route('/RandomExercise/:id')
    .get(exerciseCtrl.Authenticate);
router.route('/RandomExercise/:diff/:area')
    .get(exerciseCtrl.ExerciseF);
router.route('/RandomExercise/Insert/')
    .post(exerciseCtrl.InsertExercise);
router.route('/RandomExerciseIDs/count/')
    .get(exerciseCtrl.conseguirID);
router.route('/Exercise/delete/:id')
    .delete(exerciseCtrl.DeleteExercise);
app.use('/api', router);
// Connection to DB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err)
        throw err;
    console.log('MongoDB ok!!!');
});
var Configuracion = {
    server: process.env.SERVER,
    port: process.env.PORT
};
app.listen(Configuracion, function () {
    console.log("servidor escuchando ".concat(Configuracion.server, ":").concat(Configuracion.port));
});
