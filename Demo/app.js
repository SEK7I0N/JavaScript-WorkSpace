const userLists = document.querySelector(".name-list li");
const listInput = document.querySelector(".list-input");
const addListBtn = document.querySelector(".addListBtn");

console.log(listInput.value);

addListBtn.addEventListener("click", function () {
  //Cretaing a li element
  const newLi = document.createElement("LI");
  const liContent = document.createTextNode(listInput.value);
  console.log(listInput.value);
  //add the value to the created li element
  newLi.appendChild(liContent);
  //add the li to the ul element
  userLists.appendChild(newLi);
});
