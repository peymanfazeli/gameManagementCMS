let userEmail;
function postCodeResponse(response, error) {
  if (error) {
    console.log("Error in posting validation code to server: ", error);
    return;
  } else {
    window.location = "http://localhost:5500/Public/index.html";
  }
}
document.querySelector("button").addEventListener("click", (e) => {
  e.preventDefault();
  const code = document.querySelector(".inputCode").value;
  myFetch("auth/emailVerification", "POST", postCodeResponse, { code });
});
