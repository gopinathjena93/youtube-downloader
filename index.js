const { response } = require('express');
const express =  require('express');
const app = express();
const ytdl = require("ytdl-core");
const fetch = require('node-fetch');

app.use(express.json());
app.use(express.static("public"));

app.get("/videoInfo",async function (req,res) {
    const videoURL = req.query.videoURL;
    const Info = await ytdl.getInfo(videoURL).catch(error => {
        err = {'status':'error','message':'No Video Found'}
        res.status(200).json(err);
    }); 
    res.status(200).json(Info);
})

app.get("/download",function (req,res) {
    const videoURL = req.query.videoURL;
	const itag = req.query.itag;
	res.header("Content-Disposition",'attachment;\ filename="video.mp4"');
	ytdl(videoURL,{
		filter: format => format.itag == itag
	}).pipe(res);
})


app.get("/",function(req,res) {
    res.sendFile(__dirname + "public/index.html");
    console.log("Hello World")
})

app.listen(5000);