const schema = {
    id: '/user',
    type: 'object',
    properties: {
        email: { type: 'email' },
        name: { type: 'string', minLength: 3 },
    },
    required: ['name', 'email'],
};

module.exports = schema;
