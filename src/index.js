console.log("index.js started...");

import Amplify from "aws-amplify";
import { Auth } from 'aws-amplify';
import aws_exports from "./aws-exports.js";
import { Tooltip,  Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { userAuthState } from './auth/auth_user';
import { checkAuthContent } from './auth/auth_content';
import { signUp, confirmSignUp, resendConfirmationCode } from './auth/auth_signup';
import { signIn } from './auth/auth_login';
import { forgotPass, confirmForgotPass } from './auth/auth_forgot_password';
import { signOut } from './auth/auth_logout';
import Swal from 'sweetalert2'


Amplify.configure(aws_exports);

checkAuthContent();

console.log("index.js finished...");
