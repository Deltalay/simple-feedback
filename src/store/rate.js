import { defineStore } from "pinia";
export const useRate = defineStore("rate_data", {
  state: () => {
    return {
      id: "",
      rate: 0,
      suggestion: "",
    };
  },
  actions: {
    async getRateData(data) {
      try {
        this.id = data.id;
        this.rate = data.rate;
        this.suggestion = data.suggestion;
      } catch (e) {
        if (e) {
          console.log(e);
          throw e;
        }
      }
    },
  },
});
