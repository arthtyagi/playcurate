"use client"

import { useAtom, useSetAtom } from "jotai"
import { searchResultsAtom, youtubeVideoAtom } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { MoreVertical, Play, Copy, ExternalLink, Download } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { toast } from "sonner"

export function SearchResults() {
  const [searchResults] = useAtom(searchResultsAtom)
  const setYoutubeVideo = useSetAtom(youtubeVideoAtom)

  if (searchResults.length === 0) {
    return null
  }

  const handlePlayVideo = (result: any) => {
    setYoutubeVideo({
      videoId: result.id,
      url: result.url
    })
    toast.success("Video loaded")
  }

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success("Link copied to clipboard")
    } catch (error) {
      toast.error("Failed to copy link")
    }
  }

  const handleOpenVideo = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleDownloadVideo = (result: any) => {
    // This would require a backend service to handle video downloads
    // For now, we'll show a toast indicating this feature
    toast.info("Download feature coming soon")
  }

  const handleItemClick = (e: React.MouseEvent, result: any) => {
    // Don't trigger if clicking on the dropdown menu
    if ((e.target as HTMLElement).closest('[data-radix-dropdown-menu-trigger]')) {
      return
    }
    handlePlayVideo(result)
  }

  return (
    <div className="space-y-3">
      {searchResults.map((result) => (
        <ContextMenu key={result.id}>
          <ContextMenuTrigger>
            <div 
              className="flex items-center gap-4 p-4 bg-background rounded-2xl border border-border/30 hover:bg-muted/20 transition-colors cursor-pointer"
              onClick={(e) => handleItemClick(e, result)}
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 rounded-lg p-0 flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => handlePlayVideo(result)}>
                    <Play className="h-4 w-4 mr-2" />
                    Play Video
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCopyLink(result.url)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleOpenVideo(result.url)}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in YouTube
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownloadVideo(result)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Video
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-48">
            <ContextMenuItem onClick={() => handlePlayVideo(result)}>
              <Play className="h-4 w-4 mr-2" />
              Play Video
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleCopyLink(result.url)}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleOpenVideo(result.url)}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in YouTube
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleDownloadVideo(result)}>
              <Download className="h-4 w-4 mr-2" />
              Download Video
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  )
} 