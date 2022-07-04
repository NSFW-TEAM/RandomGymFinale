"use strict";
var mongoose1 = require('mongoose');
var Exercise = mongoose1.model('exercise');
//Busca ejercicio mediante id (POST)
exports.Authenticate = function (req, res) {
    var exercise = new Exercise({
        diff: req.params.diff,
        area: req.params.area,
        name: req.params.name,
        id: req.params.id,
        demopath: req.params.demopath,
        desc: req.params.desc,
        duration: req.params.duration,
        workarea: req.params.workarea
    });
    if (parseInt(req.params.id) > -1) {
        Exercise.find({ id: req.params.id }, function (err, response) {
            if (err)
                return res.send(500, err.message);
            res.status(200).json(response);
        });
    }
    else {
        Exercise.find({}, function (err, response) {
            if (err)
                return res.send(500, err.message);
            res.status(200).json(response);
        });
    }
};
//Busca Ejercicio mediante dificualtad y area (GET)
exports.ExerciseF = function (req, res) {
    var exercise = new Exercise({
        diff: req.params.diff,
        area: req.params.area,
    });
    Exercise.find({ diff: req.params.diff, area: req.params.area }, function (err, response) {
        if (err)
            return res.send(500, err.message);
        res.status(200).json(response);
    });
};
exports.conseguirID = function (req, res) {
    //let exercise = new Exercise();
    //exercise.collection.countDocuments({})
    Exercise.count({}, function (err, count) {
        console.log("Number of docs: ", count);
        res.status(200).json({ count: count });
    });
};
//Inserta un nuevo registro a la bd (POST)
exports.InsertExercise = function (req, res) {
    var exercise = new Exercise({
        diff: req.body.diff,
        area: req.body.area,
        name: req.body.name,
        id: req.body.id,
        demopath: req.body.demopath,
        desc: req.body.desc,
        duration: req.body.duration,
        workarea: req.body.workarea
    });
    Exercise.collection.insertOne(exercise), function (err, response) {
        if (err)
            return res.send(500, err.message);
        res.status(200).json(response);
    };
};
exports.DeleteExercise = function (req, res) {
    var exercise = new Exercise({
        id: Number(req.params.id),
    });
    exercise.collection.deleteOne({ id: Number(req.params.id) })
        .then(function (exercise) {
        if (!exercise) {
            return res.status(404).json({ msg: "Error" });
        }
        res.json({ msg: "Delete succesfull" });
    }).catch(function (err) {
        if (err.name === 'NotFound') {
            return res.status(404).json({ msg: "Error NotFound" });
        }
    });
};
