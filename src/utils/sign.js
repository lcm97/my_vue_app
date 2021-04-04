import forge from 'node-forge'
import WxPay from 'wechatpay-node-v3'

//let sdk = require('postman-collection');

const private_key = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCxK8cbvAxgZu29
+MOnEcVrUmjPXn8pLzhlbdGSOB0Q0CiTJpxcVGVxRcV3EzN7E88AWd/UM0dgqCau
D3fkzhaR87V7KobQagT7LCruUlELvm0Mw0HywBG1s6Dddz0+Y2jwe3qpnx+/qiBE
bcF7H7OZwu1JzRL3U7qQU9iM8fq2OhQxrjneurFSSiBfnl/acVam/JX7aaoR+2yW
KlNoB1ptEQhRo3vZNCpB+D1KeU7qdOAgbJ5R5pExpN9SXKX4Zmbqjh8XxKwc9D7m
Cnr6JdR071xS/574oZqBy5Rlq6V18hoMKSvWqucJktUlG61phz3HE5v65T+2d4Qs
BT/GHV2JAgMBAAECggEADxDe9J/QGZ6HFwGBecKMHC081m19uL3YON/W021MI3Lg
EGtXHo7atYAuY4rRdOThVHFQFFZr+m8yItkT4/QWfUDRLPEX1788PzOpTuzXEX2W
/l/YStFEcEQfKNYL8jM36ENH0gbDB2RrLAZ9ToAKoMevr/ftZfTLx5wprQqivD4d
4kxywpYhxl3hJXOWWxugoF0b4Ft4r8olrrxZG52UuejzIXauvcqTx95Ps/c/QP7r
+YDcpeE35XQGWCOL614wP8wF67N3YJ4Kn3RFePbD3Aa1r4ofH/hK2jMgb/GBGd82
ZsEH+m21mCG8d5FGLYBaJ7BVWUq1zYFu9/F9QApoEQKBgQDXqQOpeosrj5w/Brwi
zd96PQMTdMEviivqrNRqV2BcoqkvvIbo+FrL627e7UXvyysiN1WUCHSv8TTwsL8s
lz4ZwtZRXd7l76oHrsB/Ra230PuKnHXiHwHHgVOZgKR83GHz8xsQaC4AMM35gIep
leDlh8zmTOc1bopKmou5RaOx5QKBgQDST7DPAAz2U3wP9PCUS4xoJqUdZmUuQ+EU
RKeLoiUpRO5j1zjE1awMsJEDfYqvc+TGwa9DrCq8VZ4D2Jrx6zxBTeyNA+2gI2T8
NjD/XnduUuVFUmgsj8lP+G5N5bg9KWtjPWqWkHLi/tWkmQ9o/NRvHw2El29nwBVx
XOc2C0NS1QKBgBYS4qESPfRzepao5dDaKamlXQ88wBlRlzUqA4Pu9ZoFvDN6pIRs
Bz8gFfUTbDkjHoMeDtBcHTV1Buor7SVvRZf1bWJerVXztf+bT3C3fRR3e4ewhBBl
BBWbkyb/F9b/57bEh1yijTLPzAVhtoERKjfUMpDQBkpdyiHgt7R7AEpRAoGAGTxm
wvAGnig2YtPJaoIGPxkkBvsaeQq8H2p9kEvMmb8ju+c/cJ8THhKx0/FkitklQpRL
K5ulJSRA6cU8Entfp5ZqJCGsieK1Y249Quda/WoFCORyi6ZVSbtNwRsnmG8365ib
CaYboxFhIXccWkS8WPko7hgdzh1GdWvocpu3YGECgYBC1/HbvjHxHkyXR3vow2JJ
qHRIEWUDB22CAFBoGyNGrPcdU0sBcjP/Fd+XZgFgJYLdWSLVu21O7vZtgAFoCP/C
TBOJ4HUmNJT3yoIOZWRlPz/L2DjUk0UrY2eeOWz2LDmohU+b0z2dVbV+wkypxwTm
CYBwyUpunLHdTOpqyphZaA==
-----END PRIVATE KEY-----`;

const publicKey = `-----BEGIN CERTIFICATE-----
MIID8zCCAtugAwIBAgIUZ3cyHD0TvaQH4wzVYMlvhpoxBvMwDQYJKoZIhvcNAQEL
BQAwXjELMAkGA1UEBhMCQ04xEzARBgNVBAoTClRlbnBheS5jb20xHTAbBgNVBAsT
FFRlbnBheS5jb20gQ0EgQ2VudGVyMRswGQYDVQQDExJUZW5wYXkuY29tIFJvb3Qg
Q0EwHhcNMjEwNDAxMDU0NDU1WhcNMjYwMzMxMDU0NDU1WjCBhDETMBEGA1UEAwwK
MTYwNzg1Mzk1MzEbMBkGA1UECgwS5b6u5L+h5ZWG5oi357O757ufMTAwLgYDVQQL
DCflub/lt57lub/lnKjnur/kvIHkuJrnrqHnkIbmnInpmZDlhazlj7gxCzAJBgNV
BAYMAkNOMREwDwYDVQQHDAhTaGVuWmhlbjCCASIwDQYJKoZIhvcNAQEBBQADggEP
ADCCAQoCggEBALErxxu8DGBm7b34w6cRxWtSaM9efykvOGVt0ZI4HRDQKJMmnFxU
ZXFFxXcTM3sTzwBZ39QzR2CoJq4Pd+TOFpHztXsqhtBqBPssKu5SUQu+bQzDQfLA
EbWzoN13PT5jaPB7eqmfH7+qIERtwXsfs5nC7UnNEvdTupBT2Izx+rY6FDGuOd66
sVJKIF+eX9pxVqb8lftpqhH7bJYqU2gHWm0RCFGje9k0KkH4PUp5Tup04CBsnlHm
kTGk31JcpfhmZuqOHxfErBz0PuYKevol1HTvXFL/nvihmoHLlGWrpXXyGgwpK9aq
5wmS1SUbrWmHPccTm/rlP7Z3hCwFP8YdXYkCAwEAAaOBgTB/MAkGA1UdEwQCMAAw
CwYDVR0PBAQDAgTwMGUGA1UdHwReMFwwWqBYoFaGVGh0dHA6Ly9ldmNhLml0cnVz
LmNvbS5jbi9wdWJsaWMvaXRydXNjcmw/Q0E9MUJENDIyMEU1MERCQzA0QjA2QUQz
OTc1NDk4NDZDMDFDM0U4RUJEMjANBgkqhkiG9w0BAQsFAAOCAQEAV0vDQXmFKnbb
/EOUY21NmeYrxu2CE6kaXxc75jvRVGL22tmRl2ICjDcv8EixASPQattbEMto7sHQ
OBS5DrQ5egluIe1KDWlIj73eSvDw/dj4BmwrGwbgrPR8Jvz0eS99JOZt3eHGgF26
mwUhigwKRIj0Huh+Sv6OqCWM0Hc5+ss1jAGs92Yyp8FifNRzNbLJu1A92OEDb6/T
3eUMxkC/KWZuuhbDW5gzrSDlI+z5mhBbd2VX7VdqiS4tQOokabz0fKH4Aw/QXSIt
CWIzoxAPUwoidMeS3bBDnf7vecJltKXh0IFOOx3tGXCTrwvQrTeXHr7BdFsTI4K1
/OMbWrL13Q==
-----END CERTIFICATE-----`


const mchid = "1607853953";
//const serialNo = "6777321C3D13BDA407E30CD560C96F869A3106F3";
const appid = "wx9921568c91d3e0d1"


const pay = new WxPay({
    appid: appid,
    mchid: mchid,
    publicKey: publicKey, // 公钥
    privateKey: private_key, // 秘钥
});

export default pay


/**
 * 生成签名串
 * 
 * **/
export function buildMessage(timestamp, nonceStr, prepay_id) {
    // 应用ID
    // 时间戳
    // 随机字符串
    // 订单详情扩展字符串
    //const nonceStr = Math.random().toString(36).substr(2, 15), // 随机字符串
    //    timestamp = parseInt(+new Date() / 1000 + '').toString() // 时间戳 秒
    //console.log(prepay_id)
    return appid + "\n" +
        timestamp + "\n" +
        nonceStr + "\n" +
        'prepay_id=' + prepay_id + "\n";
}


/**
 * 对签名串进行签名
 * 
 */
export function sign(message) {
    var privateKey = forge.pki.privateKeyFromPem(private_key);
    var sha256 = forge.md.sha256.create();
    sha256.update(forge.util.encodeUtf8(message));
    var signature = forge.util.encode64(privateKey.sign(sha256));

    //console.log(`message=[${message}]`);
    return signature
}

// /**
//  * 生成签名令牌
//  * 
//  */
// export function getAuth(nonceStr, timeStamp, signature) {
//     return `WECHATPAY2-SHA256-RSA2048 mchid="${mchid}",serial_no="${serialNo}",nonce_str="${nonceStr}",timestamp="${timeStamp}",signature="${signature}"`;
// }