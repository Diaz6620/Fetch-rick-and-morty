let characterList = document.getElementById('character-list')
const prevBtn = document.getElementById('prev-page')
const nextBtn = document.getElementById('next-page')

let page = 1

const fetchCharacters = async () => {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        const charactersData = await response.json()
    
        characterList.innerHTML = ''
    
        charactersData.results.forEach(character => {
            const { name, species, image } = character
            const template = `
                <li class='card'>
                    <img src="${image}" alt="${name}">
                    <h2><span>Nombre: </span>${name}</h2>
                    <p><span>Especie: </span>${species}</p>
                </li>
            `
            characterList.innerHTML += template
        })
    } catch (error) {
        console.error('Fetch characters FAILED', error)
    }
    if (page === 1) {
        prevBtn.disabled = true
    } else {
        prevBtn.disabled = false
    }
}

nextBtn.addEventListener('click', () => {
    page++
    fetchCharacters()
})

prevBtn.addEventListener('click', () => {
    page--
    fetchCharacters()
})

fetchCharacters()