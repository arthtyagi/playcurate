"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PasteLink } from "@/components/paste-link"
import { YouTubeSearch } from "@/components/youtube-search"
import { SearchResults } from "@/components/search-results"
import { useAtomValue } from "jotai"
import { searchResultsAtom } from "@/lib/store"

export function YouTubeTabs() {
  const searchResults = useAtomValue(searchResultsAtom)

  return (
    <div className="w-full max-w-6xl space-y-6">
      <Tabs defaultValue="paste" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="paste">Paste Link</TabsTrigger>
          <TabsTrigger value="search">Search Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="paste" className="space-y-6">
          <div className="flex flex-col items-center space-y-6">
            <PasteLink />
          </div>
        </TabsContent>
        
        <TabsContent value="search" className="space-y-6">
          <div className="flex flex-col items-center space-y-6">
            <YouTubeSearch />
            {searchResults.length > 0 && <SearchResults />}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 