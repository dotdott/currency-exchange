import "@/styles/global.scss";

import ConversionPage from "@/pages/ConversionPage/ConversionPage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <ConversionPage />
      <Footer />
    </>
  );
}

export default App;
