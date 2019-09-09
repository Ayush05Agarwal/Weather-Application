const express=require('express')
const path=require('path')
const app=express()
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const request=require('request')
const forecast=require('./utils/forecast')
// console.log(__dirname)
// console.log(__filename)
app.set('view engine','hbs')

const staticpath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

app.set("views",viewspath)
app.use(express.static(staticpath))
hbs.registerPartials(partialspath)

app.get('',(req,res)=>{
    res.render('index',{
        name:"ayush",
        title:"home"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:"ayush",
        title:"about"
    })

})
app.get('/help',(req,res)=>{
    res.render('help',{
        name:"ayush",
        title:"help"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you must prvide an address"
        })
    }
    geocode(req.query.address,(error,{long,lat,location}={})=>{
        if(error){
        return res.send({
            error
        })
        }
        else{
        
        forecast(long,lat,(error2,{temp,summary}={})=>{
            // console.log(data2)
            if(error2){
                return res.send({
                    error:error2
                })
            }
            // else if(data2.body.error2){
            //     console.log("unable to find location")
            // }
            else{
                return res.send({
                    temp,
                    summary,
                    location
                })
            }
        })
    }
    })
    
})
app.get('*',(req,res)=>{
    res.send("404 page not found")
})
app.listen(3000,()=>{
    console.log("listening to port 3000")
})