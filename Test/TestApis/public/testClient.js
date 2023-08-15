// const url = "https://api.apis.guru/";
// fetch(url, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
// })
//   .then((response) => console.log(response))

//   .catch((error) => console.log(`Error: ${error}`));
// async function postData(url = "", data = {}) {
//   const response = await fetch(url, {
//     method: "POST",
//     cache: "no-cache",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   return response.json();
// }
// postData("http://localhost:3001/regsitration", { answer: 42 }).then((data) =>
//   console.log(data)
// );
// async function getData() {
//   const response = await fetch("http://localhost:3001/registration");
//   const data = await response.json();
//   console.log(data);
// }
// getData();
