const { 
    argv, // 命令行数组
    installPrefix, // node安装路径前缀
    env, // 当前shell环境变量对象
    pid, // 进程号
    platform, // 当前操作系统
    version // node版本
} = process;
// console.info('argv, installPrefix, pid, platform, version, env ', argv, installPrefix, pid, platform, version, )
console.log(argv)
console.log(installPrefix)
console.log(pid)
console.log(platform)
console.log(version)
console.log(env)
