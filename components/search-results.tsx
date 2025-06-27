"use client"

import { useAtom, useSetAtom } from "jotai"
import { searchResultsAtom, youtubeVideoAtom } from "@/lib/store"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Play, ExternalLink } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function SearchResults() {
  const [searchResults] = useAtom(searchResultsAtom)
  const setYoutubeVideo = useSetAtom(youtubeVideoAtom)

  if (searchResults.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
        <p className="text-muted-foreground text-center">
          Search for videos to see results
        </p>
      </div>
    )
  }

  const handleSelectVideo = (result: any) => {
    setYoutubeVideo({
      videoId: result.id,
      url: result.url
    })
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Search Results</h3>
        <p className="text-sm text-muted-foreground">
          {searchResults.length} videos found
        </p>
      </div>
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Thumbnail</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchResults.map((result) => (
              <TableRow key={result.id}>
                <TableCell>
                  <img
                    src={result.thumbnail.url}
                    alt={result.title}
                    width={result.thumbnail.width}
                    height={result.thumbnail.height}
                    className="rounded w-16 h-12 object-cover"
                  />
                </TableCell>
                <TableCell>
                  <div className="max-w-md">
                    <p className="font-medium text-sm line-clamp-2">
                      {result.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                      {result.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{result.channelTitle}</p>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(result.publishedAt), { addSuffix: true })}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSelectVideo(result)}
                    >
                      <Play className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <a href={result.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 