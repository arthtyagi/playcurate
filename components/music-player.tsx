"use client"

import { useAtom } from "jotai"
import { youtubeVideoAtom } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Volume2, VolumeX, Play, Pause, SkipBack, SkipForward, Video, VideoOff } from "lucide-react"
import { useState, useRef, useEffect } from "react"

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export function MusicPlayer() {
  const [youtubeVideo] = useAtom(youtubeVideoAtom)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const playerRef = useRef<any>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        console.log('YouTube API ready')
      }
    }
  }, [])

  // Initialize player when video changes
  useEffect(() => {
    if (youtubeVideo && window.YT) {
      if (playerRef.current) {
        playerRef.current.destroy()
      }

      playerRef.current = new window.YT.Player('music-player-iframe', {
        height: '300',
        width: '100%',
        videoId: youtubeVideo.videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          color: 'white',
          theme: 'dark',
          autohide: 1,
          wmode: 'transparent'
        },
        events: {
          onReady: (event: any) => {
            console.log('Player ready')
            setDuration(event.target.getDuration())
            setVolume(event.target.getVolume())
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
            setIsPlaying(event.data === 1)
            
            if (event.data === 1) {
              // Start tracking time
              intervalRef.current = setInterval(() => {
                if (playerRef.current && playerRef.current.getCurrentTime) {
                  setCurrentTime(playerRef.current.getCurrentTime())
                }
              }, 1000)
            } else {
              // Stop tracking time
              if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
              }
            }
          }
        }
      })
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [youtubeVideo])

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
    }
  }

  const handleSeek = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(newTime, true)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(newVolume)
    }
  }

  const handleMuteToggle = () => {
    if (playerRef.current && playerRef.current.isMuted) {
      const muted = playerRef.current.isMuted()
      if (muted) {
        playerRef.current.unMute()
        setIsMuted(false)
      } else {
        playerRef.current.mute()
        setIsMuted(true)
      }
    }
  }

  const handleVideoToggle = () => {
    setShowVideo(!showVideo)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!youtubeVideo) {
    return null
  }

  return (
    <>
      {/* Video iframe - only visible when showVideo is true */}
      {showVideo && (
        <div className="fixed bottom-20 left-4 right-4 z-40">
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl max-w-2xl mx-auto">
            <div id="music-player-iframe" />
          </div>
        </div>
      )}
      
      {/* Hidden iframe for YouTube API control when video is hidden */}
      {!showVideo && (
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
          <div id="music-player-iframe" />
        </div>
      )}
      
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/30 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Song Info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-12 h-12 bg-muted/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm line-clamp-1">YouTube Video</p>
                <p className="text-xs text-muted-foreground line-clamp-1">Now Playing</p>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handlePlayPause}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Seek Bar */}
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <span className="text-xs text-muted-foreground w-8 text-right">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                onValueChange={handleSeek}
                max={duration || 100}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground w-8">
                {formatTime(duration)}
              </span>
            </div>

            {/* Volume Controls */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleMuteToggle}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-20"
              />
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleVideoToggle}>
                {showVideo ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 