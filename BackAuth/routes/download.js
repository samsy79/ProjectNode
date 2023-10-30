const express = require('express');
var router = express.Router();
const { router } = require('../app');

const storage = multer.diskStorage({
    receipt:(req ,file, cb)=>{
        cb(null,'/uploads');
    },
    filename:(req,file,cb)=>{
        const image = path.extname(file.originalname);
        cb(null,Date.now()+image)
    }
})
const upload = multer({storage:storage})

router.post('/upload',upload.single("file"),async (req,res,next)=>{
    try {
        if(req.file){
            const filePath = req.file.path;
            const picture = await DB.collection("pictures").insertOne("path":filePath)
            res.send(picture)
        }else{
            res.status(404)
            return
        }        
    } catch (error) {
        console.error(error);
        
    }
});
module.exports = router;