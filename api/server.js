const express = require("express")
const path =require("path")
const app = express()


app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname, '../client/build' , '../client/build/index.html'));
})

app.listen(3000, () => {
    console.log('server is running');
    console.log('tarayıcıdan http://localhost:3000/ adresine gidin');
})