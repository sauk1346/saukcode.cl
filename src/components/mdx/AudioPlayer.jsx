'use client'
import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import styles from './AudioPlayer.module.css';

function formatTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function AudioPlayer({ src, caption }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => setIsPlaying(false);

    // MP3 en VBR (como los que genera ffmpeg con -qscale:a) no traen la
    // duración real en el header: el navegador reporta Infinity hasta que
    // se fuerza un seek al final para que la calcule a partir del archivo.
    let resolving = false;
    const resolveDuration = () => {
      if (resolving) return;
      if (!isFinite(audio.duration)) {
        resolving = true;
        audio.currentTime = 1e101;
        const onSeeked = () => {
          audio.removeEventListener('timeupdate', onSeeked);
          audio.currentTime = 0;
          setDuration(audio.duration);
          resolving = false;
        };
        audio.addEventListener('timeupdate', onSeeked);
      } else {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', resolveDuration);
    audio.addEventListener('durationchange', resolveDuration);
    audio.addEventListener('ended', onEnded);

    // Con SSR el <audio> ya trae el src en el HTML inicial: el navegador
    // puede cargar los metadatos antes de que React monte este efecto y
    // alcance a suscribir los listeners de arriba. Si ya están disponibles
    // (o ya se está reproduciendo), resolvemos la duración de una vez.
    if (audio.readyState >= 1 || !audio.paused) {
      resolveDuration();
    }

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', resolveDuration);
      audio.removeEventListener('durationchange', resolveDuration);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const time = Number(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolume = (e) => {
    const audio = audioRef.current;
    const v = Number(e.target.value);
    audio.volume = v;
    audio.muted = v === 0;
    setVolume(v);
    setMuted(v === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    const next = !muted;
    audio.muted = next;
    setMuted(next);
  };

  return (
    <figure className={styles.figure}>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className={styles.player}>
        <button
          type="button"
          onClick={togglePlay}
          className={styles.iconButton}
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <span className={styles.time}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.01}
          value={currentTime}
          onChange={handleSeek}
          className={styles.seekBar}
          aria-label="Progreso"
        />

        <button
          type="button"
          onClick={toggleMute}
          className={styles.iconButton}
          aria-label={muted ? 'Activar sonido' : 'Silenciar'}
        >
          {muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={handleVolume}
          className={styles.volumeBar}
          aria-label="Volumen"
        />
      </div>
    </figure>
  );
}

export default AudioPlayer;
