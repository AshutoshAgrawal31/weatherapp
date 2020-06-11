const request=require('request')

function geocode(address,call){
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYXNodTExIiwiYSI6ImNrYjEwNHFkNjA5NGoycm1uMndlNjZ1cjUifQ.8qm9PSvADfijZjFmj7UA8g&limit=1'
    request({url,json:true},(error,{ body,message }={})=>{
        if(error){
            call('unable to connect',undefined)
            // console.log('unable to connect');
        }else if(message)
        {
            call('wrong location',undefined)
            // console.log('wrong location');
            
        }else if(body.features.length!==0){
            const p=body.features[0].center[0]
            const q=body.features[0].center[1]
            call(undefined,[p,q])
        }
        else{
            call('errors',undefined)
        }
    })
}

module.exports={
    geocode:geocode,
}