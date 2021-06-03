let video;
let poseNet;
let pose;
let skeleton;
var timerValue=0;
var exercise_name=['사이드 점핑']
let start=false;
let leftWrist_x;
let leftWrist_y;

var ding = new Audio('ding.mp3');

document.getElementById("exercise_name").innerHTML=exercise_name;
document.getElementById("image").innerHTML="<img src='./data/guide.png'>";

var i=0
var exercise = ['','60초 동안 옆으로 뛰세요','5초간 쉬기','']
var method=exercise[0]

function timeDown() {
  timerValue--;
  if (timerValue==0 || (start==true && timerValue<0)) {
    start=false;
    i+=1;
    clear()
    method=exercise[i];
    document.getElementById("method").innerHTML=method;
    document.getElementById("image").innerHTML="<img src='./data/cardio/side.gif'>";
    ding.play();
    timerValue = 5;
  }

  if(i==2){
    document.getElementById("image").innerHTML="<img src='./data/cardio/break.gif'>";
  }
  if (i ==3){
    clear();
    location.href='introduction3.html'
  }
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
    if (poses[0].pose.score > 0.4) {

      pose = poses[0].pose;
      skeleton = poses[0].skeleton;
      // console.log(pose)

      leftWrist_x = pose.leftWrist.x;
      leftWrist_y = pose.leftWrist.y;
      // console.log(leftWrist_x);
    start=true;
    }

  }
}
function draw() {
  // console.log(timerValue)
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    for (let i = 0; i < pose.keypoints.length; i++) {
      let keypoint=pose.keypoints[i];
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

