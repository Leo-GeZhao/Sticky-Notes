import React from "react";
import Card from "../../components/Card/Card";

const Archive = ({ archives, setRender }) => {
  return (
    <div className="container mt-2">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {archives.map((a) => (
          <div className="col-lg">
            <Card
              title={a.title}
              desc={a.description}
              category={a.category}
              id={a.id}
              archive={a.is_archived}
              deadline={a.deadline}
              setRender={setRender}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archive;
