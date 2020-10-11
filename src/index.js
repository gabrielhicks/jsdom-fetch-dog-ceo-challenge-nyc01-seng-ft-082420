document.addEventListener("DOMContentLoaded" , () => {
    eventHandler();
    fetchBreed();
    fetchImg();
})

let dogBreeds = []

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
    })
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

console.log(dogBreeds)