'use strict'

const express = require('express');
const router = express.Router();
const models = require('../models');
const Promise = require('bluebird');
const Page = models.Page;
const User = models.User;
module.exports = router;

router.get('/', function ( req, res, next ) {

    User.findAll({})
        .then( function ( users ) {
            res.render('userList', { users:users });
        })
        .catch(next);

})

router.get('/:userId', function ( req, res, next ) {

    const findUser = User.findById(req.params.userId)
    const findPages = Page.findAll({
        where: {
            authorId: req.params.userId
        }
    });

    Promise.all([findUser, findPages])
    .spread(function (user, userPages) {
        res.render('userpages', {
            pages: userPages,
            user: user
        });
    })
    .catch(next);

});