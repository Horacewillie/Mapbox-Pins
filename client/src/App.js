import React from "react";
import { Suspense } from "react";
import Loading from "./component/Loading/Loading";
const Map = React.lazy(() => import("./component/Map/Map"));

function App() {
  return (
    <div className="App">
      
        <Suspense fallback={<Loading />}>
          <Map />
        </Suspense>
    </div>
  );
}

export default App;
