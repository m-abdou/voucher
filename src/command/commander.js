const program = require('commander');
const handlers = require("../handlers");

let data = require("../../.data.json");
const {map} = require("lodash");

program
    .version('1.0.0')
    .description('Cli tool for generate vouchers');

program.command('generate')
    .description('generate users and offers and coupons')
    .action(async () => {
        try {
            console.log('Staring');
            let userHandler = new handlers.User();
            let users = await userHandler.import(data.users);
            let offerHandler = new handlers.Offer();
            let offers = await offerHandler.import(data.offers);
            let couponHandler = new handlers.Coupon();

            await Promise.all(
                map(users , async (user) =>
                    await Promise.all(map(offers, async (offer) =>
                        await couponHandler.import(user._id, offer._id)
                    )
                ))
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
