import { catsData } from "./data.js"


//Elements
const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const errorMsg = document.getElementById('error-msg')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModal = document.getElementById('meme-modal')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModaCloseBtn = document.getElementById('meme-modal-close-btn')

//Event Listeners
emotionRadios.addEventListener('change', highlightCheckedOption) 

memeModaCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)


//Functions

//highlightCheckedOption

function highlightCheckedOption(e) {
    let radios = document.getElementsByClassName('radio')
    for (let radio of radios) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

//closeModal
function closeModal() {
    memeModal.style.display = 'none'
}

//renderCat

function renderCat() {
    const catsObject = getSingleCatObject()
    memeModal.style.display = 'flex'
    memeModalInner.innerHTML = `
                                <img
                                class = "cat-img"
                                src = "./images/${catsObject.image}"
                                alt = "${catsObject.alt}"
                                >
                               `
}

//getSingleCatObject

function getSingleCatObject() {  

    const catsArray = getMatchingCatsArray()
    if(catsArray.length === 1) {
        return catsArray[0]
    }
    else {
        const randomNumber = Math.floor(Math.random()* catsArray.length)
        return catsArray[randomNumber]

    }
}

//getMatchingCatsArray

function getMatchingCatsArray() {  
    if(document.querySelector('input[type="radio"]:checked')) {
        errorMsg.style.display = 'none'
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        const matchingCatsArray = catsData.filter(function(cat) {
            if(isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else {
                return cat.emotionTags.includes(selectedEmotion)
            }
            
        })
        return matchingCatsArray  
    } 
    else {
        errorMsg.innerHTML = `
                            <p> Please select any option</p>
                            `
    }
     
}


//getEmotionsArray

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotions of cat.emotionTags){
            if(!emotionsArray.includes(emotions)){
                emotionsArray.push(emotions)
            }
            
        }        
    }
return emotionsArray
}

//renderEmotionRadios

function renderEmotionRadios (cats) {
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions) {
        if(!emotion.includes(emotions)) {
            radioItems += `
                    <div class = "radio">
                    <label for = "${emotion}">${emotion}</label>
                    <input name = "emotions"type = "radio" id = ${emotion} value = "${emotion}"> 
                    </div>  
                    `
        }                            
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionRadios(catsData)
