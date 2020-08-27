let slideIndex = 1;
let questionNum=0;
let questionCard=new Array();
let box=document.getElementById("box");
let burger=document.getElementById("burger-nav");
let intro=document.getElementById("intro");
let player;
let s,m;
let sec = document.getElementById('sec');
let min = document.getElementById('min');
let currDate;
let day;
let month;
let year;
let date;
let time;
let realHours;
let countdown;
let realMins;
let scoreTxt=document.getElementById("score")
let prev=document.getElementsByClassName("prev")[0];
let next=document.getElementsByClassName("next")[0];
let button=document.getElementById("start");
let name=document.getElementById("name");
let submit=document.getElementById("submit");
let retake=document.getElementById("retake");
let sideNav=document.getElementById("side-nav");
let quesList=document.getElementsByClassName("ques-list")
let cards;
let images;
let questions;
let answers;
let options;
let optionInp;
let optionTxt;
let score=0;
let end=false;
let answered=0;
class QuestionCard{
    constructor(question,imgsrc,options,answer){
        this.question=question;
        this.imgsrc=imgsrc;
        this.options=[...options]
        this.answer=answer;
    }
}

function openNav(){
    sideNav.style.width="340px";
}

function closeNav(){
    sideNav.style.width="0px";
}
function selectSlide(i){
    slideIndex=i;
    questionNum=i-1;
    showSlides(slideIndex);
}

function plusSlides(n) {
    questionNum+=n;
    slideIndex += n
    console.log(slideIndex)
  showSlides(slideIndex);
}


