import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Play, Pause, RotateCcw, RotateCw, Volume2, 
  VolumeX, Maximize, CheckCircle2, FastForward, 
  Tv, Settings, AlertCircle 
} from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  chapterTitle: string;
  initialProgress?: number; // 0-100 percent
  initialTimestamp?: number; // seconds
  durationStr?: string;
  durationSeconds?: number;
  onProgressUpdate: (percentage: number, currentTimeSeconds: number, totalDurationSeconds: number) => void;
  onComplete: () => void;
  isCompleted?: boolean;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  chapterTitle,
  initialProgress = 0,
  initialTimestamp = 0,
  durationStr = '12:45',
  durationSeconds: propDurationSeconds,
  onProgressUpdate,
  onComplete,
  isCompleted = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ytPlayerRef = useRef<any>(null);
  const iframeContainerId = useRef(`yt_player_${Math.random().toString(36).substring(2, 9)}`);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialTimestamp);
  const [duration, setDuration] = useState(propDurationSeconds || 765);
  const [progress, setProgress] = useState(initialProgress);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [showControls, setShowControls] = useState(true);
  const [isPipSupported, setIsPipSupported] = useState(false);
  const [ytApiReady, setYtApiReady] = useState(false);
  const [resumedBannerVisible, setResumedBannerVisible] = useState(false);

  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

  // Extract YouTube ID
  const getYouTubeId = (url: string): string => {
    const match = url.match(/(?:embed\/|v=|vi\/|youtu\.be\/|\/v\/|watch\?v=|\&v=)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : 'zPG4NjLkCjc';
  };

  const videoId = isYouTube ? getYouTubeId(videoUrl) : '';

  // Initialize duration and starting timestamp
  useEffect(() => {
    let startSec = initialTimestamp;
    if (!startSec && initialProgress > 0 && duration > 0) {
      startSec = (initialProgress / 100) * duration;
    }
    if (startSec > 0) {
      setCurrentTime(startSec);
      setResumedBannerVisible(true);
      const timer = setTimeout(() => setResumedBannerVisible(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [initialProgress, initialTimestamp, duration]);

  // Load YouTube IFrame API script once if not already present
  useEffect(() => {
    if (!isYouTube) return;

    if (window.YT && window.YT.Player) {
      setYtApiReady(true);
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

    const prevOnReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prevOnReady) prevOnReady();
      setYtApiReady(true);
    };
  }, [isYouTube]);

  // Initialize YouTube player
  useEffect(() => {
    if (!isYouTube || !ytApiReady) return;

    let pollInterval: any = null;

    const startSeconds = Math.round(initialTimestamp || (initialProgress > 0 ? (initialProgress / 100) * (duration || 765) : 0));

    try {
      ytPlayerRef.current = new window.YT.Player(iframeContainerId.current, {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0, // We render our own controls matching RAAH UI
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          start: startSeconds,
        },
        events: {
          onReady: (event: any) => {
            const d = event.target.getDuration();
            if (d && d > 0) {
              setDuration(d);
            }
            if (startSeconds > 0) {
              event.target.seekTo(startSeconds, true);
            }
            event.target.setVolume(Math.round(volume * 100));
            event.target.setPlaybackRate(speed);
          },
          onStateChange: (event: any) => {
            // YT.PlayerState: -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering, 5 cued
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2 || event.data === 0) {
              setIsPlaying(false);
              if (event.data === 0) {
                onComplete();
              }
            }
          },
        },
      });

      // Poll current time while playing
      pollInterval = setInterval(() => {
        if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function') {
          try {
            const curr = ytPlayerRef.current.getCurrentTime() || 0;
            const dur = ytPlayerRef.current.getDuration() || duration || 765;
            if (dur > 0) {
              setDuration(dur);
              setCurrentTime(curr);
              const pct = Math.min(100, Math.max(0, (curr / dur) * 100));
              setProgress(pct);
              onProgressUpdate(pct, curr, dur);
              if (pct >= 99) {
                onComplete();
              }
            }
          } catch {}
        }
      }, 500);
    } catch (e) {
      console.warn('Failed to initialize YouTube player instance:', e);
    }

    return () => {
      if (pollInterval) clearInterval(pollInterval);
      if (ytPlayerRef.current && typeof ytPlayerRef.current.destroy === 'function') {
        try {
          ytPlayerRef.current.destroy();
        } catch {}
      }
    };
  }, [isYouTube, ytApiReady, videoId]);

  // Check Picture-in-Picture support
  useEffect(() => {
    if (document.pictureInPictureEnabled && videoRef.current) {
      setIsPipSupported(true);
    }
  }, []);

  // HTML5 Video event listeners
  const handleHtml5TimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || duration;
    setCurrentTime(curr);
    setDuration(dur);
    const pct = dur > 0 ? (curr / dur) * 100 : 0;
    setProgress(pct);
    onProgressUpdate(pct, curr, dur);
    if (pct >= 99) {
      onComplete();
    }
  };

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    if (isYouTube && ytPlayerRef.current) {
      try {
        if (isPlaying) {
          ytPlayerRef.current.pauseVideo();
          setIsPlaying(false);
        } else {
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
        }
        return;
      } catch {}
    }

    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, isYouTube]);

  // Seek handler
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const targetSeconds = (val / 100) * duration;
    setProgress(val);
    setCurrentTime(targetSeconds);
    onProgressUpdate(val, targetSeconds, duration);

    if (isYouTube && ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
      try {
        ytPlayerRef.current.seekTo(targetSeconds, true);
      } catch {}
    } else if (videoRef.current) {
      videoRef.current.currentTime = targetSeconds;
    }
  };

  // Relative seek (-10s / +10s)
  const seekRelative = useCallback((deltaSeconds: number) => {
    const nextTime = Math.min(duration, Math.max(0, currentTime + deltaSeconds));
    const nextPct = duration > 0 ? (nextTime / duration) * 100 : 0;
    setCurrentTime(nextTime);
    setProgress(nextPct);
    onProgressUpdate(nextPct, nextTime, duration);

    if (isYouTube && ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
      try {
        ytPlayerRef.current.seekTo(nextTime, true);
      } catch {}
    } else if (videoRef.current) {
      videoRef.current.currentTime = nextTime;
    }
  }, [currentTime, duration, isYouTube, onProgressUpdate]);

  // Playback Speed
  const cycleSpeed = () => {
    const speeds = [0.5, 1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setSpeed(nextSpeed);

    if (isYouTube && ytPlayerRef.current && typeof ytPlayerRef.current.setPlaybackRate === 'function') {
      try {
        ytPlayerRef.current.setPlaybackRate(nextSpeed);
      } catch {}
    } else if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  // Volume & Mute
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setIsMuted(newVol === 0);

    if (isYouTube && ytPlayerRef.current && typeof ytPlayerRef.current.setVolume === 'function') {
      try {
        ytPlayerRef.current.setVolume(Math.round(newVol * 100));
        if (newVol > 0 && typeof ytPlayerRef.current.unMute === 'function') {
          ytPlayerRef.current.unMute();
        }
      } catch {}
    } else if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
    }
  };

  const toggleMute = useCallback(() => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (isYouTube && ytPlayerRef.current) {
      try {
        if (nextMuted) {
          ytPlayerRef.current.mute();
        } else {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(Math.round(volume * 100));
        }
      } catch {}
    } else if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  }, [isMuted, isYouTube, volume]);

  // Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Picture in Picture
  const togglePip = async () => {
    if (videoRef.current && document.pictureInPictureEnabled) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await videoRef.current.requestPictureInPicture();
        }
      } catch (err) {
        console.warn('PiP failed', err);
      }
    }
  };

  // Keyboard Shortcuts (Space, J, L, M, F, Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft' || e.key === 'j') {
        e.preventDefault();
        seekRelative(-10);
      } else if (e.code === 'ArrowRight' || e.key === 'l') {
        e.preventDefault();
        seekRelative(10);
      } else if (e.key === 'm') {
        e.preventDefault();
        toggleMute();
      } else if (e.key === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        handleVolumeChange(Math.min(1, volume + 0.1));
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        handleVolumeChange(Math.max(0, volume - 0.1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, seekRelative, toggleMute, volume]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div 
      ref={containerRef}
      tabIndex={0}
      className="relative w-full aspect-video bg-slate-950 rounded-2xl overflow-hidden shadow-xl border border-slate-800 group select-none focus:outline-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Content Canvas */}
      {isYouTube ? (
        <div className="w-full h-full relative pointer-events-auto">
          {/* Official YouTube Embed Iframe Target */}
          <div id={iframeContainerId.current} className="w-full h-full" />
        </div>
      ) : (
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-contain"
          onTimeUpdate={handleHtml5TimeUpdate}
          onEnded={onComplete}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      {/* Floating Resume Indicator Banner */}
      {resumedBannerVisible && (
        <div className="absolute top-4 left-4 z-30 bg-slate-900/90 text-amber-400 text-xs px-3.5 py-1.5 rounded-full border border-amber-400/40 backdrop-blur-md flex items-center gap-2 shadow-xl animate-fadeIn">
          <FastForward className="w-3.5 h-3.5 text-amber-400" />
          <span>
            Resumed automatically from <strong>{formatTime(currentTime)}</strong> ({Math.round(progress)}%)
          </span>
        </div>
      )}

      {/* Center Play/Pause Overlay */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl transition transform hover:scale-110 active:scale-95 z-20 cursor-pointer"
          aria-label="Play Video"
        >
          <Play className="w-8 h-8 ml-1 fill-current" />
        </button>
      )}

      {/* Top Title Overlay */}
      <div className={`absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/85 via-black/40 to-transparent transition-opacity duration-300 z-10 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between text-white">
          <div>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              Working Educational Video • {isYouTube ? 'YouTube Player' : 'HTML5 Player'}
            </span>
            <h3 className="text-sm font-semibold text-white drop-shadow-sm">{chapterTitle}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
              {Math.round(progress)}% Watched
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Completed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Professional Control Bar */}
      <div className={`absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 z-20 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Progress Bar / Scrubber */}
        <div className="relative mb-3 flex items-center group/scrubber">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400 group-hover/scrubber:h-2 transition-all"
          />
          <div 
            className="absolute left-0 top-0 h-1.5 bg-gradient-to-r from-amber-500 to-amber-400 rounded-lg pointer-events-none group-hover/scrubber:h-2"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-1 hover:text-amber-400 transition cursor-pointer"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              title="Play/Pause (Space)"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>

            <button
              onClick={() => seekRelative(-10)}
              className="p-1 hover:text-amber-400 transition cursor-pointer"
              title="Rewind 10 seconds (Left Arrow or J)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => seekRelative(10)}
              className="p-1 hover:text-amber-400 transition cursor-pointer"
              title="Forward 10 seconds (Right Arrow or L)"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-1.5 ml-1">
              <button
                onClick={toggleMute}
                className="p-1 hover:text-amber-400 transition cursor-pointer"
                title="Mute / Unmute (M)"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-14 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-amber-400 hidden sm:inline-block"
              />
            </div>

            {/* Timestamp */}
            <span className="text-slate-300 font-mono text-[11px] ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed Selector */}
            <button
              onClick={cycleSpeed}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-amber-300 border border-slate-700 transition cursor-pointer"
              title="Playback Speed (0.5x, 1x, 1.25x, 1.5x, 2x)"
            >
              {speed}x
            </button>

            {/* Picture in Picture if supported */}
            {isPipSupported && (
              <button
                onClick={togglePip}
                className="p-1 hover:text-amber-400 transition cursor-pointer"
                title="Picture-in-Picture"
              >
                <Tv className="w-4 h-4" />
              </button>
            )}

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-1 hover:text-amber-400 transition cursor-pointer"
              title="Fullscreen (F)"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
