import { Hero } from './components/Hero';
import { WhyDataList } from './components/WhyDataList';
import { Features } from './components/Features';
import { Installation } from './components/Installation';
import { Examples } from './components/Examples';
import { ApiReference } from './components/ApiReference';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <WhyDataList />
      <Installation />
      <Examples />
      <ApiReference />
      <Footer />
    </div>
  );
}

export default App;
