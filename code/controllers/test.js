'use strict';
const Session = require('../services/session');

module.exports.test = async ctx => {
  ctx.body = 'test';
  // or ctx.body = await somethingAsync();
}

module.exports.session = async ctx => {
  const date = (new Date()).toString();
  const sid = ctx.cookies.get('SESSIONID');

  const sessionManager = new Session({
    schema: process.env.SESSION_SCHEMA,
    expireSecond: process.env.SESSION_EXPIRE_SECOND
  });

  if (!sid) {
    ctx.body = 'session not exists, refresh page'
  } else {
    const data = await sessionManager.get(sid);
    await sessionManager.rm(sid);
    ctx.body = 'find a session: ' + data;
  }
  const sessionId = await sessionManager.set(date);
  ctx.cookies.set('SESSIONID', sessionId, {
    maxAge: +process.env.SESSION_EXPIRE_SECOND * 1000
  });
}
