const fs = require('fs-extra')
const path = require('path')
const process = require('process')
const inquirer = require('inquirer')
const spawn = require('cross-spawn')
const pkgs = require('./pkgs')

const projectType = {
  basic: 'Basic TS Project',
  react: 'React TS Project',
  angular: 'Angular TS Project',
  vue: 'Vue TS Project',
}
const prompts = [
  {
    type: 'list',
    name: 'projectType',
    message: '请选择项目的类型',
    choices: [
      projectType.basic,
      projectType.react,
      projectType.angular,
      projectType.vue,
    ],
  },
]
const createNewProject = async (ctx, args, options, logger) => {
  const { isInit, cwd } = ctx
  const { projectName } = args
  // 待创建的项目路径
  const projectPath = path.join(cwd, projectName)
  if (!isInit) {
    const ans = await inquirer.prompt(prompts)
    const finalPkgs = [...pkgs.devPkgs]
    switch (ans.projectType) {
      case projectType.react:
        console.log('react 项目')
        break
      case projectType.angular:
        console.log('angular 项目')
        break
      case projectType.vue:
        console.log('vue 项目')
    }
    // 文件夹同名检测
    if (fs.existsSync(projectPath)) {
      logger.info('已存在同名的文件夹, 请重新输入')
      return
    }
    logger.info('开始创建项目根目录')
    fs.ensureDirSync(projectPath)
    logger.info('项目根目录创建完毕')

    logger.info('将默认的配置文件复制到项目文件夹中')
    fs.copySync(path.join(__dirname, './template'), projectPath)
    logger.info('复制完毕')

    logger.info('切换当前工作目录到项目文件夹')
    process.chdir(projectPath)
    logger.info('工作目录切换完成')

    logger.info('建立package.json文件，并安装npm包')
    spawn.sync('npm', ['init', '-y'])
    spawn.sync('npm', ['install', '--save-dev', ...finalPkgs], {
      // 让子进程的io可以显示在父进程中
      stdio: 'inherit',
    })
    logger.info('npm包安装完成')

    logger.info('初始化git')
    spawn.sync('git', ['init'], {
      stdio: 'inherit',
    })
    spawn.sync('git', ['add', '.'], {
      stdio: 'inherit',
    })
    spawn.sync('git', ['commit', '-m', 'Initialization'], {
      stdio: 'inherit',
    })
    logger.info('git初始化完成')
  } else {
    logger.info('当前目录已经初始化过，请切换目录')
  }
}

module.exports = {
  command: 'init',
  description: 'init a new project',
  args: [
    {
      argument: '<project_name>',
      description: 'name of new project',
      validator: /^[\w.-]+$/,
    },
  ],
  options: [],
  handler: createNewProject,
}
