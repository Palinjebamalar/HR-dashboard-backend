const mongoose=require("mongoose")

const Goalschema=new mongoose.Schema({
    employeeId:{type:String,required:true},
    // {type:mongoose.Schema.Types.ObjectId,ref:"employee"},
    goalDescription:{type:String,required:true},
    completionDate:{type:String,required:true},
    status:{type:String,enum:["OVERDUE","IN_PROGRESS","COMPLETED"],default:"IN_PROGRESS"}

},
{
    timestamps:true
})

module.exports=mongoose.model("Goal",Goalschema)