import { Request,Response,NextFunction } from "express";
import 'express-session';
import Student from "../model/student";

declare module 'express-session' {
  interface SessionData {
    admin?: string;
  }
}



const login=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        res.render('pages/login')
    } catch (error) {
        next(error);
    }
}

const adminid = {
    email: "sahlathasnim2002@gmail.com",
    password: "Sahla@2002"
}


const verifyLogin=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const{Email,password}=req.body
        if(Email===adminid.email){
            if (password===adminid.password) { 
                req.session.admin= adminid.email              
                res.redirect('/home')
            }else{
                res.redirect('/')
            }
            }else{
                res.redirect('/')
            }
    } catch (error) {
        next(error);
    }
}

const logOut=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        delete req.session.admin
        res.redirect('/')
    } catch (error) {
        next(error);
    }
}

const homepage=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        res.render('pages/home')
    } catch (error) {
        next(error); 
    }
}

const studentList=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const list=await Student.find()
        res.render('pages/studentsList',{list})
    } catch (error) {
        next(error);
    }
}

const AddStudent=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        res.render('pages/AddStudent')
    } catch (error) {
        next(error);
    }
}

interface student{
    FirstName:string,
    LastName:string,
    DateOfBirth:Date|string;
    Email:string,
    Address:string,
    gender:'Male'|'Female'|'Prefer not to say'
    Phone:string,
    Grade:string,
    Blood:string,
    course:'Management'|'Arts'|'commerse'|'Tech'
    // id:number
}

const addingStudent=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {FirstName,LastName,DateOfBirth,Email,Address,gender,Phone,Grade,Blood,course}=req.body
        const newStudent=new Student({
            FirstName,
            LastName,
            DateOfBirth:new Date(DateOfBirth),
            Email,
            Address,
            gender,
            Phone,
            Grade,
            Blood,
            course 
        })
          const newDate=await newStudent.save()
          console.log(newDate,'lkllkj');
          
    if(newDate){
        res.redirect('/studentList')
    }
       
    } catch (error) {
        next(error);
        
    }
}

const editPage=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const it=req.params.id
        const edit=await Student.findOne({_id:it})
        res.render('pages/editStudent',{edit})
    } catch (error) {
        next(error);
        
    }
}

const editing=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {FirstName,LastName,DateOfBirth,Email,Address,gender,Phone,Grade,Blood,course,id}=req.body
        const edited=await Student.findByIdAndUpdate({_id:id},{
            FirstName,
            LastName,
            DateOfBirth:new Date(DateOfBirth),
            Email,
            Address,
            gender,
            Phone,
            Grade,
            Blood,
            course 
        })
        if(edited){
            res.redirect('/studentList')
        }
    } catch (error) {
        next(error);
    }
}

const deleteStudent=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const it=req.params.id
        const edit=await Student.findByIdAndDelete({_id:it})
    } catch (error) {
        next(error);
    }
}

const details=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const it=req.params.id
        const find=await Student.findOne({_id:it})
        if(find){
            res.render('pages/studentDetail',{find})
        }
    } catch (error) {
        next(error);
    }
}

export{
    login,
    verifyLogin,
    homepage,
    studentList,
    AddStudent,
    addingStudent,
    editPage,
    logOut,
    editing,
    deleteStudent,
    details

}