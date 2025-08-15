
let playbar = document.querySelector(".playbar");
playbar.style.display = "none";

function getSongs() {
    let songsList = [
        "songs/_Imagine_Dragons_-_Believer_with_(getmp3.pro).mp3",
        "songs/Alan_Walker_-_Alone.mp3",
        "songs/Alec_Benjamin_-_Let_Me_Down_Slowly.mp3",
        "songs/Astrid_S_-_Hurts_So_Good.mp3",
        "songs/Billie_Eilish_-_lovely.mp3",
        "songs/Elley_Duhe_-_Middle_Of_The_Night.mp3",
        "songs/Halsey_-_Without_Me.mp3",
        "songs/Imagine_Dragons_-_Bad_Liar_lyrics_(getmp3.pro).mp3",
        "songs/In The End - slowed reverb-(HindiMp3s.In).mp3",
        "songs/Infinity_-_Jaymes_Young_Song_Slowe_(getmp3.pro).mp3",
        "songs/League_of_Legends_-_Legends_Never_Die.mp3",
        "songs/Linkin_Park_-_In_The_End_Mellen_Gi.mp3",
        "songs/NEFFEX_-_Destiny.mp3",
        "songs/NEFFEX_-_Grateful.mp3",
        "songs/Ruth_B_-_Dandelions_Lyrics_(getmp3.pro).mp3",
        "songs/Sunflower (Spider-Man_ Into the Spider-Verse) - Post Malone, Swae Lee_320- [PagalWorld.NL].mp3"




    ]
    let songs = [];
    for (let index = 0; index < songsList.length; index++) {
        const element = songsList[index];
        if (element.endsWith(".mp3")) {
            // songs.push(element.href.split("/songs/"))
            songs.push(element.split("songs/")[1])
        }
    }


    console.log(songs);
    return songs
}
getSongs();



function getCardImg() {
    let imgslist = [
        "img/ab67616d00001e02aad3f4b601ae8763b3fc4e88.jpg",
        "img/ab67616d00001e02b5e7944443cec785db91184b.jpg",
        "img/ab67616d00001e021aa5adad8593923dcdf1a7d0.jpg",
        "img/ab67616d00001e026404721c1943d5069f0805f3.jpg",
        "img/ab67616d00001e026404721c1943d5069f0805f3.jpg",
        "img/ab67706f00000002dda381d6e4b5ebc246bada8a.jpg",
        "img/ab67706f00000002e2881c83b28f451044b0b8f7.jpg",
        "img/ab67706f00000002ee17da5ad89fd2e739e901bd.jpg",
        "img/ab67706f000000024e1563387174f7a0c6b5e0ca.jpg",
        "img/ab67706f0000000264ff9c60d031ae013f43abe3.jpg",
        "img/ab67616100005174b19af0ea736c6228d6eb539c.jpg",
        "img/ab67616100005174c40600e02356cc86f0debe84.jpg",
        "img/ab67616100005174cb6926f44f620555ba444fca.jpg",
        "img/ab676161000051740f0be2054fe9594026a6b843.jpg",
        "img/ab676161000051745ba2d75eb08a2d672f9b69b7.jpg",
        "img/ab676161000051748de0e6e7e55d7773931ab7f4.jpg",
        "img/ab6761610000517490b6c3d093f9b02aad628eaf.jpg",
        "img/ab67616100005174654603f76991dc1275e67d39.jpg"
    ];
    let imgs = [];
    for (let index = 0; index < imgslist.length; index++) {
        const element = imgslist[index];
        if (element.endsWith(".jpg")) {
            imgs.push(element.split("img/")[1])
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



function main() {

    //.............. To insert images into the different cards one by one.........

    let imgs = getCardImg();
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
    let songs = getSongs();
    console.log(songs);




    //.................Show all the songs in the playlist.......................
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    console.log(songUL);
    for (const song of songs) {
        // let index = 0

        songUL.innerHTML = songUL.innerHTML +
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
            document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"

        })
    })
    // .............Working of seekbar..........

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        // let percent = (e.offsetX / seekbar.width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;

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






