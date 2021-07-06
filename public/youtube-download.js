const host = "https://gopi-youtube-downloader.herokuapp.com/";
//const host = "http://localhost:5000/";

async function fetchData() {
    
    const videoURL = document.getElementById("videoURL").value

    if(videoURL.length <= 0 ) {
      alert('Please Enter Youtube Video Url'); return false;
    }
    $("#search_div img").fadeIn();
    $("#search_div input[type='button']").prop("disabled",true);
    //console.log(`${host}videoInfo?videoURL=${videoURL}`)
    const result = await fetch(`${host}videoInfo?videoURL=${videoURL}`);        
    //const result = await fetch("https://api.postalpincode.in/pincode/751002");
    const res = await result.json(); 
    if(res.status=="error") {      
      $("#search_div img").fadeOut();
      $("#search_div input[type='button']").prop("disabled",false);
      alert(res.message); return false;
    }

    console.log(res.status); 
    //console.log(res.formats);

   
    let option_html = "";
    res.formats.map((format) => {
        if(format.container == "mp4" && format.hasAudio && format.qualityLabel!=null) {
            option_html +=`<option value = "${format.itag}">${format.container} - ${format.qualityLabel}</option>`  
        }
        document.getElementById("format").innerHTML = option_html;       
       // console.log(format.mimeType)
    })
   console.log(res.videoDetails.thumbnails.length);
   const thumbnails = res.videoDetails.thumbnails[res.videoDetails.thumbnails.length-1];
   $("#thumbnails a img").attr("src",thumbnails.url);
   $("#card-body div.title").html(res.videoDetails.title);
   const lengthSeconds = res.videoDetails.lengthSeconds;
   const lengthHours = Math.floor(lengthSeconds/60/60); 
   const lengthMinutes = Math.floor((lengthSeconds % 3600) / 60);
   const lengthSecond = lengthSeconds % 60 ; 

   const videoLength = `<b>${lengthHours}h:${lengthMinutes}m:${lengthSecond}s</b>`;
   $("#card-body ul li").html(`Video Length ${videoLength}`)
   $("#search_div img").fadeOut();
    $("#search_div input[type='button']").prop("disabled",false);
   $("#video_details").fadeIn();
   console.log(videoLength);
}

function DownloadNow() {
    let videoURL = document.getElementById("videoURL").value;
 let itag = document.getElementById("format").value;
 window.open(host + "download?videoURL="+videoURL+"&itag="+itag);
}
