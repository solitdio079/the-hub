import { Link } from "react-router";
import { tags } from "~/utils/tags";
import type { Route } from "../+types/root";

export default function TagsList({active}) {
    return (
      <>
        <ul className="menu menu-horizontal lg:menu-vertical w-full bg-base-200 rounded-box ">
          {tags.length > 0
            ? tags.map((tag) => (
                <Link
                  className= { tag ==active ? "badge badge-primary hover:bg-ghost m-3": "badge hover:bg-primary badge-ghost m-3"} 
                  to={`/tag/posts/${tag}`}
                >
                  {tag}
                </Link>
              ))
            : ''}
        </ul>
      </>
    )
}