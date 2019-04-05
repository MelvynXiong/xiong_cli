#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spawn = require("cross-spawn");
var path = require("path");
var process = require("process");
var devPkg_1 = require("./devPkg");
var folderName = process.argv[2] || 'xiong_ts_project';
var projectDir = path.resolve(process.cwd(), folderName);
var templateDir = path.resolve(__dirname, '../template').concat('/.');
var createNewProject = function () {
    spawn.sync('mkdir', [folderName]);
    spawn.sync('cp', ['-r', templateDir, projectDir]);
    process.chdir(projectDir);
    spawn.sync('npm', ['init', '-y']);
    spawn.sync('git', ['init']);
    console.log('开始安装npm包');
    spawn.sync('npm', ['install', '--save-dev'].concat(devPkg_1.default));
    console.log('结束安装npm包');
};
createNewProject();
