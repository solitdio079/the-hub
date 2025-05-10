/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useFetcher } from 'react-router'
import InfiniteScroll from 'react-infinite-scroll-component'
//import { FaPlus } from 'react-icons/fa6'
//import { url } from '../../../utils/serverUrl'
//import PostCardAdmin from '../../../components/admin/postCardAdmin'
//import AnimatedLayout from '../../animation/animatedLayout'
//import ProductCard from '../../components/productCard'

export default function InfiniteEntity({
  loaderRoute,
  fetchMoreURL,
  UnitEntity,
}) {
  const fetcher = useFetcher()
  const [items, setItems] = useState([])
  const [cursor, setCursor] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') {
      fetcher.load(loaderRoute)
    }
    if (fetcher.data) setItems(fetcher.data)
    cursor ? fetchMoreData() : ''
  }, [cursor, fetcher.data])

  const fetchMoreData = async () => {
    let completeUrl = fetchMoreURL + `?cursor=${cursor || ''}&limit=${5}`
    if (completeUrl.includes("?")) {
       completeUrl = fetchMoreURL + `&cursor=${cursor || ''}&limit=${5}`
    }
    try {
      const response = await fetch(
        fetchMoreURL + `?cursor=${cursor || ''}&limit=${5}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const moreItems = await response.json()
      console.log(moreItems)
      setItems((prevItems) => [...prevItems, ...moreItems])

      moreItems.length > 0 ? setHasMore(true) : setHasMore(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full">
      {items.length > 0 ? (
        <InfiniteScroll
          dataLength={items.length || 0}
          next={() => setCursor(items[items.length - 1]._id)}
          hasMore={hasMore}
          loader={<span className="loading loading-infinity loading-lg"></span>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b className="text-white">Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="flex flex-col flex-wrap text-white list bg-base-100 w-full rounded-box shadow-md m-5">
            {items.map((item) => (
              <UnitEntity item={item} key={item._id} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <p className="text-center text-white">No Data</p>
      )}
    </div>
  )
}
