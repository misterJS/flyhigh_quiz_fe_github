import axios from "axios";

const baseURL = "https://quiz.flyhigh.my/flyhigh_be/api";

const API = axios.create({
  baseURL: `${baseURL}/kiddo`,
});

export const GetAllLanguages = async () => {
  const response = await API.get("/read/GetAllLanguages");
  return response.data;
};
export const GetProfile = async (id) => {
  const response = await API.get("/read/GetProfile", {
    params: {
      userId: id,
    },
  });
  return response.data;
};

export const submitAnswer = async (guid, studentId, answers) => {
  try {
    const formData = new FormData();

    formData.append("guid", guid);
    formData.append("studentId", studentId);

    formData.append("ansJson", JSON.stringify(answers.filter(Boolean)));

    console.log(
      "Submitting (FormData):",
      Object.fromEntries(formData.entries())
    );

    await axios.post(
      "https://quiz.flyhigh.my/flyhigh_be/api/kiddo/insert/SubmitAnswer",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    localStorage.removeItem("quiz_timer");
    localStorage.removeItem("selected_answers");
  } catch (err) {
    console.error("Gagal submit jawaban:", err);
  }
};
