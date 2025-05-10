import { serverUrl } from "~/utils/server";
import { redirect } from "react-router";

export async function action() {
    try {
        const req = await fetch(serverUrl + "/auth/logout", {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await req.json()
        if (response.error) {
            console.log(response.error)
             return redirect('/')
        }
        return redirect('/login')
       
    } catch (error) {
        console.log(`Error Message: An error occured!`)
    }
}