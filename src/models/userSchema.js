let schema = {
    id: '/coupon',
    type: "object",
    properties: {
        email: { type: "email" },
        name: { type: "string", minLength: 8 },
    },
    required: ["name","email"]
};

export default schema