const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
    return db.collection('key_stores').doc(event.id).get().then(res => {
        return res.data
    })
}