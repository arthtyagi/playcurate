"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useSetAtom, useAtomValue } from "jotai"
import { searchResultsAtom, searchQueryAtom, isSearchingAtom } from "@/lib/store"
import { searchYouTubeVideos } from "@/lib/actions"
import { toast } from "sonner"
import { Search } from "lucide-react"

export function YouTubeSearch() {
  const [query, setQuery] = useState("")
  const setSearchResults = useSetAtom(searchResultsAtom)
  const setSearchQuery = useSetAtom(searchQueryAtom)
  const setIsSearching = useSetAtom(isSearchingAtom)
  const isSearching = useAtomValue(isSearchingAtom)

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error("Please enter a search query")
      return
    }

    setIsSearching(true)
    setSearchQuery(query)
    
    try {
      const results = await searchYouTubeVideos(query, 10)
      setSearchResults(results)
      toast.success(`Found ${results.length} videos`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Search failed")
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="flex gap-2 w-full max-w-md">
      <Input
        placeholder="Search YouTube videos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isSearching}
        className="flex-1"
      />
      <Button 
        variant="outline" 
        onClick={handleSearch}
        disabled={isSearching}
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
} 