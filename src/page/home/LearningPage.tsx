import { useEffect, useState } from "react";

import { clearResultQuiz, getPosts, initDB } from "../../core/data/db";
import data from "../../core/data/data.json";
import { useNavigate } from "react-router-dom";
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
    const filteredData = data.filter(
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

      // Essayer de récupérer les posts depuis IndexedDB
      const localQuiz = await getPosts(db);
      if (localQuiz.length > 0) {
        setListQuiz(localQuiz);
        setListQuizFiltered(localQuiz);
      } else {
        setListQuiz(data);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="position-relative pt-5" id="home_page">
      <div className="mb-3">
        <h1 className="title_home_page">Learn</h1>
      </div>
      <div className="content_cta_home_page d-flex flex-column flex-grow-1 pt-5">
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
              {listQuizFiltred.length !== 0 ? (
                listQuizFiltred.map((quiz, index) => (
                  <tr key={index}>
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

export default LearningPage;
