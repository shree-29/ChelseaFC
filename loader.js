fetch("/news.json")
.then(function (response) {
    return response.json();
})
.then(function (data) {
    newsData(data);
})
.catch(function (err) {
    console.log('error: ' + err);
});
function newsData(data) {

for (var i = 0; i < data.length; i++) {
    var title1 = document.getElementById("topic-".concat((i+1).toString()));
    var desc1 = document.getElementById("desc-".concat((i+1).toString()));
    var img1 = document.getElementById("div-".concat((i+1).toString()));

    title1.innerHTML=data[i].title;
    desc1.innerHTML=data[i].desc;
    img1.style.backgroundImage= "url('".concat(data[i].img.toString()).concat("')");
}
}

fetch("/mens.json")
.then(function (response) {
    return response.json();
})
.then(function (data) {
    menData(data);
})
.catch(function (err) {
    console.log('error: ' + err);
});
function menData(data) {

for (var i = 0; i < data.length; i++) {
    var img1 = document.getElementById("img-".concat((i+1).toString()));
    var name = document.getElementById("name-".concat((i+1).toString()));
    var num = document.getElementById("num-".concat((i+1).toString()));

    img1.src=data[i].img;
    name.innerHTML=data[i].name;
    num.innerHTML=data[i].num;
}
}

fetch("/womens.json")
.then(function (response) {
    return response.json();
})
.then(function (data) {
    womenData(data);
})
.catch(function (err) {
    console.log('error: ' + err);
});
function womenData(data) {

for (var i = 0; i < data.length; i++) {
    var img1 = document.getElementById("w-img-".concat((i+1).toString()));
    var name = document.getElementById("w-name-".concat((i+1).toString()));
    var num = document.getElementById("w-num-".concat((i+1).toString()));

    img1.src=data[i].img;
    name.innerHTML=data[i].name;
    num.innerHTML=data[i].num;
}
}