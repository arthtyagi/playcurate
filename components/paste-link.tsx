"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useSetAtom } from "jotai"
import { youtubeVideoAtom } from "@/lib/store"
import { processYouTubeUrl } from "@/lib/actions"
import { toast } from "sonner"

export function PasteLink() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const setYoutubeVideo = useSetAtom(youtubeVideoAtom)

  const handleSubmit = async () => {
    if (!url.trim()) {
      toast.error("Please enter a YouTube URL")
      return
    }

    setIsLoading(true)
    try {
      const result = await processYouTubeUrl(url)
      setYoutubeVideo(result)
      setUrl("")
      toast.success("Video loaded successfully!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to process URL")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <div className="flex gap-2 w-full max-w-md">
      <Input
        placeholder="Paste YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
        className="flex-1"
      />
      <Button 
        variant="outline" 
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Load"}
      </Button>
    </div>
  )
}
