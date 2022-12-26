<template>
  <div className="card-container">
    <div className="num-display">{{ rating }}</div>

    <form method="put">
      <button
        disabled="{isAdding}"
        type="submit"
        name="_action"
        className="close"
        value="delete"
      >
        <Icon
          icon="material-symbols:edit-note"
          width="20"
          height="20"
          color="#4b3f72"
        />
      </button>
    </form>
    <form @submit.prevent="handleDelete" method="delete">
      <button type="submit" className="edit" name="_action" value="edit">
        <Icon
          icon="material-symbols:close"
          color="#4b3f72"
          width="20"
          height="20"
        />
      </button>
    </form>
    <div className="text-display">{{ content }}</div>
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
  right: 20px;
  cursor: pointer;
  background: none;
  border: none;
}

.edit {
  right: 40px;
}
</style>
