import Navbar from '../components/Navbar';
import ServiceList from '../components/ServiceList';
import Footer from '../components/Footer';
import '../components/css/Navbar+Footer.css';


function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <ServiceList />
            </main>
            <Footer />
        </>
    );
}

export default HomePage;