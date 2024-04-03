const conf = {
    domain: String(process.env.DOMIAN),
    mongoDbUri: String(process.env.MONGO_ATLAS_URI),
    mailtrapUsername: String(process.env.MAILTRAP_USERNAME),
    mailtrapPassword: String(process.env.MAILTRAP_PASSWORD),
    jwtTokenSecret: String(process.env.JWT_TOKEN_SECRET)
}

export default conf;