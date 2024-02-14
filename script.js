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
    infoTxt.innerText = "Sonuçlar getiriliyor..."
    infoTxt.classList.add("pending")
    fetch(api).then(response => response.json()).then(result => weatherDetails(result))
}

// istenilen formatta bilgi girişi olmadığı zaman yazan hata kodu
function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error")
        infoTxt.innerText = `${inputField.value} şehri bulunamadı...`
    }else{
        const şehir = info.ad
        const ülke = info.sys.ülke
        const {description, id} = info.weather[0]
        const {feelshissedilen_sıcaklık_like, nem, temp} = info.main

        if(id==800){
            wIcon.src = "güneşli.jpg"  //hava durumuna göre gelmesi gereken resimler
        }else if(id => 200 && id <= 299){
            wIcon.src = "resimler/şimşek.jpg"
        }else if(id => 600 && id <= 700){
            wIcon.src = "resimler/kar.jpg"
        }else if(id => 701 && id <= 800){
            wIcon.src = "resimler/haze.svg"
        }else if(id => 801 && id <= 804){
            wIcon.src = "bulutlu_yeni.jpg"
        }else if(id => 300 && id <= 321 || (id => 500 && id <= 531)){
            wIcon.src = "resimler/yagmur.jpg"
        }
        

        anasayfa.querySelector(".temp .sayi").innerText = Math.floor(temp)
        anasayfa.querySelector(".weather").innerText = description
        anasayfa.querySelector(".konum").innerText = `${şehir}, ${ülke}`
        anasayfa.querySelector(".temp .sayi-2").innerText = Math.floor(hissedilen_sıcaklık)
        anasayfa.querySelector(".nem span").innerText = `${nem}%`


        infoTxt.classList.remove("pending", "error")
        anasayfa.classList.add("active")

    }
    
}

arrowBack.addEventListener("click", () => {
    anasayfa.classList.remove("active")
})