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
                 <a data-fancybox="images" href="${elementIn.photos[0].full}" data-caption="${elementIn.name}">
                    <img src="${elementIn.photos[0].medium}" class="card-img-top" alt="animal+for+adoption"/>
                 </a>
                 <a class="card-body">
                 <h4 class="card-title">${elementIn.name}</h4>
                   <h5 class="card-title">${elementIn.gender}, ${elementIn.age}</h5>
  
                    <p class="card-text">${elementIn.description}</p>
                    <a href="details.html?id=${elementIn.id}" class="btn btn-info">GALERIA ZDJĘĆ</a>
                    
                     
                    <a href="adoption_form.html" class="btn btn-success">ADOPTUJ MNIE!</a>
                   
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
                            <h1>Niestety nie mamy takiego zwierzaka. Wybierz innego!</h1>
                            <img src="img/funny_dog.jpg" class="my-height" alt="funny_dog">
<!--                            width="60px" height="60px"-->
                         </div>`;
        myDivGallery.append(element1);
    }

    };


});