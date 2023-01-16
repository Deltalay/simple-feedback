<template>
  <div class="card-container">
    <div class="num-display">{{ rating }}</div>

    <form
      class="form-icon"
      method="put"
      @submit.prevent="$emit('handleEdit', data)"
    >
      <button type="submit" name="_action" class="edit" value="edit">
        <Icon
          icon="material-symbols:edit-note"
          width="20"
          height="20"
          color="#4b3f72"
        />
      </button>
    </form>
    <form class="form-icon" @submit.prevent="handleDelete" method="delete">
      <button type="submit" class="close" name="_action" value="delete">
        <Icon
          icon="material-symbols:close"
          color="#4b3f72"
          width="20"
          height="20"
        />
      </button>
    </form>
    <div class="text-display">{{ content }}</div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import pb from "../main";
const props = defineProps({
  content: String,
  rating: String,
  id: String,
});
async function handleDelete() {
  await pb.collection("content").delete(props.id);
}
const data = {
  suggestion: props.content,
  rate: props.rating,
  id: props.id,
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");

.num-display {
  position: absolute;
  top: -15px;
  left: -15px;
  background-color: #9f87af;
  border-radius: 50%;
  padding: 10px;
  width: 25px;
  height: 25px;
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  line-height: 25px;
  color: white;
}
.card-container {
  width: 65%;
  margin: auto;
  background-color: #fff;
  color: #333;
  border-radius: 15px;
  padding: 40px 50px;
  margin: 20px auto;
  position: relative;
}
.text-display {
  font-family: "Poppins", sans-serif;
  color: black;
  font-weight: 500;
}
.close,
.edit {
  position: absolute;
  top: 10px;
  right: 17px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0px;
}
.edit {
  right: 40px;
}
</style>
