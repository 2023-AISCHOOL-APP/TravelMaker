from flask import Flask, request, jsonify,render_template
import pickle
import numpy as np
import firebase_admin
from firebase_admin import credentials,firestore

import re
from konlpy.tag import Okt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import pandas as pd
import os

# pip install firebase-admin   (설치)
# firebase 연결
cred = credentials.Certificate('flaskfirebase.json')
# 파이어베이스 초기화
firebase_admin.initialize_app(cred)
db = firestore.client()


app = Flask(__name__)


# 형태소 분석기 초기화
okt = Okt()
stopwords = pd.read_csv("https://raw.githubusercontent.com/yoonkt200/FastCampusDataset/master/korean_stopwords.txt", header=None)[0].tolist()
stopwords = set(stopwords)
# stopwords = ['도','는','다','의','가','이','은','한','에','하','고','을','를','인','듯','과','와','네','들','듯','지','임','게']


# 파일경로 확인 필요(상대경로 or 절대경로)
additional_stopwords = pd.read_excel("불용어모음.xlsx")  # 파일 경로 수정

# 불용어 목록에 추가로 처리할 단어들 추가
additional_stopwords_list = additional_stopwords['word'].tolist()
stopwords.update(additional_stopwords_list)

# 형태소 추출 및 불용어 처리 함수
def review_cleaning_edit(chat):
    hangul = re.compile('[^ ㄱ-ㅣ 가-힣]')
    result = hangul.sub('', chat)
    words = okt.pos(result, stem=True)  # 형태소 분석기로 형용사와 동사를 포함한 단어들 추출
    words = [x[0] for x in words if len(x[0]) > 1 and x[0] not in stopwords]
    return words

@app.route('/')
def main():
    return "Flask"

@app.route('/reviewData', methods=['POST'])
def review():
    # react에서 받은 데이터 ( input:리뷰, userdata:동행자(파티장)email )
    data = request.json
    input_value = data['input']
    username = data['userdata']
    
    # 입력받은 리뷰 전처리
    new_chat = input_value
    cleaned_review = review_cleaning_edit(new_chat)
  

    # 단어사전 로드
    # 파일경로 확인 필요(상대경로 or 절대경로)
    with open('tfidf_vectorizer_62984_emotion.pkl', 'rb') as file:
        tfidf_vectorizer = pickle.load(file)

    # 새로운 리뷰를 기존 단어사전에 맞게 변환
    tf_idf_vect_new = tfidf_vectorizer.transform([" ".join(cleaned_review)])

    # 학습된 로지스틱 회귀 모델 로드
    # 파일경로 확인 필요(상대경로 or 절대경로)
    with open('logistic_regression_model_best_params_62984_emotion.pkl', 'rb') as file:
        lr_model = pickle.load(file)

    # 리뷰의 긍정과 부정 예측
    prediction = lr_model.predict(tf_idf_vect_new)
    predResult = prediction[0]
    
    # 모델이 각 클래스(긍정 또는 부정)에 대해 예측하는 확률
    probabilities = lr_model.predict_proba(tf_idf_vect_new)
    pog = probabilities[0][1]*100   # 긍정 확률
    neg = probabilities[0][0]*100   # 부정 확률


    # 긍정 / 부정 확률 차이에 따라 +1, 0, -1 (긍/부정 70% 이상일때 -+1)
    if (pog-neg) > 40:
        result = 1
    elif (pog-neg) < -40:
        result = -1
    else:
        result = 0
    
    # 긍/부정 예측 결과값 확인용 코드 (없어도 상관없음)
    if result == 1 :
        pogneg = "긍정"
    elif result == -1:
        pogneg = "부정"
    else:
        pogneg = "중간"


    # firebase에서 기존 사용자 정보 가져와서 점수에 긍/부정에 따른 점수 합계 후
    # firebase에 다시 저장
    email = username  # 작성한 유저의 동행자 user_email
    data_ref = db.collection("users").document(email)
    data_get = data_ref.get()
    # 해당 유저(email)의 정보가 존재 여부에 따라 score 값 조정
    if data_get.exists:
        data = data_get.to_dict()
        # firebase에 저장된 사용자 정보에 score가 없다면 초기값(0)을 주고 합계
        if 'score' not in data:
            data['score'] = 0
            data["score"] += result
            data_ref.set(data)
        # 기존 score 값에 결과값을 더해준다
        else:
            data["score"] += result
            data_ref.set(data)
    # 해당 유저(email)의 정보가 없다면 firebase에 따로 저장하지 않는다
    # 회원가입을 email을 이용해 가입하기 때문에 회원이라면 email에 대한 정보는 무조건 존재함
    else:
        print("No such document!")
    
    # 여행 리뷰 DB에 저장하기 (key : value = 리뷰 : 긍/부정)
    review_ref = db.collection("review").document(email)
    review_ref_get = review_ref.get()

    # 해당 유저의 리뷰데이터가 존재하면 이어서 저장
    if review_ref_get.exists:
        review_data = review_ref_get.to_dict()
        review_data[input_value] = result
        review_ref.set(review_data)

    # 없다면 새로 유저문서를 추가하면서 리뷰저장
    else:
        review_ref.set({input_value : result})
    
    print("리뷰 :", input_value)
    print("유저 Email :", username)
    print("로지스틱 회귀 모델로 긍/부정 예측(0:부정, 1:긍정) : ", predResult)
    print("긍정 예측 확률:", pog,"%")
    print("부정 예측 확률:", neg,"%")
    print("긍/부정 예측 결과 : " ,pogneg)


    return "result"

if __name__ == '__main__':
    app.run(port=5000, debug=True)