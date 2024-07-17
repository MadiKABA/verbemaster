import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import img_illustration from "../../assets/images/congratulation.png";

const EndQuizPage = () => {
  const navigate = useNavigate();
  return (
    <div className="position-relative" id="home_page">
      <div className="d-flex justify-content-center">
        <img src={img_illustration} alt="" className="img-fluid" />
      </div>
      <div className="px-1">
        <p className="text-white text-center px-1 fs-5 fw-semibold">
          We hope that the results will be satisfactory and provide new
          information on your progress.
        </p>
      </div>
      <div className="w-100 position-fixed bottom-0 d-flex justify-content-between align-items-center px-2 py-3">
        <button
          onClick={() => navigate("/")}
          className="btn_primary btn_learn_quiz btn_link d-flex flex-column justify-content-center align-items-center"
        >
          <span>
            <Icon
              icon="material-symbols:home-outline"
              color="#3d83d9"
              width="28"
            />
          </span>
          <span>HOME</span>
        </button>
        <button
          onClick={() => navigate("/result_page")}
          className="btn_primary btn_start_quiz btn_link d-flex flex-column justify-content-center align-items-center"
        >
          <span>
            <Icon icon="fa6-solid:ranking-star" color="#3d83d9" width="28" />
          </span>
          <span>RESULTS</span>
        </button>
        <button
          onClick={() => navigate("/learning_page")}
          className="btn_primary btn_learn_quiz btn_link d-flex flex-column justify-content-center align-items-center"
        >
          <span>
            <Icon
              icon="fluent-mdl2:learning-tools"
              color="#3d83d9"
              width="28"
            />
          </span>
          <span>LEARN</span>
        </button>
      </div>
    </div>
  );
};

export default EndQuizPage;
