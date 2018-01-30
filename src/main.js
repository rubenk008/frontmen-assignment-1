const $generateButton = $('#generate');
const $resultList = $('#resultList');
const $favorites = $('#favorites');
let countFavJoke = 0;

//Get Random Chuck Norris Quotes from Frontmen database.
function jokesRequest() {
    const xhr = new XMLHttpRequest();
    const url = 'http://api.icndb.com/jokes/random/10';
    xhr.responseType = 'json';
    xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE){
                console.log(xhr.response);
                let jsonResponse = xhr.response;
                let jokesArray = jsonResponse.value;
                jokesArray.forEach(function(value){
                    let joke = value.joke;
                    $resultList.append('<li>' + joke + '</li>')
                })
            }
        }   
    xhr.open('GET', url);
    xhr.send();
}

//Empty result field and fire AJAX function. 
function generate() {
    $resultList.empty();
    jokesRequest();
    return false;
}

//Add joke to favorites.
function addFavorite(){
    if(countFavJoke == 0){
        countFavJoke++;
        $favorites.empty();
        $(this).appendTo($favorites);
        storeFavo();
        return false;
    }
    else{
        countFavJoke++;
        $(this).appendTo($favorites);
        storeFavo();
        return false;
    }  
}

//remove joke from favorites.
function removeFavorite(){
    $(this).remove();
    storeFavo();
    return false;
}

/*Function to store favorites in local browser memory and will 
not be lost when the browser is closed or when the window is refreshed.*/
function storeFavo() {
    window.localStorage.myFavo = $favorites.html();
}

//Get the localy stored favorites. 
function getFavorites() {
    var storedFavo = window.localStorage.myFavo;
    if(!storedFavo) {
        $favorites.html("Unfortunatly you do not have any favorite Chuck jokes, what a shame!");
    }
    else{
        $favorites.html(storedFavo);    
    }
}

/*On document ready, fire getFavorites function in order to restore favorites.
jQuery equivelent of regular document ready expression*/
$(function() {
    getFavorites();
});

//Listen to event click on generate button.
$generateButton.click(generate);

//listen to event on list-item click in order to favorite.
$resultList.on('click', 'li', addFavorite);

//Listen to even on list-item click in order to remove favorite.
$favorites.on('click', 'li', removeFavorite);
