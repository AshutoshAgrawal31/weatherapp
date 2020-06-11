const path=require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./../../weather-app/utils/geocode')
const forecast=require('./../../weather-app/utils/forecast')
const request=require('request')

const app=express()

//path for views folder
const viewspath=path.join(__dirname,'../templates/views')
const partpath=path.join(__dirname,'../templates/partials')



//handler engine and views folder
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partpath)

//path for static files
app.use(express.static(path.join(__dirname,'../public')))


app.get('',(req,res)=>{
    res.render('index.hbs')
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.get('/help',(req,res)=>{
    res.render('help')
})

// app.get('/help',(req,res)=>{
//     res.send({
//         name:'ashu',
//         age:'22'
//     })
// })


// app.get('/about',(req,res)=>{
//     res.send('<h1> About </h1>')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Address is required'
        })
    }
    geocode.geocode(req.query.address,(error,data)=>{
        if(error)
        {
            res.send({
                error:'Error'
            })
            // console.log(error)  
        }
        else{
            forecast.forecast(data[1],data[0], (error, data) => {
                if(error)
                {
                    res.send({
                        error:'Error',
                    })
                }
                else{
                    res.send({
                        Data:data,
                    })
                }
            })
        }
    })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
       return  res.send({
            error:'Must provide a search'
        })
    }
    res.send({
        products:[]
    })
})

app.get('*',(req,res)=>
{
    res.send('404 error')
})
app.listen(3000,()=>{
    console.log('server is up')
})
