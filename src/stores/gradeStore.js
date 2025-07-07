import { defineStore } from "pinia";
import { QuizGradeAll } from "@/api/quizApi";

export const useQuizGradeAll = defineStore("gradeList", {
  state: () => ({
    grade: null,
  }),

  actions: {
    async Grade(force = false) {
      if (this.grade !== null && !force) {
        return {
          grade: this.grade,
        };
      }

      const data = await QuizGradeAll();

      this.grade = data;

      return {
        grade: this.grade,
      };
    },

    deleteGrade() {
      this.grade = null;
      this.user = null;
    },
  },
});
