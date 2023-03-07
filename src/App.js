import AlbumSpace from "./AlbumSpace";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Toolbar from "./Toolbar";

const App = () => {
    return (
    <div className="main-page">
        <div className="workspace">
            <Navbar />
            <AlbumSpace />
            <Footer />
        </div>
        <div className="toolside">
            <h1 className="heading">Album List</h1>
            <Toolbar />
            <Searchbar />
        </div>
    </div>  
    );
}
 
export default App;