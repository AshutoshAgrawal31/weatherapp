const request=require('request')

function forecast(a,b,call){
    const url='http://api.weatherstack.com/current?access_key=5e16f95183ff67e05e6f75cb5c32599d&query='+a+','+b+'&units=m'
    request({url,json:true},(error,{ body={}})=>{
        if(error)
        {
            call('unable to connect',undefined)
            // console.log();
            
        }else if(body.error){
            call('wrong location',undefined)
            
        }else{
            call(undefined,{
                weather_descriptions:body.current.weather_descriptions[0],
                temperature:body.current.temperature,
            })
        }
    })
}
module.exports={
    forecast:forecast,
}