function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  if(n===1){
    prev.style.display="none"
  }
  else{
    prev.style.display="block"
  }
  if(n===cards.length){
    next.style.display="none"
  }
  else{
    next.style.display="block"
  }

  for (i = 0; i < cards.length; i++) {
      cards[i].style.display = "none";
  }

  cards[slideIndex-1].style.display = "block";

}
function random(number)
{
	return Math.floor(Math.random() *(number));
};
function randomizeQues(){
    for(let i=questionCard.length-1;i>0;i--){
        let j=random(i+1);
        let temp=questionCard[i];
        questionCard[i]=questionCard[j];
        questionCard[j]=temp;
    }
}
function retakeQuiz(){
    name.style.display="block";
    retake.style.display="none";
    button.style.display="block";
    intro.style.display="block";
    scoreTxt.style.display="none";
    prev.style.display="none";
    setup();
}
function chooseAnswer(){
    for(let i=questionNum*4;i<questionNum*4+4;i++){
        options[i].removeEventListener("click",chooseAnswer)
    }
   
    if(parseInt(this.children[0].value)===questionCard[questionNum].answer){
        score++;
        answered++;
        quesList[slideIndex-1].style.background="rgb(126, 241, 18)";
        options[parseInt(this.children[0].value)+questionNum*4].style.background="rgb(126, 241, 18)"
        options[parseInt(this.children[0].value)+questionNum*4].style.color="#fff"
   
    }
    else{
        answered++;
        quesList[slideIndex-1].style.background="rgb(255, 45, 73)";
        options[parseInt(this.children[0].value)+questionNum*4].style.background="rgb(255, 45, 73)"
        options[parseInt(this.children[0].value)+questionNum*4].style.color="#fff"
    }
    if(answered===questions.length){
        submit.style.display="block";
    }
}
function timer ()
{
	let secs=300;
    countdown=setInterval(()=>{
        m=Math.floor(secs/60);
        s=secs-m*60;
        console.log(m,s)
        if(Math.floor(s/10)===0){
            sec.innerHTML="0"+s;
        }else
        sec.innerHTML=s;
        min.innerHTML=m;
        secs--;

       
        if(secs===-1){
            displayScore();
        }
    },1000)

}
function best(){
    if (localStorage.getItem(`${name.value}`) === null){
        localStorage.setItem(`${name.value}`,JSON.stringify(score));
        localStorage.setItem(`${name.value}:Date`,JSON.stringify(date));
        localStorage.setItem(`${name.value}:Time`,JSON.stringify(time));
    }
    
else if (score > JSON.parse(localStorage.getItem(`${name.value}`))){
    localStorage.setItem(`${name.value}`, JSON.stringify(score));
    localStorage.setItem(`${name.value}:Date`,JSON.stringify(date));
    localStorage.setItem(`${name.value}:Time`,JSON.stringify(time));
}
    
}
function displayScore(){
    clearInterval(countdown);
    sec.innerHTML="00";
    min.innerHTML="0";
    for (let j = cards.length - 1; j >= 0; j--)
    {
         cards[j].parentNode.removeChild(cards[j]);
    }
    currDate=new Date();
    day=currDate.getDate();
    month=currDate.getMonth();
    year=currDate.getFullYear();
    date=`Date: ${day}/${month}/${year}`
    realHours=currDate.getHours();
    realMins=currDate.getMinutes();
    if(Math.floor(realMins/10)===0)
    time=`Time: ${realHours}:0${realMins} hrs`
    else{
        time=`Time: ${realHours}:${realMins} hrs`
    }
    submit.style.display="none";
    burger.style.display="none"
    retake.style.display="block";
    prev.style.display="none";
    next.style.display="none";
    scoreTxt.style.display="block";
    best();
    scoreTxt.innerHTML=`${player} your score : ${score}/10<br>${ JSON.parse(localStorage.getItem(`${name.value}:Date`))} ${ JSON.parse(localStorage.getItem(`${name.value}:Time`))}<br> Your best: ${JSON.parse(localStorage.getItem(`${name.value}`))}/10`;
    scoreTxt.style.fontSize="1.1em";
}
function createQuiz(){
    timer()
    if(name.value)
    player=name.value;
    else
    player="Guest";
    name.style.display="none";
    burger.style.display="block";
    button.removeEventListener("click",createQuiz)
    button.style.display="none"
    intro.style.display="none"
    next.style.display="block"
    prev.style.display="none"
    cards=document.getElementsByClassName("card");
    images=document.getElementsByClassName("images");
    questions=document.getElementsByClassName("question");
    answers=document.getElementsByClassName("answer");
    options=document.getElementsByClassName("options");
    optionInp=document.getElementsByClassName("option-inp");
    optionTxt=document.getElementsByClassName("option-text");
    for(let i=0;i<questionCard.length;i++){
        const cardDiv=document.createElement("div");
     
        if(questionCard[i].imgsrc){
            const img=document.createElement("img");
            cardDiv.appendChild(img);
            img.classList.add("images");
            img.src=questionCard[i].imgsrc;
        }
        const quesDiv=document.createElement("div");
   
        box.appendChild(cardDiv);
        cardDiv.classList.add("card");
        cardDiv.classList.add("fade");
        cardDiv.appendChild(quesDiv);
        
       
        quesDiv.classList.add("question");
        questions[i].innerText=i+1+") "+questionCard[i].question;
        
        let k=0;
        for(let j=i*4;j<i*4+4;j++){
            const optionsDiv=document.createElement("div");
            quesDiv.appendChild(optionsDiv);
            optionsDiv.classList.add("options");
            const inp=document.createElement("input");
            const span=document.createElement("span");
            optionsDiv.appendChild(inp);
            optionsDiv.appendChild(span);
            inp.setAttribute("type","radio");
            inp.setAttribute("name","options");
            inp.classList.add("option-inp");
            span.classList.add("option-text");
            optionInp[j].value=k;

            options[j].addEventListener("click",chooseAnswer)
            optionTxt[j].innerText=questionCard[i].options[k];
            k++;
         }
     }
     showSlides(slideIndex);
}
function welcome(){
    button.addEventListener("click",createQuiz)
   
}
 function setup(){
        slideIndex = 1;  
        questionNum=0;
        score=0;
        answered=0;
        s=0;
        m=0;
        questionCard=[
            new QuestionCard("How many countries, areas or territories are suffering from novel coronavirus outbreak in the World?",null,[
                "A) More than 150",
                "B) More than 200",
                "C) More than 50",
                "D) More than 100"
            ],1),
            new QuestionCard("There are currently vaccines for the following coronaviruses:",null,[
                "A) SARS",
                "B) MERS",
                "C) SARS and MERS",
                "D) None of the above"
            ],3),
            new QuestionCard("How does Coronavirus transmit?",null,[
                "A) When a person sneezes or cough, droplets spread in the air or fall on the ground and nearby surfaces.",
                "B) If another person is nearby and inhales the droplets or touches these surfaces and further touches his face, eyes or mouth, he or she can get an infection.",
                "C) If the distance is less than 1 meter from the infected person.",
                "D) All the above are correct."
            ],3),
            new QuestionCard("Identify the virus.","corona.jpg",[
                "A) MERS",
                "B) COVID-19",
                "C) HIV",
                "D) None of the above"
            ],1),
            new QuestionCard("What is Coronavirus?",null,[
                "A) It is a large family of viruses.",
                "B) It belongs to the family of Nidovirus.",
                "C) Both A and B are correct",
                "D) Only A is correct."
            ],2),
            new QuestionCard("From where did coronavirus get its name?",null,[
                "A) Due to their crown-like projections.",
                "B) Due to their leaf-like projections.",
                "C) Due to their surface structure of bricks.",
                "D) None of the above"
            ],0),
            new QuestionCard("What are the precautions that need to be taken to protect from the coronavirus?",null,[
                "A) Cover your nose and mouth when sneezing.",
                "B) Add more garlic into your diet.",
                "C) Visit your doctor for antibiotics treatment.",
                "D) Wash your hands after every hour."
            ],0),
            new QuestionCard("What happens to a person suffering from COVID-19?",null,[
                "A) Around 80% of the people will require no treatment as such and will recover on their own.",
                "B) Around <20% or a small proportion may need hospitalisation.",
                "C) A very small proportion basically suffering from chronic illness may need admission in an Intensive Care Unit (ICU).",
                "D) All the above are correct."
            ],3),
            new QuestionCard("Name a clinical trial in which blood is transfused from recovered COVID-19 patients to a coronavirus patient who is in critical condition.",null,[
                "A) Plasma Therapy",
                "B) Solidarity",
                "C) Remdesivir",
                "D) Hydroxychloroquine"
            ],0),
            new QuestionCard("Which of these is NOT listed by the WHO as a symptom of coronavirus?",null,[
                "A) Fever",
                "B) Dry cough",
                "C) Blurred vision",
                "D) Nasal congestion"
            ],2)
        ]
        randomizeQues();
        welcome()
 }
 setup()

