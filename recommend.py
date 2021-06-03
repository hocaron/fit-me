import pymysql
import numpy as np
import csv
import pandas as pd
import os

conn=pymysql.connect(host='localhost',user='root', password='1234', db='fitmedb',charset='utf8')
curs=conn.cursor()

def db_to_df():
    conn=pymysql.connect(host='localhost',user='root', password='1234', db='fitmedb',charset='utf8')
   

    sql = '''
        select * from user
    ''' 

    cursor = conn.cursor()
    cursor.execute(sql)
    row = cursor.fetchall()
    result=pd.DataFrame(row)

    
    conn.close

    return result
result = db_to_df()

def course_recommend(target, time, group):    
    from sqlalchemy import create_engine
    engine=create_engine("mysql+pymysql://{user}:{pw}@localhost/{db}"
                       .format(user='root', pw='3042', db='fitmedb',charset='utf8'))
    sql="select 추천코스 from gcourse where 타겟부위=%s and 운동시간=%s and 그룹=%s"
    val=(target,time,group)
    cursor = conn.cursor()
    cursor.execute(sql,val)
    row = cursor.fetchall()
    course=pd.DataFrame(row)
    conn.close
    return course

def cosine_similarity(data_name):    
    from sklearn.metrics.pairwise import cosine_distances
    similarity = 1 - cosine_distances(data_name)    # sklearn은 정의와 반대이므로 1에서 빼준다.
    return similarity

def find_near_neighbor(user_num):      
    MAX = 0
    neighbor = 0
    for i in range(len(cos_sim)):
        if(i == user_num):
            continue
        if(MAX < cos_sim[user_num][i]):
            MAX = cos_sim[user_num][i]
            neighbor = i
    return neighbor

def recommend_group(extro, cons, neuro):
    user_data = db_to_df()
    temp_data = user_data.iloc[:, [1,2,3]]
    temp_data.loc[246] = [extro, neuro, cons]
    cos_sim = cosine_similarity(temp_data)
    similar_user = find_near_neighbor(246)
    group = user_data[4][similar_user]
    return group

def recommend_exercise(target, time, group):
    title = course[0][0]
    return title
