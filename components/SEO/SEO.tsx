import siteMetadata from "../../data/siteMetadata";
import Head from 'next/head';

type Props = {
  title: string;
  description: string;
  tags: string[];
  featuredImage: string;
  slug : string;
  user ?: {
    name ?: string;
  }
}


const CommonSEO = (props : Props) => {
  const {title, description, tags, featuredImage, slug, user} = props;
  return (
    <Head>
        {/* <script src={`https://keywords.mediavine.com/keyword/web.keywords.js?pageUrl=${siteMetadata.siteUrl}/blog/${slug}`}></script> */}
        <script src="https://exchange.mediavine.com/usersync.min.js?s2sVersion=ADT-979-rm-tid-t" type="text/javascript"></script>
        <script src="https://scripts.mediavine.com/tags/2.78.41/wrapper.min.js?bust=-1500007442" type="text/javascript"></script>
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={tags.join(", ")} />
        <meta name="image" content={featuredImage} />
        <meta property="og:url" content={`${siteMetadata.siteUrl}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={siteMetadata.title} />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={siteMetadata.twitter} />
        <meta name="twitter:creator" content={siteMetadata.twitter} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={featuredImage} />
        <meta name="twitter:image:alt" content={title} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={user?.name} />
        <link rel="canonical" href={`${siteMetadata.siteUrl}/blog/${slug}`} />
      </Head>
  )
}

export const PageSEO = (props : Props) => {
  return (
    <CommonSEO {...props} />
  )
}

export const BlogSEO = (props : Props) => {
  return (
    <CommonSEO {...props} />
  )
}
