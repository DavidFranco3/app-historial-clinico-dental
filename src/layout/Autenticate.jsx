import React from "react";
import Header from "./section/Header";
import Menu from "./section/Menu";
import Footer from "./section/Footer";

const Autenticate = ({children}) => {
  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <div className="content-wrapper">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Autenticate;
