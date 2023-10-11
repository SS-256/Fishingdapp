const quotes = [
    "fish swim",
    "beautiful fish",
    "school of fish",
    "love fishing",
    "fresh seafood",
    "visit aquarium",
    "gems of the sea",
    "school of fish",
    "enjoy fishing",
    "beautiful marine life",
    "colorful fishes",
    "mysteries of the deep",
    "tropical fish charm",
    "fish and the sea views",
    "serenity in the pond",
    "vivid fish shadows",
  ];

  let currentQuote = Math.floor(Math.random() * quotes.length);
  let startTime;
  const inputElement = document.getElementById("inputBox");
  inputElement.style.display = "none";
  let record = 0; //何問解いたか
  let mispoint = 0; //間違えた回数
  var timerId;
  var intervalId;
  var time;

  function reload(){
    setTimeout(function(){
      location.reload();
    },500)
  }

  function timer(){
    time -= 1;
    document.getElementById("time").innerHTML = time;
    if(time <= 0){
      stopInterval();
      document.getElementById("quote").innerHTML = "チャレンジ失敗！！";
          setTimeout(function(){
            location.reload();
        },500)
    }
  }

  function SetTime(){
    var quoteslen = quotes[currentQuote].length-1;
    console.log("文字の長さ"+quoteslen);
    if(quoteslen >= 10 && quoteslen <= 20){
      console.log("20");
      time = 20;
      document.getElementById("time").innerHTML = time;
    }else if(quoteslen > 20){
      console.log("25");
      time = 25;
      document.getElementById("time").innerHTML = time;
    }else{
      console.log("15");
      time = 15;
      document.getElementById("time").innerHTML = time;
    }
  }

  function startInteval(){
    intervalId = setInterval(timer,1000);
  }

  function stopInterval(){
    clearInterval(intervalId);
  }


  function startGame() {
    currentQuote = Math.floor(Math.random() * quotes.length);
    showQuote();
    inputElement.style.display = "block";
    SetTime();
    document.getElementById("time").innerHTML = time;
    startInteval();
    startTime = new Date().getTime();
    document.getElementById("result").innerHTML = "";
    document.getElementById("inputBox").value = "";
    document.getElementById("inputBox").focus();
  }

  function showQuote() {
    document.getElementById("quote").innerHTML = quotes[currentQuote];
  }
  function showmsg(){
    document.getElementById("res").innerHTML = "クリア！！";
    document.getElementById("res").style.display = "block"; // メッセージを表示
    timerId = setTimeout( delmsg , 800 ); // タイマーを開始
  }

  function delmsg(){
   document.getElementById("res").style.display = "none"; // ボックスを消す
   stopTimeout()// タイマーを終了
  }

  function checkInput() {
    const inputText = document.getElementById("inputBox").value;
    const currentText = quotes[currentQuote].substr(0, inputText.length);

    if (inputText === quotes[currentQuote]) {
      const endTime = new Date().getTime();
      const timeTaken = (endTime - startTime) / 1000;
      const wpm = Math.round((quotes[currentQuote].split(" ").length / timeTaken) * 60);

    //   document.getElementById("res").innerHTML = `終了！タイム: ${timeTaken}秒, WPM: ${wpm}`;
    showmsg();
    SetTime();
    stopInterval();
    startInteval();
    quotes.splice(currentQuote,1);
      currentQuote = Math.floor(Math.random() * quotes.length);
      record++;

      if (record < 6) {
        showQuote();
        startTime = new Date().getTime();
        document.getElementById("inputBox").value = "";
      } else {
        document.getElementById("quote").innerHTML = "ミッションクリア！";
        stopInterval();
        document.getElementById("inputBox").value = "";
        reload();
      }
    } else {
      if (inputText === currentText) {
        document.getElementById("quote").style.color = "black";
        document.getElementById("res").value = "";
      } else {
        document.getElementById("quote").style.color = "red";
        mispoint++;
        // if(mispoint > 5){
        //   document.getElementById("quote").innerHTML = "チャレンジ失敗！！";
        //   setTimeout(function(){
        //     location.reload();
        // },500);          
        //   return 0;
        // }
      }
    }
  }

 

  function test(){
    console.log("呼び出し成功");
  }