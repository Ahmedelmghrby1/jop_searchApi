import express from 'express'
import { dbConn } from './database/dbConnection.js'
import { globalError } from './src/middleware/globalError.js'
import { AppError } from './src/utils/appError.js'
import userRouter from './src/modules/user/user.routes.js'
import companyRouter from './src/modules/company/company.routes.js'
import jobRouter from './src/modules/job/job.routes.js'
const app = express()
const port = 3000




app.use(express.json())
app.use('/auth',userRouter)
app.use('/company',companyRouter)
app.use('/job',jobRouter)






app.get('/verify/:token',async(req,res,next)=>{
    jwt.verify(req.params.token,"myNameIsAhmed",async(err,payload)=>{
        if(err) return next(new AppError(err,401))
        await User.findOneAndUpdate({email:payload.email},{confirmEmail:true})
        res.json({message:"success",email:payload.email})
    })
   
})


app.use('*',(req,res,next)=>{
    // res.status(404).json({message:`route Not Found ${req.originalUrl}`})
    next(new AppError(`route Not Found ${req.originalUrl}`,404))
})

app.use(globalError)

process.on('unhandledRejection',(err)=>{
    console.log('error',err.message)
})



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))