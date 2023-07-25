const express = require("express");

const app = express();

const DeviceDetector = require('node-device-detector');
const detector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    deviceAliasCode: false,
});


const geoIp = require('geoip-country');
const lookup = require('country-code-lookup')



app.get("/", async (req,res)=>{
    const xForwardedFor = (req.headers['x-forwarded-for'] || '').replace(/:\d+$/, '');
    let ip = xForwardedFor || req.connection.remoteAddress;

    if (ip.includes('::ffff:')) {
        ip = ip.split(':').reverse()[0]
    }

    if (ip === '127.0.0.1' || ip === '::1') {
        ip = "207.97.227.239"
        console.log(200)
    }

    const geo = geoIp.lookup(ip);
    // var fetch_data = await res.json()

    // const country = lookup.byIso(geo.country)
    const country1 = lookup.byInternet(geo.country)

    const result = detector.detect(req.get('User-Agent'));
    res.json({result, geo, country1, ip})
})

app.listen("80", ()=>{
    console.log("it's running");
})