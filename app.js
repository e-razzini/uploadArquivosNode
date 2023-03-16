const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const app  = express();
const path = require('path');
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

// pegar via static app.use("/",express.static("public"));

const storage = multer.diskStorage({

    destination: (req,file,call) =>{
        const direName = "uploadfiles/" ;
        try {
            if(!fs.existsSync(direName)){
                
                fs.mkdirSync(direName,(err) =>{
                    if(err) throw err;
                })
            }
            call(null,"uploadfiles/");

        } catch (error) {
                      
        }
    },
    filename:(req,file,call) =>{
        call(null,file.fieldname+"-"+Date.now()+ path.extname(file.originalname));
    }
})

const upload = multer({storage});

app.post("/upload",upload.single('arquivo'),(req,res,next) => {
  const file = req.file
  if(!file){
    const err = new Error("selection one Upload")
    err.httpStatusCode = 404;
    return next(err);
  }
  res.end("upload success")
})

app.listen(3000,'127.0.0.1',()=>{
    console.log('server on');
})