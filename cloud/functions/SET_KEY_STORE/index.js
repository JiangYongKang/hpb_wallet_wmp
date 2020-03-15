const cloud = require('wx-server-sdk')
const ethers = require('ethers')

cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
    let openId = cloud.getWXContext().OPENID
    let wallet = ethers.Wallet.createRandom()
    let { mnemonic, privateKey, address } = wallet
    return wallet.encrypt(event.password).then(keyStoreJson => {
        let keyStore = JSON.parse(keyStoreJson)
        delete keyStore['x-ethers']
        let data = {
            openId: openId,
            name: event.name,
            password: event.password,
            mnemonic: mnemonic,
            privateKey: privateKey,
            address: address,
            keyStore: JSON.stringify(keyStore)
        }
        return db.collection('key_stores').add({ data: data }).then(res => {
            return res._id
        }).catch(error => console.error(error))
    }).catch(error => console.error(error))
}