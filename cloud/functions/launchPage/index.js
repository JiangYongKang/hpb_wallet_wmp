exports.main = async (event, context) => {
    console.log(event)
    console.log(context)
    console.log(process)
    console.log(process.env)
    return process.env
}