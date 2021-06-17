# FitMe

## Idea
### 🧎‍♀️개인화 추천 플랫폼
해당 프로젝트에서는 전반적인 건강증진을 하고자 하는 사용자들을 대상으로, 사용자의 성격 요인을 입력값으로 받아 다양한 운동 자세를 조합한 운동 코스를 추천해주는 추천시스템과 잘못된 자세에 따른 부상 위험을 방지해주는 Posenet기반 모션 인식을 제공하는 서비스를 구현하고자 한다.

### 💡추천 시스템
* **K-means clustering 알고리즘**
* **CF 알고리즘**  

### 💡자세분석
* **PoseNet**
* **Arctangent2**  
```
kneeFlexion=360-arctangent2(knee.x,knee.y,ankle.x,ankle.y)+arctangent2(knee.x,knee.y,hip.x,hip.y);
trunkLean =  -arctangent2(hip.x,hip.y,shoulder.x,shoulder.y)
```

### 동작 과정
![image](https://user-images.githubusercontent.com/66551410/122395548-121dc000-cfb2-11eb-9d27-d1061a6db072.png)

### Demo
![KakaoTalk_20210602_223437356](https://user-images.githubusercontent.com/66551410/122398109-85c0cc80-cfb4-11eb-838c-437f7cceb9f8.gif)

### 기능
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
