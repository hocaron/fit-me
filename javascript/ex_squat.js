let video;
let poseNet;
let pose;
let skeleton;

let brain;
let count=0;
let count_set=new Set()
let caution='';
var exercise_name=['스쿼트']
let timerValue=5;
var ding = new Audio('ding.mp3');


document.getElementById("exercise_name").innerHTML=exercise_name;
document.getElementById("image").innerHTML="<img src='./data/squat/squat_intro.gif'>";



function setup() {
  document.getElementById("method").innerHTML='스쿼트 하는 방법';


  var timer = setInterval(function(){
    if (timerValue==0){
      loop();
        document.getElementById("method").innerHTML='어깨넓이로 발을 벌리고 서서, 상체를 곧게 펴고, 자연스럽게 엉덩이를 낮추세요';

      document.getElementById("image").innerHTML="<img src='./data/squat/squat2.jpg'>";
      clearInterval(timer)
    }   timerValue--;
  },1000);


  createCanvas(640, 480);
  noLoop();
  video = createCapture(VIDEO);
  video.hide();
  

  let options = {
    architecture:'MobileNetV1',
    detectionType: 'single',
    // minConfidence:0.8
    // imageScaleFactor:0.5,
    // outputStride:16,
    // scoreThreshold:0.5,
    // multiplier:0.75,
    inputResolution:193,
    // quantBytes:1

  }

  poseNet = ml5.poseNet(video,options, modelLoaded);


  poseNet.on('pose', gotPoses);}

 


let kneeFlexion
let trunkLean


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

kneeFlexion=360-arctangent2(knee.x,knee.y,ankle.x,ankle.y)+arctangent2(knee.x,knee.y,hip.x,hip.y);
trunkLean =  -arctangent2(hip.x,hip.y,shoulder.x,shoulder.y)

if (80<kneeFlexion & kneeFlexion<90){
  poseLabel='squat'; count_set.add(poseLabel);
} 
else if (150<kneeFlexion & kneeFlexion<200){
  poseLabel='ready_squat'; count_set.add(poseLabel);
}
else{poseLabel=''}

if (trunkLean<50){caution='허리를 펴세요!!!!!!'}
else{caution=''}


if (count_set.has('ready_squat')&count_set.has('squat')){
  count+=1;
  count_set.clear();}

if(parseInt(count/2)==5){
  ding.play()
  poseLabel = "Clear";
  location.href="./ex_side.html"
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
  text(caution,width / 2, height / 2)



  textSize(32);
  textAlign(CENTER, BOTTOM);
  // text('허리 각도 :'+parseInt(trunkLean)+ '\n무릎 각도 :' +parseInt(kneeFlexion),width/2, 480);

}