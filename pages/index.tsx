import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Intro, LatestBlogs } from '../components'
// dynamic import

// import component "Editor" dynamically
const Editor = dynamic(() => import("../components/Editor/Editor"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    // TOdo: w-[80%] mx-auto repetitive code
    <div className='w-[80%] mx-auto'>
      <Intro/>
      <LatestBlogs/>
      <Editor/>
    </div>
  )
}

export default Home
