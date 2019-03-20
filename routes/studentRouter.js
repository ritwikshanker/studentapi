const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Students = require('../models/students');

const studentRouter = express.Router();

mongoose.set('useFindAndModify', false);

studentRouter.use(bodyParser.json());

studentRouter.route('/')
    .get((req, res, next) =>
    {
        Students.find({})
            .then((students) =>
            {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(students);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) =>
    {
        Students.create(req.body)
            .then((student) =>
            {
                console.log('Student Added ', student);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(student);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) =>
    {
        res.statusCode = 403;
        res.end('PUT operation not supported on /students');
    })
    .delete((req, res, next) =>
    {
        Students.remove({})
            .then((resp) =>
            {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

studentRouter.route('/:stuID')
    .get((req, res, next) =>
    {
        Students.findOne({stuID: req.params.stuID})
            .then((student) =>
            {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(student);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) =>
    {
        res.statusCode = 403;
        res.end('POST operation not supported on /students/' + req.params.stuID);
    })
    .put((req, res, next) =>
    {
        Students.findOneAndUpdate({stuID: req.params.stuID}, {
            $set: req.body
        }, {new: true})
            .then((student) =>
            {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(student);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) =>
    {
        Students.findOneAndDelete({stuID: req.params.stuID})
            .then((resp) =>
            {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = studentRouter;