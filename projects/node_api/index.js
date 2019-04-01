var express = require("express");
//for upload
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
//for path
var path = require('path');

var cors = require('cors');

const fs = require('fs');

var app = express();

app.use(cors());

//for incoming json data
app.use( bodyParser.json() );

// /to support URL-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static(__dirname + '/uploadsData/'));

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/api/users", (req, res, next) => {
    
    let rawdata = fs.readFile('./generated.json', (err, data) => {
        if(err) throw err;
        
        res.json(JSON.parse(data));
    });    
});

app.get("/api/user/:user_id", (req, res, next) => {
    var user_id = req.params.user_id;
    var resdata = {};
    let rawdata = fs.readFile('./generated.json', (err, data) => {
        if(err) throw err;
        var parsedata = JSON.parse(data);        
        parsedata.forEach(function(value){            
            if(value._id == user_id){                
                resdata = value;
            }
        });

        res.json(resdata);
    });
});

app.post("/api/user/upload", (req, res, next) => {
    var id = req.body._id;
    var return_file_name = 'http://localhost:3000/';
    var base64_image = req.body.image_file;
    var matches = base64_image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches.length !== 3) {
        return res.json({
            error: 'Cannot upload the image. Sorry.'
          });
    }
    var uploadPath  = __dirname + '/uploadsData/';
    //console.log(uploadPath);

    if( !fs.existsSync(uploadPath) ) {

        fs.mkdirSync(uploadPath, 0755);
    }

    // Decoding the base64 image
    var data = new Buffer(matches[2], 'base64');
    var filename = 'image' + '-' + 'upload' + '-' + new Date().getTime().toString() + '.' + 'png';
    return_file_name = return_file_name + filename;

    fs.writeFile(uploadPath + filename, data, function (err) {
        if ( err ) {
            console.log(err);
            return res.status(500).json({
              error: 'Cannot upload the image. Sorry.'
            });
        }
    });

    var arr = [];
    fs.readFile('./generated.json', (err, data) => {
        if(err) throw err;
        var parsedata = JSON.parse(data);
        
        parsedata.forEach(function(value){
            if(value._id == id){
                value.picture = return_file_name;
            }

            arr.push(value);
        });
        
        fs.writeFile('./generated.json', JSON.stringify(arr), (err) => {
            if(err) throw err;
        });
    });

    res.json({
       _id : id,
       imgURL: return_file_name
    });
});

app.post("/api/user/save", (req, res, next) => {
    
    var bodydata = req.body.data;
    console.log(bodydata);
    //return false;
    var id = bodydata.id;
    var arr = [];
    fs.readFile('./generated.json', (err, data) => {
        if(err) throw err;

        var parsedata = JSON.parse(data);
        parsedata.forEach(function(value){
            if(value._id == id){
                value.name = bodydata.name;
                value.age = bodydata.age;
                value.email = bodydata.email;
                value.gender = bodydata.gender;
                value.company = bodydata.company;
                value.phone = bodydata.phone;
                value.address = bodydata.address;
                value.isActive = bodydata.isActive;
                value.balance = bodydata.balance;
            }

            arr.push(value);
        });
        //console.log(arr);
        //return false;

        fs.writeFile('./generated.json', JSON.stringify(arr), (err) => {
            if(err) throw err;
        });

        res.json({'status' : 'success'});
    });

});

app.post("/api/user/add", (req, res, next) => {
    var return_file_name = 'http://localhost:3000/';
    var bodydata = req.body.data;
    if(bodydata.hasOwnProperty('picture')){
        if(bodydata.picture != ""){
            
            var base64_image = bodydata.picture;
            var matches = base64_image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

            if (matches.length !== 3) {
                return res.json({
                    error: 'Cannot upload the image. Sorry.'
                });
            }
            var uploadPath  = __dirname + '/uploadsData/';
            //console.log(uploadPath);
        
            if( !fs.existsSync(uploadPath) ) {
        
                fs.mkdirSync(uploadPath, 0755);
            }

            // Decoding the base64 image
            var data = new Buffer(matches[2], 'base64');
            var filename = 'image' + '-' + 'upload' + '-' + new Date().getTime().toString() + '.' + 'png';
            return_file_name = return_file_name + filename;
            fs.writeFile(uploadPath + filename, data, function (err) {
                if ( err ) {
                    console.log(err);
                    return res.status(500).json({
                    error: 'Cannot upload the image. Sorry.'
                    });
                }
            });

            bodydata.picture = return_file_name;
        }
    }
    else{
        bodydata.picture = '';
    }
    //console.log(bodydata);
    var arr = [];
    fs.readFile('./generated.json', (err, data) => {
        if(err) throw err;
        var parsedata = JSON.parse(data);
        parsedata.forEach(function(value){

            arr.push(value);
        });
        arr.push(bodydata);

        fs.writeFile('./generated.json', JSON.stringify(arr), (err) => {
            if(err) throw err;
        });

        res.json({'status' : 'success'});
    });
});

app.get("/api/user/delete/:user_id", (req, res, next) => {
    
    var user_id = req.params.user_id;
   // console.log(user_id);
    //return false;
    if(user_id){
        var arr = [];
        fs.readFile('./generated.json', (err, data) => {
            if(err) throw err;

            var parsedata = JSON.parse(data);
            parsedata.forEach(function(value){
                if(value._id != user_id){
                    arr.push(value);
                }
            });
            //console.log(arr);
            //return false;

            fs.writeFile('./generated.json', JSON.stringify(arr), (err) => {
                if(err) throw err;
            });

            fs.readFile('./generated.json', (err, data) => {
                if(err) throw err;
                datas = JSON.parse(data);
                res.json({'status' : 'success', 'data' : datas});
            });  
        });
    }
    else{

        res.json({'status' : 'error', 'msg' : 'no params provided'});
    }

});