const host = "https://gopi-youtube-downloader.herokuapp.com/";
async function fetchData() {
    
    const videoURL = document.getElementById("videoURL").value

    if(videoURL.length <= 0 ) {     
      custom_alert('Please Enter Youtube Video Url','error');  return false;
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
      custom_alert(res.message,res.status);  return false;
    }

    console.log(res.status); 
    //console.log(res.formats);
	
	function bytesToSize(bytes) {
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes == 0) return '0 Byte';
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
	}

   
    let option_html = "";
    res.formats.map((format) => {
        if (format.container == "mp4" && format.hasAudio && format.qualityLabel != null) {
			//console.log(format)
			const videoSize = bytesToSize(format.contentLength);
			option_html += `<option value = "${format.itag}">${format.container} - ${format.qualityLabel} - ${videoSize}</option>`
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
 const videoTitle = $("#card-body div.title").html();
const videoTitleSlug = convertToSlug(videoTitle);

 window.open(host + "download?videoURL="+videoURL+"&itag="+itag+"&videoTitle="+videoTitleSlug);
}

function custom_alert(message,statusType){
   notif({
      msg: message,
      type: statusType,
      position: "center"
   });
}

function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
}
