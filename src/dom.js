import navigation from './html/navigation.html';
import footer from './html/footer.html';
// Images
import logo from './images/logo.png';

// Amplify
import {Amplify, Auth, Storage } from "aws-amplify";
import aws_exports from "./aws-exports.js";
Amplify.configure(aws_exports);



// API
import { DataStore } from '@aws-amplify/datastore';



// Auth
import {  userAuthState } from './auth/auth_user';
import {  checkAuthContent } from './auth/auth_content';
import {  signUp,  confirmSignUp,  resendConfirmationCode } from './auth/auth_signup';
import {  signIn } from './auth/auth_login';
import {  forgotPass,  confirmForgotPass } from './auth/auth_forgot_password';
import {  signOut } from './auth/auth_logout';



// Import Sweet sweetalert2
import Swal from 'sweetalert2'

// Import  CSS
import '/src/styles/main.css';
import '/src/styles/typography.css';

const body = document.body;
const page = navigation + body.innerHTML + footer;
body.innerHTML = page;
const navLogo = document.getElementById('nav-logo');



// Change the copyright
const copyRight = document.getElementById('copyright'); // Auto Update Copyright
const currentYear = new Date().getFullYear();
copyRight.innerHTML = '*** ©' + currentYear;
navLogo.src = logo;



// Get buttons and images
const loginButton = document.getElementById('nav-login');
const logoutButton = document.getElementById('nav-logout');
const signupButton = document.getElementById('nav-signup');



// Get the pathname
const urlPath = window.location.pathname;



// Any Page. Do if user is authorized don't if not.
userAuthState()
  .then(data => {
    if (urlPath != "/secret.html") {
    window.location.pathname = "/secret.html";
  }
    loginButton.style.display = "none";
    signupButton.style.display = "none";
    // Event Listener for Sign Out button
    if (document.querySelector("#nav-logout")) {
      document.querySelector("#nav-logout").addEventListener("click", () => {
        signOut();
      })
    };
  })
  .catch(error => {
    if (logoutButton) {
      logoutButton.style.display = "none";
    };
    if (signupButton) {
      signupButton.style.display = "none";
    };
    // Event Listeners if user is on Account confirmation page
    if (document.querySelector("#auth-signup-confirm")) {
      // Populate the email address value
      let username_value = location.hash.substring(1);
      document.querySelector("#formSignUpConfirmEmail").setAttribute("value", username_value);
      document.querySelector("#form-auth-signup-confirm").addEventListener("click", event => {
        event.preventDefault();
      });
      document.querySelector("#btnConfirm").addEventListener("click", () => {
        let username = document.querySelector("#formSignUpConfirmEmail").value
        const code = document.querySelector("#formSignUpConfirmCode").value
        console.log({
          username,
          code
        });
        confirmSignUp({
          username,
          code
        });
      });
      document.querySelector("#btnResend").addEventListener("click", () => {
        let username = document.querySelector("#formSignUpConfirmEmail").value
        resendConfirmationCode(username);
      });
    };
    // Event Listeners if user is on the Sign Up page
    if (document.querySelector("#auth-signup")) {
      document.querySelector("#form-auth-signup").addEventListener("submit", event => {
        event.preventDefault(); // Prevent the browser from reloading on submit event.
      });
      document.querySelector("#btnSignUp").addEventListener("click", () => {
        const email = document.querySelector("#formSignUpEmail").value
        const password = document.querySelector("#formSignUpPassword").value
        signUp({
          email,
          password
        });
      });
    };
    // Event Listeners if user is on Login page
    if (document.querySelector("#auth-login")) {
      document.querySelector("#form-auth-login").addEventListener("click", event => {
        event.preventDefault();
      });
      document.querySelector("#btnLogin").addEventListener("click", () => {
        console.log("The login button has fired.");
        const username = document.querySelector("#formLoginEmail").value
        const password = document.querySelector("#formLoginPassword").value
        signIn({
          username,
          password
        });
      });
    };
    // Event Listeners on the Confirm New Password page (after Forgot Password page)
    if (document.querySelector("#auth-forgot-password-confirm")) {
      // Populate the email address value
      let username_value = location.hash.substring(1);
      document.querySelector("#formForgotConfirmEmail").setAttribute("value", username_value);
      document.querySelector("#form-auth-forgot-password-confirm").addEventListener("click", event => {
        event.preventDefault();
      });
      document.querySelector("#btnConfirmForgot").addEventListener("click", () => {
        const username = document.querySelector("#formForgotConfirmEmail").value
        let code = document.querySelector("#formForgotConfirmCode").value
        let password = document.querySelector("#formForgotConfirmPassword").value
        confirmForgotPass(username, code, password);
      });
    };
    // Event Listeners if user is on Forgot Password page
    if (document.querySelector("#auth-forgot-password")) {
      document.querySelector("#form-auth-forgot-password").addEventListener("click", event => {
        event.preventDefault();
      });
      document.querySelector("#btnForgot").addEventListener("click", () => {
        const username = document.querySelector("#formForgotEmail").value
        forgotPass({
          username
        });
      });
    };
  });
