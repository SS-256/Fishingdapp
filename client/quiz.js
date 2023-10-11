var questions = [
    {
        question: "世界で最も大きな魚は何ですか？",
        options: ["クジラシャチ", "シロナガスクジラ", "オオメジロザメ"],
        correctIndex: 1
    },
    {
        question: "魚は呼吸のために何を使いますか？",
        options: ["肺", "鰓", "鼻"],
        correctIndex: 1
    },
    {
        question: "魚の心臓は通常、何つの室からなりますか？",
        options: ["1つ", "2つ", "3つ"],
        correctIndex: 1
    },
    {
        question: "魚のうち、淡水魚と海水魚、どちらの方が塩分濃度が高いですか？",
        options: ["淡水魚", "海水魚"],
        correctIndex: 1
    },
    {
        question: "魚の鱗の主な素材は何ですか？",
        options: ["カルシウム", "コラーゲン", "ケラチン"],
        correctIndex: 2
    },
    {
        question: "魚はどのような呼吸器官を使って酸素を取り込みますか？",
        options: ["肺", "鰓", "皮膚"],
        correctIndex: 1
    },
    {
        question: "世界最大の淡水魚は何と呼ばれますか？",
        options: ["ナマズ", "ピラルク", "コイ"],
        correctIndex: 0
    },
    {
        question: "魚の群れを作ることで身を守るメリットは何ですか？",
        options: ["スピードアップ", "エサを共有", "目立ちにくくなる"],
        correctIndex: 2
    },
    {
        question: "クラゲは魚の中でも特にどの器官が発達していますか？",
        options: ["目", "脳", "触手"],
        correctIndex: 2
    },
    {
        question: "世界で最も小さい魚は何ですか？",
        options: ["ゼブラダニオ", "ミドリフグ", "ヨシキリザメ"],
        correctIndex: 0
    },
    {
        question: "魚はどのようにして水中で浮力を得ていますか？",
        options: ["水中の気泡", "膨張した内臓", "鰭を動かす"],
        correctIndex: 1
    },
    {
        question: "世界で最も速い魚は何ですか？",
        options: ["マグロ", "カツオ", "サバ"],
        correctIndex: 0
    },
    {
        question: "世界で最も古い魚は何ですか？",
        options: ["シーラカンス", "コイ", "アンコウ"],
        correctIndex: 0
    },
    {
        question: "魚のうち、ほとんどの種類が鰭を持っていますが、どのような鰭は持っていないでしょうか？",
        options: ["胸鰭", "尾鰭", "腹鰭"],
        correctIndex: 2
    },
    {
        question: "カエルは水中で魚のようにどのように動きますか？",
        options: ["泳ぐ", "飛ぶ", "歩く"],
        correctIndex: 0
    },
    {
        question: "世界最小の魚は何と呼ばれますか？",
        options: ["コイ", "グッピー", "ペンギンフィッシュ"],
        correctIndex: 2
    },
    {
        question: "アナゴはどのような場所に生息していますか？",
        options: ["河川", "湖", "海"],
        correctIndex: 2
    },
    {
        question: "魚の骨は一般的に何からできていますか？",
        options: ["カルシウム", "リン", "硫黄"],
        correctIndex: 0
    },
    {
        question: "世界で最も美しい魚とされる、インド洋と太平洋に生息する小型の熱帯魚は何ですか？",
        options: ["ネオンテトラ", "シリウステトラ", "タナカクロ"],
        correctIndex: 1
    },
    {
        question: "魚の中で電気を発する種類がいることをご存知でしょうか。これを何と呼ぶでしょうか？",
        options: ["電魚", "雷魚", "電撃魚"],
        correctIndex: 0
    }
];

const question2 = questions.slice();

const totalQuestions = 20;
//const questionsToAnswer = 5;
const normaltimeLimit = 30; // seconds
const supertimeLimit = 15;

let currentQuestion = Math.floor(Math.random() * questions.length);
let score = 0;
let wrongAnswers = 0;
let timer;
let QT = 0;
const Quiz = document.getElementById("quiz");

const scoreElement = document.getElementById("score");
const questionElement = document.getElementById("question");
const res = document.getElementById("res");
Quiz.style.display = "none";

function reload(){
    setTimeout(function(){
      location.reload();
    },500)
  }


function shuffleQuestions() {
    // クイズをランダムにシャッフル
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function startQuiz() {
    Quiz.style.display = "block";
    shuffleQuestions();
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    if(QT >= 5){
        endQuiz();
        return;
    }
    // if (wrongAnswers >= 3) {
    //     endQuiz();
    //     return;
    // }else if(score >= 5){
    //     scoreElement.textContent = `スコア：${score}`;
    //     endQuiz();
    //     return;
    // }
    
    questionElement.textContent = questions[currentQuestion].question;

    const optionsElement = document.getElementById("options");
    optionsElement.innerHTML = "";
    questions[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.setAttribute("onclick", `checkAnswer(${index})`);
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestion].correctIndex) {
        score++;
        scoreElement.textContent = `スコア：${score}`;
    } else {
        wrongAnswers++;
    }
    questions.splice(currentQuestion,1);
    if(questions.length <= 0){
        questions = question2.slice();
    }
    currentQuestion = Math.floor(Math.random() * questions.length);
    QT++;
    displayQuestion();
}

function startTimer() {
    let timeRemaining;
    if(Rodtype == 0.1){
        timeRemaining = normaltimeLimit;
    }else{
        timeRemaining = supertimeLimit;
    }
    
    const timerElement = document.getElementById("timer");
    timer = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = `制限時間: ${timeRemaining}秒`;

        if (timeRemaining <= 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);

    //scoreElement.textContent = `クイズ終了！ スコア: ${score} / ${questionsToAnswer}`;
    scoreElement.textContent = `クイズ終了！ スコア: ${score}`;
    const optionsElement = document.getElementById("options");
    optionsElement.innerHTML = "";
    questionElement.innerHTML = "";

    if (score >= 4) {
        res.innerHTML = "ミッションクリア！！";
        GetFish();
    } else {
        res.innerHTML = "ざんねん！！";
    }
    setTimeout(hideQuiz, 5000);
    overlappingFish.style.animation = "";
    // アニメーションを再開
    overlappingFish.style.animationPlayState = "running";
    document.getElementById("NormalRod").disabled = false;
    document.getElementById("SuperRod").disabled = false;
}

function hideQuiz() {
    Quiz.style.display = "none";
    res.innerHTML = "魚に関するクイズ";
    score = 0;
    scoreElement.textContent = `スコア：${score}`;
    wrongAnswers = 0;
    QT = 0;
  }

