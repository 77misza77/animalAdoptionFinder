$(document).ready(function () {

    var pf = new petfinder.Client(
        {apiKey: "NJqFn81DJhnpwiGLEBQmjels2Zvpn9fBhKbMqwu1LBltmzBm9S",
            secret: "EYfiyRSoGl0zjwSoS5FJEfEbfOjS2hFqqLWJRtpd"});


    const myDivGallery = $(".gallery");
    // var myForm = $(".form");
//pobieranie nr id z adresu strony
    var url_string = window.location.href;
    console.log(url_string)
    var url = new URL(url_string);
    console.log(url)
    var id = url.searchParams.get("id");
    console.log(id);


// wyszukiwarka na radio i optionie wg rodzaju zwierzakow


        pf.animal.show(id)
            .then(function (response) {
                insertContent(response);

                // Do something with `response.data.animals`
                console.log("response", response);
            })

            .catch(function (error) {
                // Handle the error
                console.log(error);
            });


//funkcja strzalkowa - metoda w obiekcie
    insertContent = (response) => {
        // console.log("response", response);
        // console.log(response.data.animals.length);
//gdy tablica obiektow response jest zapelniona robimy nowa tablice
        var newTable = response.data.animal.photos;
        console.log(newTable);


            newTable.forEach( elementIn => {

                        var element = `
           <a data-fancybox="images" href="${elementIn.full}" data-caption="">
                    <img src="${elementIn.medium}" alt="animal+for+adoption"/>
                 </a>
            `;
                        myDivGallery.append(element);
                    })
                };


});