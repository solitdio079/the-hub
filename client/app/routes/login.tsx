import type { Route } from "./+types/login";
//import { Welcome } from "../welcome/welcome";
import { useFetcher } from "react-router";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { serverUrl } from "~/utils/server";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login Page!" },
    { name: "description", content: "This is the page" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const objBody = Object.fromEntries(formData);
    try {
        const req = await fetch(serverUrl + '/auth/login/email', {
          method: 'POST',
          mode: 'cors',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(objBody),
        })
        const response = await req.json();
        return response;
    } catch (error: any) {
        return {error: error.message}
    }
}

export default function Login() {
    const fetcher = useFetcher();
    useEffect(() => {
        const toastOptions = {duration: 5000}
        fetcher.data ? fetcher.data.msg ? toast.success(fetcher.data.msg, toastOptions): toast.error(fetcher.data.error,toastOptions):''
    });
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fetcher.Form
              method="post"
              className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box"
            >
              <legend className="fieldset-legend">Login</legend>
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                required
              />
              <Toaster />
              <button className="btn btn-primary mt-4">
                {' '}
                {fetcher.state === 'idle' ? (
                  'Login'
                ) : (
                  <span className="loading loading-ball"></span>
                )}{' '}
              </button>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
  )
}
