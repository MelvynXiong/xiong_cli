"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typesPkg = ['@types/react', '@types/react-router', '@types/node'];
var lintPkg = ['prettier', 'tslint', 'tslint-config-prettier'];
var pluginPkg = ['html-webpack-plugin'];
var loaderPkg = ['ts-loader', 'css-loader', 'style-loader'];
exports.webpackPkg = [
    'webpack',
    'webpack-cli',
    'webpack-merge'
].concat(pluginPkg, loaderPkg);
exports.tsPkg = typesPkg.concat(lintPkg, ['typescript']);
exports.serverPkg = [
    'express',
    'open',
    'nodemon',
    'webpack-dev-middleware',
    'webpack-hot-middleware',
];
exports.default = exports.webpackPkg.concat(exports.tsPkg, exports.serverPkg);
