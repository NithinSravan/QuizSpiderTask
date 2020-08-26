let slideIndex = 1;
let questionNum=0;
let questionCard=new Array();
let box=document.getElementById("box");
let intro=document.getElementById("intro");
let scoreTxt=document.getElementById("score")
let prev=document.getElementsByClassName("prev")[0];
let next=document.getElementsByClassName("next")[0];
let button=document.getElementById("start");
let submit=document.getElementById("submit");
let retake=document.getElementById("retake");
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

// Next/previous controls
function plusSlides(n) {
    questionNum+=n;
    slideIndex += n
  showSlides(slideIndex);
}

// Thumbnail image controls
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
//   if (n > cards.length) {
//       next.style.display="none"
//       questionNum=0;
//     }
//   if (n < 1) {
//     prev.style.display="block"
//       slideIndex = cards.length
//       questionNum=cards.length-1;
//     }
  for (i = 0; i < cards.length; i++) {
      cards[i].style.display = "none";
  }

  cards[slideIndex-1].style.display = "block";

}

function retakeQuiz(){
    retake.style.display="none";
    button.style.display="block";
    intro.style.display="block";
    scoreTxt.style.display="none";
    prev.style.display="none"
    setup();
}
function chooseAnswer(){
    for(let i=questionNum*4;i<questionNum*4+4;i++){
        options[i].removeEventListener("click",chooseAnswer)
    }
    if(parseInt(this.children[0].value)===questionCard[questionNum].answer){
        score++;
        answered++;
        console.log(score,answered)
        options[parseInt(this.children[0].value)+questionNum*4].style.background="green"
        options[parseInt(this.children[0].value)+questionNum*4].style.color="#fff"
   
    }
    else{
        answered++;
        console.log(score,answered)
        options[parseInt(this.children[0].value)+questionNum*4].style.background="red"
        options[parseInt(this.children[0].value)+questionNum*4].style.color="#fff"
    }
    console.log(answered,questions.length)
    if(answered===questions.length){
        submit.style.display="block";
    }
}
function displayScore(){
    for (let j = cards.length - 1; j >= 0; j--)
    {
         cards[j].parentNode.removeChild(cards[j]);
    }
    submit.style.display="none";
    retake.style.display="block"
    prev.style.display="none"
    next.style.display="none"
    scoreTxt.style.display="block"
    scoreTxt.innerText="Your Score: "+score;
    scoreTxt.style.fontSize="2.5em";
}
function createQuiz(){

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
        console.log(i)
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
            new QuestionCard(" What are the precautions that need to be taken to protect from the coronavirus?",null,[
                "A) Cover your nose and mouth when sneezing.",
                "B) Add more garlic into your diet.",
                "C) Visit your doctor for antibiotics treatment.",
                "D) Wash your hands after every hour."
            ],0)
        ]

        welcome()
       
   

 }
 setup()

