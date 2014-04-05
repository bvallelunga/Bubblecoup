/* Import NPM Modules */
var express    = require('express');
var device     = require('express-device');
var slashes    = require("connect-slashes");
var piler      = require("piler");
var ejs        = require('ejs');
var RedisStore = require('connect-redis')(express);
