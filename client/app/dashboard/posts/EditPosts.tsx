import { useEffect, useState } from 'react'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { useFetcher } from 'react-router'
import toast, { Toaster } from 'react-hot-toast'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import Link from '@tiptap/extension-link'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Gapcursor from '@tiptap/extension-gapcursor'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { MenuBar } from '~/components/PostMenuBar'
//import { FaCheck } from 'react-icons/fa6'
import { serverUrl } from '~/utils/server'
import { FaClipboard } from 'react-icons/fa6'
import copy from 'copy-to-clipboard'

// action to create Post
export async function clientAction({ request, params }: Route.ClientActionArgs) {
  const formData = await request.formData()
  const { id } = params
  const bodyObject = Object.fromEntries(formData)
  console.log(bodyObject.images)
  try {
    const req = await fetch(serverUrl + `/posts/${id}`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyObject),
    })
    const response = await req.json()
    return response
  } catch (error) {
    return { error: error }
  }
}

//lowlight

// load all languages with "all" or common languages with "common"
import { common, createLowlight } from 'lowlight'
import type { Route } from './+types/EditPosts'
//import CategoriesSelect from '../../../components/admin/categorieSelect'

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(common)

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params

  try {
    const req = await fetch(serverUrl + `/posts/${id}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const response = await req.json()
    if (response.error) throw new Error(response.error)
    return response
  } catch (error) {
    return { error: error }
  }
}

export default function EditPost({loaderData}: Route.ComponentProps) {
  const loadedPost = loaderData
  const fetcher = useFetcher()

  //const [editorContent, setEditorContent]= useState('')
  console.log(loadedPost)
  const [imagesLink, setImagesLink] = useState(loadedPost.images)

  const toastOptions = {
    duration: 5000,
  }
  useEffect(() => {
    if (fetcher.data) {
      toast.dismiss()
      fetcher.data.msg
        ? toast.success(fetcher.data.msg, toastOptions)
        : fetcher.data.images
        ? setImagesLink(fetcher.data.images)
        : toast.error(fetcher.data.error, toastOptions)
    }
    //if(editor) setEditorContent(editor.getJSON())
  }, [fetcher.data])

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
    Link.configure({
      openOnClick: true,
      autolink: true,
      defaultProtocol: 'https',
      protocols: ['http', 'https'],
      isAllowedUri: (url, ctx) => {
        try {
          // construct URL
          const parsedUrl = url.includes(':')
            ? new URL(url)
            : new URL(`${ctx.defaultProtocol}://${url}`)

          // use default validation
          if (!ctx.defaultValidate(parsedUrl.href)) {
            return false
          }

          // disallowed protocols
          const disallowedProtocols = ['ftp', 'file', 'mailto']
          const protocol = parsedUrl.protocol.replace(':', '')

          if (disallowedProtocols.includes(protocol)) {
            return false
          }

          // only allow protocols specified in ctx.protocols
          const allowedProtocols = ctx.protocols.map((p) =>
            typeof p === 'string' ? p : p.scheme
          )

          if (!allowedProtocols.includes(protocol)) {
            return false
          }

          // disallowed domains
          const disallowedDomains = [
            'example-phishing.com',
            'malicious-site.net',
          ]
          const domain = parsedUrl.hostname

          if (disallowedDomains.includes(domain)) {
            return false
          }

          // all checks have passed
          return true
        } catch (error) {
          return false
        }
      },
      shouldAutoLink: (url) => {
        try {
          // construct URL
          const parsedUrl = url.includes(':')
            ? new URL(url)
            : new URL(`https://${url}`)

          // only auto-link if the domain is not in the disallowed list
          const disallowedDomains = [
            'example-no-autolink.com',
            'another-no-autolink.com',
          ]
          const domain = parsedUrl.hostname

          return !disallowedDomains.includes(domain)
        } catch (error) {
          return false
        }
      },
    }),
    Gapcursor,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    Image,
    Youtube.configure({
      controls: false,
      nocookie: true,
    }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
  ]

  const content = JSON.parse(loadedPost.content)

  const editor = useEditor({
    extensions,
    content,
  })

  // console.log('editor: ' + editor)
  return (
    <div className="flex flex-col items-center">
      <fetcher.Form
        encType="multipart/form-data"
        method="post"
        action={'/admin/posts/imagesUpload'}
        className="flex items-center "
      >
        <input
          type="file"
          name="images"
          className="file-input w-full max-w-xs my-5"
          multiple
        />
        <div className="form-control mx-3">
          <button className="btn btn-primary text-white">
            {' '}
            {fetcher.state === 'submitting' ? (
              <span className="loading loading-infinity loading-md"></span>
            ) : (
              'Upload'
            )}
          </button>
        </div>
      </fetcher.Form>
      {imagesLink.length > 0
        ? imagesLink.map((item) => (
            <div
              role="alert"
              key={item}
              className="alert alert-success my-3 p-0"
            >
              <span className="flex items-center">
                {' '}
                <img className="m-2" src={serverUrl + '/' + item} width={60} />
                <span className="italic text-white"> {serverUrl + '/' + item} </span>
                <button
                  onClick={() => {
                    copy(serverUrl + '/' + item)
                    toast.dismiss()
                    toast.success('Copied to clipboard', toastOptions)
                  }}
                  className="btn btn-outline mx-3 hover:bg-primary text-white"
                >
                  <FaClipboard className="h-5 w-5" />
                </button>
              </span>
            </div>
          ))
        : ''}
      <fetcher.Form method="post" className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Title</span>
          </label>
          <input
            type="text"
            placeholder="title"
            className="input input-bordered text-white bg-transparent border border-white"
            name="title"
            defaultValue={loadedPost.title}
            required
          />
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />

          <input
            type="hidden"
            name="content"
            value={JSON.stringify(editor.getJSON(), null, 2)}
          />
          <input type="hidden" name="images" value={imagesLink} />

          <Toaster />
        </div>
        <label className="fieldset-label">Tags</label>
        <input type="text" name="tags" defaultValue={loadedPost.tags.join(" ")} />

        <div className="form-control mt-6">
          <button className="btn btn-warning text-white">
            {' '}
            {fetcher.state === 'submitting' ? (
              <span className="loading loading-infinity loading-md"></span>
            ) : (
              'Edit Post'
            )}
          </button>
        </div>
      </fetcher.Form>
    </div>
  )
}
