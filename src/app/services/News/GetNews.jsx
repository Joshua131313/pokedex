import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../../ContextAPI'

const useGetNews = (props) => {
  const {fetchMore, setFetchMore} = props
  const [news, setNews] = useState([])
  const [length, setLength] = useState(0)
  const {addNoti} = useContext(StoreContext)
  const [page, setPage] = useState(1)
  // const handleFetch = (url) => {
  //   axios.get(url).then((results)=> {
  //     setNews(prev=> [...prev, ...results.data.data])
  //     setLength(results.data.pagination.total)
  //     console.log(results)
  //     setFetchMore(false)
  //     setPage(prev=> prev + 1)
  //   }).catch((err)=>  {addNoti('fal fa-exclamation-circle', 'Something went wrong...'); console.log(err)})
  // }

  // useEffect(()=> {
  //   axios.get(`http://api.mediastack.com/v1/news?access_key=a777d5155ed4b96b9fc91467cdaf6916&keywords=pokemon&languages=en&limit=${page * 10}`).then(respon=> {
  //     console.log('k')
  //   }).catch((err)=> console.log(err))
  //   // handleFetch(`http://api.mediastack.com/v1/news?access_key=a777d5155ed4b96b9fc91467cdaf6916&keywords=pokemon&languages=en&limit=${page * 10}`)
  // }, [page]) 

  // useEffect(()=> {
  //   if(fetchMore) { 
  //     handleFetch(`http://api.mediastack.com/v1/news?access_key=a777d5155ed4b96b9fc91467cdaf6916&keywords=pokemon&languages=en&limit=${page * 10}`)
  //   }
  // }, [fetchMore])
  
  return {news, length}
}
export default useGetNews