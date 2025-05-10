import { type RouteConfig } from '@react-router/dev/routes'
import { index, layout, route } from '@react-router/dev/routes'

export default [
  layout('routes/layout.tsx', [
    index('routes/home.tsx'),
    route('login', 'routes/login.tsx'),
    route('logout', 'routes/logout.tsx'),
    route('loaders/posts', 'loaders/allPosts.tsx'),
    //post liste
    route('posts', 'routes/postlist.tsx'),
    //single posts
    route("post/:id", "routes/singlePost.tsx"),
    //Tag posts
    route("tag/posts/:tag", "routes/tagPosts.tsx"),
    // parent route
    route('admin', './dashboard/layout.tsx', [
      // child routes
      route('/admin/profile', './dashboard/profile.tsx'),
      route('/admin/posts', './dashboard/posts/layout.tsx', [
        //Post children
        index('./dashboard/posts/AllPosts.tsx'),
        route('create', './dashboard/posts/CreatePosts.tsx'),
        route('imagesUpload', './dashboard/posts/ImagesUpload.tsx'),
        route('edit/:id', './dashboard/posts/EditPosts.tsx'),
        route('delete/:id', './dashboard/posts/DeletePost.tsx'),
      ])
    ]),
  ]),
] satisfies RouteConfig
