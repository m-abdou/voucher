let schema = {
    id: '/coupon',
    type: "object",
    properties: {
        coupon: {
            type: 'string',
            minLength: 8,
        },
        email: { type: "email" },
        used: { type: "boolean"},
        offer: { type: "string"},
    },
    required: ["coupon","email","offer"]
};

export default schema