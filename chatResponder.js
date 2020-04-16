const TinderWrapper = require('tinder-wrapper');
const chalk = require('chalk');
const moment = require('moment');
const tinderOptions = require('./tinderOptions');
const tinder = new TinderWrapper.TinderWrapper(tinderOptions.options);
const Cleverbot = require('cleverbot');
const cleverbot = new Cleverbot({ key: process.env.CLEVERBOT_API_TOKEN });
const utf8 = require('utf8');


var date = new Date(1583010000000);

setInterval(async() => {

    tinder.getUpdates(date).then((response) => {
        if (response.matches.length != 0) {
            console.log(chalk.blue('[Tinder]'), chalk.green("New Match!"))
            response.matches.forEach(match => {
                if (match.messages.length != 0) {
                    match.messages.forEach(message => {
                        if (message.from != "5e5f64a3422bbf010007cbcb") {
                            console.log(chalk.blue('[Tinder]'), chalk.green(`New Message: ${message.message}`));

                            cleverbot.query(utf8.encode(message.message)).then((result) => {
                                console.log(chalk.blue('[CleverBot]'), chalk.white(result.output));
                                tinder.sendMessage(message.match_id, result.output).then(() => {
                                    console.log(chalk.blue('[Tinder]'), chalk.green(`Anwsered: ${result.output}`))
                                }).catch((err) => {
                                    console.error(chalk.blue('[Tinder]'), chalk.red(err));
                                });
                            }).catch((err) => {
                                console.error(chalk.blue('[CleverBot]'), chalk.red(err));
                            });
                        }
                    });
                }
            });
        }
        //console.log(chalk.blue('[Tinder]'), chalk.red(err));    
    }).catch((err) => {
        console.log(chalk.blue('[Tinder]'), chalk.red(err))
    });

    date = new Date();
}, 3 * 1000);