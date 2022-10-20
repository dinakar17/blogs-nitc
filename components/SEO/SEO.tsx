import Head from "next/head";
import { useRouter } from "next/router";
import siteMetadata from "../../data/siteMetadata";

type Props = {
  title: string;
  description: string;
  ogType?: string;
  ogImage: any;
  twImage?: string;
  canonicalUrl?: string;
};

const CommonSEO = ({
  title,
  description,
  ogType,
  ogImage,
  twImage,
  canonicalUrl,
}: Props) => {
  const router = useRouter();
  return (
    <Head>
      <title>{title}</title>
      {/* Here name="robots" content="follow, index" means that search engines should follow links on this page and index its content. */}
      <meta name="robots" content="follow, index" />
      {/* Here name="description" content={description} means that search engines should use this content as the page description for this page. */}
      <meta name="description" content={description} />
      {/* og:url in simple words is the URL of the page. */}
      <meta
        property="og:url"
        content={`${siteMetadata.siteUrl}${router.asPath}`}
      />
      {/* property="og:type" content={ogType} means that the type of the page. For example, a website, an article, a video, etc. */}
      <meta property="og:type" content={ogType} />
      {/* property="og:title" content={title} means that the title of the page. */}
      <meta property="og:site_name" content={siteMetadata.title} />
      {/* property="og:description" content={description} means that the description of the page. */}
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      {ogImage.constructor.name === "Array" ? (
        ogImage.map(({ url }: any) => (
          <meta property="og:image" content={url} key={url} />
        ))
      ) : (
        <meta property="og:image" content={ogImage} key={ogImage} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twImage} />
      <link
        rel="canonical"
        href={
          canonicalUrl
            ? canonicalUrl
            : `${siteMetadata.siteUrl}${router.asPath}`
        }
      />
    </Head>
  );
};

type PageSEOProps = {
  title: string;
  description: string;
};

export const PageSEO = ({ title, description }: PageSEOProps) => {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
  const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
  return (
    <CommonSEO
      title={title}
      description={description}
      ogType="website"
      ogImage={ogImageUrl}
      twImage={twImageUrl}
    />
  );
};

// export const TagSEO = ({ title, description }) => {
//   const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
//   const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
//   const router = useRouter()
//   return (
//     <>
//       <CommonSEO
//         title={title}
//         description={description}
//         ogType="website"
//         ogImage={ogImageUrl}
//         twImage={twImageUrl}
//       />
//       <Head>
//         <link
//           rel="alternate"
//           type="application/rss+xml"
//           title={`${description} - RSS feed`}
//           href={`${siteMetadata.siteUrl}${router.asPath}/feed.xml`}
//         />
//       </Head>
//     </>
//   )
// }

type BlogSEOProps = {
  authorDetails: Array<Object>;
  title: string;
  summary: string;
  date: string;
  lastmod: string;
  url: string;
  images: any;
  canonicalUrl?: string;
};

export const BlogSEO = ({
  authorDetails,
  title,
  summary,
  date,
  lastmod,
  url,
  images = [],
  canonicalUrl,
}: BlogSEOProps) => {
  const publishedAt = new Date(date).toISOString();
  const modifiedAt = new Date(lastmod || date).toISOString();
  let imagesArr =
    images.length === 0
      ? [siteMetadata.socialBanner]
      : typeof images === "string"
      ? [images]
      : images;

  const featuredImages = imagesArr.map((img: any) => {
    return {
      "@type": "ImageObject",
      url: img.includes("http") ? img : siteMetadata.siteUrl + img,
    };
  });

  let authorList;
  if (authorDetails) {
    authorList = authorDetails.map((author: any) => {
      return {
        "@type": "Person",
        name: author.name,
      };
    });
  } else {
    authorList = {
      "@type": "Person",
      name: siteMetadata.author,
    };
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      "@type": "Organization",
      name: siteMetadata.author,
      logo: {
        "@type": "ImageObject",
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      },
    },
    description: summary,
  };

  const twImageUrl = featuredImages[0].url;

  return (
    <>
      <CommonSEO
        title={title}
        description={summary}
        ogType="article"
        ogImage={featuredImages}
        twImage={twImageUrl}
        canonicalUrl={canonicalUrl}
      />
      <Head>
        {date && (
          <meta property="article:published_time" content={publishedAt} />
        )}
        {lastmod && (
          <meta property="article:modified_time" content={modifiedAt} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  );
};
