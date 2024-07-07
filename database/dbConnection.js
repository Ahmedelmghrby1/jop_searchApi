import { connect } from "mongoose";


export const dbConn=connect('mongodb://localhost:27017/job_search')
.then(()=>{
        console.log('database connected successfully');
    })