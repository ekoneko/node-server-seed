module.exports = {
    "host"      : process.env.REDISHOST,
    "port"      : process.env.REDISPORT,
    "prefix"    : process.env.REDISPREFIX,
    "options"   : {}
}
if (process.env.REDISAUTH) {
    module.exports.options.auth_pass = process.env.REDISAUTH
}