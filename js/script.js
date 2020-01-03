
let audioPlaylist = [
    {
        title: "Brenda Lee - Rocking Around the Christmas Tree From",
        src: "audio/brenda-lee_-_rocking-around-the-christmas-tree-from.mp3"
    },
    {
        title: "Ray Charles - Hit the Road Jack",
        src: "audio/ray-charles_-_hit-the-road-jack.mp3 "
    },
    {
        title: "Daft Punk - Get Lucky",
        src: "audio/daft-punk_-_get-lucky.mp3"
    },
    {
        title: "Gorillaz - Feel Good Inc",
        src: "audio/gorillaz_-_feel-good-inc.mp3 "
    },
];

let speedSettings = [ 0.5, 1, 1.5, 1.75, 2, 2.25]


for (let i = 0; i<audioPlaylist.length; i++) { 
    let audioContainer = document.querySelectorAll('.audio-container'); 
    
    let audioEl = document.createElement('audio');
    audioEl.src = audioPlaylist[i].src; 
   
    let audioTitle = document.createElement('div');
    audioTitle.classList.add('audio-title');
    audioTitle.innerHTML = audioPlaylist[i].title; 

    let audioContent = document.createElement('div'); 
    audioContent.classList.add('audio-content')

    let playBtnElement = document.createElement('div'); 
    let playBtnIcon = document.createElement('i'); 
    playBtnIcon.classList.add('play-btn')
    playBtnIcon.classList.add('icon-play')
    playBtnElement.appendChild(playBtnIcon);

    let timePlay = document.createElement('div'); 
    timePlay.classList.add('time-play');

    let mainProgress = document.createElement('div');
    mainProgress.classList.add('main-progress'); 
    let mainProgressItem = document.createElement('progress');
    mainProgressItem.setAttribute('max', 100);
    mainProgress.appendChild(mainProgressItem);

    let volumeElement = document.createElement('div'); 
    volumeElement.classList.add('volume');
    let volumeProgressElement = document.createElement('progress');
    volumeProgressElement.setAttribute('value', 100);
    volumeProgressElement.setAttribute('max', 100);
    volumeProgressElement.classList.add('volume-progress');
    let volumeIconElement = document.createElement('i');
    volumeIconElement.classList.add('icon-volume-high');
    volumeElement.appendChild(volumeProgressElement);
    volumeElement.appendChild(volumeIconElement);

    let speedElement = document.createElement('div');
    speedElement.classList.add('speed-audio')
    let speedTitle = document.createElement('i');
    speedTitle.innerHTML = "speed";
    let speedList = document.createElement('ul'); 
    speedList.classList.add('speed-audio-select');

    for ( let j = 0; j < speedSettings.length; j++) { 
        let speedListItem = document.createElement('li'); 
        speedListItem.innerHTML = speedSettings[j]
        speedList.appendChild(speedListItem)
    }
    speedElement.appendChild(speedTitle);
    speedElement.appendChild(speedList);

    let downloadElement = document.createElement('div'); 
    downloadElement.classList.add('download-audio'); 
    let downloadLink = document.createElement('a'); 
    downloadLink.classList.add('icon-down'); 
    downloadLink.setAttribute('download', audioPlaylist[i].src)
    downloadLink.href = audioPlaylist[i].src; 
    downloadElement.appendChild(downloadLink);

    let uploadElement = document.createElement('div');
    let uploadInput = document.createElement('input');
    uploadInput.setAttribute('type', "file");
    uploadInput.setAttribute('id', `upload${i}`);

    let uploadLabel = document.createElement('label'); 
    uploadLabel.setAttribute('for', `upload${i}`)

    let uploadIcon = document.createElement('i');
    uploadIcon.classList.add('icon-upload');

    uploadLabel.appendChild(uploadIcon);
    uploadElement.appendChild(uploadInput);
    uploadElement.appendChild(uploadLabel);

    audioContent.appendChild(playBtnElement);
    audioContent.appendChild(timePlay);
    audioContent.appendChild(mainProgress);
    audioContent.appendChild(volumeElement);
    audioContent.appendChild(speedElement);
    audioContent.appendChild(downloadElement);
    audioContent.appendChild(uploadElement);

    audioContainer[i].appendChild(audioEl);
    audioContainer[i].appendChild(audioTitle);
    audioContainer[i].appendChild(audioContent);
}



let audio = document.querySelectorAll('audio') ; 

