import "./App.css";
import { PrivateRoute } from "./pages/PrivateRoute";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import ClientEditPage from "./pages/ClientEditPage";
import AddClientPage from "./pages/AddClientPage";
import ClientsPage from "./pages/ClientsPage";
import ClientDetailsPage from "./pages/ClientDetailsPage";
import TestPage from "./pages/TestPage";
import ClientGalleryPage from "./pages/ClientGalleryPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/addclient" element={<AddClientPage />} />
          <Route path="/testpage" element={<TestPage />} />

          <Route path="/client/:clientId" element={<ClientDetailsPage />} />
          <Route path="/client/edit/:clientId" element={<ClientEditPage />} />
          <Route
            path="/client/gallery/:clientId"
            element={<ClientGalleryPage />}
          />
          {/* after login */}
        </Route>
        <Route path="/signin" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
