console.log("client side javascript is on")

fetch('http://localhost:3000/weather?address=bangalore').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }
        else{
            console.log(data.location)
            console.log(data.summary)
        }
    })
})

const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#message1')
const msg2=document.querySelector('#message2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log("testing")
    msg1.textContent='Loading...'
    msg2.textContent=''
    console.log(search.value)
    fetch('http://localhost:3000/weather?address='+search.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent=data.error
                console.log(data.error)
            }
            else{
                msg1.textContent=data.location
                msg2.textContent=data.summary
                console.log(data.location)
                console.log(data.summary)
            }
        })
    })    
})