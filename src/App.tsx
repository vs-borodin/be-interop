import { Hero } from './components/Hero';
import { Installation } from './components/Installation';
import { Examples } from './components/Examples';
import { ApiReference } from './components/ApiReference';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Installation />
      <Examples />
      <ApiReference />
      <Footer />
    </div>
  );
}

export default App;
