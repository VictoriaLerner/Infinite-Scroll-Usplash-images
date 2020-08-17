 //unsplash Api

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesloaded=0;
let totalImages=0;
let photosArray = [];
let initialLoad = true;

let count = 5;
const apiKey = 'Qaxj8VWzIhx5yEEd5NH3cvCuNOjM4pdRszb86pc3-j0';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// check if all images are loaded

function imageLoaded() {
    imagesloaded++;
    if(imagesloaded === totalImages){
    ready = true;
    loader.hidden=true;
    initialLoad = false;
    count = 30;

    }
}


//Create Elements for links & photos, add to DOM
function displayPhotos() {
    imagesloaded=0;

    totalImages=photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        //Create a link to unsplash
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        //Create img for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);


// Event listener, check when each is finisched loading
        img.addEventListener('load' , imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);

    })

}

//Get photos from unsplash api

async function getPhotos() {

    try {
        const responce = await fetch(apiUrl);
        photosArray = await responce.json();
        displayPhotos();
    } catch (error) {

    }

}


window.addEventListener('scroll' , ()=>{
if(window.innerHeight + window.scrollY >= document.body.offsetHeight -
    1000 && ready){

   ready = false;
    getPhotos();
}

});

getPhotos();


