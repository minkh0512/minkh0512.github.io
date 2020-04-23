const passport = require('passport');
const { Strategy: Localstrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
  passport.use(new Localstrategy({
    usernameField: 'userId',
    passwordField: 'password',
  }, async (userId, password, done) => {
    try {
      const user = await db.User.findOne({ where: { userId } });
      if(!user) {
        return done(null, false, { reason: '존재 하지 않는 사용자압니다.' });
      }
      const result = await bcrypt.compare(password, user.password);
      if(result) {
        return done(null, user);
      }
      return done(null, false, { reason: '비밀번호가 틀립니다.' })
    } catch (e) {
      console.error(e);
      return done(e);
    }
  }));
}