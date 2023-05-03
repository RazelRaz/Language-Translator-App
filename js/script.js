const selectTag = document.querySelectorAll('select');
const from_text = document.querySelector('.from_text');
const to_text = document.querySelector('.to_text');
translateBtn = document.querySelector('button');
exchange = document.querySelector('.exchange');
icons = document.querySelectorAll('.row i');

selectTag.forEach((tag, id) => {
    // console.log(tag); //<select></select>
    for (const country in countries) {
        // console.log(countries[country]);
        //Selecting English by default as From Language and Hindi as To Language
        let selected;
        if (id == 0 && country == 'en-GB') {
            selected = 'selected';
        } else if (id == 1 && country == 'bn-IN'){
            selected = 'selected';
        }
        let option = `<option value="${country}" ${selected}>${countries[country]}</option>`;
        tag.insertAdjacentHTML('beforeend', option); //adding options tag inside select tag
    }
})


// exchange icon button work
exchange.addEventListener('click', () => {
    //exchange textarea and select tag values
    let tempText = from_text.value;
    from_text.value = to_text.value;
    to_text.value = tempText;

    let tempLeng = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLeng;
})

//fetching api
translateBtn.addEventListener('click', ()=> {
    let text = from_text.value;
    translateFrom = selectTag[0].value; //getting fromSelect tag value
    translateTo = selectTag[1].value; //getting toSelect tag value
    // console.log(text,translateFrom, translateTo);
    //if Enter text field is empty and someone click the button Translate text
    if(!text){
        return
    }
    //once button is clicked, changing textarea placeholder to Translating..
    to_text.setAttribute('placeholder', 'Translating...');
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    //fetching api response and returniong it with parsing into js obj
    //and in another then method receiving that obj
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        //responseData.translatedText
        to_text.value = data.responseData.translatedText;
        //once data is fetched, changing textarea placeholder to Translation
        to_text.setAttribute('placeholder', 'Translation');
    })
})

//speak icon and copy icon functional work
icons.forEach(icon => {
    icon.addEventListener('click', ({target}) => {
        // console.log(target);
        // console.log(icon);
        if(target.classList.contains('fa-copy')){
            //if clicked icon has from id, copy the from_text area value / copy the to_text  area value
            if (target.id == 'from') {
                // console.log('from copy icon clicked');
                navigator.clipboard.writeText(from_text.value)
            } else {
                // console.log('to copy icon clicked');
                navigator.clipboard.writeText(to_text.value)
            }
        } else {
            // console.log('Speech icon clicked');
            let utterance
            //if clicked icon has from id, speak the from_text value / speak the to_text value
            if (target.id == 'from') {
                utterance = new SpeechSynthesisUtterance(from_text.value);
                utterance.lang = selectTag[0].value; //setting utterance language to fromSelect tag value 
            } else {
                utterance = new SpeechSynthesisUtterance(to_text.value);
                utterance.lang = selectTag[1].value; //setting utterance language to toSelect tag value 
            }
            speechSynthesis.speak(utterance); // speak the passed utterance
        }
    })
});