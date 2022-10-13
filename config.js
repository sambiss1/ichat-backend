module.exports = {
    jwtSecret: `${process.env.NODE_APP_JWT_SECRET}`,
    jwtSession: {
        session: true
    }
};