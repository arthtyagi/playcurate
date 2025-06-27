import { atom } from "jotai"

export interface YouTubeVideo {
  videoId: string
  url: string
}

export interface SearchResult {
  id: string
  title: string
  description: string
  thumbnail: {
    url: string
    width: number
    height: number
  }
  channelTitle: string
  publishedAt: string
  url: string
}

export const youtubeVideoAtom = atom<YouTubeVideo | null>(null)
export const searchResultsAtom = atom<SearchResult[]>([])
export const searchQueryAtom = atom<string>("")
export const isSearchingAtom = atom<boolean>(false) 