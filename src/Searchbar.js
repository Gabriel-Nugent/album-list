const Searchbar = () => {
    return (  
        <form className ="search-form">
            <input 
            autocomplete="off"
            placeholder="Electric Wizard"
            type="search" 
            name="search" 
            className="search-bar"
            />
            <select name="category" id="category">
                <option value="album">Album</option>
                <option value="artist">Artist</option>
            </select>
            <button type="button" class="search-button">Go</button>
        </form>
    );
}
 
export default Searchbar;