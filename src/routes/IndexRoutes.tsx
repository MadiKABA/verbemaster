import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRouter";

function IndexRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
    </Routes>
  );
}

export default IndexRoutes;
