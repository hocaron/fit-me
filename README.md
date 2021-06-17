# FitMe

## Summary
### 🧎‍♀️개인화 추천 플랫폼
In this project, for users who want to improve their overall health, a recommendation system that receives the user's personality factor as an input value and recommends an exercise course that combines various exercise postures, and posenet-based motion recognition that prevents the risk of injury due to incorrect posture We want to implement a service that provides.

### 💡Recommendation system
* **K-means clustering 알고리즘**
* **CF 알고리즘**  

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

## Function
* **Big 5 model 심리테스트**
* **자동 Timer**
* **자동 Count**

## Flask 실행
1. Visual Code Studio에서 가상환경 폴더 설정  
2. ```flask run```

## Reference
* Personality correlates of physical activity  
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2577457/
* PoseNet  
https://github.com/tensorflow/tfjs-models/tree/master/posenet
