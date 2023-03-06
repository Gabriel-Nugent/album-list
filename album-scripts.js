const client_id = id;
const client_secret = secret;

const add_album = document.querySelector(".add-album");
const modal = document.querySelector(".modal");
const album_image = document.querySelector(".album-image");
const overlay = document.querySelector(".overlay");
const close_button = document.querySelector(".close-modal");
const search_button = document.querySelector(".search-button");

add_album.addEventListener("click",() => {
    openModal(modal);
    openModal(album_image);
    openModal(overlay);
})

close_button.addEventListener("click",() => {
    closeModals();
})

search_button.addEventListener("click", () => {
    const search_text = document.querySelector("#album-search").value;
    if (search_text.length > 2){
        const search_category = document.querySelector("#category-select").value;
        retrieveAlbums(search_text,search_category)
            .then((data) => {
                displayAlbumNames(data);
            })
            .catch(error => console.log("there has been a problem fetching the data:", error.message));
    }
    else {
        // error message
    }
})

await function displayAlbumNames(data){
    const modal_body = document.querySelector(".modal-body")
    for (album in data.albums.items){
        let output = data.albums.items[album].name + " - ";
        for (artist in data.albums.items[album].artists){
            output += "[" + data.albums.items[album].artists[artist].name + "]";
        }
        console.log(output);
    }
}

function htmlify(string) {
    return string.replace(' ', '%20')
}

async function authenticate(client_id,client_secret) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    if (response.status !== 200){
        throw new Error('cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

function closeModals() {
    modal.classList.remove("active");
    //album_image.classList.remove("active");
    overlay.classList.remove("active");
}

function openModal(modal) {
    if (modal == null) return
    modal.classList.add("active");
}

async function retrieveAlbums(search_text,category) {
    
    await authenticate(client_id,client_secret)
        .then((data) => {
            access_token = data.access_token;
            console.log('Access token expires in: ' + data.expires_in);
        })
        .catch(error => console.log("there has been a problem fetching the data:", error.message));
    
    let queryString = "";
    search_text = htmlify(search_text);
    if (category === "Album") {
       queryString = "q=album:" + search_text;
    }
    else if (category === "Artist") {
        queryString = "q=artist:" + search_text;
    }
    const url = 'https://api.spotify.com/v1/search?' + queryString + '&type=album&limit=10';
    const response = await fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + access_token,
        }
    });
    if (response.status !== 200){
        throw new Error('cannot fetch the data');
    }
    const data = await response.json();
    return data;
}
