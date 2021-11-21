import jsSHA from "jssha";
export function getAuthorizationHeader() {
//  填入自己 ID、KEY 開始
    let AppID = process.env.NEXT_PUBLIC_APP_ID as string;
    let AppKey = process.env.NEXT_PUBLIC_APP_KEY as string;
//  填入自己 ID、KEY 結束
    let GMTString = new Date().toUTCString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
    return { 'Authorization': Authorization, 'X-Date': GMTString }; 
}