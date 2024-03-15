const express=require('express')
const router=require('./router/router')
const app=express()
app.use(express.json({limit:'50mb'}))


app.set('host','localhost')
app.set('port',2000)

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.append('Access-Control-Allow-Headers', '*');
    next();
});

app.use('/uploads',express.static(__dirname + '/uploads/images')); 

app.use('/app/mobile_shop',router) 

app.listen(2000,()=>{
    console.log('server stated att %s : %d in %s mode', 'localhost',2000,'development')
})