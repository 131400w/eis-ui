export const wxStatic = {
    appid: "wxcd92b38532f4844c",
    redirect_uri: "http://yun.hyflex.com.cn/",
    response_type: "code",
    scope: "snsapi_login",
    state: "d4624c36b6795d1d99dcf0547af5443d#wechat_redirect",
    secret: "a452ee657c24497ebbfe6a5f58256d43",
    access_token_grant_type: "authorization_code",
}


export const staticVariable = {
    //调用微信登录
    wxUrl: "https://open.weixin.qq.com/connect/qrconnect?appid=" + wxStatic.appid + "&redirect_uri=" + wxStatic.redirect_uri + "&response_type=" + wxStatic.response_type + "&scope=" + wxStatic.scope + "&state=" + wxStatic.state,
    //获取access_token
    wxAccessToken: "https://api.weixin.qq.com/sns/oauth2/access_token",
    //获取微信用户信息
    wxUser: "https://api.weixin.qq.com/sns/userinfo",

    //操作数据库
    upUserSelect: "select * from up_users where open_id = ?",
}

export const staticAttribute = {
    /**
     * 用户类型
     */
    USER_TYPE_A: "A",//企业
    USER_TYPE_B: "B",//个人
    USER_PROVIDER: "local",//默认值
    /**
     * 角色名称
     */
    ROLE_PERSON: "Person",//个人角色
    ROLE_ENTERPRISE: "Enterprise",//企业角色
    /**
     * 企业状态
     */
    FACTORY_STATUS_INVALIDATE: "invalidate",
    FACTORY_STATUS_CREATE: "create",
    FACTORY_STATUS_CHECKED: "checked",
}

