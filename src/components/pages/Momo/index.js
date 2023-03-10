function Momo(rawRequestId, rawOrderInfo, rawAmount, tourId, isDeposit, bookingId, isUpdate, fullName, phone, email,
    promoCode, request, idCard, dateOfIssue, placeOfIssue, startDate, countAdult, countChildren, type, adultPrice, childrenPrice) {
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var orderInfo = rawOrderInfo;
    var partnerCode = 'MOMO';
    var redirectUrl = 'https://wetravelfrontend-tr3w.vercel.app/afterpay?tourId=' + tourId + '&isDeposit=' + isDeposit + '&bookingId=' + bookingId + '&isUpdate='
        + isUpdate + '&fullName=' + fullName + '&phone=' + phone + '&email=' + email + '&promoCode=' + promoCode + '&request=' + request +
        '&idCard=' + idCard + '&dateOfIssue=' + dateOfIssue + '&placeOfIssue=' + placeOfIssue + '&startDate=' + startDate + '&numberOfAdult=' + countAdult +
        '&numberOfChildren=' + countChildren + '&type=' + type + '&adultPrice=' + adultPrice + '&childrenPrice=' + childrenPrice;
    var ipnUrl = 'https://wetravelfrontend-tr3w.vercel.app/';
    var requestType = "payWithMethod";
    var amount = rawAmount;
    var orderId = rawRequestId;
    var requestId = orderId;
    var extraData = '';
    var paymentCode = 'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
    var orderGroupId = '';
    var autoCapture = true;
    var lang = 'vi';

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
    //puts raw signature
    //signature
    const crypto = require('crypto');
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature
    });
    //Create the HTTPS objects
    const https = require('https');
    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }
    //Send the request and get the response
    const req = https.request(options, res => {
        res.setEncoding('utf8');
        res.on('data', (body) => {
            window.location.href = JSON.parse(body).payUrl
        });
    })
    req.write(requestBody);
    req.end();
}

export default Momo