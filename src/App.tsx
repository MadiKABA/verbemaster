import { BrowserRouter } from "react-router-dom";
import IndexRoutes from "./routes/IndexRoutes";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect } from "react";
import { initDB } from "./core/data/db";
function App() {
  useEffect(() => {
    const fetchPosts = async () => {
      await initDB();
    };
    fetchPosts();
  }, []);
  return (
    <>
      <div className="App">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Zoom}
        />

        <BrowserRouter>
          <IndexRoutes />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
