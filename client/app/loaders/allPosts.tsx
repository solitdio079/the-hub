import { serverUrl } from "~/utils/server"
import type { Route } from "../+types/root"
export async function loader({request}: Route.LoaderArgs) {
  const url = new URL(request.url)
  const tag = url.searchParams.get("tag")
  try {
    const response = await fetch(serverUrl + `/posts/?tag=${tag||''}&cursor=&limit=${5}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    const allPosts = await response.json()
   // console.log(allPosts)
    return allPosts
  } catch (error) {
    return { error: error }
  }
}
