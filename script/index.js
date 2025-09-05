const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data));
};

const removeActive =()=>{
    const lessonButton = document.querySelectorAll(".lesson-btn")
    lessonButton.forEach((btn) => btn.classList.remove("active"))
};
//.this bar bar na likhe async likhe kaj hoy.
const loadWordDetail = async (id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url); //url ta k dhorar jonno await use kori
    const details = await res.json();
    displayWordDetails(details.data);

};
const displayWordDetails = (word)=>{
    const  detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML=`
      
      <div class="">
    <h2 class="text-2xl font-bold"> ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
   </div>
   <div class="">
    <h2 class="font-bold">Meaning</h2>
    <p>${word.meaning}</p>
   </div>
   <div class="">
    <h2 class="font-bold">Example</h2>
    <p>${word.sentence}</p>
   </div>
    <div class="">
    <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
    <span class="btn">Enthusiastic</span>
    <span class="btn">excited</span>
    <span class="btn">keen</span>
   </div>
      
      
      
      `;
    document.getElementById("word_modal").showModal();
}



const loadLevelword=(id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
       .then((res) => res.json())
       .then((data) => {
         removeActive(); // remove all active class
         const clickBtn = document.getElementById(`lesson-btn-${id}`)
         clickBtn.classList.add("active")//add active class
         displaylevelWord(data.data)
       })
     
};

const displaylevelWord = (words) =>{
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML="";
    if(words.length == 0){
        wordContainer.innerHTML = `
         <div class="text-center col-span-full space-y-6 font-bangla py-10 ">
          <img class="mx-auto" src="./assets/alert-error.png" alt="">
          <p class="text-xl font-medium text-gray-600  ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
       </div>
        `
    }

    words.forEach(word => {
        console.log(word);
        const card = document.createElement("div")
        card.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
          <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
          <p class="font-semibold">Meaning /pronounciation</p>
          <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}"</div>
          <div class="flex justify-between items-center">
             <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
             <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
          </div>           
        </div>`
        wordContainer.append(card);
    });

}

const displayLesson = (lessons) => {
    // 1.get the container $ emty
const levelContainer = document.getElementById("level-container");
levelContainer.innerHTML = "";
  // 2.Get the every lessions
for (let lesson of lessons) {
    //3.Create Element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML=`
       
          <button id="lesson-btn-${lesson.level_no}" onclick= "loadLevelword(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lession - ${lesson.level_no} </button>
    `;
    //4.append into container
    levelContainer.append(btnDiv)

}

};

loadLessons();