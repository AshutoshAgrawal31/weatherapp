console.log('loaded')


fetch('http://puzzle.mead.io/puzzle').then((res)=>
{
    res.json().then((data)=>{
        console.log(data)
    })
})

const wform=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')
wform.addEventListener('submit',(e)=>
{
    e.preventDefault()
    const location=search.value
    const url='http://localhost:3000/weather?address='+location
    msg1.textContent='Loading......'
    msg2.textContent=''
    fetch(url).then((res)=>
    {
        res.json().then((data)=>{
            if(data.error){
                msg1.textContent=data.error
            }else{
                msg1.textContent=data.Data.temperature+'C'
                msg2.textContent=data.Data.weather_descriptions
            }
            // console.log(data);

        })
    })
    console.log(location)
})
