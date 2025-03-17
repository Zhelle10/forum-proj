import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import ThreadDetails from "./pages/ThreadDetails";
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="thread/:threadId" element={<ThreadDetails />} />
    </Route>
));