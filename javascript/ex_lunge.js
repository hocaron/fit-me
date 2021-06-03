let video;
let poseNet;
let pose;
let skeleton;

let brain;
let count=0;
let count_set=new Set()
let caution1='';
let caution2='';
var exercise_name=['사이드런지']
let timerValue=5;
let poseLabel='';
var ding = new Audio('ding.mp3');


document.getElementById("exercise_name").innerHTML=exercise_name;
document.getElementById("image").innerHTML="<img src='./data/lunge/lunge.gif'>";



function setup() {
  document.getElementById("method").innerHTML='사이드런지 하는 방법';


  var timer = setInterval(function(){
    if (timerValue==0){
      loop();
        document.getElementById("method").innerHTML='어깨넓이 두배 이상으로 발을 벌리고, 골반을 고정한채로 한 쪽 무릎을 굽히세요';

      document.getElementById("image").innerHTML="<img src='./data/lunge/lunge1.jpg'>";
      clearInterval(timer)
    }   timerValue--;
  },1000);


  createCanvas(640, 480);
  noLoop();
  video = createCapture(VIDEO);
  video.hide();
  // img1=loadImage('./squat_model/guideline2.png');
  

  let options = {
    architecture:'MobileNetV1',
    detectionType: 'single',
    // minConfidence:0.8
    // imageScaleFactor:0.5,
    // outputStride:16,
    // scoreThreshold:0.5,
    // multiplier:0.75,
    // inputResolution:193,
    // quantBytes:1

  }

  poseNet = ml5.poseNet(video,options, modelLoaded);


  poseNet.on('pose', gotPoses);}

 


let r_kneeFlexion
let l_kneeFlexion

let trunkLean
let side


function arctangent2(x1,y1,x2,y2){
  return (Math.atan2(y2-y1,x2-x1) * (180 / Math.PI));
}

function gotPoses(poses) {
  if (poses.length > 0) {
  if (poses[0].pose.score >0.5){

    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
    
        knee = pose.rightKnee;
        hip = pose.rightHip;
        ankle = pose.rightAnkle;
        shoulder = pose.rightShoulder;

        l_knee = pose.leftKnee;
        l_hip = pose.leftHip;
        l_ankle = pose.leftAnkle;
      

r_kneeFlexion=arctangent2(knee.x,knee.y,ankle.x,ankle.y)-arctangent2(knee.x,knee.y,hip.x,hip.y);
l_kneeFlexion=360-arctangent2(l_knee.x,l_knee.y,l_ankle.x,l_ankle.y)+arctangent2(l_knee.x,l_knee.y,l_hip.x,l_hip.y);

side=180+arctangent2(hip.x,hip.y,shoulder.x,shoulder.y)


  if (r_kneeFlexion<130&r_kneeFlexion>110){
    poseLabel='right'; count_set.add(poseLabel);
  } 
  else if (l_kneeFlexion <130&l_kneeFlexion>110){
    poseLabel='left'; count_set.add(poseLabel);
  }
  else if (r_kneeFlexion>160||l_kneeFlexion>160){
    poseLabel='ready'; count_set.add(poseLabel);
  }
  else{poseLabel=''}

if (side<70&side<110){caution1='몸통 수직으로 놓으세요!!!!!!'}
else{caution1=''}

if(Math.abs(pose.rightShoulder.x-pose.leftShoulder.x)>Math.abs(pose.rightKnee.x-pose.leftKnee.x)){
  caution2='다리를 더 넓게 벌리세요!!!!!!'
}
else{caution2=''}


if (count_set.has('ready')&(count_set.has('right') ||count_set.has('left'))){
  count+=1;
  count_set.clear();}

if(parseInt(count/2)==5){
  ding.play()
  poseLabel = "Clear";
  location.href="./introduction5.html"
  }


}}}



function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  // console.log(count_set)
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    // for (let i = 0; i < skeleton.length; i++) {
    //   let a = skeleton[i][0];
    //   let b = skeleton[i][1];
    //   strokeWeight(2);
    //   stroke(255,255,255);
      // line(a.position.x, a.position.y, b.position.x, b.position.y);
    // }
    for (let i = 5; i < pose.keypoints.length; i++) {
      let keypoint=pose.keypoints[i];
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0, 255, 0);
      ellipse(x, y, 8, 8);}

      // r_x=pose.keypoints[14].position.x;
      // r_y=pose.keypoints[14].position.y;
      // fill(255, 0, 0);
      // ellipse(r_x, r_y, 16, 16);
    
    }




  
  pop();
  fill(255, 0, 0);
  noStroke();
  // textSize(32);
  textAlign(CENTER, CENTER);
  document.getElementById("count").innerHTML='count\n'+parseInt(count/2);

  // text('count\n'+parseInt(count/2),7*width/8, height/2);
  // text(poseLabel, width / 2, height / 8);

  textSize(64);
  text(caution1,width / 2, height / 2)
  text(caution2,width / 2, height / 4)



  textSize(80);
  textAlign(CENTER, BOTTOM);
  // text('오른 무릎 각도:'+parseInt(r_kneeFlexion)+ '\n왼 무릎 각도 :' +parseInt(l_kneeFlexion),width/2, 480);


}