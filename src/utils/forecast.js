const request=require('request')
const weather=(lat,long,callback)=>{
    const url="https://api.darksky.net/forecast/048402b8346354edb9b46ee7c9884c3c/"+lat+","+long+"?units=si"
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("unable to connect to weather services",undefined)
        }
        else if(response.body.error===0){
            callback("unable to find location",undefined)
        }
        else{
            const data={
            summary:response.body.daily.data[0].summary,
            temp:response.body.currently.temperature            
            }
            callback(undefined,data)
        }
    })
}
module.exports=weather