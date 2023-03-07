const Searchbar = () => {

    const client_id = 'fcacac8f88d04e6eb2fdf01f970bb574';
    const client_secret = 'e4b36b40a04940c79e794bc48db595c7';
    let access_token = '';

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

    async function retrieveAlbums(search_text,category) {
    
        await authenticate(client_id,client_secret)
            .then((data) => {
                access_token = data.access_token;
                console.log('Access token expires in: ' + data.expires_in);
            })
            .catch(error => console.log("there has been a problem fetching the data:", error.message));
        
        let queryString = "";
        search_text = htmlify(search_text);
        if (category === "album") {
           queryString = "q=album:" + search_text;
        }
        else if (category === "artist") {
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

    
    const getAlbums = () => {
        const search_text = document.querySelector('.search-bar').value;
        const category = document.querySelector('#category').value;
        console.log(search_text);
        console.log(category);
        if (search_text.length > 2){
            retrieveAlbums(search_text,category)
                .then((data) => {
                    console.log(data);
                })
                .catch(error => console.log("there has been a problem fetching the data:", error.message));
        }
        else {
            // error message
        }
    }

    return (  
        <form className ="search-form">
            <input
            autoComplete="off"
            placeholder="Electric Wizard"
            type="search" 
            name="search" 
            className="search-bar"
            />
            <select name="category" id="category">
                <option value="album">Album</option>
                <option value="artist">Artist</option>
            </select>
            <button onClick={getAlbums} type="button" id="search-button">Go</button>
        </form>
    );
}
 
export default Searchbar;