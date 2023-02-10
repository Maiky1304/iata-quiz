import React from "react";
import ReactDOM from "react-dom/client";
import QuizApp from "./QuizApp";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { lightTheme } from "./themes/light.theme";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <NextUIProvider theme={lightTheme}>
                <QuizApp />
            </NextUIProvider>
        </Provider>
    </React.StrictMode>
);
