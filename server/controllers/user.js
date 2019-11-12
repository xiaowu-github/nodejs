const jwt = require('jsonwebtoken');
const userInfo=require('../dbs/user')
const userCode=require('../codes/index')
const user= {
    /**
     * 登录login
     */
    async login(ctx,next){
        const data=ctx.request.body
        if(!data.account||!data.password){
            ctx.body={
                code:"400",
                data:null,
                msg:userCode.ERROR_EMPTY
            }
            return
        }
        const result=await userInfo.account===data.account&&userInfo.password===data.password
        if(!result){
            status=200
            ctx.body = {
                code: '400',
                data: null,
                msg: userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
            }
        }else{
            const token = jwt.sign({
                account: data.account,
                password: data.password
            }, '_token_', { expiresIn: 60*30*1 });
            ctx.body = {
                code: '200',
                data: token,
                msg: userCode.SUCCESS
            }
        }
    },
    async signUp(ctx,next){
        const data=ctx.request.query;
    },
    async getUserInfo(ctx,next){
        const data=ctx.request.body;
        const userInfo1=await userInfo;
        ctx.body={
            account:userInfo1.account
        }
    }
}
module.exports=user