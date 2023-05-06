 export const ORDER_STATE = {
    //订单状态
    INIT: "INIT",//初始化
    AUDIT: "AUDIT",//审核 
    CONFIRM: "CONFIRM",//确认 
    PAY: "PAY",//支付 
    PRODUCTION: "PRODUCTION",//生产 
    SHUTDOWN: "SHUTDOWN",//关闭 

    //订单受理状态
    UNPAID: "UNPAID",//未支付
    INPAYMENT: "INPAYMENT",//支付中
    PAID: "PAID",//已支付
}