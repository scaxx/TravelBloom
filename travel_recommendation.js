const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const clearBtn = document.getElementById("clear-btn");
const destinationsDiv = document.querySelector(".destinations");

function searching() {

    const dest = searchBar.value.toLowerCase();

    fetch("./travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {

        const countries = data.countries;
        const temples = data.temples;
        const beaches = data.beaches;

        const filteredDestination = [];

        temples.forEach(temple => {

            if (dest === "country" || dest === "countries" ||dest === "temple" || dest === "temples" || temple.name.toLowerCase().includes(dest)) {

                filteredDestination.push({

                    name: temple.name,

                    description: temple.description,

                    imageUrl: temple.imageUrl

                });

            }

        });

        beaches.forEach(beach => {

            if (dest === "country" || dest === "countries" || dest === "beach" || dest === "beaches" || beach.name.toLowerCase().includes(dest)) {

                filteredDestination.push({

                    name: beach.name,

                    description: beach.description,

                    imageUrl: beach.imageUrl

                });

            }

        });

        countries.forEach(country => {

            if (dest === "country" || dest === "countries" || country.name.toLowerCase().includes(dest)) {

                country.cities.forEach(city => {

                    filteredDestination.push({

                        name: city.name,

                        description: city.description,

                        imageUrl: city.imageUrl

                    });

                });

            } else {
                
                country.cities.forEach(city => {

                    if (city.name.toLowerCase().includes(dest) || city.description.toLowerCase().includes(dest)) {

                        filteredDestination.push({

                            name: city.name,

                            description: city.description,

                            imageUrl: city.imageUrl

                        });

                    }

                });

            }

        });

        filteredDestination.forEach(destination => {

            destinationsDiv.style.display = 'block';

            const destinationDiv = document.createElement('div');
            destinationDiv.classList.add('destination')
            destinationDiv.innerHTML = `
                <img src="${destination.imageUrl}" alt="${destination.name}">
                <h2>${destination.name}</h2>
                <p>${destination.description}</p>
                <button>More info</button>
                `;
            destinationsDiv.appendChild(destinationDiv);

        });

    });

}

function clear() {
    
    destinationsDiv.innerHTML = '';
    filteredDestination = [];
    destinationsDiv.style.display = 'none';
    searchBar.value = '';

}


clearBtn.addEventListener("click", clear);
searchBtn.addEventListener("click", searching);
searchBar.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searching();
    }
});