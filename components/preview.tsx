"use client"

import { useAtom } from "jotai"
import { youtubeVideoAtom, isAudioOnlyAtom } from "@/lib/store"
import { YouTubeEmbed } from "@next/third-parties/google"
import { Button } from "@/components/ui/button"
import { Volume2, Video } from "lucide-react"
import { cn } from "@/lib/utils"

export function Preview() {
  const [youtubeVideo] = useAtom(youtubeVideoAtom)
  const [isAudioOnly, setIsAudioOnly] = useAtom(isAudioOnlyAtom)

  if (!youtubeVideo) {
    return (
      <div className="flex items-center justify-center h-64 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
        <p className="text-muted-foreground text-center">
          Paste a YouTube URL to preview
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Preview</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAudioOnly(!isAudioOnly)}
          className="flex items-center gap-2"
        >
          {isAudioOnly ? <Video className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {isAudioOnly ? "Show Video" : "Audio Only"}
        </Button>
      </div>
      
      <div className={cn(
        "relative bg-black rounded-lg overflow-hidden",
        isAudioOnly ? "h-32" : "aspect-video"
      )}>
        <YouTubeEmbed
          videoid={youtubeVideo.videoId}
          height={isAudioOnly ? 128 : 400}
          params={isAudioOnly ? "controls=1&modestbranding=1&rel=0&showinfo=0" : "controls=1&modestbranding=1&rel=0"}
        />
        
        {isAudioOnly && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/50 to-black/80">
            <div className="text-center text-white">
              <Volume2 className="h-12 w-12 mx-auto mb-2 opacity-75" />
              <p className="text-sm font-medium">Audio Only Mode</p>
              <p className="text-xs opacity-75">Video hidden for audio focus</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p>Video ID: {youtubeVideo.videoId}</p>
        <p className="truncate">URL: {youtubeVideo.url}</p>
      </div>
    </div>
  )
}
