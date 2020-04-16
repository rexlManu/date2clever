const TinderWrapper = require('tinder-wrapper');
const chalk = require('chalk');
const tinderOptions = require('./tinderOptions');
const tinder = new TinderWrapper.TinderWrapper(tinderOptions.options);

setInterval(() => {
    tinder.getRecommendations().then((response) => {

        response.results.forEach(async(result) => {
            await sleep(3);
            console.log(chalk.blue('[Tinder]'), chalk.green(`Tries to like ${result.name}.`));
            tinder.like(result._id, result.photos[0].id, result.content_hash, result.s_number).then(() => {
                console.log(chalk.blue('[Tinder]'), chalk.green(`Successful liked ${result.name}.`));
            }).catch((err) => {
                console.log(chalk.blue('[Tinder]'), chalk.red(err));
            });
        });
        //todo like everyone

    }).catch((err) => {
        console.log(chalk.blue('[Tinder]'), chalk.red(err));
    });
}, 30 * 60 * 1000)

const sleep = (time) => new Promise(resolve => setTimeout(resolve, time * 1000));