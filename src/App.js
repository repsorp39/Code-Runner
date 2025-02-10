import React from "react";
import "./styles/index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Wrapper from "./components/Wrapper";
import NotFound from "./pages/NotFound";
const App = () => {
  return (
    <>
      <BrowserRouter>
          <Wrapper>
            <Routes>
              <Route path="/" Component={ Home }></Route>
              <Route path="*" Component={ NotFound }></Route>
           </Routes>
          </Wrapper>
      </BrowserRouter>
    </>
  );
};

export default App;
