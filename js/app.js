$(document).ready(function () {

    var pf = new petfinder.Client(
        {apiKey: "NJqFn81DJhnpwiGLEBQmjels2Zvpn9fBhKbMqwu1LBltmzBm9S",
            secret: "EYfiyRSoGl0zjwSoS5FJEfEbfOjS2hFqqLWJRtpd"});


    const myDivGallery = $(".gallery");
    var myForm = $(".form1");
    // var myInput = $(".form-search");
    var myButton = $(".form-search-btn");
    var radioAnimalType = "";

// wyszukiwarka na radio i optionie wg rodzaju zwierzakow

    myForm.on("submit", function (event) {
        event.preventDefault();
        // console.log("test");
        //przeciwdzialanie nadmiarowosci
        myButton.attr("disabled", "true");
        myButton.addClass("loading");

        //czyszczenie diva gallery
        myDivGallery.empty();
        // console.log($("#Radio1").is(':checked'));
        if ($("#Radio1").is(':checked')) {
            radioAnimalType = "Dog"
        }
        else if ($("#Radio2").is(':checked')) {
            radioAnimalType = "Cat"
        }
        else if ($("#Radio3").is(':checked')) {
            radioAnimalType = "Horse"
        }
        else {
            radioAnimalType = "Cow"
        }

        // wywolanie funkcji
        loadCards(radioAnimalType);
        //czyszczenie inputa

    });


function loadCards (animalType) {

    pf.animal.search({limit:100})
        .then(function (response) {
            insertContent(response, animalType);

            // Do something with `response.data.animals`
            console.log(response);
            myButton.removeAttr("disabled");
            myButton.removeClass("loading");
            //iteracja tablicy probnie
            // response.data.animals.forEach(
            //     animal => {
            //         console.log(animal.name);
            //         console.log(animal.photos);
            //         console.log(animal.type);
            //         console.log(animal.description);
            //     });
        })
        .catch(function (error) {
            // Handle the error
            myButton.removeAttr("disabled");
            myButton.removeClass("loading");
            console.log(error);
        });
}

//funkcja strzalkowa - metoda w obiekcie
insertContent = (response, animalType) => {
    // console.log(animalType, "animalType");
console.log(response.data.animals.length);

//gdy tablica obiektow response jest zapelniona robimy nowa tablice
        var newTable = response.data.animals.filter(el => el.species === animalType);

        console.log(newTable);
    //warunek dotyczacy pustej tablicy gdy nie ma zwierzakow do adopcji
    if (newTable.length !== 0) {

        newTable.forEach(function (elementIn) {
            //uwaga baktiki
            //robimy warunek dotyczacy ilosci zdjec
                if (!(elementIn.photos.length === 0)) {
                    // console.log(elementIn.photos[0])
                    var element = `
<!--         bootstrapowy card-->
                <div class="card gallery-element">
                <a data-fancybox="gallery" href="${elementIn.photos[0].full}" class="gallery-element">
                <img src="${elementIn.photos[0].full}" class="card-img-top" alt="animal+for+adoption">
                     <div class="card-body">
                     <h4 class="card-title">${elementIn.name}</h4>
                </a>
                       
                       <h5 class="card-title">${elementIn.gender}</h5>
                       <h6 class="card-title">${elementIn.age}</h6>
                        <p class="card-text">${elementIn.description}</p>
                        <a href="#" class="btn btn-success">ADOPTUJ</a>
                        </div>
                </div>
            `;
                    myDivGallery.append(element);
                }


            }
        );

    }
    //druga czesc warunku jesli tablica jest pusta
    else {
        var element1 =  `<div>
                            <h1>Niestety nie mamy innych zwierząt do adopcji.</h1>
                            <h1>Wybierz innego zwierza!</h1>
                            <img src="img/funny_dog.jpg" class="card-img-top" alt="funny_dog">
<!--                            width="60px" height="60px"-->
                         </div>`;
        myDivGallery.append(element1);
    }

    };


});