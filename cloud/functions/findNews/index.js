const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
    return db.collection('news')
        .field({ title: true, banner: true, created_at: true })
        .get()
        .then(res => {
            return res.data
        })
}