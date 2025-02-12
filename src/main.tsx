import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import BoardGame from "./components/BoardGame.tsx";
import "./index.css";
import { appStore } from "./redux/app.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={appStore}>
    <StrictMode>
      <BoardGame />
    </StrictMode>
  </Provider>
);
