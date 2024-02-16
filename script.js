const anasayfa = document.querySelector(".anasayfa"), //data çekme
inputPart = anasayfa.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
konumBtn = inputPart.querySelector("button")
wIcon = document.querySelector(".weather-part img")
arrowBack = document.querySelector("header i")
let api;

inputField.addEventListener("keyup", e => {     //doğruluğunu kontrol etme aşaması
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value)
    }
})

konumBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }else{
        console.log("Tarayıcınız geolocation'ı desteklemiyor...")
    }
})

// aşağıda openweathermap'den gelen güncel verileri bağladım.( konuma göre bulmak için enlem-boylamını bulup, hava durumunu getiriyor)

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=a16e33bdb752c9b5778d38c42614a6e4`;
    fetchData()
} 
function onError(error){
    infoTxt.innerText = error.message   
    infoTxt.classList.add("error")
}

function requestApi(şehir){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${şehir}&units=metric&appid=a16e33bdb752c9b5778d38c42614a6e4`;
    fetchData()
}

function fetchData(){
    fetch(api).then(response => response.json()).then(result => weatherDetails(result))
}

// istenilen formatta bilgi girişi olmadığı zaman yazan hata kodu
function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error")
        infoTxt.innerText = `${inputField.value} şehri bulunamadı...`
    }else{
        const {description, id} = info.weather[0]
        const {temp} = info.main

        //hava durumuna göre gelmesi gereken resimler
        if(id==800){
            wIcon.src = "resimler/gunesli.jpg"
        }else if(id => 200 && id <= 299){
            wIcon.src = "resimler/simsek.jpg"
        }else if(id => 600 && id <= 700){
            wIcon.src = "resimler/kar.jpg"
        }else if(id => 701 && id <= 800){
            wIcon.src = "resimler/sis.jpg"
        }else if(id => 801 && id <= 804){
            wIcon.src = "resimler/bulutlu_yeni.jpg"
        }else if(id => 300 && id <= 321 || (id => 500 && id <= 531)){
            wIcon.src = "resimler/parcalıyagmur.jpg"
        }
        
        anasayfa.querySelector(".temp .sayi").innerText = Math.floor(temp)
        
    }
}
arrowBack.addEventListener("click", () => {
    anasayfa.classList.remove("active")
})