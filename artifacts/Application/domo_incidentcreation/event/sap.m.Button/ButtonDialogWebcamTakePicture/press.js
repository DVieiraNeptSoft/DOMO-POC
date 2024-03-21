// alert()
var video = document.getElementById('videoElementWeb');
var scale = 2;
var canvas = document.createElement("canvas");
canvas.width = video.videoWidth * scale;
canvas.height = video.videoHeight * scale;
canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
// canvas.getContext('2d').drawImage(video, 0, 0, 640, 480);

var test = canvas.toDataURL().split('data:image/png;base64,')

// imgCamSrc.setSrc(canvas.toDataURL());

console.log(canvas.toDataURL());

onPhotoDataSuccess(canvas.toDataURL());

// DialogWebcam.close();