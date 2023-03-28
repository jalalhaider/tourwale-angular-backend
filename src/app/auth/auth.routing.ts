import { LoginComponent } from "./login/login.component";

export const routes = [
  {
    path: "login",
    data: {
      title: "Login",
      urls: [{ title: "Login", url: "/login" }, { title: "Login" }],
    },
    component: LoginComponent,
  },
  {
    path: "forget-password",
    data: {
      title: "Forget Password",
      urls: [{ title: "Forget Password", url: "/forget-password" }],
    },
    component: LoginComponent,
  },
];
