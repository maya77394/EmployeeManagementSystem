const express=require('express');
const mongoose=require('mongoose');
const app=express();
const cors=require("cors");
const EmployeeModel=require('./models/Employees');
const {check, validationResult} = require('express-validator/check');

app.use(express.json());
app.use(cors());

// mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://New_User:CRUD_PASSW0RD@crud.crk5cgu.mongodb.net/employee?retryWrites=true&w=majority',{useNewUrlParser:true,
useUnifiedTopology: true
});

console.log("Connected to database");


//POST
app.post('/insert',[
], async(req,res)=>{
    const EmployeeName=req.body.EmployeeName;
    const EmployeeAge=req.body.EmployeeAge;
    const EmployeeEmail=req.body.EmployeeEmail;
    
    check(EmployeeName).isEmpty().withMessage("Name can't be empty"),
    check(EmployeeAge).not().isInt({ min: 0 }),
    check(EmployeeEmail).isEmail().withMessage("Invalid email address")

    const errors = validationResult(req);
    console.log(req.body);

    const emp=new EmployeeModel({EmployeeName:EmployeeName,EmployeeAge:EmployeeAge,EmployeeEmail:EmployeeEmail});

    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    } else {

        try{
            await emp.save();
            console.log("Employee Saved");
            res.send("Employee Saved");
        }

        catch(err){
            console.log(err);
            res.send(err);
        }
    }

    
});



//GET
app.get('/read', async(req,res)=>{
    EmployeeModel.find({},(err,result) =>{
        if(err){
            res.send(err);
        }

        res.send(result);
    });
    
});

///////////////////////////////////////////////////////////////////
//PUT
app.put("/update", [],async (req, res) => {

    const { id, EmployeeName, EmployeeAge, EmployeeEmail } = req.body;
    //validate the request body first
    if (EmployeeName) check(EmployeeName).isEmpty().withMessage("Name can't be empty");
    if (EmployeeAge) check(EmployeeAge).not().isInt({ min: 0 });
    if (EmployeeEmail) check(EmployeeEmail).isEmail().withMessage("Invalid email address");
 

    const errors = validationResult(req);
    console.log(req.body);

        if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    } else {

    //after validation update the employee based on the given attribute 
    try {
        let updatedEmployee = await EmployeeModel.findById(id);
        if (EmployeeName) updatedEmployee.EmployeeName = EmployeeName;
        if (EmployeeAge) updatedEmployee.EmployeeAge = EmployeeAge;
        if (EmployeeEmail) updatedEmployee.EmployeeEmail = EmployeeEmail;
        await updatedEmployee.save();
        res.send('Employee updated');
    } catch (err) {
        console.log(err);
        res.send(err);
    }

}
});

////////////////////////////////////////////////////////



//DELETE 
app.delete("/delete/:id", async(req, res)=>{
    const id=req.params.id;
    try{
        await EmployeeModel.findByIdAndRemove(id).exec();
        res.send("employee deleted!");
    }catch(err){
        res.send(err);
    }

})


app.listen(3001,()=>{
    
    console.log("Server is running on port 3001");
    console.log("running...");
})


