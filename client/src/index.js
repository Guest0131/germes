import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import { Provider } from "react-redux";
import { store } from "./redux/store";


const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WagmiConfig client={client}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </WagmiConfig>
);
