import { serverUrl } from "~/utils/server"
import type { Route } from "./+types/ImagesUpload"
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  try {
    const req = await fetch(serverUrl + '/posts/postImages', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: formData,
    })
    const response = await req.json()
    return response
  } catch (error) {
    return { error: error }
  }
}
