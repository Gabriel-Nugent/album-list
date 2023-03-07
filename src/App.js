import AlbumSpace from "./AlbumSpace";
import Footer from "./Footer";
import Navbar from "./Navbar";
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
            <Toolbar />
        </div>
    </div>  
    );
}
 
export default App;