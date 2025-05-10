import InfiniteEntity from "~/components/InfiniteEntity";
import PostCardClient from "~/components/PostCardClient";
import TagsList from "~/components/TagsList";
import { serverUrl } from "~/utils/server";

export default function PostList() {
    return (
      <>
        <div
          className="hero min-h-96"
          style={{
            backgroundImage:
              'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">All Posts</h1>
              <p className="mb-5">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row m-10">
          <div className="w-full lg:w-1/5">
            <TagsList active="none" />
          </div>
          <div className="w-full lg:w-4/5">
            <InfiniteEntity
              loaderRoute={'/loaders/posts/'}
              fetchMoreURL={serverUrl + '/posts/'}
              UnitEntity={PostCardClient}
            />
          </div>
        </div>
      </>
    )
}