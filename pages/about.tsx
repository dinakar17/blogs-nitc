import React from "react";
import Image from "next/image";
import Link from "next/link";
import siteMetadata from "../data/siteMetadata";
import { PageSEO } from "../components/SEO/SEO";

const about = () => {
  const metaData = {
    title: "About | NITC Notes and Blogs",
    description: "About NITC Notes and Blogs",
    tags: ["NITC", "NITC Blogs", "NITC Notes", "NITC Notes and Blogs"],
    featuredImage: siteMetadata.socialBanner,
    slug: '',
  }
  return (
    <section className="prose prose-indigo max-w-none prose-sm md:prose-md lg:prose-lg min-h-screen lg:w-[70%] mx-auto w-[90%] flex flex-col gap-10 dark:prose-invert">
      <PageSEO {...metaData} />
      <div>
        <h2 className="lg:text-left text-center">
          This website is a content-sharing platform where you can share/create
          things you're really passionate/curious about.
        </h2>
        <p>Read on to know more...</p>
      </div>
      {/* 1 */}
      <div className="grid lg:grid-cols-2 lg:gap-10">
        <div className="lg:order-none order-last">
          <h2 className="text-center">
            Make a Difference in Other People’s Lives
          </h2>
          <div>
            <p>
              Although this may sound a lot “philanthropic” our motive is this:
              “Everyone is better at something. Someone could be more into
              mathematics and some others into coding and so on. So if he/she
              who is proficient in so and so subject/concept takes his/her time
              in writing an article breaking the concept into simple words so
              that other people who’re struggling understand it better because
              of you.”
            </p>
            <blockquote>
              Simply put, your article/blog may connect with readers on an
              intellectual or emotional level, inspire them to try something new
              and/or make a decision to improve their life.
            </blockquote>
            <p>
              The next question you might have is, “Why should I even care about
              writing for others?” or “why should I spend my valuable time
              writing something I already know?”. Let us tell you what’s in
              there for you!
            </p>
          </div>
        </div>
        <div className="aspect-w-16 aspect-h-9">
          <Image
            src="/static/about/1.jpg"
            layout="fill"
            objectFit="cover"
            className="rounded-md shadow-lg"
          />
        </div>
      </div>
      {/* 2 */}
      <div className="grid lg:grid-cols-2 lg:gap-10">
        <div className="aspect-w-16 aspect-h-9">
          <Image
            src="/static/about/2.jfif"
            layout="fill"
            objectFit="cover"
            className="rounded-md shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-center">Discover and Express yourself</h2>
          <ul>
            <li>
              When you write, you think, you read what others write and you do
              research. As a result, you will become more flexible and creative
              in your thinking.
            </li>
            <li>
              <b>With every article, you’ll learn something new, get new ideas, and
              find better ways to express yourself.</b>
            </li>
            <li>
              Also, writing is a great way to learn about yourself and express
              your inner thoughts, ideas, and feelings. Spending some alone time
              with your thoughts is also very therapeutic. It’s like meditating
              and getting work done at the same time.
            </li>
            <li>
              As a result, you will become more flexible and creative in your
              thinking.
            </li>
          </ul>
        </div>
      </div>
      {/* 3 */}
      <div className="grid lg:grid-cols-2 lg:gap-10">
        <div className="lg:order-none order-last">
          <h2 className="text-center">Become a more organized thinker</h2>
          <ul>
            <li>
              The beautiful thing about writing is that it allows your time to
              analyze the coherence and logic behind your thinking.
            </li>
            <li>
              Although you might think that your blog’s potential won’t live to
              “change the world”, <b>even for one person you may have been the
              catalyst for a life-changing event, making all the difference in
              his or her world!</b>
            </li>
            <li>
              Since, no matter what you discuss or how unique your situation is,
              there is always the chance that someone else is experiencing a
              similar challenge, dilemma, or situation
            </li>
          </ul>
        </div>
        <div className="aspect-w-16 aspect-h-9">
          <Image
            src="/static/about/3.jpg"
            layout="fill"
            objectFit="cover"
            className="rounded-md shadow-lg"
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 lg:gap-10">
        <div className="aspect-w-16 aspect-h-9">
          <Image
            src="/static/about/4.jpg"
            layout="fill"
            objectFit="cover"
            className="rounded-md shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-center">“I’m still not convinced”</h2>
          <ul>
            <li>
              If you’re still not convinced by the heart, well, that’s a hell of
              a good start.
            </li>
            <li>
              Because now is the time for you to give yourself the time to write
              a blog on a topic you're passionate about, as experience speaks
              louder than words.
            </li>
            <li>
              On your first attempt, it might feel a bit frustrating and
              challenging, but don't forget you <b>exceed your limits</b> through hard
              work.
            </li>
            <li>
              Come back to this blog after writing it and you should see all the
              points we have tried to convey.
            </li>
          </ul>
        </div>
      </div>
      <h3 className="lg:text-left text-center">
        So, What are you waiting for?{" "}
        <Link href="/auth/signup">
          <a>Create your account </a>
        </Link>
        and starting{" "}
        <Link href="/blog/create">
          <a>creating and sharing</a>
        </Link>{" "}
        something unique!
      </h3>
    </section>
  );
};

export default about;
