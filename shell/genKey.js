var keyManage = require('../shell/keyManage')

// 过期时间和数量
console.log(keyManage.encrypt("2019-03-30", 2));

// {"iv":"nWFouQZLDvKoCFI5JlVvtQ==","v":1,"iter":10000,"ks":128,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"Vd/t8ysC2iI=","ct":"Pk/i6hCTPc87g3+OGHGXubRh1569LOsbeDpsne/Nh2y8IDTjvESuwS67NHn7+EafZfUpZDwdxD2VEpqSR/28CeeDZdvliq3mamWrhYPA"}
