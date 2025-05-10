import { redirect } from "react-router";
import { serverUrl } from "~/utils/server";
import type { Route } from "./+types/DeletePost";

export async function action({ params }: Route.ActionArgs) {
    const { id } = params 
    
    try {
        const req = await fetch(serverUrl + `/posts/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const response = await req.json()
        if (response.msg) return redirect("/admin/posts/")
        console.log(response)
        return {error: response.error }
    } catch (error) {
        return {error:error}
    }
    
}