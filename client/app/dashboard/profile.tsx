import { useContext, useEffect } from "react"
import { useFetcher } from "react-router"
import { UserContext } from "~/contexts"
import { serverUrl } from "~/utils/server"
import type { Route } from "./+types/profile"
import toast, {Toaster} from 'react-hot-toast'

export async function action({request}: Route.ActionArgs) {
    const formData = await request.formData()
    const bodyObject = Object.fromEntries(formData)
    
    try {
        const req = await fetch(serverUrl + `/users/${bodyObject.id}`, {
            method: "PUT",
            mode: 'cors',
            credentials: 'include',
            body: formData
        })
        const response = await req.json()
        if(response.error) return {error: response.error}
        return response
    } catch (error) {
        return {error: error}
    }
}

export default function Profile() {
    const user = useContext(UserContext) || {fullName:'John Doe',email:'example@abc.com',avatar:'', _id:'n0tAv@lidID'}
    const fetcher = useFetcher()

    useEffect(() => {
        const toastOptions = {duration: 5000}
        fetcher.data ? fetcher.data.msg ? toast.success(fetcher.data.msg, toastOptions): toast.error(fetcher.data.error, toastOptions): ''
    })
    return (
      <div className="mx-auto lg:m-5">
        <div className="card bg-base-100 w-96 shadow-sm p-5">
          <figure>
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                <img src={user.avatar ? serverUrl+"/"+user.avatar : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}   />
              </div>
            </div>
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {user.fullName || 'John Doe'}
              <div className="badge badge-primary"> {user.email} </div>
            </h2>
            <fetcher.Form method="post" encType="multipart/form-data" className="fieldset">
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                defaultValue={user.email}
                name="email"
                className="input"
                        />
                        <input type="hidden" name="id" value={user._id}/>
              <label className="fieldset-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="input"
                defaultValue={user.fullName}
              />
              <Toaster/>

              <label className="fieldset-label">Avatar</label>
              <input type="file" required name="avatar" className="file-input" />

              <button type="submit" className="btn btn-primary mt-4"> {fetcher.state === 'idle' ? 'Edit' :<span className="loading loading-ball"></span> } </button>
            </fetcher.Form>
          </div>
        </div>
      </div>
    )
}