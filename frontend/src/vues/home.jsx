import Footer from "../components/footer"
import Header from "../components/header"
import Presentation from "../components/Home/presentation"
import TopIdee from "../components/Home/topidee"

const Home = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Header />
            <main style={{ flex: '1' }}>
                <Presentation/>
                <TopIdee/>
            </main>
            <Footer/>
        </div>
    )
}

export default Home