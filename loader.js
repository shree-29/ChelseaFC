alert("akd");
fetch("/news.json")
.then(function (response) {
    return response.json();
})
.then(function (data) {
    alert("hi");
    appendData(data);
})
.catch(function (err) {
    alert("err");
    console.log('error: ' + err);
});
function appendData(data) {

for (var i = 0; i < data.length; i++) {
    var title = document.getElementById("title-".concat((i+1).toString()));
    var desc = document.getElementById("desc-".concat((i+1).toString()));

    title.innerHTML=data[i].title;
    desc.innerHTML=data[i].desc;
}
}
/*
fetch("/json/trending-topic-btn-text.json")
.then(function (response) {
    return response.json();
})
.then(function (data) {
    appendDataa(data);
})
.catch(function (err) {
    console.log('error: ' + err);
});
function appendDataa(data) {

for (var i = 0; i < data.length; i++) {
    var title = document.getElementById("btn".concat((i+1).toString()));
    title.innerHTML=data[i].btntext;
}
}
*/