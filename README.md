# FitMe

## Summary
### 🧎‍♀️Personalized recommendation platform
In this project, for users who want to improve their overall health, a recommendation system that receives the user's personality factor as an input value and recommends an exercise course that combines various exercise postures, and posenet-based motion recognition that prevents the risk of injury due to incorrect posture We want to implement a service that provides.

### 💡Recommendation system
* **K-means clustering algorithm**
* **CF algorithm**  
* **MySQL**

### 💡Pose analysis
* **PoseNet**
* **Arctangent2**  
```
kneeFlexion=360-arctangent2(knee.x,knee.y,ankle.x,ankle.y)+arctangent2(knee.x,knee.y,hip.x,hip.y);
trunkLean =  -arctangent2(hip.x,hip.y,shoulder.x,shoulder.y)
```

## Process
![image](https://user-images.githubusercontent.com/66551410/122395548-121dc000-cfb2-11eb-9d27-d1061a6db072.png)

## Demo
![KakaoTalk_20210602_223437356](https://user-images.githubusercontent.com/66551410/122398109-85c0cc80-cfb4-11eb-838c-437f7cceb9f8.gif)

## FitMe Team members
* 🔨전지현: Create a workout list
* 🔨이치영: Recommendation Algorithm
* 🔨호선우: Recommendation Algorithm, Frontend, Backend
* 🔨서보금: PoseNet
* 🔨최인영: PoseNet

## Function
* **Big 5 personality test**
* **Auto Timer**
* **Auto Count**

## Work
- [x] flask 환경설정
- [ ] 로그인 API 구현
- [ ] 사용자 DB 생성

## Flask 실행
1. Visual Code Studio에서 가상환경 폴더 설정  
2. ```flask run```


## Reference
* Personality correlates of physical activity  
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2577457/
* PoseNet  
https://github.com/tensorflow/tfjs-models/tree/master/posenet
