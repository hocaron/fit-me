let video;
let poseNet;
let pose;
let skeleton;

let brain;
let count=0;
let count_set=new Set()
let caution1='';
let caution2='';
var exercise_name=['와이드 스쿼트자세에서 옆구리 운동']
let timerValue=5;
let poseLabel='';

document.getElementById("exercise_name").innerHTML=exercise_name;
document.getElementById("image").innerHTML="<img src='./data/side/side0.gif'>";



function setup() {
  document.getElementById("method").innerHTML='운동 하는 방법';


  var timer = setInterval(function(){
    if (timerValue==0){
      loop();
        document.getElementById("method").innerHTML='어깨넓이 두배 이상으로 발을 벌리고 무릎을 굽힌 후, 골반은 고정한채로 상체를 좌우로 움직이세요';

      document.getElementById("image").innerHTML="<img src='./data/side/side1.jpg'>";
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

 


let kneeFlexion
let trunkLean
let side
var ding = new Audio('ding.mp3');


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
      

kneeFlexion=arctangent2(knee.x,knee.y,ankle.x,ankle.y)-arctangent2(knee.x,knee.y,hip.x,hip.y);
side=180+arctangent2(hip.x,hip.y,shoulder.x,shoulder.y)


if (kneeFlexion<160 & kneeFlexion>90){

  if (side<70&side>50){
    poseLabel='right'; count_set.add(poseLabel);
  } 
  else if (side >110&side<130){
    poseLabel='left'; count_set.add(poseLabel);
  }
  else if (side >70&side<110){
    poseLabel='ready'; count_set.add(poseLabel);
  }
  else{poseLabel=''}}

if (kneeFlexion<170&kneeFlexion>160){caution1='무릎을 더 굽히세요!!!!!!'}
else{caution1=''}
if(Math.abs(pose.rightShoulder.x-pose.leftShoulder.x)*1.3>Math.abs(pose.rightKnee.x-pose.leftKnee.x)){
  caution2='다리를 더 넓게 벌리세요!!!!!!'
}
else{caution2=''}


if (count_set.has('ready')&(count_set.has('right') ||count_set.has('left'))){
  count+=1;
  count_set.clear();}

if(parseInt(count/2)==5){
  ding.play()
  poseLabel = "Clear";
  location.href="./ex_lunge.html"
  }


}}}



function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    for (let i = 5; i < pose.keypoints.length; i++) {
      let keypoint=pose.keypoints[i];
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0, 255, 0);
      ellipse(x, y, 8, 8);}
      pop()
      textSize(80);
      textAlign(CENTER, BOTTOM);
      // text('어깨넓이 :'+parseInt(Math.abs(pose.rightShoulder.x-pose.leftShoulder.x))+ '\n다리 넓이 :' +parseInt(Math.abs(pose.rightKnee.x-pose.leftKnee.x)),width/2, 480);

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
  // text('옆구리 각도 :'+parseInt(side)+ '\n무릎 각도 :' +parseInt(kneeFlexion),width/2, 480);


}