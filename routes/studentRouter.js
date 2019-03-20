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
//
// dishRouter.route('/:dishId/comments')
//     .get((req, res, next) =>
//     {
//         Dishes.findById(req.params.dishId)
//             .then((dish) =>
//             {
//                 if (dish != null)
//                 {
//                     res.statusCode = 200;
//                     res.setHeader('Content-Type', 'application/json');
//                     res.json(dish.comments);
//                 } else
//                 {
//                     err = new Error('Dish ' + req.params.dishId + ' not found');
//                     err.status = 404;
//                     return next(err);
//                 }
//             }, (err) => next(err))
//             .catch((err) => next(err));
//     })
//     .post((req, res, next) =>
//     {
//         Dishes.findById(req.params.dishId)
//             .then((dish) =>
//             {
//                 if (dish != null)
//                 {
//                     dish.comments.push(req.body);
//                     dish.save()
//                         .then((dish) =>
//                         {
//                             res.statusCode = 200;
//                             res.setHeader('Content-Type', 'application/json');
//                             res.json(dish);
//                         }, (err) => next(err));
//                 } else
//                 {
//                     err = new Error('Dish ' + req.params.dishId + ' not found');
//                     err.status = 404;
//                     return next(err);
//                 }
//             }, (err) => next(err))
//             .catch((err) => next(err));
//     })
//     .put((req, res, next) =>
//     {
//         res.statusCode = 403;
//         res.end('PUT operation not supported on /dishes/'
//             + req.params.dishId + '/comments');
//     })
//     .delete((req, res, next) =>
//     {
//         Dishes.findById(req.params.dishId)
//             .then((dish) =>
//             {
//                 if (dish != null)
//                 {
//                     for (var i = (dish.comments.length - 1); i >= 0; i--)
//                     {
//                         dish.comments.id(dish.comments[i]._id).remove();
//                     }
//                     dish.save()
//                         .then((dish) =>
//                         {
//                             res.statusCode = 200;
//                             res.setHeader('Content-Type', 'application/json');
//                             res.json(dish);
//                         }, (err) => next(err));
//                 } else
//                 {
//                     err = new Error('Dish ' + req.params.dishId + ' not found');
//                     err.status = 404;
//                     return next(err);
//                 }
//             }, (err) => next(err))
//             .catch((err) => next(err));
//     });
//
// dishRouter.route('/:dishId/comments/:commentId')
//     .get((req, res, next) =>
//     {
//         Dishes.findById(req.params.dishId)
//             .then((dish) =>
//             {
//                 if (dish != null && dish.comments.id(req.params.commentId) != null)
//                 {
//                     res.statusCode = 200;
//                     res.setHeader('Content-Type', 'application/json');
//                     res.json(dish.comments.id(req.params.commentId));
//                 } else if (dish == null)
//                 {
//                     err = new Error('Dish ' + req.params.dishId + ' not found');
//                     err.status = 404;
//                     return next(err);
//                 } else
//                 {
//                     err = new Error('Comment ' + req.params.commentId + ' not found');
//                     err.status = 404;
//                     return next(err);
//                 }
//             }, (err) => next(err))
//             .catch((err) => next(err));
//     })
//     .post((req, res, next) =>
//     {
//         res.statusCode = 403;
//         res.end('POST operation not supported on /dishes/' + req.params.dishId
//             + '/comments/' + req.params.commentId);
//     })
//     .put((req, res, next) =>
//     {
//         Dishes.findById(req.params.dishId)
//             .then((dish) =>
//             {
//                 if (dish != null && dish.comments.id(req.params.commentId) != null)
//                 {
//                     if (req.body.rating)
//                     {
//                         dish.comments.id(req.params.commentId).rating = req.body.rating;
//                     }
//                     if (req.body.comment)
//                     {
//                         dish.comments.id(req.params.commentId).comment = req.body.comment;
//                     }
//                     dish.save()
//                         .then((dish) =>
//                         {
//                             res.statusCode = 200;
//                             res.setHeader('Content-Type', 'application/json');
//                             res.json(dish);
//                         }, (err) => next(err));
//                 } else if (dish == null)
//                 {
//                     err = new Error('Dish ' + req.params.dishId + ' not found');
//                     err.status = 404;
//                     return next(err);
//                 } else
//                 {
//                     err = new Error('Comment ' + req.params.commentId + ' not found');
//                     err.status = 404;
//                     return next(err);
//                 }
//             }, (err) => next(err))
//             .catch((err) => next(err));
//     })
//     .delete((req, res, next) =>
//     {
//         Dishes.findById(req.params.dishId)
//             .then((dish) =>
//             {
//                 if (dish != null && dish.comments.id(req.params.commentId) != null)
//                 {
//                     dish.comments.id(req.params.commentId).remove();
//                     dish.save()
//                         .then((dish) =>
//                         {
//                             res.statusCode = 200;
//                             res.setHeader('Content-Type', 'application/json');
//                             res.json(dish);
//                         }, (err) => next(err));
//                 } else if (dish == null)
//                 {
//                     err = new Error('Dish ' + req.params.dishId + ' not found');
//                     err.status = 404;
//                     return next(err);
//                 } else
//                 {
//                     err = new Error('Comment ' + req.params.commentId + ' not found');
//                     err.status = 404;
//                     return next(err);
//                 }
//             }, (err) => next(err))
//             .catch((err) => next(err));
//     });


module.exports = studentRouter;