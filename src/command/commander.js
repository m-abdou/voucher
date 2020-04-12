const program = require('commander');
const { map } = require('lodash');
const handlers = require('../handlers');

const data = require('../../.data.json');

program
    .version('1.0.0')
    .description('Cli tool for generate vouchers');

program.command('generate')
    .description('generate users and offers and coupons')
    .action(async () => {
        try {
            console.log('Staring');
            const userHandler = new handlers.User();
            const users = await userHandler.import(data.users);
            const offerHandler = new handlers.Offer();
            const offers = await offerHandler.import(data.offers);
            const couponHandler = new handlers.Coupon();

            await Promise.all(
                map(users, async (user) => Promise.all(map(offers, async (offer) => couponHandler.import(user._id, offer._id)))),
            );
            console.log('import finished');
            process.exit(0);
        } catch (err) {
            console.log(err);
            console.log(err.stack);
            process.exit(1);
        }
    });

// Show help by default
if (!process.argv.slice(2).length) {
    program.outputHelp();
}

program.parse(process.argv);
