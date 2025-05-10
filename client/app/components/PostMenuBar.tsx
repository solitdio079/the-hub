/* eslint-disable react/prop-types */
import { useCallback, useState } from 'react'
import type { Route } from '../dashboard/+types/layout'
//import { useCurrentEditor } from '@tiptap/react'
export const MenuBar = ({ editor }) => {
  //const { editor } = useCurrentEditor()
  const [height, setHeight] = useState(480)
  const [width, setWidth] = useState(640)
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) {
    return null
  }

  if (!editor) {
    return null
  }
  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL')

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(width, 10)) || 640,
        height: Math.max(180, parseInt(height, 10)) || 480,
      })
    }
  }

  return (
    <div className="control-group flex flex-col my-5">
      <div className="join my-5">
        <input
          id="width"
          type="number"
          min="320"
          max="1024"
          placeholder="width"
          className="input-bordered join-item input-sm"
          value={width}
          onChange={(event) => setWidth(event.target.value)}
        />
        <input
          id="height"
          type="number"
          min="180"
          max="720"
          placeholder="height"
          className="join-item input-bordered input-sm"
          value={height}
          onChange={(event) => setHeight(event.target.value)}
        />
        <button
          type="button"
          className="btn join-item btn-sm"
          id="add"
          onClick={addYoutubeVideo}
        >
          Add YouTube video
        </button>
      </div>
      <div className="button-group join flex flex-wrap">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive('bold')
              ? 'is-active  btn btn-sm m-2  font-bold bg-primary join-item'
              : ' btn btn-sm m-2 font-bold join-item'
          }
        >
          B
        </button>
        <button
          type="button"
          onClick={setLink}
          className={
            editor.isActive('link')
              ? 'is-active btn btn-sm m-2 join-item'
              : 'btn btn-sm m-2 join-item'
          }
        >
          Set link
        </button>
        <button
          type="button"
          className="btn btn-sm m-2 join-item"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
        >
          Unset link
        </button>

        <button
          type="button"
          className="btn m-2 join-item btn-sm"
          onClick={addImage}
        >
          Set image
        </button>

        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          Insert table
        </button>
        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() => editor.chain().focus().addColumnBefore().run()}
        >
          Add column before
        </button>
        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
        >
          Add column after
        </button>
        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() => editor.chain().focus().deleteColumn().run()}
        >
          Delete column
        </button>
        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() => editor.chain().focus().addRowBefore().run()}
        >
          Add row before
        </button>
        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() => editor.chain().focus().addRowAfter().run()}
        >
          Add row after
        </button>
        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() => editor.chain().focus().deleteRow().run()}
        >
          Delete row
        </button>
        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() => editor.chain().focus().deleteTable().run()}
        >
          Delete table
        </button>
        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() => editor.chain().focus().mergeCells().run()}
        >
          Merge cells
        </button>
        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() => editor.chain().focus().splitCell().run()}
        >
          Split cell
        </button>
        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
        >
          Toggle header column
        </button>
        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() => editor.chain().focus().toggleHeaderRow().run()}
        >
          Toggle header row
        </button>
        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() => editor.chain().focus().toggleHeaderCell().run()}
        >
          Toggle header cell
        </button>
        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() => editor.chain().focus().mergeOrSplit().run()}
        >
          Merge or split
        </button>
        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() =>
            editor.chain().focus().setCellAttribute('colspan', 2).run()
          }
        >
          Set cell attribute
        </button>
        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() => editor.chain().focus().fixTables().run()}
        >
          Fix tables
        </button>
        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() => editor.chain().focus().goToNextCell().run()}
        >
          Go to next cell
        </button>
        <button
          type="button"
          className=" btn btn-sm m-2 join-item"
          onClick={() => editor.chain().focus().goToPreviousCell().run()}
        >
          Go to previous cell
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive('italic')
              ? 'is-active  btn btn-sm m-2 bg-primary italic join-item'
              : ' btn btn-sm m-2 italic join-item'
          }
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={
            editor.isActive('strike')
              ? 'is-active  btn btn-sm m-2 bg-primary line-through join-item'
              : ' btn btn-sm m-2 line-through join-item'
          }
        >
          Strike
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive('code')
              ? 'is-active  btn btn-sm bg-primary m-2 join-item'
              : ' btn btn-sm m-2 join-item'
          }
        >
          Code
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className=" btn btn-sm m-2 join-item"
        >
          Clear marks
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().clearNodes().run()}
          className=" btn btn-sm m-2 join-item"
        >
          Clear nodes
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            editor.isActive('paragraph')
              ? 'is-active  btn btn-sm m-2 bg-primary join-item'
              : ' btn btn-sm m-2 join-item'
          }
        >
          Paragraph
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 })
              ? 'is-active  btn btn-sm m-2 bg-primary join-item'
              : ' btn btn-sm m-2 join-item'
          }
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 })
              ? 'is-active  btn btn-sm m-2 bg-primary join-item'
              : ' btn btn-sm m-2 join-item'
          }
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 })
              ? 'is-active  btn btn-sm m-2 bg-primary join-item'
              : ' btn btn-sm m-2 join-item'
          }
        >
          H3
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive('heading', { level: 4 })
              ? 'is-active  btn btn-sm m-2 bg-primary join-item'
              : ' btn btn-sm m-2 join-item'
          }
        >
          H4
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive('bulletList')
              ? 'is-active  btn btn-sm m-2 bg-primary join-item'
              : ' btn btn-sm m-2 join-item'
          }
        >
          Bullet list
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive('orderedList')
              ? 'is-active  btn btn-sm m-2 bg-primary join-item'
              : ' btn btn-sm m-2 join-item'
          }
        >
          Ordered list
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive('codeBlock')
              ? 'is-active  btn btn-sm m-2 bg-primary join-item'
              : ' btn btn-sm m-2 join-item'
          }
        >
          Code block
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive('blockquote')
              ? 'is-active  btn btn-sm m-2 bg-primary join-item'
              : ' btn btn-sm m-2 join-item'
          }
        >
          Blockquote
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className=" btn btn-sm m-2 join-item"
        >
          Horizontal rule
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className=" btn btn-sm m-2 join-item"
        >
          Hard break
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className=" btn btn-sm m-2 join-item"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className=" btn btn-sm m-2 join-item"
        >
          Redo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setColor('#EEF8F7').run()}
          className={
            editor.isActive('textStyle', { color: '#958DF1' })
              ? 'is-active  btn btn-sm m-2 bg-primary join-item'
              : ' btn btn-sm m-2 join-item'
          }
        >
          White
        </button>
      </div>
    </div>
  )
}
