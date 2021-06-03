let video;
let poseNet;
let pose;
let skeleton;

var timerValue=0;
var exercise_name=['허리 스트레칭']
let start=false;
let leftWrist_x;
let leftWrist_y;
var ding = new Audio('ding.mp3');


document.getElementById("exercise_name").innerHTML=exercise_name;
document.getElementById("image").innerHTML="<img src='./data/arm/arm0.png'>";


var i=0
var exercise = ['','허리를 90도로 굽히면서 양팔을 앞으로 쭉 뻗어주며 10초 동안 유지하세요.']
var method=exercise[0]

function timeDown() {
    timerValue--;
    if (timerValue==0 || (start==true && timerValue<0)) {
      if (timerValue<0){timerValue=5;}
      else{setTimeout(function(){timerValue=5},2000)} //5초로 세팅
    start=false;
    i+=1;
    clear()
    method=exercise[i];
    document.getElementById("method").innerHTML=method;
    document.getElementById("image").innerHTML="<img src='./data/arm/waist.png'>";
    ding.play();
  }
    if(i>1){start = true;}

  if(i==2){
    location.href='introduction2.html'};
  }

  function setup() {
    createCanvas(640, 480);

    video = createCapture(VIDEO);
    video.hide();
    setInterval(timeDown,1000);

  let options = {
    architecture:'MobileNetV1',
    detectionType: 'single'
  };

  poseNet = ml5.poseNet(video,options, modelLoaded);
  poseNet.on('pose', gotPoses);

}


function modelLoaded() {
  console.log('poseNet ready');
}
function gotPoses(poses) {
  if (poses.length > 0) {
  if (poses[0].pose.score >0.4){

    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
    // console.log(pose)
    leftWrist_x = pose.leftWrist.x;
    leftWrist_y = pose.leftWrist.y;
    start = true;
  }

  // if (540<leftWrist_x & leftWrist_x<640 & 0<leftWrist_y & leftWrist_y<124 ){
  //   start=true;
  //   document.getElementById("start").innerHTML = "<img src='./data/transparent.png'>";
  //
  // }
}}


function draw() {
  // console.log(timerValue)


  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);
  // image(start_img,540,0);



  if (pose) {
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0, 255, 0);
      ellipse(x, y, 8, 8);}
    }


    if (timerValue >0 ) {
      mention='Start'
      document.getElementById("mention").innerHTML='Timer: '+ timerValue+'초';
      // text('Start\n'+timerValue+'초', 320+20, 80+20);
    }

    else  {
      mention='Ready'
      document.getElementById("mention").innerHTML='Ready';

      // text('Ready', 320+20, 80+20)

    }


}

