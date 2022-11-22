import axios from 'axios'
import React, { useState } from 'react'
import useGetNews from '../../../../services/News/GetNews'

const News = () => {
  const [fetchMore, setFetchMore] = useState(false)
  const {news, length} = useGetNews({fetchMore, setFetchMore})
  
  return (
    <div className="newspage page">
news
    </div>
  )
}
export default News