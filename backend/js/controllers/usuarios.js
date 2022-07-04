"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose1 = require('mongoose');
var Usuarios = mongoose1.model('usuarios');
exports.Authenticate = function (req, res) {
    var usuarios = new Usuarios({
        usuario: req.params.usuario,
        clave: req.params.clave
    });
    Usuarios.find({ usuario: req.params.usuario, clave: req.params.clave }, function (err, response) {
        if (err)
            return res.send(500, err.message);
        res.status(200).json(response);
    });
};
exports.existenceUser = function (req, res) {
    var usuarios = new Usuarios({
        usuario: req.params.usuario,
    });
    Usuarios.find({ usuario: req.params.usuario }, function (err, response) {
        if (err)
            return res.send(500, err.message);
        res.status(200).json(response);
    });
};
exports.existenceMail = function (req, res) {
    var usuarios = new Usuarios({
        mail: req.params.mail,
    });
    Usuarios.find({ "mail": req.params.mail }, function (err, response) {
        if (err)
            return res.send(500, err.message);
        res.status(200).json(response);
    });
};
//Inserta un nuevo registro a la bd (POST)
exports.InsertUser = function (req, res) {
    var usuarios = new Usuarios({
        clave: req.body.clave,
        mail: req.body.mail,
        sex: req.body.sex,
        objetivo: req.body.objetivo,
        area: req.body.area,
        tipo: req.body.tipo,
        diff: req.body.diff,
        peso: req.body.peso,
        altura: req.body.altura,
        usuario: req.body.usuario,
        profile_pic: req.body.profile_pic
    });
    Usuarios.collection.insertOne(usuarios), function (err, response) {
        if (err)
            return res.send(500, err.message);
        res.status(200).json(response);
    };
};
exports.UpdatePicture = function (req, res, next) {
    console.log(req.params.usuario);
    console.log(req.body.profile_pic);
    Usuarios.findOneAndUpdate({ usuario: req.params.usuario }, { profile_pic: req.body.profile_pic }).then(function () {
        res.status(202).json({ msg: "User updated" });
        console.log("ALL Update Access from API");
    }).catch(function (err) {
        console.log("Error Update from API");
        res.status(404).json({ msg: "Something its wrong" });
    });
};
exports.DeleteUser = function (req, res) {
    var usuarios = new Usuarios({
        mail: req.params.mail
    });
    Usuarios.collection.deleteOne({ mail: req.params.mail })
        .then(function (user) {
        if (!user) {
            return res.status(404).json({ msg: "Error" });
        }
        res.json({ msg: "Delete succesfull" });
    }).catch(function (err) {
        if (err.name === 'NotFound') {
            return res.status(404).json({ msg: "Error NotFound" });
        }
    });
};
