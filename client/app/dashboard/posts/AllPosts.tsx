import { serverUrl } from "~/utils/server";
import type { Route } from "./+types/AllPosts";
import { FaPencil, FaX } from "react-icons/fa6";
import InfiniteEntity from "~/components/InfiniteEntity";
import PostCardAdmin from "~/components/PostCardAdmin";

export async function loader() {
    try {
        const req = await fetch(serverUrl + '/posts/?cursor=&limit=${5}', {
           method: 'GET',
           credentials: 'include',
           headers: {
             'Content-Type': 'application/json',
           },
        })
        const response = await req.json()
        return response
    } catch (error) {
        return {error}
    }  
}

export default function AllPosts({ loaderData }: Route.ComponentProps) {
    const allPosts = loaderData

    return (
      <>
        <InfiniteEntity
          loaderRoute={'/loaders/posts/'}
          fetchMoreURL={serverUrl + '/posts/'}
          UnitEntity={PostCardAdmin}
        />
           
      </>
    )
}