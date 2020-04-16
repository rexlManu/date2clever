require('dotenv').config();

const chalk = require('chalk');
const Cleverbot = require('cleverbot');
const cleverbot = new Cleverbot({ key: process.env.CLEVERBOT_API_TOKEN });

const automaticLike = require('./automaticLike');
const chatResponder = require('./chatResponder');

const utf8 = require('utf8');