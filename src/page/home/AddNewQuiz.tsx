import { useFieldArray, useForm } from "react-hook-form";
import { getPosts, initDB, savePosts } from "../../core/data/db";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

interface FormValues {
  entries: {
    id: number;
    quiz: string;
    answer: string;
    past_tense: string;
    past_participle: string;
  }[];
}
const AddNewQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [idLastQuiz, setIdLastQuiz] = useState<number>(0);

  const { register, control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      entries: [
        {
          id: idLastQuiz,
          quiz: "",
          answer: "",
          past_tense: "",
          past_participle: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "entries",
  });
  const onSubmit = async (data: FormValues) => {
    const db = await initDB();
    const localPosts = await getPosts(db);
    console.log(localPosts[localPosts.length]);
    const modifiedData = data.entries.map((item) => {
      return {
        ...item,
        id: localPosts[localPosts.length - 1].id + 1,
      };
    });
    await savePosts(db, modifiedData);
    toast.success("Quiz creating success");
    setTimeout(() => {
      reset();
      navigate("/learning_page");
    }, 3000);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const db = await initDB();
      const localPosts = await getPosts(db);
      console.log(localPosts);

      if (localPosts.length > 0) {
        console.log(localPosts.length);

        setIdLastQuiz(localPosts[localPosts.length].id);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="position-relative pt-3" id="home_page">
      <div className=" d-flex justify-content-between align-items-center px-2 py-3">
        <button
          onClick={() => navigate("/learning_page")}
          className="btn_primary py-1 d-flex flex-column justify-content-center align-items-center"
        >
          <Icon icon="ep:back" color="#3d83d9" width="24" />
        </button>
      </div>
      <div className="mb-3">
        <h1 className="title_quiz_page">Add New QUIZ</h1>
      </div>
      <div className="content_cta_home_page d-flex flex-column flex-grow-1 pt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div className="shadow bg-white py-2 shadow-sm" key={field.id}>
              <div className="content_input_quiz mb-1">
                <label htmlFor="">QUIZ {index + 1}</label>
                <input
                  type="text"
                  className="input_quiz"
                  {...register(`entries.${index}.quiz` as const, {
                    required: true,
                  })}
                  placeholder="Quiz"
                />
              </div>
              <div className="content_input_quiz mb-1">
                <label htmlFor="">Response(VF) </label>
                <input
                  type="text"
                  className="input_quiz"
                  {...register(`entries.${index}.answer` as const, {
                    required: true,
                  })}
                  placeholder="Answer"
                />
              </div>

              <div className="content_input_quiz mb-1">
                <label htmlFor="">Past Tense </label>
                <input
                  type="text"
                  className="input_quiz"
                  {...register(`entries.${index}.past_tense` as const, {
                    required: true,
                  })}
                  placeholder="Past past_tense"
                />
              </div>
              <div className="content_input_quiz mb-1">
                <label htmlFor="">Past Participle </label>
                <input
                  type="text"
                  className="input_quiz"
                  {...register(`entries.${index}.past_participle` as const, {
                    required: true,
                  })}
                  placeholder="Past Participle"
                />
              </div>
              <div className="d-flex justify-content-end px-3">
                <button
                  className="btn btn btn-danger"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Retirer
                </button>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-between px-2 mt-4">
            <button
              className=" btn btn-primary"
              type="button"
              onClick={() =>
                append({
                  id: fields.length,
                  quiz: "",
                  answer: "",
                  past_tense: "",
                  past_participle: "",
                })
              }
            >
              Add New
            </button>
            <button className="btn btn-success fw-bold" type="submit">
              Save QUIZ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewQuiz;
