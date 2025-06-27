"use client"

import { useAtom, useSetAtom } from "jotai"
import { searchResultsAtom, youtubeVideoAtom } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function SearchResults() {
  const [searchResults] = useAtom(searchResultsAtom)
  const setYoutubeVideo = useSetAtom(youtubeVideoAtom)

  if (searchResults.length === 0) {
    return null
  }

  const handleSelectVideo = (result: any) => {
    setYoutubeVideo({
      videoId: result.id,
      url: result.url
    })
  }

  return (
    <div className="space-y-3">
      {searchResults.map((result) => (
        <div 
          key={result.id} 
          className="flex items-center gap-4 p-4 bg-background rounded-2xl border border-border/30 hover:bg-muted/20 transition-colors"
        >
          <img
            src={result.thumbnail.url}
            alt={result.title}
            className="rounded-lg w-16 h-12 object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-foreground line-clamp-2 mb-1">
              {result.title}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
              <span className="line-clamp-1">{result.channelTitle}</span>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(result.publishedAt), { addSuffix: true })}</span>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => handleSelectVideo(result)}
            className="h-9 w-9 rounded-lg p-0 flex-shrink-0"
          >
            <Play className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  )
} 