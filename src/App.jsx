import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Gallery from './components/Gallery.jsx';
import Contacts from './components/Contacts.jsx';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Gallery />
        <Contacts />
      </main>
    </div>
  );
}

export default App;
