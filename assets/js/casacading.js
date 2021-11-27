function populate(s1, s2) {
  var s1 = document.getElementById(s1);
  var s2 = document.getElementById(s2);
  s2.innerHTML = "";
  if (s1.value == "computer science ans engineering") {
    var optionarray = [
      "amod|Dr.Amod Tiwari",
      "anurag|Dr.Anurag Sewak",
      "maineger|Dr.Mainger Yadav",
      "ashish|Assist. Mr.Ashish",
      "kalpana|Assist. Mrs.Kalpana",
    ];
  } else if (s1.value == "eletronics engineering") {
    var optionarray = [
      "devendra|Dr.devendra tripathi",
      "anurag|Dr.Himanush",
      "maineger|Dr.Mainger Yadav",
      "ashish|Assist. Mr.Ashish",
      "kalpana|Assist. Mrs.Kalpana",
    ];
  } else if (s1.value == "eletrical engineering") {
    var optionarray = [
      "raj|Dr.Rajkumar patel",
      "anurag|Dr.Himanush",
      "maineger|Dr.Mainger Yadav",
      "ashish|Assist. Mr.Ashish",
      "kalpana|Assist. Mrs.Kalpana",
    ];
  }
  for (var option in optionarray) {
    var pair = optionarray[option].split("|");
    var new_option = document.createElement("option");
    new_option.value = pair[0];
    new_option.innerHTML = pair[1];
    s2.options.add(new_option);
  }
}
