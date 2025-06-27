"use server"

const YOUTUBE_API_KEY = process.env.YT_API_KEY
const YOUTUBE_SEARCH_API = 'https://www.googleapis.com/youtube/v3/search'

export async function processYouTubeUrl(url: string) {
  if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
    throw new Error("Invalid YouTube URL")
  }

  let videoId: string

  if (url.includes("youtube.com")) {
    const urlParams = new URL(url).searchParams
    videoId = urlParams.get("v") || ""
  } else if (url.includes("youtu.be")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0] || ""
  } else {
    throw new Error("Could not extract video ID")
  }

  if (!videoId) {
    throw new Error("Invalid video ID")
  }

  return { videoId, url }
}

export async function searchYouTubeVideos(query: string, maxResults: number = 10) {
  if (!YOUTUBE_API_KEY) {
    throw new Error("YouTube API key not configured")
  }

  if (!query.trim()) {
    throw new Error("Search query is required")
  }

  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: maxResults.toString(),
    key: YOUTUBE_API_KEY,
    videoEmbeddable: 'true'
  })

  const response = await fetch(`${YOUTUBE_SEARCH_API}?${params}`)
  
  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.status}`)
  }

  const data = await response.json()
  
  if (data.error) {
    throw new Error(`YouTube API error: ${data.error.message}`)
  }

  return data.items?.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.medium,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`
  })) || []
} 