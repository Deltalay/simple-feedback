<template>
  <div>
    <nav className="nav-contain">
      <span>Feedback</span>
    </nav>
    <div class="form-container">
      <form @submit.prevent="handleFormSubmit" class="form-contain">
        <span class="title-form">How would you like to rate our school? </span>
        <div class="star-container">
          <svg
            :key="index"
            @click="handleClick(index + 1)"
            v-for="(_, index) in star"
            stroke="currentColor"
            stroke-width="0"
            viewBox="0 0 576 512"
            :name="'star_' + (index + 1)"
            class="star-hover"
            color="currentColor"
            :fill="_value > index ? color.orange : color.normal"
            height="26"
            width="26"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
            ></path>
          </svg>
        </div>
        <div class="suggestion-div">
          <label class="label-text"
            >Do you have any suggestion to make our school better?</label
          >
          <div class="div-textarea">
            <textarea
              required
              style="overflow: hidden"
              name="suggestion"
              v-model="_message"
              placeholder="Enter your suggestion!"
              class="textarea-suggestion"
            ></textarea>
          </div>
        </div>
        <div class="btn-div">
          <button
            name="_action"
            value="create"
            type="submit"
            :disabled="_value >= 1 ? false : true"
            class="btn-submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    <div class="review-stat">
      <h4>{{ count }} Reviews</h4>
      <h4>Average Rating: {{ average }}</h4>
    </div>
    <div>
      <CardCom
        v-for="i in data"
        :id="i.id"
        :key="i.id"
        :content="i.suggestion"
        :rating="i.rate"
      />
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=GFS+Neohellenic&family=Roboto&display=swap");
.nav-contain {
  font-family: "Bubblegum Sans", cursive;
  background-color: #4b3f72;
  text-align: center;
  color: white;
  font-size: 42px;
  padding: 1px;
}
.form-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: white;
  border: none;
  border-radius: 12px;
  padding: 15px 0px;
  width: 75%;
  margin: auto;
  margin-top: 24px;
}
.title-form {
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-family: "GFS Neohellenic", sans-serif;
  text-align: center;
  font-weight: 500;
  padding: 8px;
}
.star-hover {
  cursor: pointer;
}
.star-container {
  padding: 5px 0px;
  display: flex;
  margin: auto;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.label-text {
  font-family: "Roboto", sans-serif;
  position: relative;
  margin: 9px 0px;
}
.review-stat {
  font-family: "Roboto", sans-serif;
  display: flex;
  justify-content: space-between;
  color: white;
  width: 75%;
  margin: auto;
}
.div-textarea {
  padding: 8px 0px;
}
.suggestion-div {
  display: block;
  margin: auto;
  padding: 10px 0px 0px 0px;
  width: 100%;
  position: relative;
}
.textarea-suggestion {
  resize: none;
  overflow-y: scroll;
  margin-top: 20px;
  padding: 8px 4px;
  display: block;
  width: 100%;
  margin: auto;
  height: 100px;
}
.form-contain {
  width: 80%;
  outline: none;
}
.btn-div {
  display: flex;
  justify-content: center;
  padding: 10px 0px;
}

.btn-submit {
  border: none;
  background-color: hsl(254, 29%, 50%);
  color: white;
  border-radius: 4px;
  padding: 10px 30px;
  font-weight: 500;
  white-space: nowrap;
  font-family: "Roboto", sans-serif;
  transition: background-color ease-in 0.2s;
}
.btn-submit:hover {
  cursor: pointer;
  background-color: hsl(254, 29%, 45%);
}
.btn-submit:active {
  background-color: hsl(254, 29%, 35%);
}
.btn-submit:disabled {
  background-color: hsl(254, 29%, 65%);
}
.btn-submit:disabled:hover {
  cursor: not-allowed;
}
.form-validation-error {
  color: #dc3545;
  font-family: "Roboto", sans-serif;
  font-size: 80%;
  margin: auto;
}
</style>
<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import CardCom from "./components/CardCom.vue";
import pb from "./main";
const data = ref([]);
let _value = ref(0);
const count = ref(0);
const average = ref(0);
const _message = ref("");
function handleClick(data) {
  _value.value = data;
}
onBeforeUnmount(() => {
  pb.collection("content").unsubscribe("*");
});
onMounted(() => {
  pb.collection("content")
    .subscribe("*", ({ action, record }) => {
      if (action == "create") {
        data.value = [...data.value, record];
        const allValue = data.value.length;
        let valueOfRate = 0;
        for (let i = 0; i < allValue; i++) {
          valueOfRate += Number(data.value[i].rate);
        }
        count.value = allValue;
        average.value = calculateAverage(allValue, valueOfRate);
      }
      if (action == "delete") {
        data.value = data.value.filter((m) => m.id !== record.id);
        const allValue = data.value.length;
        let valueOfRate = 0;
        for (let i = 0; i < allValue; i++) {
          valueOfRate += Number(data.value[i].rate);
        }
        count.value = allValue;
        average.value = calculateAverage(allValue, valueOfRate);
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(error.originalError);
    });
});
onBeforeMount(async () => {
  const records = await pb
    .collection("content")
    .getFullList(200 /* batch size */, {
      sort: "-created",
    });
  const allValue = records.length;
  let valueOfRate = 0;
  for (var i = 0; i < allValue; i++) {
    valueOfRate += Number(records[i].rate);
  }
  count.value = allValue;
  average.value = calculateAverage(allValue, valueOfRate);
  data.value = records;
});
async function handleFormSubmit() {
  const createDat = {
    rate: _value.value,
    suggestion: _message.value,
  };
  await pb.collection("content").create(createDat);
}
function calculateAverage(allValue, sumOfAllValue) {
  const average = sumOfAllValue / allValue;
  const r = Math.round((average + Number.EPSILON) * 100) / 100;
  if (Number.isNaN(r)) {
    return 0;
  } else {
    return r;
  }
}
const color = {
  orange: "#ffba5a",
  normal: "currentColor",
};
const star = Array(5).fill(0);
</script>
