"use client"

import { useAtom } from "jotai"
import { youtubeVideoAtom } from "@/lib/store"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export function Preview() {
  const [youtubeVideo] = useAtom(youtubeVideoAtom)

  if (!youtubeVideo) {
    return (
      <div className="flex items-center justify-center h-80 bg-muted/5 rounded-3xl border border-border/20">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-muted/10 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-muted-foreground/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <p className="text-muted-foreground/80 font-medium">Paste a YouTube URL to preview</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-black rounded-3xl overflow-hidden shadow-2xl">
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeVideo.videoId}?controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=1&color=white&theme=dark&autohide=1&wmode=transparent&autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </AspectRatio>
      </div>
    </div>
  )
}
