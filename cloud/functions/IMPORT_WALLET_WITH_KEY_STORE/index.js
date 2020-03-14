const cloud = require('wx-server-sdk')
const ethers = require('ethers')

cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
    let { keyStore, password } = event
    let name = Date.parse(new Date())
    return ethers.Wallet.fromEncryptedJson(keyStore, password).then(wallet => {
        let { address, privateKey } = wallet
        let data = {
            name: name,
            password: password,
            mnemonic: false, // 通过 KeyStore 导入的钱包，无法反向生成助记词
            privateKey: privateKey,
            address: address,
            keyStore: keyStore
        }
        return db.collection('key_stores').add({ data: data }).then(res => {
            return res._id
        })
    })
}