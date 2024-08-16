
import express,{Application,Request,Response,NextFunction} from 'express';
import path from 'path';
import router from './route/route';
import session from 'express-session';
import mongoose from 'mongoose';
// import connectToDatabase from './model/student';
mongoose.connect("mongodb://127.0.0.1:27017/student")

// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc,FirestoreError } from "firebase/firestore";


// const firebaseConfig = {
//     apiKey: "AIzaSyAtCDeYMJRbpXhrr1Ym-H-AH1lx_CVp354",
//     authDomain: "student-management-576ad.firebaseapp.com",
//     projectId: "student-management-576ad",
//     storageBucket: "student-management-576ad.appspot.com",
//     messagingSenderId: "238198718893",
//     appId: "1:238198718893:web:57eb699e7f1aaeeca76124",
//     measurementId: "G-TZPVHGHWT9"
//   };

// const fireapp = initializeApp(firebaseConfig);
// const db = getFirestore(fireapp);

const app:Application=express();

app.set('view engine','ejs');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/static',express.static(path.join(__dirname,'../Public/assets')))
app.use(session({ secret: 'secretKey', resave: true, saveUninitialized: true }));


app.use('/',router)

app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
    console.error(err.stack);
    res.status(500).send('something went wrong')
})

app.listen(3000,()=>{
    console.log(`http://localhost:3000`);
    
})
// export{db};
// export default connectToDatabase;
