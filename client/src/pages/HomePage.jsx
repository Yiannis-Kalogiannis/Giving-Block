import Navbar from '../components/Navbar';
import ServiceList from '../components/ServiceList';
import Footer from '../components/Footer';
import '../components/css/Navbar+Footer.css';
import './css/HomePage.css';


function HomePage() {
    return (
        <div className="home-page">
            <Navbar />
            <main>
                <ServiceList />
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;