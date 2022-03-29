const chalk = require('chalk')

const errorMsg = (msg) => {
    const frmtMsg = chalk.white.bgRed.bold('Error: ' + msg)
    console.log(frmtMsg)
}

const infoMsg = (msg) => {
    const frmtMsg = chalk.black.bgGreen.bold('Info: ' + msg)
    console.log(frmtMsg)
}

const warningMsg = (msg) => {
    const frmtMsg = chalk.black.bgYellow.bold('Warning: ' + msg)
    console.log(frmtMsg)
}

module.exports = {
    errorMsg, infoMsg, warningMsg
}