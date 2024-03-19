import React from "react";

const Container = ({children, titulo}) => {
  return (
    <section className="content mt-3 mb-3">
      <div className="container-fluid">
        <div className="card card-primary card-outline">
          <div className="card-header">
            <h3 className="card-title" style={{textTransform:"uppercase", fontWeight:"bold"}}>{titulo}</h3>
          </div>
          <div className="card-body">
           {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Container;
