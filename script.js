
let playbar = document.querySelector(".playbar");
playbar.style.display = "none";

async function getSongs() {
    // Fetch songs from the songs folder
    let file = await fetch("http://127.0.0.1:3000/songs/")
    let response = await file.text();
    // console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    // console.log(as[0]); 

    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            // songs.push(element.href.split("/songs/"))
            songs.push(element.href.split("/songs/")[1])
        }
    }

   
    // console.log(songs);
    return songs


}


//To get Image from the img folder
async function getCardImg() {
    let file = await fetch("http://127.0.0.1:3000/img/")
    let response = await file.text();
    console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    // console.log(as[1].href.split("/img/")[1]);


    let imgs = [];
    for (let index = 1; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".jpg")) {
            imgs.push(element.href.split("/img/")[1])
        }
    }
    return imgs;

}
getCardImg();


// gobal current song variable
let currentSong = new Audio();
console.log(currentSong.src)

// if (currentSong.src === "   ") {
//     playbar.style.display = "none"; // Hide playbar if no song

// } else {
//     playbar.style.display = "block"; // Show playbar when playing
// }



const playMusic = (track) => {
    playbar.style.display = "block";
    currentSong.src = "/songs/" + track
    currentSong.play();
    play.src = "pause.svg"
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "0.00/3.00"

}

//...........To convert seconds format to min:sec...........
function secondsToMinutesSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}



async function main() {

    //.............. To insert images into the different cards one by one.........

    let imgs = await getCardImg();
    console.log(imgs);

    let card = document.querySelector(".card-container");
    console.log(card);

    
    for (const img of imgs) {
        card.innerHTML = card.innerHTML +
            `<div class="card bg-white-grey">
              <div class="playbtn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                  <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                </svg>
              </div>
              <img
                src="img/${img}">
              <h4>Aashiqui 2</h4>
              <h5> Mithoon Ankit Tiwari, Jeet Gannguli</h5>
            </div>`

    }
    //.....................................................................

    //get the list of songs
    let songs = await getSongs();
    console.log(songs);




    //.................Show all the songs in the playlist.......................
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    console.log(songUL);
    for (const song of songs) {
        // let index = 0

        songUL.innerHTML = songUL.innerHTML  +
            `<li data-file="${song}">   
                <img class="invert" width="20px" src="music.svg" alt="" />
                <div class="info">
                  <div> ${song.split("-")[1].replaceAll("%20", " ",).replaceAll("_", " ").replaceAll(".mp3", " ").replaceAll("(getmp3.pro)", " ")}</div>
                  <div> ${song.split("-")[0].replaceAll("%20", " ",).replaceAll("_", " ").replaceAll(".mp3", " ").replaceAll("(getmp3.pro)", " ")}</div>
                </div>
                <div class="playNow">
                  <span class="m-3">Play Now</span>
                  <img class="invert" width="25px" src="play.svg" alt="" />
                </div>
        </li>`;
        

    }

    //.........................................................................


    //-----------------Attach a event listener to each songs------------------

    // console.log(document.querySelector(".songList").getElementsByTagName("li")[0].querySelector("div"))
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            // console.log(e.querySelector(".info").firstElementChild.innerHTML);
            let fileName = e.getAttribute("data-file");
            console.log(fileName);


            playMusic(fileName)
        })
    })

    //-----------Attach a Event listener to play , next and previous............
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg"
        } else {
            currentSong.pause();
            play.src = "play.svg"
        }
    })
    

    //-----------Listen for Time Update event----------------------
    currentSong.addEventListener("timeupdate", () => {

        console.log(currentSong.currentTime, currentSong.duration)
        currentSong.addEventListener("timeupdate", () => {
            console.log(secondsToMinutesSeconds(currentSong.currentTime), currentSong.duration)
            document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
            document.querySelector(".circle").style.left =(currentSong.currentTime/currentSong.duration)*100+"%"
            
        })
    })
    // .............Working of seekbar..........

    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width) *100;
        // let percent = (e.offsetX / seekbar.width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration *percent)/100;
        
    })

    const seekbar = document.querySelector(".seekbar");
    const circle = document.querySelector(".circle");
    let isDragging = false;
    
    // When user clicks and holds the circle
    circle.addEventListener("mousedown", () => {
        isDragging = true;
    });
    
    // When user moves the mouse while dragging
    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            updateSeekbar(e);
        }
    });
    
    // When user releases the mouse
    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
    
    // Function to update seekbar position
    function updateSeekbar(e) {
        let rect = seekbar.getBoundingClientRect();
        let percent = ((e.clientX - rect.left) / rect.width) * 100;
    
        // Restrict within 0% - 100%
        percent = Math.max(0, Math.min(100, percent));
    
        // Move the circle
        circle.style.left = percent + "%";
    
        // Update song time
        if (currentSong.duration) {
            currentSong.currentTime = (currentSong.duration * percent) / 100;
        }
    }

}
main();






