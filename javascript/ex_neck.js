let video;
let poseNet;
let pose;
let skeleton;
var timerValue=0;
var exercise_name=['목 스트레칭']
let start=false;
let leftWrist_x;
let leftWrist_y;


document.getElementById("exercise_name").innerHTML=exercise_name;
document.getElementById("image").innerHTML="<img src='./data/neck/stretching0.png'>";
document.getElementById("start").innerHTML="<img src='./data/tap.png'>";


var ding = new Audio('ding.mp3');


var i=0
var exercise = ['','왼쪽으로 지긋이 눌러줍니다.','오른쪽으로 지긋이 눌러줍니다.','아래로 지긋이 눌러줍니다.','위로 지긋이 눌러줍니다','']
var method=exercise[0]

function timeDown() {
  timerValue--;
  if (timerValue==0 || (start==true && timerValue<0)) {
    if (timerValue<0){timerValue=5;}
    else{timerValue=5}
  start=false;
  i+=1;
  clear()


  method=exercise[i];
  document.getElementById("method").innerHTML=method;
  document.getElementById("image").innerHTML="<img src='./data/neck/stretching"+i+".png'>";
  ding.play();


}
  if(i==5){
    clear()
    location.href='ex_arm.html'
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
    }
    if (540 < leftWrist_x & leftWrist_x < 640 & 0 < leftWrist_y & leftWrist_y < 124) {
      start = true;
      document.getElementById("start").innerHTML = "<img src='./data/transparent.png'>";
    }
  }
}
function draw() {
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);
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
    }
    else  {
      mention='Ready'
      document.getElementById("mention").innerHTML='Ready';
    }

}


