const request=require('request')

const geocode=(place,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+place+".json?access_token=pk.eyJ1IjoiYXl1c3RkaW8iLCJhIjoiY2swMmd6NDQ3Mml4ZjNocGY4dDV3Ym41aSJ9.KgUaZD1f_neXCLPmNtmdeA&limit=1"
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("unable to connect to location services",undefined)
        }
        else if(response.body.features.length===0){
            callback("unable to find location",undefined)
        }
        else{
            const data={
                lat:response.body.features[0].center[0],
                long:response.body.features[0].center[1],
                location:response.body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}
module.exports=geocode