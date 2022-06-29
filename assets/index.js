const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  volume = wrapper.querySelector(".word i"),
  infoText = wrapper.querySelector(".info-text"),
  synonyms = wrapper.querySelector(".synonyms .list"),
  removeIcon = wrapper.querySelector(".search span");
let audio;

function fetchApi(word) {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => data(result, word));
}

function data(result, word) {
  if (result.title) {
    infoText.innerHTML = 'Word not available.' + ' ' + word + 'Please, check the spelling.'
  } else {
    wrapper.classList.add("active");
    const def = result[0].meanings[0].definitions[0]
    const phon = result[0].meanings[0].partOfSpeech;
    const syno = result[0].meanings[0].synonyms[0];

    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phon;
    document.querySelector(".meaning span").innerText = def.definition;
    document.querySelector(".synonym span").innerText = syno;
    document.querySelector(".example span").innerText = def.example;   

    if (def.synonyms[0] === undefined) {
      synonyms.parentElement.style.display = "none";
    } else {
      synonyms.parentElement.style.display = "block";
      synonyms.innerHTML = "";

      for(let syn in synonyms){
        let tag = `<span onclick="search('${definitions.synonyms[syn]}')">${definitions.synonyms[syn]}</span>`;
        synonyms.insertAdjacentHTML("beforeend",tag );

      }
    }
  }
}
searchInput.addEventListener("keyup", (e) => {
  let word = e.target.value.replace(/\s+/g, ' ');
  if (e.key == "Enter" && word) {
    fetchApi(word);
  }
});

removeIcon.addEventListener("click", ()=>{
  searchInput.value = "";
  searchInput.focus()
  wrapper.classList.remove("active")
  infoText.textContent.color = "9A9A9A"
  infoText.innerHTML = 'Type any existing word and press enter to get meaning, example,synonyms, etc.'
})