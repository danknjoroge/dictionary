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

    
  }
}
searchInput.addEventListener("keyup", e => {
  let word = e.target.value.replace(/\s+/g, ' ');
  if (e.key == "Enter" && word) {
    fetchApi(word);
  }
});