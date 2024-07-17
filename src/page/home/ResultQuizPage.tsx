import { useEffect, useState } from "react";
import img_illustration from "../../assets/images/golden-winner.png";
import { getResults, initDB } from "../../core/data/db";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

interface Quiz {
  id: number;
  quiz: string;
  answer: string;
  past_tense: string;
  past_participle: string;
  is_validated: boolean;
}

const ResultQuizPage = () => {
  //   const navigate = useNavigate();
  const navigate = useNavigate();
  const [listQuiz, setListQuiz] = useState<Quiz[] | []>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const db = await initDB();
      const localQuiz = await getResults(db);
      if (localQuiz.length > 0) {
        setListQuiz(localQuiz);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="position-relative " id="home_page">
      <div className=" d-flex align-items-start px-2 flex-column py-3">
        <button
          onClick={() => navigate("/")}
          className="btn_primary py-1 d-flex flex-column justify-content-center align-items-center"
        >
          <Icon icon="ep:back" color="#3d83d9" width="24" />
        </button>
      </div>
      <div className="mb-3">
        <h1 className="title_home_page">Result LastQuiz</h1>
      </div>
      <div className="row m-0 p-0">
        <div className="col-8 content_text_result_page mb-3">
          <p className="text-white fw-bold">Total Quiz : {listQuiz.length}</p>
          <p>
            Correct Answer :{" "}
            <span className="text-success fs-3 fw-bold">{2}</span>
          </p>
          <p>
            Incorrect Answer :{" "}
            <span className="text-danger fs-3 fw-bold">{2}</span>
          </p>
        </div>
        <div className="col-4 d-flex justify-content-center">
          <img src={img_illustration} className="img_illustration_home_page" />
        </div>
      </div>
      <div className="content_cta_home_page d-flex flex-column flex-grow-1 pt-5">
        <div className="row flex-grow-1">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Base</th>
                <th scope="col">Definition</th>
                <th scope="col">P. Tense</th>
                <th scope="col">P. Participle</th>
              </tr>
            </thead>
            <tbody>
              {listQuiz.length !== 0 ? (
                listQuiz.map((quiz, index) => (
                  <tr
                    key={index}
                    className={
                      quiz.is_validated ? "table-success" : "table-danger"
                    }
                  >
                    <td>{quiz.quiz}</td>
                    <td>{quiz.answer}</td>
                    <td>{quiz.past_tense}</td>
                    <td>{quiz.past_participle}</td>
                  </tr>
                ))
              ) : (
                <div>list void</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultQuizPage;
