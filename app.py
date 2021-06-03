from flask import Flask, render_template, request, redirect
import recommend as recommend
app = Flask(__name__)

question = 0
extro = 0
cons = 0
neuro = 0
target = ""
group = ""
time = ""

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/test')
def test():
    global question
    ques = ""
    question = question + 1
    if(question == 1):
        ques = "모르는 사람에게 말을 건다"
    elif(question == 2):
        ques = "일을 사전에 계획한다"
    elif(question == 3):
        ques = "우울하거나 울적함을 느낀다"
    elif(question == 4):
        ques = "회식, 파티, 사교모임을 계획한다"
    elif(question == 5):
        ques = "일이나 물건을 정리하지 않고 어지럽게 그냥 둔다"
    else:
        ques = "스트레스나 걱정을 자주 느낀다"
    return render_template('test.html', ques = ques)

@app.route('/post', methods=['POST'])
def post():
    global question
    global extro
    global cons
    global neuro
    global group
    value = (int)(request.form['ans'])
    if(question == 6):
        neuro = neuro + value
        group = recommend.recommend_group(extro, cons, neuro)
        return render_template('show.html', data=group)
    else:
        if(question == 1):
            extro = extro + value
        elif(question == 2):
            cons = cons + value
        elif(question == 3):
            neuro = neuro + value
        elif(question == 4):
            extro = extro + value
        elif(question == 5):
            cons = cons + 6 - value
        return redirect('/test')

@app.route('/post/option', methods=['POST'])
global target
global time
global group
def recommend_result():
    value = (request.form['option'])
    exercise = recommend.recommend_exercise(target, time, group)
    return render_template(exercise +'.html')


if __name__ == '__main__':
    app.run()