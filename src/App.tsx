import logoSvg from "@assets/logo.svg";
import TipCalculator from "./components/TipCalculator";

function App() {
  return (
    <>
      <div className="py-16">
        <img src={logoSvg} alt="logo" className="w-18 mx-auto" />
      </div>
      <TipCalculator />
    </>
  );
}

export default App;
