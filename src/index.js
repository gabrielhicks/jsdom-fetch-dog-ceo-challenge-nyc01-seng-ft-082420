document.addEventListener("DOMContentLoaded" , () => {
    eventHandler();
    fetchBreed();
    fetchImg();
})

let dogBreeds = []
let dogSelect = []

function eventHandler () {

    const breedContainer = document.querySelector("#dog-breeds")
    breedContainer.addEventListener("click", e => {
        const breedLi = e.target
            breedLi.style = "font-weight:bold; color:blue";
    })

    const dropDownList = document.querySelector("select#breed-dropdown")
    dropDownList.onchange = function() {
        const breedContainer = document.querySelector("#dog-breeds")
        breedContainer.innerHTML = ""
        let selected = dropDownList.value
        for(let breed in dogBreeds) {
            let dogBreed = dogBreeds[breed]
            if(dogBreed[0] == selected) {
            renderBreed(dogBreed)
            }
        }
    }

}

function fetchBreed () {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then(response => response.json())
    .then(breeds => {
        for(breed in breeds.message) {
            dogBreeds.push(breed)
        }
        populateSelectors();
    })
}

function populateSelectors() {
    for(let breed in dogBreeds) {
        let dog = dogBreeds[breed]
        if(dogSelect.includes(dog[0])) {
            continue
        } else {
            dogSelect.push(dog[0]);
        }
    }
    createDropDown();
}

function createDropDown() {
    const dropDownOptions = document.querySelector("#breed-dropdown")
    let options = dropDownOptions.options
    for(let each in dogSelect) {
        const letter = dogSelect[each]
        if(options[each] != dogSelect[each]) {
            let newOption = document.createElement("option")
            newOption.value = dogSelect[each]
            newOption.innerText = dogSelect[each]
            dropDownOptions.append(newOption)
        }
    }
}


function fetchImg () {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
    .then(response => response.json())
    .then(images => {
        renderDogs(images.message)
    })
}

function renderBreed(breed) {
    const breedContainer = document.querySelector("#dog-breeds")
    const breedLi = document.createElement("li")
    breedLi.textContent = breed
    breedContainer.append(breedLi)
}

function renderDogs(dogs) {
    const dogContainer = document.querySelector("#dog-image-container")
    for(const dog in dogs) {
        const dogImg = dogs[dog]
        renderDog(dogImg, dogContainer);
    }
}

function renderDog(dog, container) {
    let imgTag = document.createElement("img")
    imgTag.src = dog;
    container.append(imgTag)
}