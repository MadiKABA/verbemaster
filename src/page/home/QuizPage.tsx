import { useEffect, useState } from "react";
import { getItemById, getPosts, initDB, savePosts } from "../../core/data/db";
interface NewQuiz {
  id: number;
  quiz: string;
  answer: string;
  past_tense: string;
  past_participle: string;
}
interface QuizState {
  answer: string;
  past_tense: string;
  past_participle: string;
}
const QuizPage: React.FC = () => {
  const [error, setError] = useState(false);
  const [newQuiz, setNewQuiz] = useState<NewQuiz | null>(null);
  const [lastQuiz, setLastQuiz] = useState<NewQuiz | null>(null);
  const [answerQuiz, setAnswerQuiz] = useState<QuizState>({
    answer: "",
    past_tense: "",
    past_participle: "",
  });
  useEffect(() => {
    const fetchFirstQuiz = async () => {
      if (!newQuiz && !lastQuiz) {
        const result = await getItemById(1);
        if (result) {
          setNewQuiz(result);
          setLastQuiz(result);
          console.log(result);
        }
      }
    };
    const fetchPosts = async () => {
      const db = await initDB();
      const localPosts = await getPosts(db);
    //   const result = await getItemById(78);
      if (localPosts.length > 0) {
        // setPosts(localPosts);
        // console.log(localPosts);
      } else {
        // await savePosts(db, postsData);
        console.log(localPosts.length);
      }
    };
    fetchPosts();
    fetchFirstQuiz();
  }, []);
  const handleSubmit = async () => {
    if (
      answerQuiz.answer.trim() === "" ||
      answerQuiz.past_tense.trim() === "" ||
      answerQuiz.past_participle.trim() === ""
    ) {
      setError(true);
      return;
    } else {
      if (
        newQuiz?.answer.trim().toLowerCase() === answerQuiz.answer.trim().toLowerCase()&&
        newQuiz.past_participle.trim().toLowerCase() === answerQuiz.past_participle.trim().toLowerCase() &&
        newQuiz.past_tense.trim().toLowerCase() === answerQuiz.past_tense.trim().toLowerCase()
      ) {
        const result = await getItemById(newQuiz?.id + 1);
        if (result) {
          setNewQuiz(result);
          setLastQuiz(result);
          setAnswerQuiz({
            ...answerQuiz,
            answer: "",
            past_participle:"",
            past_tense: "",
          })
          console.log("result next: ",result);
        }
      } else {
      }
      setError(false);
      console.log(answerQuiz);
    }
  };
  return (
    <div className="position-relative pt-5" id="home_page">
      <div className="mb-3">
        <h1 className="title_quiz_page">QUIZ</h1>
      </div>
      <div className="row pb-3">
        <p className="title_quiz">{newQuiz && newQuiz.quiz}</p>
      </div>
      <div className="content_cta_home_page d-flex flex-column flex-grow-1 pt-5">
        <div className="row">
          <div className="col-12">
            <div className="content_input_quiz">
              <label htmlFor="">
                Response(VF){" "}
                <span className="ms-1 text-danger">
                  {error && !answerQuiz.answer ? "is required" : ""}
                </span>
              </label>
              <input
                type="text"
                className="input_quiz"
                value={answerQuiz?.answer}
                onChange={(e) =>
                  setAnswerQuiz({
                    ...answerQuiz,
                    answer: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-12">
            <div className="content_input_quiz">
              <label htmlFor="">
                Past tense{" "}
                <span className="ms-1 text-danger">
                  {error && !answerQuiz.past_tense ? "is required" : ""}
                </span>
              </label>
              <input
                type="text"
                className="input_quiz"
                value={answerQuiz.past_tense}
                onChange={(e) =>
                  setAnswerQuiz({
                    ...answerQuiz,
                    past_tense: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-12">
            <div className="content_input_quiz">
              <label htmlFor="">
                Past participle
                <span className="ms-1 text-danger">
                  {error && !answerQuiz.past_participle ? "is required" : ""}
                </span>
              </label>
              <input
                type="text"
                className="input_quiz"
                value={answerQuiz.past_participle}
                onChange={(e) =>
                  setAnswerQuiz({
                    ...answerQuiz,
                    past_participle: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-12">
            <div className="content_input_quiz px-3">
              <button className="btn_next" onClick={handleSubmit}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
