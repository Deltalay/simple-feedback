<template>
  <div class="container">
    <div class="form-control">
      <form @submit.prevent="login" id="loginForm" method="GET">
        <span class="form-title">LOGIN</span>
        <div class="input-div">
          <label class="tag">Username: </label>
          <input
            :class="checker ? 'error' : null"
            v-model="_username"
            name="username"
            type="text"
            placeholder="Username"
            class="input"
            required
          />
        </div>
        <div class="input-div">
          <label class="tag">Password: </label>
          <input
            :class="checker ? 'error' : null"
            v-model="_password"
            type="password"
            name="password"
            placeholder="Password"
            class="input"
            required
          />
        </div>
        <button type="submit" class="button-login">LOGIN</button>
        <div class="foot-div">
          <span class="forgot-span"
            >Forgot
            <a class="link" href="#/createaccount"
              >Username / Password?</a
            ></span
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import router from "../routes/route";
import pb from "../main";
import { ref } from "vue";
const _username = ref("");
const _password = ref("");
let checker = ref(false);
async function login() {
  try {
    await pb
      .collection("users")
      .authWithPassword(_username.value, _password.value);
    if (pb.authStore.isValid) {
      router.push("/");
    }
  } catch (e) {
    if (e) {
      console.log(e.data);
      pb.authStore.clear();
      checker.value = true;
    }
  }
}
</script>
<style scoped>
.error {
  border: 1px solid #dc3545 !important;
  overflow: hidden !important;
}
.error:focus {
  outline: none;
  overflow: hidden !important;
  box-shadow: none !important;
}
.container {
  font-family: "Roboto", sans-serif;
  display: flex;
  clear: both;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.form-title {
  color: #333;
  font-size: 34px;
  font-weight: bolder;
  width: 100%;
  padding-bottom: 34px;
  display: block;
  text-align: center;
}
.button-login {
  background-color: hsl(210, 100%, 50%);
  margin: auto;
  font-size: 14px;
  color: white;
  border: 1px solid transparent;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
  display: block;
  width: 100%;
  border-radius: 4px;
  transition: ease-in-out background-color 0.2s;
}
.button-login:hover {
  border: 1px solid transparent;
  cursor: pointer;
  background-color: hsl(210, 100%, 40%);
}
.foot-div {
  width: 100%;
  padding-top: 2rem;
  text-align: center;
}
.forgot-span {
  font-size: 15px;
  color: #999;
}
.forgot-span a {
  text-decoration: none;
  color: #666;
  font-size: 13px;
}
.link {
  transition: ease-in-out color 0.2s;
}
.link:hover {
  color: hsl(210, 81%, 48%);
}
form {
  width: auto;
}
.input {
  display: inline-block;
  outline: none;
  overflow: hidden !important;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 8px;
  width: 100%;
  padding-bottom: 8px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 6px;
}
.input:focus {
  outline: none;
  overflow: hidden !important;
  box-shadow: 0px 0px 7px 3px rgba(89, 168, 233, 0.5);
  border: 1px solid rgb(60, 131, 189);
}
.input-div {
  display: block;
  margin: auto;
  width: 100%;
  position: relative;
  margin-bottom: 1rem;
}
.form-control {
  width: 40%;
  padding: 3.5em;
  background-color: white;
  border: 1px solid transparent;
  border-radius: 1rem;
  box-shadow: 7px 6px 20px 8px rgba(0, 0, 0, 0.4);
}
.button-login:active {
  box-shadow: 0 0 0 2px #f8fafc, 0 0 0 4px hsl(210, 100%, 70%),
    0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 0 #0000;
}
body {
  background: #fc466b;
  background: -webkit-linear-gradient(to right, #3f5efb, #fc466b);
  background: linear-gradient(to right, #3f5efb, #fc466b);
  font-family: "Roboto", sans-serif;
}
@media only screen and (max-width: 768px) {
  .form-title {
    font-size: 24px;
  }
  .tag {
    font-size: 13px;
  }
  .input {
    padding: 5px;
  }
  .button-login {
    font-size: 11px;
  }
  .forgot-span {
    font-size: 12px;
  }
  .link {
    font-size: 10px;
  }
}
</style>
