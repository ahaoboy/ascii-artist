import { useState, Suspense, useEffect } from "react";
import Config from "./Config";
import { useSnapshot } from "binia";
import { store } from "./store";
import { updateImage } from "./share";
import githubUrl from "../../test/t.webp?url";
function App() {
  useEffect(() => {
    updateImage(githubUrl);
  }, []);
  const snap = useSnapshot(store);
  return (
    <>
      <div className="hide-wrap">
        <pre className="pre" id="hide-pre">
          {snap.ascii}
        </pre>
      </div>

      <div className="main">
        <div className="config">
          <Config></Config>
        </div>
        <div className="view">
          <div className="image">
            <img src={snap.url} id="img" alt="" />
          </div>
          <div className="text">
            <pre className="pre" style={{ zoom: snap.textScale }}>
              {snap.ascii}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
