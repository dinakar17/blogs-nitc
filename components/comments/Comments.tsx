import dynamic from 'next/dynamic'
import siteMetadata from "../../data/siteMetadata";

type BlogId = string

const GiscusComponent = dynamic(
  () => {
    return import('./Giscus')
  },
  { ssr: false }
)

const Comments = ({ blogId }: { blogId: BlogId }) => {
  const comment = siteMetadata?.comment
  if (!comment || Object.keys(comment).length === 0) return <></>
  return (
    <div id="comment">
      {siteMetadata.comment && siteMetadata.comment.provider === 'giscus' && <GiscusComponent blogId={blogId} />}
    </div>
  )
}

// import Giscus from "@giscus/react";

// type BlogId = string;

// const Comments = ({ blogId }: { blogId: BlogId }) => {
//   return (
//     <Giscus
//       repo="dinakar17/nitcblog_comments"
//       repoId="R_kgDOIwz12A"
//       category="General"
//       categoryId="DIC_kwDOGjYtbc4CA_TS"
//       mapping="pathname" // supported options: pathname, url, title
//       // Enable emoji reactions: 1 = enable / 0 = disable
//       reactionsEnabled="1"
//       // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
//       emitMetadata="0"
//       // theme example: light, dark, dark_dimmed, dark_high_contrast
//       // transparent_dark, preferred_color_scheme, custom
//       theme="light"
//       // Place the comment box above the comments. options: bottom, top
//       inputPosition="top"
//       // Choose the language giscus will be displayed in. options: en, es, zh-CN, zh-TW, ko, ja etc
//       lang="en"
      
//       // theme when dark mode
//       // darkTheme= 'dark'
//       // If the theme option above is set to 'custom`
//       // please provide a link below to your custom theme css file.
//       // example: https://giscus.app/themes/custom_example.css
//       // themeURL=''
//       loading="lazy"
//     />
//   );
// };

export default Comments;
