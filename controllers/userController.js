"use strict"
const { User } = require('../models')

class Controller {
    static beranda(req, res) {
        res.send("welcome")
    }
}

module.exports = Controller