var mongoose= require('mongoose')

//schema 
var commentSchema=mongoose.Schema({
    post:{type:mongoose.Schema.Types.ObjectId, ref:'post', required:true},   // 1
    author:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true}, // 1
    parentComment:{type:mongoose.Schema.Types.ObjectId, ref:'comment'}, // 2
    text:{type:String, required:[true,'text is required!']},
    isDeleted:{type:Boolean}, // 3
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date},
  },{
    toObject:{virtuals:true}
})

commentSchema.virtual('childComments')
  .get(function(){ return this._childComments })
  .set(function(value){ this._childComments=value })

var Comment=mongoose.model('comment', commentSchema)
module.exports=Comment