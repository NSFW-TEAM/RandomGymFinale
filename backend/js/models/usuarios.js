"use strict";
var mongoose1 = require('mongoose');
exports = module.exports = function (app, mongoose) {
    var UsuarioSchema = new mongoose1.Schema({
        clave: { type: String },
        mail: { type: String },
        sex: { type: String },
        objetivo: { type: String },
        area: { type: String },
        tipo: { type: String },
        diff: { type: String },
        peso: { type: Number },
        altura: { type: Number },
        usuario: { type: String },
        profile_pic: { type: String }
    });
    module.exports = mongoose.model('usuarios', UsuarioSchema);
};
