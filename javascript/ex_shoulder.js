let video;
let poseNet;
let pose;
let skeleton;

let brain;
let count=0;
let up;
let down;
var timerValue=0;
var exercise_name=['삼두 스트레칭']
let start=false;
let leftWrist_x;
let leftWrist_y;
var ding = new Audio('ding.mp3');


document.getElementById("exercise_name").innerHTML=exercise_name;
document.getElementById("image").innerHTML="<img src='./data/arm/arm0.png'>";


var i=0
var exercise = ['','왼팔을 펴고, 팔꿈치를 구부려 오른팔을 사용하여 아래로 조심스럽게 미세요.','오른팔을 펴고, 왼팔을 아래로 미세요.','']
var method=exercise[0]

function timeDown() {
    timerValue--;
    if (timerValue==0 || (start==true && timerValue<0)) {
    start=false;
    i+=1;
    clear()
    method=exercise[i];
    document.getElementById("method").innerHTML=method;
    document.getElementById("image").innerHTML="<img src='./data/arm/shoulder"+i+".gif'>";
    ding.play();
    timerValue=5;

  }
  if(i==3){
    location.href='ex_chest.html'};
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

  }
    start = true;

}}


function draw() {


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

