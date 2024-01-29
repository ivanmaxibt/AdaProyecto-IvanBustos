//primero declaramos la variable que contiene todas las tarjetas:
const container = document.getElementById("container");
let currentPage = 1;
let totalPages = 0;
let currentGender = "";
//filtros (género: tener botones de sin género, mujeres, hombres, desconocido)
const todosBtn = document.getElementById("todos");
const singeneroBtn = document.getElementById("sin-genero");
const mujeresBtn = document.getElementById("mujeres");
const hombresBtn = document.getElementById("hombres");
const desconocidoBtn = document.getElementById("desconocido");

//declaramos la llamada a la api:
const getCharacters = (pageNumber) => {
    container.innerHTML="";
    let genderPath = "";
    if (currentGender) {
        genderPath = `&gender=${currentGender}`;
    }
    fetch (`https://rickandmortyapi.com/api/character?page=${pageNumber}${genderPath}`)
    .then ((res) => res.json())
    .then ((data) => {imageOfCharacters(data)
        totalPages = data.info.pages;
    })
}

//hacemos la constante que contenga a cada card:
const imageOfCharacters = (data) => {
data.results.forEach(character => {
container.innerHTML +=
`<div class="card">
     <h2>${character.name}</h2>
     <img src="${character.image}" alt="">
     <button class="button" onclick = Description("${character.url}")>Detalles</button>
</div>`
    });
}

//Detalles de cada card, dandole atributos:
const Description = (detailPage) => {
    container.innerHTML = "";
    fetch (detailPage)
    .then ((res) => res.json())
    .then ((detailPageJson) => {
    container.innerHTML = 
    `<div class="card">
         <h2>${detailPageJson.name}</h2>
         <img src="${detailPageJson.image}" alt="">
         <li>Estado: ${detailPageJson.status}</li>
         <li>Especie: ${detailPageJson.species}</li>
         <li>Género: ${detailPageJson.gender}</li>
         <li>Nombre: ${detailPageJson.location.name}</li>
         <li>Origen: ${detailPageJson.origin.name}</li>
         <button class="button-detail" onclick = BackToHome()>Atrás</button>
         <button class="button-detail" onclick = VerMas("${detailPage}")>Ver más</button>
    </div>`
    })
}

const BackToHome = () =>{
    window.history.back();
    location.reload();
}

//viewDidAppear
getCharacters(currentPage);

//Más detalles del personaje:
const VerMas = (moreDetail) => {
    fetch (moreDetail)
    .then ((res) => res.json())
    .then ((moreDetailJson) => {
    container.innerHTML = 
    `<div class="card">
         <h2>${moreDetailJson.name}</h2>
         <img src="${moreDetailJson.image}" alt="">
         <li>Tipo: ${moreDetailJson.type}</li>
         <li>Creación: ${moreDetailJson.created}</li>
         <button class="button-detail" onclick = BackToHome()>Atrás</button>
    </div>`
})
}

// Evento para avanzar a la siguiente página:
const nextBtn = document.getElementById("nextButton");
const prevBtn = document.getElementById("prevButton");

nextBtn.addEventListener("click", () => {

if (currentPage <= 1)   {
    currentPage++;
    getCharacters(currentPage);
} else if (currentPage > 1 && currentPage < totalPages) {
    prevBtn.removeAttribute("disabled", false)
    currentPage++;
    getCharacters(currentPage);
} else  {
    nextBtn.setAttribute("disabled", true)
} 
   
});
// Evento para la página anterior:
prevBtn.addEventListener("click", () => {
    if (currentPage <= 1)    {
        prevBtn.setAttribute("disabled", true)
    } else if (currentPage >1 && currentPage <= totalPages) { 
        currentPage--;
        nextBtn.removeAttribute("disabled", true)    
    } else  {
        nextBtn.setAttribute("disabled", true)
        currentPage--;
    }    
    getCharacters(currentPage);      
});

//filtro Todos:
const filterTodos = () =>{
    container.innerHTML="";
    currentGender = "";
    currentPage = 1;
    fetch(`https://rickandmortyapi.com/api/character`)
    .then(res=>res.json())
    .then(data=>imageOfCharacters(data))
}
todosBtn.addEventListener("click", ()=>
    filterTodos("todos"));

//filtro mujeres:
const filterWomen = (filterParam, valueParam) => {
    container.innerHTML = "";
    currentGender = "female";
    currentPage = 1;
    fetch(`https://rickandmortyapi.com/api/character/?${filterParam}=${valueParam}`)
        .then(res => res.json())
        .then(data => imageOfCharacters(data));        
}
mujeresBtn.addEventListener("click", () => 
    filterWomen("gender", "female"));

//filtro hombres:
const filterMen = (filterParam, valueParam) =>{
        container.innerHTML="";
        currentGender = "male";
        currentPage = 1;
        fetch(`https://rickandmortyapi.com/api/character/?${filterParam}=${valueParam}`)
        .then(res=>res.json())
        .then(data=>imageOfCharacters(data))
}    
hombresBtn.addEventListener("click", ()=>
        filterMen("gender", "male"));

//filtro desconocidos:
const filterUnknown = (filterParam, valueParam) =>{
    container.innerHTML="";
    currentGender = "unknown";
    currentPage = 1;
    fetch(`https://rickandmortyapi.com/api/character/?${filterParam}=${valueParam}`)
    .then(res=>res.json())
    .then(data=>imageOfCharacters(data))
}
desconocidoBtn.addEventListener("click", ()=>
       filterUnknown ("gender", "unknown"));

//filtro: sin género:
const filterGenderless = (filterParam, valueParam) => {
    container.innerHTML="";
    currentGender = "genderless";
    currentPage = 1;
    fetch(`https://rickandmortyapi.com/api/character/?${filterParam}=${valueParam}`)
    .then(res=>res.json())
    .then(data=>imageOfCharacters(data))
    .catch((error) => {
        console.error("No more characters of gender genderless");
    })
}
singeneroBtn.addEventListener("click", ()=>
       filterGenderless ("gender", "genderless"));