const koaRouter=require('koa-router')
const router=new koaRouter()
const userApi=require('./user')
router.use('/user',userApi.routes(),userApi.allowedMethods());
module.exports=router    