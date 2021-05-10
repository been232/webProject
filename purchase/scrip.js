var panelHeading = document.querySelectorAll(".panel-heading");
for (var i = 0; i < panelHeading.length; i++) {
    panelHeading[i].addEventListener("click", function (e) {
        if (e.target.classList.contains("active")) {
            e.target.classList.remove("active");
        } else {
            var x;
            for (var x = 0; x < panelHeading.length; x++) {
                panelHeading[x].classList.remove("active");
            }
            e.target.classList.add("active");
        }
    });
}

function openNav() {
    document.getElementById("sideNav").style.width = "250px";
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0px";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

var aClicked = false;
var bClicked = false;
var cClicked = false;

function changeSelect() {
    var x = document.getElementById("menu").value;
    if (x == "A") {
        if (aClicked == false) {
            addChild("A. 스피드 원터치 팝업텐트(3~4인용)", 39800, x);

            aClicked = true;
        } else {
            alert("이미 선택한 옵션입니다.");
        }
    }
    if (x == "B") {
        if (bClicked == false) {
            addChild("B. 5초 원터치 텐트(3인용) (+10,000원)", 49800, x);
            bClicked = true;
        } else {
            alert("이미 선택한 옵션입니다.");
        }
    }
    if (x == "C") {
        if (cClicked == false) {
            addChild("C. 5초 원터치 텐트(5인용) (+20,000원)", 59800, x);
            cClicked = true;
        } else {
            alert("이미 선택한 옵션입니다.");
        }
    }
    calTotalprice();
}

function addChild(str, value, id) {
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    var div = document.createElement("div");
    var p = document.createElement("p");
    var pValue = document.createElement("p");
    var input = document.createElement("input");

    li.classList.add("table");
    li.setAttribute("value", value);
    setOrder(li, id);

    div.classList.add("cell");
    p.classList.add("text");
    pValue.classList.add("value");
    pValue.innerHTML = value + "원";

    input.setAttribute("type", "text");
    input.setAttribute("class", "volume");
    input.setAttribute("value", "1");

    p.innerHTML = str;
    div.appendChild(p);
    div.appendChild(input);
    createBtn(div);
    div.appendChild(pValue);

    li.appendChild(div);
    ul.appendChild(li);

    var btn = document.querySelectorAll("button");
    for (var i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", handler);
    }
}

function setOrder(div, id) {
    if (id == "A") {
        div.classList.add("A");
    }
    if (id == "B") {
        div.classList.add("B");
    }
    if (id == "C") {
        div.classList.add("C");
    }
}

function handler(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.classList.contains("increaseBtn")) {
        var x = parseInt(this.parentNode.children[1].value, 10);
        x += 1;
        this.parentNode.children[1].setAttribute("value", x);
        var v = this.parentNode.parentNode.value;
        v *= x;
        var p = document.createElement("p");
        p.innerHTML = v + "원";
        p.classList.add("value");
        this.parentNode.replaceChild(p, this.parentNode.children[5]);
        calTotalprice();
    } else if (this.className == "decreaseBtn") {
        var x = parseInt(this.parentNode.children[1].value, 10);
        x -= 1;
        if (x <= 0) {
            alert("1개 이상부터 구매하실 수 있습니다.");
        } else {
            this.parentNode.children[1].setAttribute("value", x);
            var v = this.parentNode.parentNode.value;
            v *= x;
            var p = document.createElement("p");
            p.innerHTML = v + "원";
            p.classList.add("value");
            this.parentNode.replaceChild(p, this.parentNode.children[5]);
            calTotalprice();
        }
    } else if (this.className == "deleteBtn") {
        if (this.parentNode.parentNode.id == "A") {
            aClicked = false;
        }
        if (this.parentNode.parentNode.id == "B") {
            bClicked = false;
        }
        if (this.parentNode.parentNode.id == "C") {
            cClicked = false;
        }
        var sel = document.getElementById("menu");
        sel.options[0].selected = true;
        this.parentNode.parentNode.remove();
        calTotalprice();
    }
}

function createBtn(div) {
    var increaseBtn = document.createElement("button");
    var decreaseBtn = document.createElement("button");
    var deleteBtn = document.createElement("button");

    increaseBtn.setAttribute("class", "increaseBtn");
    increaseBtn.setAttribute("type", "button");
    increaseBtn.innerHTML = "+";

    decreaseBtn.setAttribute("class", "decreaseBtn");
    decreaseBtn.setAttribute("type", "button");
    decreaseBtn.innerHTML = "-";

    deleteBtn.setAttribute("class", "deleteBtn");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.innerHTML = "x";

    div.appendChild(increaseBtn);
    div.appendChild(decreaseBtn);
    div.appendChild(deleteBtn);
}

function calTotalprice() {
    var sum = 0;
    var price = document.querySelectorAll(".value");
    for (var i = 0; i < price.length; i++) {
        sum += parseInt(price[i].innerHTML, 10);
    }
    var p = document.createElement("p");
    p.innerHTML = sum;
    p.classList.add("teemo");
    var parent = document.getElementById("total-price");
    parent.replaceChild(p, parent.children[1]);
}
