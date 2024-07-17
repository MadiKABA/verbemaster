import { useEffect, useState } from "react";
import {
  clearLastQuiz,
  getItemById,
  getLastQuiz,
  getPosts,
  initDB,
  saveLastQuiz,
  saveResulttQuiz,
} from "../../core/data/db";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [newQuiz, setNewQuiz] = useState<NewQuiz | null>(null);
  const [lastQuiz, setLastQuiz] = useState<NewQuiz | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [closePopup, setClosePopup] = useState<boolean>(false);
  const [answerQuiz, setAnswerQuiz] = useState<QuizState>({
    answer: "",
    past_tense: "",
    past_participle: "",
  });
  useEffect(() => {
    const fetchFirstQuiz = async () => {
      const db = await initDB();
      const valueLastQuiz: NewQuiz[] = await getLastQuiz(db);
      console.log(valueLastQuiz[0]);
      if (valueLastQuiz.length > 0) {
        setNewQuiz(valueLastQuiz[0]);
        setLastQuiz(valueLastQuiz[0]);
      } else {
        if (!newQuiz && !lastQuiz) {
          const result = await getItemById(1);
          if (result) {
            setNewQuiz(result);
            setLastQuiz(result);
            console.log(result);
          }
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
      if (newQuiz) {
        if (
          newQuiz.answer.trim().toLowerCase() ===
            answerQuiz.answer.trim().toLowerCase() &&
          newQuiz.past_participle.trim().toLowerCase() ===
            answerQuiz.past_participle.trim().toLowerCase() &&
          newQuiz.past_tense.trim().toLowerCase() ===
            answerQuiz.past_tense.trim().toLowerCase()
        ) {
          const db = await initDB();
          const resultQuiz = {
            id: newQuiz.id,
            quiz: newQuiz.quiz,
            answer: newQuiz.answer,
            past_tense: newQuiz.past_tense,
            past_participle: newQuiz.past_participle,
            is_validated: true,
          };
          await saveResulttQuiz(db, resultQuiz);
          await clearLastQuiz(db);
          await saveLastQuiz(db, newQuiz);
          const result = await getItemById(newQuiz.id + 1);
          if (result) {
            setNewQuiz(result);
            setLastQuiz(result);
            setAnswerQuiz({
              answer: "",
              past_participle: "",
              past_tense: "",
            });
            console.log("result next: ", result);
          }
        } else {
          const db = await initDB();
          setAttempts((prevAttempts) => prevAttempts + 1);
          if (attempts + 1 === 1) {
            toast.warning("Great effort 🤔🤔🤩🙂");
          } else if (attempts + 1 === 2) {
            setClosePopup(true);
          } else if (attempts + 1 === 3) {
            toast.error("OVER 😞😞😞😞");
            setAnswerQuiz({
              answer: "",
              past_participle: "",
              past_tense: "",
            });
            const resultQuiz = {
              id: newQuiz.id,
              quiz: newQuiz.quiz,
              answer: newQuiz.answer,
              past_tense: newQuiz.past_tense,
              past_participle: newQuiz.past_participle,
              is_validated: false,
            };
            await saveResulttQuiz(db, resultQuiz);
            await clearLastQuiz(db);
            await saveLastQuiz(db, newQuiz);
            const result = await getItemById(newQuiz.id + 1);
            if (result) {
              setNewQuiz(result);
              setLastQuiz(result);
            }
            setAttempts(0);
          }
        }
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
              <button
                disabled={closePopup}
                className="btn_next"
                onClick={handleSubmit}
              >
                Next
              </button>
            </div>
            <div className="d-flex justify-content-end px-3">
              <button
                onClick={() => navigate("/end_quiz_page")}
                className="btn_primary py-1 d-flex flex-column justify-content-center align-items-center fw-bold"
              >
                End QUIZ
              </button>
            </div>
          </div>
          {attempts === 2 && closePopup && (
            <div className="popup-container">
              <div className="popup">
                <p>
                  QUIZ: <span>{newQuiz?.quiz}</span>
                </p>
                <p>
                  Definition:{" "}
                  <span className="text-bold">{newQuiz?.answer}</span>
                </p>
                <p>
                  Past Tense:{" "}
                  <span className="text-bold">{newQuiz?.past_tense}</span>
                </p>
                <p>
                  Past Participle: <span className="text-bold">......</span>
                </p>
                <button onClick={() => setClosePopup(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
