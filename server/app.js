const Koa=new require('koa');
const app=new Koa()
const koaLogger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const koajwt = require('koa-jwt');
const routers=require("./routes/router")
// body解析中间件
app.use(bodyParser())
// 错误处理
app.use(async (ctx, next) => {
    await next().catch((err) => {
        if(err.status === 401){
            ctx.status = 401;
            ctx.body = 'token失效';
        }else{
            throw err;
        }
    })
})
// 配置控制台日志中间件
app.use(koaLogger())
// 验证jwt
app.use(koajwt({
    secret: '_token_'
}).unless({
    path: [/\/login/]
}));
// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())
// 监听启动端口
app.listen( 3000,()=>{
    console.log(app)
    console.log(`the server is start at port 3000`)
} )