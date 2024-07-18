import { useEffect } from "react";
import img_illustration from "../../assets/images/illustration-home-page.png";
import { Icon } from "@iconify/react";
import {
  clearPost,
  clearResultQuiz,
  getPosts,
  initDB,
  savePosts,
} from "../../core/data/db";
import data from "../../core/data/data.json";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleQuiz = async () => {
    const db = await initDB();
    await clearResultQuiz(db);
    navigate("/quiz_page");
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const db = await initDB();
      const localPosts = await getPosts(db);
      if (localPosts.length === 0 || localPosts.length < data.length) {
        await clearPost(db);
        await savePosts(db, data);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="position-relative pt-5" id="home_page">
      <div className="mb-5">
        <h1 className="title_home_page">VerbeMaster</h1>
      </div>
      <div className="row m-0 p-0">
        <div className="col-8 content_text_home_page">
          <h2>Welcome</h2>
          <p>Master irregular verbs in a timeframe while having fun.</p>
        </div>
        <div className="col-4 d-flex justify-content-center">
          <img src={img_illustration} className="img_illustration_home_page" />
        </div>
      </div>
      <div className="content_cta_home_page d-flex flex-column flex-grow-1 pt-5">
        <div className="row flex-grow-1">
          <div className="col-6">
            <div className=" d-flex align-items-center flex-column">
              <button
                onClick={handleQuiz}
                className="btn_primary btn_start_quiz d-flex flex-column justify-content-center align-items-center"
              >
                <span>
                  <Icon icon="ic:outline-quiz" color="#3d83d9" width="48" />
                </span>
                <span>QUIZ</span>
              </button>
            </div>
          </div>
          <div className="col-6">
            <div className=" d-flex align-items-center flex-column">
              <button
                onClick={() => navigate("/learning_page")}
                className="btn_primary btn_learn_quiz d-flex flex-column justify-content-center align-items-center"
              >
                <span>
                  <Icon
                    icon="fluent-mdl2:learning-tools"
                    color="#3d83d9"
                    width="48"
                  />
                </span>
                <span>LEARN</span>
              </button>
            </div>
          </div>
          <div className="col-12 pt-0 mt-0">
            <div className=" d-flex align-items-center flex-column">
              <button
                onClick={() => navigate("/result_page")}
                className="btn_primary btn_learn_quiz d-flex flex-column justify-content-center align-items-center"
              >
                <span>
                  <Icon
                    icon="fa6-solid:ranking-star"
                    color="#3d83d9"
                    width="48"
                  />
                </span>
                <span>view Results </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
