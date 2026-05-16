import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import Play from "./assets/play.svg"
import Skip from "./assets/skip.svg"
import Back from "./assets/back.svg"
import Pause from "./assets/pause.svg"
import Audio from "./assets/audio.svg"
import barelylegal from "./assets/barelylegal.mp3"
import cover from "./assets/isthisit.jpg"
import './App.css'


function Main({ song }) {
  return (
    <div id='main'>
      <div style={{backgroundImage: "url(" + song.cover +")"}} id="big-image"></div>
      <div  id='hover'>
        <div id='song-info' >
        <div id="song">{song.name}</div>
        <div id="artist">{song.artist}</div></div>
        <p id="album">{song.album}</p>
        
      </div>
      
      
    </div>
  )
}
function Control({ song }) {
  const audioRef = useRef();
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; 
    }
  }, []);
  const getTempo = () => {
    if (audioRef.current) {
      let minutes = (Math.floor(audioRef.current.currentTime / 60)).toString()
      let seconds = (Math.floor(audioRef.current.currentTime % 60)).toString()
      if (seconds.length < 2) {
        seconds = "0" + seconds
      }
      setCurrent(`${minutes}:${seconds}`)
    }
  }
  const mudarTempo = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime
    }

  }
  const mudarVolume = (x) => {
    if (audioRef.current) {
      audioRef.current.volume = x / 100;
    }
  }
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrent] = useState("0:00");

  return (
    <div id='control'>
      <div id='playing-info'>
        <div style={{backgroundImage: "url(" + song.cover +")"}} id='album-image'></div>
        <div id='nartist'>
          <p id='playing-name'>{song.name}</p>
          <p id="playing-artist">{song.artist}</p>

        </div>
        <div id="playing">
          <div id='music-control'>
            <img className='fb' onClick={() => { audioRef.current.currentTime = 0; audioRef.current.pause(); setPlay(false) }} src={Back} alt="" />
            <img id='play-button' onClick={() => { setPlay(!playing); { playing ? audioRef.current.pause() : audioRef.current.play() } }} src={playing ? Pause : Play} alt="" />
            <img className='fb' onClick={() => { audioRef.current.currentTime = 234; audioRef.current.pause(); setPlay(false); }} src={Skip} alt="" />
          </div>
          <div id='duration'>
            <span>{currentTime}</span>
            <div id='bar'>
              <div style={{ width: audioRef.current ? ((audioRef.current.currentTime / 234) * 100 * 30 / 100) + "rem" : "0rem" }} id="time-bar"></div>
              <input type="range" name="" min="0" max="234" step="1" onChange={(e) => { audioRef.current.currentTime = e.target.value }} id="time-input" /></div>
            <span>{song.duration}</span>
          </div>

        </div>

      </div>
      <div id='audio-control'>
        <img id='audio-icon' src={Audio} alt="" />
        <div id='audio-bar'><div style={{ width: (5 * volume) / 100 + "rem" }} id='volume'></div>
          <input style={{ width: "5rem", height: "4px" }} type="range" name="" id="volume-changer" onChange={(e) => { setVolume(e.target.value); console.log(volume); mudarVolume(e.target.value) }} min="0" max="100" step="0.5" value={volume} /></div>
      </div>
      <audio volume="50" onTimeUpdate={getTempo} src={song.mp3} ref={audioRef} id="audio">
      </audio>
    </div>
  )

}
function App() {


  const song = { name: "Barely Legal", artist: "The Strokes", mp3: barelylegal, album: "Is This It?", cover: cover, duration: "3:54" }
  return (

    <>
      <Main song={song} />
      <Control song={song} />
    </>
  )
}

export default App
