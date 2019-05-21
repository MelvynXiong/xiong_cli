#!/usr/bin/env node
const spawn = require('cross-spawn')
const path = require('path')
const process = require('process')
const devPkg = require('./devPkg')

const folderName = process.argv[2] || 'xiong_ts_project'
const projectDir = path.resolve(process.cwd(), folderName)
const templateDir = path.resolve(__dirname, '../template').concat('/.')

const createNewProject = () => {
  // 创建新的文件夹
  spawn.sync('mkdir', [folderName])
  // 将默认的配置文件复制到项目文件夹中
  spawn.sync('cp', ['-r', templateDir, projectDir])
  // 切换当前工作目录到项目文件夹
  process.chdir(projectDir)
  // 初始化项目
  spawn.sync('npm', ['init', '-y'])
  // 初始化git
  spawn.sync('git', ['init'])
  // 安装npm包
  console.log('开始安装npm包')
  spawn.sync('npm', ['install', '--save-dev', ...devPkg])
  console.log('结束安装npm包')
}

//createNewProject()
console.log(folderName)
console.log(devPkg)
