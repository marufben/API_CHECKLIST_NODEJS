const { v4: uuidv4 } = require('uuid');
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database

  User.create({
    id: uuidv4(),
    fullname: req.body.fullname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
        res.status(201).json({
            message: 'User was registered successfully!',
            id: user.id,
          })
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || 'Some error occurred while creating the Profile.',
            data: null,
          });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).json({
            message: 'User Not Found',
            data: null,
          });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).json();
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
        return res.status(200).json({ 
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          accessToken: token
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || 'Some error occurred while creating the Profile.',
            data: null,
          });
    });
};

exports.getUser = (req, res) => {
  User.findAll()
    .then(user => {
      if (!user) {
        res.status(404).json({
            message: 'User Not Found',
            data: null,
          });
        
      }
        return res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || 'User Not Found',
            data: null,
          });
    });
};