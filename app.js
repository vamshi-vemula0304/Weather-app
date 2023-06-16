const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
    
    // res.send("<h1>Gotchu</h1>")
});
app.post("/",function(req,res){
    // console.log()
    const city=req.body.cityName;
    const apiKey="e76711908df9dce575e0142da4ff107"
    const unit="metric";
    var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=2"+apiKey+"&units="+unit
    https.get(url,function(response){
        // console.log(response.statusCode)
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const icon=weatherData.weather[0].icon
            // console.log(weatherData)
            var urlOfPic="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.set('Content-Type', 'text/html');
            res.write("<img src="+urlOfPic+">")
            res.write("<h1>Temperature at "+city+": "+weatherData.main.temp+" degree centigrade</h1>")
            res.write("<h2>Forecast: "+weatherData.weather[0].description+".</h2>")
            res.send()
        })
    })
    // console.log("Post Request Recieved")
});

app.listen(8000,function(){
    console.log("server started running")
});