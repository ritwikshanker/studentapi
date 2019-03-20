const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Students = require('../models/students');

const studentRouter = express.Router();

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
                console.log('Student Added ');
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

studentRouter.route('/:stuId')
    .get((req, res, next) =>
    {
        Students.findById(req.params.stuId)
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
        res.end('POST operation not supported on /students/' + req.params.stuId);
    })
    .put((req, res, next) =>
    {
        Students.findByIdAndUpdate(req.params.stuId, {
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
        Students.findByIdAndRemove(req.params.stuId)
            .then((resp) =>
            {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = studentRouter;