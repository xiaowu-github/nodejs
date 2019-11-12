const router = require('koa-router')()
const user= require('../controllers/user')
module.exports=router.get('/userInfo',user.getUserInfo).post('/login',user.login).post('/signUp')