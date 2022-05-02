const express=require('express');
const {employee,validate} = require('../../models/employee');
let router=express.Router();

router.get("/",async function(req,res){
let employees=await employee.find();
return res.send(employees);
});
router.get("/:id",async function(req,res){
  try{
    let employees=
    await employee.findById(req.params.id);
    if(!employees){
      return res.status(400)
      .send("Employee with given id not present");
    }

    return res.send(employees);
} catch(err){
    return res.status(400).send("Invalid ID")
}


});
 router.put("/:id",async (req,res)=>{
   let employees=await employee.findById(req.params.id);
  employees.Name=req.body.Name;
  employees.Description=req.body.Description;
  await employees.save();
  return res.send(employees);
 });   

 router.delete("/:id",async(req,res)=>{
  let employees=await employee.findByIdAndDelete(req.params.id);
  return res.send(employees);
 });

 router.post("/",async (req,res)=>{
      
   let employees=  new employee();
 employees.Name=req.body.Name;
 employees.Description=req.body.Description;
 await employees.save();
 return res.send(employees);
});

 module.exports=router;