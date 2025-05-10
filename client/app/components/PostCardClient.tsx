import { FaArrowRight, FaPencil } from 'react-icons/fa6'
import { Form, Link } from 'react-router'
export default function PostCardClient({ item }) {
  const post = item
  return (
    <li className="list-row">
      <div>
        <div>
          <Link to={`/post/${post._id}`} className='text-xl font-bold'>{post.title}</Link>{' '}
        </div>
        <div className="text-xs  font-semibold opacity-60">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </div>

      <Link to={`/post/${post._id}`} className="btn btn-square btn-primary">
        <FaArrowRight />
      </Link>
    </li>
  )
}