let playBtn = document.querySelectorAll('.play-btn'); 
let timeAudio = document.querySelectorAll('.time-play');
let progress = document.querySelectorAll('.main-progress progress'); 
let volumeIcon = document.querySelectorAll('.volume i');
let volumeProgress = document.querySelectorAll(' .volume progress');
let speedItem = document.querySelectorAll('.speed-audio-select li')




// speedItem.forEach( (item,index) => { 
        
//     item.addEventListener('click', () => { 
//         speedItem.forEach( (item) => { 
//             item.classList.remove('active-volume-speed')
          
//         })
//         item.classList.add('active-volume-speed');
//         console.log( item.innerText)
//         audio[i].playbackRate = item.innerText;
//     })
// })

for( let i = 0; i < audioPlaylist.length; i++) { 
   

speedItem.forEach( (item,index) => { 
        
    item.addEventListener('click', () => { 
        speedItem.forEach( (item) => { 
            item.classList.remove('active-volume-speed')
          
        })
        item.classList.add('active-volume-speed');
        audio[i].playbackRate = item.innerText;
    })
})
    

    progress[i].value = 0;
    let audioTimeFlag = 0; 
    timeAudio[i].innerText = '0 : 00'; 
    
    playBtn[i].addEventListener('click', playPauseBtn); 
    playBtn[i].addEventListener('click', play); 
   
    timeAudio[i].addEventListener('click', timeFlag);
    progress[i].addEventListener('click', progressRewind);
    volumeIcon[i].addEventListener('click', volumeIconReset);
    volumeProgress[i].addEventListener('click', volumeRewind);
    
    
    
    function play () { 
        // let timeID;
        
        // timeID = clearInterval(timeID);
        if( audio[i].paused) { 
            audio[i].play(); 
            // var timeID = setInterval(time, 450);
            timeID = setInterval(time, 450);
            for( let k = 0; k < audioPlaylist.length; k++) { 
                if(k==i) continue;
                audio[k].pause();
                playBtn[k].classList.add('icon-play');
                playBtn[k].classList.remove('icon-pause');
                
            }
           
        } else { 
            audio[i].pause();
            // timeID = clearInterval(timeID);
            timeID = clearInterval(timeID);
          
            // () => { 
            //    timeID = clearInterval(timeID);
            // }
        }
        
    }
    function playPauseBtn() { 
        playBtn[i].classList.toggle('icon-play');
        playBtn[i].classList.toggle('icon-pause');
        timeID = clearInterval(timeID);
        // () => { 
        //     clearInterval(timeID);
        // }
    }
    
    function timeFlag() { 
        audioTimeFlag++; 
        time();
    }
    
    function time() { 
        console.log('function time working')
        audio[i].ontimeupdate = progressUpdate();
        let timeFromStart = audio[i].currentTime;
        let timeNull, timeNullF ;
    
        if(timeFromStart % 60 < 9.49) timeNull = 0;
            else timeNull = '';
        if((audio[i].duration - audio[i].currentTime) % 60 < 9.49)  timeNullF = 0;
            else timeNullF = '';
    
        if( audioTimeFlag % 2 == 0 || audioTimeFlag == 0) {
            timeAudio[i].innerText = Math.floor(timeFromStart / 60) + ' : ' + timeNull  + Math.round(timeFromStart % 60);
        }
        else { 
            timeAudio[i].innerText = Math.floor((audio[i].duration - audio[i].currentTime) / 60) + ' : ' + timeNullF + Math.round((audio[i].duration - audio[i].currentTime) % 60);
        }
    
         if (audio[i].ended) { 
            timeID = clearInterval(timeID)
            playBtn[i].classList.toggle('icon-play');
            playBtn[i].classList.toggle('icon-pause');
         }
    };
    
    function progressUpdate() { 
        progress[i].value = audio[i].currentTime / audio[i].duration * 100 ;
    }
    function progressRewind(event) { 
        progress[i].value = event.offsetX / this.offsetWidth * 100;
        play();
        audio[i].currentTime = audio[i].duration * event.offsetX / this.offsetWidth;
        play();
    }
    
    function volumeIconReset() { 
        this.classList.toggle('icon-volume-high');
        this.classList.toggle('icon-volume-off');
        if(audio[i].volume == 0)  { 
            audio[i].volume = 1;
            volumeProgress[i].value = 100;
        }
        else {
            audio[i].volume = 0; 
            volumeProgress[i].value = 0;
        }    
    }
    function volumeRewind() { 
        volumeProgress[i].value =  event.offsetX / this.offsetWidth * 100;
        audio[i].volume = volumeProgress[i].value/100;
    }
}