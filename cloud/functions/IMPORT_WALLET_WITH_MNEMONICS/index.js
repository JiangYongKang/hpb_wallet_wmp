const cloud = require('wx-server-sdk')
const ethers = require('ethers')

cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
    let { mnemonics, password } = event
    let wallet = ethers.Wallet.fromMnemonic(mnemonics)
    let name = Date.parse(new Date())
    let address = wallet.address
    return wallet.encrypt(password).then(keyStoreJson => {
        let keyStore = JSON.parse(keyStoreJson)
        delete keyStore['x-ethers']
        let data = {
            name: name,
            password: password,
            mnemonic: mnemonics,
            privateKey: wallet.privateKey,
            address: address,
            keyStore: JSON.stringify(keyStore)
        }
        console.log(data)
        return db.collection('key_stores').add({ data: data }).then(res => {
            return res._id
        })
    })
}