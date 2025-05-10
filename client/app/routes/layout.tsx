import type { Route } from "./+types/home";
import { serverUrl } from "~/utils/server";
import { UserContext } from "~/contexts";
import { Outlet } from "react-router";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const req = await fetch(serverUrl + '/auth/login/status', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json,',
    },
  })
  const response = await req.json()
  console.log(response)
  if (response.error) return

  return response
}


export default function Layout({ loaderData }: Route.ComponentProps) {
  const user = loaderData
  return (
    <UserContext value={user}>
      <Navbar/>
      <Outlet />
      <Footer/>
    </UserContext>
  )
}
