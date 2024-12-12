import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export function checkVerifyLoader() {
  const user = localStorage.getItem("isverified") || "false";
  //   console.log(typeof user, "hii");
  if (user == "false") {
    // console.log("hii");
    toast.warn("Please verify your account");
    return redirect("/verify-email");
  }
  return null;
}
