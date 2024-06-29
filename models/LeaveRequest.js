const mongoose=require("mongoose")


const LeaveRequestSchema= new mongoose.Schema({
    employeeId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Employee"},
    reason:{type:String,required:true},
    Fromdate:{type:String,required:true},
    Todate:{type:String,required:true},
    status:{type:String}

},{
    timestamps:true
})

module.exports=mongoose.model("LeaveRequest",LeaveRequestSchema)