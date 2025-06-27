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
    <div className="w-full max-w-2xl mx-auto">
      <Tabs defaultValue="paste" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-11 rounded-2xl bg-muted/20 p-1">
          <TabsTrigger 
            value="paste" 
            className="rounded-xl text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all"
          >
            Paste Link
          </TabsTrigger>
          <TabsTrigger 
            value="search" 
            className="rounded-xl text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all"
          >
            Search
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="paste" className="mt-8">
          <PasteLink />
        </TabsContent>
        
        <TabsContent value="search" className="mt-8 space-y-6">
          <YouTubeSearch />
          {searchResults.length > 0 && <SearchResults />}
        </TabsContent>
      </Tabs>
    </div>
  )
} 