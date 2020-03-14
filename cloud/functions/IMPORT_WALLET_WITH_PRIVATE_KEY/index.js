const cloud = require('wx-server-sdk')
const ethers = require('ethers')

cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
    let { privateKey, password } = event
    let wallet = new ethers.Wallet(privateKey)
    let name = Date.parse(new Date())
    let address = wallet.address
    return wallet.encrypt(password).then(keyStoreJson => {
        let keyStore = JSON.parse(keyStoreJson)
        delete keyStore['x-ethers']
        let data = {
            name: name,
            password: password,
            mnemonic: false, // 通过私钥导入的钱包，无法反向生成助记词
            privateKey: privateKey,
            address: address,
            keyStore: JSON.stringify(keyStore)
        }
        return db.collection('key_stores').add({ data: data }).then(res => {
            return res._id
        })
    })
}