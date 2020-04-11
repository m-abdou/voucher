let schema = {
    id: '/coupon',
    type: "object",
    properties: {
        discount: { type: "number" },
        name: { type: "string", minLength: 8 },
    },
    required: ["name","discount"]
};

export default schema