let question = document.getElementById("questionContainer");
let answers = document.getElementsByClassName("answers");

let progress = document.getElementsByClassName("progress");
let help = document.getElementsByClassName("help");

let random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let FiftyFiftyUnUsed = true;
let callUnUsed = true;
let audUnUsed = true;

let questionTier = 0;
let progressTier = 13;

const progressReset = () => {
    location.reload();
}

let RandomArr = [];
let Main = (JsonIndex) => {

    let loadDataWithFetch = async () => {
        let jsonFileFetch = await fetch('data.json')
        let data = await jsonFileFetch.json();
        creation(data);
    }

    loadDataWithFetch();

    let RandomArr = [];
    while (RandomArr.length < 4) {
        let r = Math.floor(Math.random() * 4);
        if (RandomArr.indexOf(r) === -1) RandomArr.push(r);
    }

    let creation = (data) => {
        question.innerHTML = data.JsonQuestions[JsonIndex]

        for (let i = 0; i < 3; i++) {
            answers[RandomArr[i]].innerHTML = data.JsonBadAnswers[JsonIndex][i];
            answers[RandomArr[i]].onclick = wrongAnswer;
        }
        answers[RandomArr[3]].innerHTML = data.JsonRightAnswers[JsonIndex];
        answers[RandomArr[3]].onclick = rightAnswer;

        callUnUsed ? help[0].onclick = () => { answers[RandomArr[3]].innerHTML = data.JsonRightAnswers[JsonIndex] + " - Přece toto je správná"; callUnUsed = false } : help[0].onclick = console.log("false");

        if (progressTier == 0) {
            question.innerHTML = "Vyhrál jsi, chceš hrát znova?"
            for (let i = 0; i < 4; i++) {
                answers[i].innerHTML = "JJ";
                answers[i].onclick = () => {
                    progressReset();
                    Main(questionTier);
                }
            }
        }
    }

    let fiftyF = () => {
        for (let i = 0; i < 2; i++) {
            answers[RandomArr[i]].style.visibility = "hidden";
            answers[RandomArr[3]].style.visibility = "visible";
        }
        FiftyFiftyUnUsed = false;
    }
    FiftyFiftyUnUsed ? help[1].onclick = () => { fiftyF() } : help[1].onclick = console.log("false");


    let audF = () => {
        for (let i = 0; i < 3; i++) {
            answers[RandomArr[i]].style.background = "linear-gradient(to right, #3500d3 " + random(15, 20) + "%, #00000e " + random(20, 30) + "%)";
            answers[RandomArr[3]].style.background = "linear-gradient(to right, #3500d3 " + random(50, 70) + "%, #00000e " + random(70, 90) + "%)";
        }
        audUnUsed = false;
        for (let i = 0; i < 4; i++) {
            answers[i].style.color = "#0c0032"
        }
    }
    audUnUsed ? help[2].onclick = () => { audF() } : help[2].onclick = console.log("false");

}

let rightAnswer = () => {
    questionTier++;
    progressTier--;
    Main(questionTier);
    for (let i = 0; i < 4; i++) {
        answers[i].attributeStyleMap.clear();
    }
    progress[progressTier].style.color = "#0c0032";
    progress[progressTier].style.background = "#3500D3";
}

let wrongAnswer = () => {
    progressReset();
    Main(questionTier);
}

Main(0);