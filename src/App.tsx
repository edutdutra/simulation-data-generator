import {Layout} from "antd";
import {GenericHeader} from "./components/GenericHeader";
import {SideMenu} from "./components/SideMenu";
import {Uniform} from "./pages/Uniform";
import {Triangulate} from "./pages/Triangulate";

function App() {

  return (
      <div>
          {/*<Uniform />*/}
          <Triangulate />
      </div>
  )
}

export default App
