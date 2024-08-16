import express from 'express';
const router=express.Router()

import {
    // registerForm,
    // register,
    login,
    verifyLogin,
    homepage,
    logOut,
    studentList,
    AddStudent,
    addingStudent,
    editPage,
    editing,
    deleteStudent,
    details}from '../controller/studentController'

// router.get('/register',registerForm)
// router.post('/register',register)
router.get('/',login)
router.post('/verifyLogin',verifyLogin)
router.get('/logout',logOut)
router.get('/home',homepage)
router.get('/studentList',studentList)
router.get('/AddStudent',AddStudent)
router.post('/addingStudent',addingStudent)
router.get('/editStudent/:id',editPage)
router.post('/editStudent/:id',editing)
// router.get('/deleteStudent/:id',delete)
router.get('/deleteStudent/:id',deleteStudent)
router.get('/dataStudent/:id',details)




export default router;