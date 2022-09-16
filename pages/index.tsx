import type { NextPage } from 'next'
import { Intro, LatestBlogs } from '../components'
// dynamic import

const Home: NextPage = () => {
  return (
    // TOdo: w-[80%] mx-auto repetitive code
    <div className='w-[80%] mx-auto'>
      <Intro/>
      <LatestBlogs/>
    </div>
  )
}

export default Home
