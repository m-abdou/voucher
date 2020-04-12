const schema = {
    id: '/coupon',
    type: 'object',
    properties: {
        coupon: { type: 'string', minLength: 8 },
        userId: { type: 'object' },
        used: { type: 'boolean' },
        offerId: { type: 'object' },
        usedAt: { type: 'string' },
    },
    required: ['coupon', 'userId', 'offerId'],
};

module.exports = schema;
