const {Schema, model} = require('mongoose')

const TokenSchema = new Schema({
    email:{type:Schema.Types.ObjectId, ref:'Email'},
    refreshToken:{type:String, required:true}
})

module.exports = model('Token', TokenSchema)