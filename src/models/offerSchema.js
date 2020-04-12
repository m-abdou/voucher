const schema = {
    id: '/offer',
    type: 'object',
    properties: {
        discount: { type: 'number' },
        name: { type: 'string', minLength: 5 },
        expireDate: { type: 'string' },
    },
    required: ['name', 'discount'],
};

module.exports = schema;
