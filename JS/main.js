const nombre = "Paul";
let texto = (document.getElementById("name-user").innerHTML = nombre);

const getData = () => {
  const GetDataForm1 = document.getElementById("InputUI1").value;
  const GetDataForm2 = document.getElementById("InputUI2").value;

  if (GetDataForm1 === "" || GetDataForm2 === "") {
    alert("no puede ir vacio");
  }

  console.log(GetDataForm1);
};
