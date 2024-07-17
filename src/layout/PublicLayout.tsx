import { Outlet } from "react-router";
import "./home.verbemaster.css";

function PublicLayout() {
  return (
    <main id="public_layout">
      <Outlet />
    </main>
  );
}

export default PublicLayout;
