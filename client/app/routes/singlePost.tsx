import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'
import { FaCode } from 'react-icons/fa6'
import Youtube from '@tiptap/extension-youtube'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Gapcursor from '@tiptap/extension-gapcursor'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

//import { FaCheck } from 'react-icons/fa6'
import { serverUrl } from '~/utils/server'
//lowlight

// load all languages with "all" or common languages with "common"
import { common, createLowlight } from 'lowlight'
import type { Route } from './+types/singlePost'

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(common)

export async function loader({ params }:Route.LoaderArgs) {
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

export default function SinglePost({loaderData}: Route.ComponentProps) {
  const loadedPost = loaderData

  //const [editorContent, setEditorContent]= useState('')
  console.log(loadedPost)

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
    editable: false,
  })

  // console.log('editor: ' + editor)
  return (
    <div className="flex flex-col items-center lg:items-start lg:m-10">
      <div className="w-full lg:w-3/4 lg:px-10 mt-10 px-5">
        <h1 className="text-4xl font-bold text-white lg:text-5xl">
          {' '}
          {loadedPost.title}{' '}
        </h1>
        <div className="flex justify-start">
          <span className="flex items-center text-sm justify-between text-gray-400 m-2 lg:m-4">
            {' '}
            {loadedPost.tags.map((tag: string) => (
              <span
                className="badge badge-primary m-2"
                key={Math.random() * 10e9}
              >
                {' '}
                {tag}{' '}
              </span>
            ))}{' '}
          </span>
          <span className="flex text-sm items-center justify-between text-gray-400 m-2 lg:m-4">
            {' '}
            <span className='badge badge-ghost'>{new Date(loadedPost.updatedAt).toLocaleDateString()} </span>
          </span>
        </div>
      </div>

      <EditorContent className="px-10" editor={editor} />
    </div>
  )
}
