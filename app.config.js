module.exports = {
    apps: [
      {
        name: "MAIN",
        namespace: "Marino",
        script: 'ozi.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "1G",
        cwd: "./Pusha-Bots/Pusha-Main",
        output: '../../../Logger/[1]out.log',
        error: '../../../Logger/[2]error.log',
        log: '../../../Logger/[3]combined.outerr.log'
      },
      {
        name: "GUARD",
        namespace: "Marino",
        script: 'ozi.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "1G",
        cwd: "./Pusha-Bots/Pusha-Guard",
        output: '../../../Logger/[1]out.log',
        error: '../../../Logger/[2]error.log',
        log: '../../../Logger/[3]combined.outerr.log'
      },
      {
        name: "DESTEK",
        namespace: "Marino",
        script: 'ozi.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "1G",
        cwd: "./Pusha-Bots/Pusha-Destek",
        output: '../../../Logger/[1]out.log',
        error: '../../../Logger/[2]error.log',
        log: '../../../Logger/[3]combined.outerr.log'
      },
    ]
  };