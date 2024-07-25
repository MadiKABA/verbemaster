import { useEffect, useState } from "react";

import {
  clearLastQuiz,
  clearPost,
  deleteItem,
  getPosts,
  initDB,
} from "../../core/data/db";
import data from "../../core/data/data.json";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

interface Quiz {
  id: number;
  quiz: string;
  answer: string;
  past_tense: string;
  past_participle: string;
}

const LearningPage = () => {
  const navigate = useNavigate();
  const [listQuiz, setListQuiz] = useState<Quiz[]>([]);
  const [listQuizFiltred, setListQuizFiltered] = useState<Quiz[]>([]);

  const [filter, setFilter] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFilter = e.target.value.toLowerCase();
    const filteredData = listQuiz.filter(
      (item) =>
        item.quiz.toLowerCase().includes(currentFilter) ||
        item.answer.toLowerCase().includes(currentFilter) ||
        item.past_tense.toLowerCase().includes(currentFilter) ||
        item.past_participle.toLowerCase().includes(currentFilter)
    );
    setFilter(currentFilter);
    setListQuizFiltered(filteredData);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const db = await initDB();
      const localQuiz = await getPosts(db);
      if (localQuiz.length > 0) {
        setListQuiz(localQuiz);
        setListQuizFiltered(localQuiz);
      } else {
        setListQuiz(data);
        setListQuizFiltered(data);
      }
    };
    fetchPosts();
  }, []);
  const onDeleted = async (id: number) => {
    const db = await initDB();
    await deleteItem(db, id);
    toast.success("Quiz deleted success");
    // await clearLastQuiz(db);
    const localQuiz = await getPosts(db);
    setListQuiz(localQuiz);
    setListQuizFiltered(localQuiz);
  };
  const onClearData = async () => {
    const db = await initDB();
    await clearLastQuiz(db);
    await clearPost(db);
    const localQuiz = await getPosts(db);
    if (localQuiz.length > 0) {
      setListQuiz(localQuiz);
      setListQuizFiltered(localQuiz);
    } else {
      setListQuiz(data);
      setListQuizFiltered(data);
    }
  };
  return (
    <div className="position-relative" id="home_page">
      <div className=" d-flex justify-content-between align-items-center px-2 py-3">
        <button
          onClick={() => navigate("/")}
          className="btn_primary py-1 d-flex flex-column justify-content-center align-items-center"
        >
          <Icon icon="ep:back" color="#3d83d9" width="24" />
        </button>
        <button
          onClick={() => navigate("/add_new_quiz_page")}
          className="btn_primary py-1 d-flex flex-column justify-content-center align-items-center fw-bold"
        >
          Add New QUIZ
        </button>
      </div>
      <div className="mb-3">
        <h1 className="title_home_page">Learn</h1>
      </div>
      <div className="content_cta_home_page d-flex flex-column flex-grow-1 pt-5">
        <div>
          <button onClick={onClearData} className="btn m-0 p-1 btn-danger">
            <Icon icon="material-symbols:delete" color="#ffffff" width="20" />{" "}
            <span>Clear DataBase</span>
          </button>
        </div>
        <div className="content_input_quiz">
          <label htmlFor="">
            Filter by quiz, past tense, or past participle{" "}
          </label>
          <input
            type="text"
            className="input_quiz"
            value={filter}
            onChange={handleChange}
          />
        </div>
        <div className="row flex-grow-1">
          <p className="fw-bold">Total Verbe : {listQuizFiltred.length}</p>
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
              {listQuizFiltred.length !== 0 || listQuiz.length !== 0 ? (
                listQuizFiltred.map((quiz, index) => (
                  <tr key={index}>
                    <td>{quiz.quiz}</td>
                    <td>{quiz.answer}</td>
                    <td>{quiz.past_tense}</td>
                    <td>
                      {quiz.past_participle}{" "}
                      <button
                        onClick={() => onDeleted(quiz.id)}
                        className="btn m-0 p-1 btn-danger"
                      >
                        <Icon
                          icon="material-symbols:delete"
                          color="#ffffff"
                          width="20"
                        />
                      </button>
                    </td>
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

export default LearningPage;
