<template>
  <div class="container">
    <div class="form-control">
      <form @submit.prevent="createAccount" id="loginForm" method="GET">
        <span class="form-title">Create Account</span>
        <div class="input-div">
          <label class="tag">Username: </label>
          <input
            minlength="3"
            name="username"
            type="text"
            v-model="_username"
            placeholder="Username"
            :class="userchecker ? 'error' : null"
            class="input"
            required
          />
          <p class="error-message">
            {{ userMessage }}
          </p>
        </div>
        <div class="input-div">
          <label class="tag">Password: </label>
          <input
            v-model="_password"
            type="password"
            name="password"
            minlength="8"
            placeholder="Password"
            class="input"
            required
          />
        </div>
        <div class="input-div">
          <label class="tag">Confirm Password: </label>
          <input
            minlength="8"
            type="password"
            name="confpassword"
            :class="checker ? 'error' : null"
            v-model="_con_pass"
            placeholder="Confirm Password"
            class="input"
            required
          />
          <p class="error-message">
            {{ passMessage }}
          </p>
        </div>
        <button type="submit" class="button-login">Create Account</button>
        <div class="foot-div">
          <span class="log-span"
            >Already have an account?
            <a class="link" href="/#/login">Login</a></span
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import pb from "../main";
const _username = ref("");
const _password = ref("");
const _con_pass = ref("");
const checker = ref(false);
const userchecker = ref(false);
const userMessage = ref("");
const passMessage = ref("");
async function createAccount() {
  try {
    const data = {
      username: _username.value,
      password: _password.value,
      passwordConfirm: _con_pass.value,
    };
    await pb.collection("users").create(data);
  } catch (e) {
    if (e) {
      console.log(e.data);
      try {
        if (e.data.data.username) userchecker.value = true;
        userMessage.value = e.data.data.username.message;
      } catch (e) {
        userMessage.value = "";
      }
      try {
        if (e.data.data.passwordConfirm) checker.value = true;
        passMessage.value = e.data.data.passwordConfirm.message;
      } catch (e) {
        passMessage.value = "";
      }
    }
  }
}
</script>
<style scoped>
.error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 0px;
}
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
.log-span {
  font-size: 15px;
  color: rgb(100, 100, 100);
}
.log-span a {
  font-weight: bold;
  text-decoration: none;
  color: rgb(0, 132, 255);
  font-size: 14px;
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
