import {Layout} from "antd";
import {GenericHeader} from "./components/GenericHeader";
import {SideMenu} from "./components/SideMenu";

import {Uniform} from "./pages/Uniform";
import {Triangulate} from "./pages/Triangulate";
import {Exponential} from "./pages/Exponential";
import {Normal} from "./pages/Normal";


function App() {

  return (
      <div>
          {/*<Uniform />*/}
          {/*<Triangulate />*/}
          {/*<Exponential />*/}
          <Normal />
      </div>
  )
}

export default App
