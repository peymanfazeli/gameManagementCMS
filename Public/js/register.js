function registerDataResponse(response, error) {
  if (error) {
    console.log("Error in registering data: ", error);
    return;
  } else {
    console.log("rsponse :", response);
  }
}
document.querySelector(".btn-form").addEventListener("click", (e) => {
  e.preventDefault();

  const userName = document.querySelector("#userName").value;
  const password = document.querySelector("#password").value;
  const email = document.querySelector("#email").value;
  const data = {
    userName,
    password,
    email,
    avatar:
      "C:/xampp/htdocs/IE-Express/Public/images/profilePhoto/generalAvatar.png",
    token: "1",
  };
  myFetch("auth/register", "POST", registerDataResponse, data, "registerData");
  // async function sendRegisterData() {
  //   const registerResponse = await fetch(
  //     "http://localhost:3001/auth/register",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   );

  //   try {
  //     console.log(registerResponse);
  //     if (registerResponse.status === 400) {
  //       setTimeout(() => {
  //         alert("شما قبلا ثبت نام کرده اید ");
  //       }, 500);
  //     } else {
  //       if (registerResponse.status === 401) {
  //         setTimeout(() => {
  //           alert("لطفا از ایمیل/رمز ورود معتبراستفاده کنید");
  //         }, 500);
  //       } else {
  //         // console.log(registerResponse.body);
  //         return (window.location =
  //           "http://localhost:5500/Public/mailCodeValidation.html");
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // sendRegisterData();
});
