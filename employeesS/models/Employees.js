const mongoose=require('mongoose');
const EmployeeSchema=new mongoose.Schema({
    EmployeeName:{
        type:String,
    },

    EmployeeAge:{
        type:Number,
    },

    EmployeeEmail:{
        type:String,
    }

});

const Employee=mongoose.model('employee',EmployeeSchema);
module.exports=Employee;