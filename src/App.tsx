import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="bg-slate-200 h-dvh w-full">
      <Header />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}

export default App;
