import { AxiosResponse } from "axios";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { toast } from "react-toastify";

import parse from "html-react-parser";

import * as api from "../../api";

type Props = {
  data: AxiosResponse["data"];
  error: any;
};

const BlogDetail: NextPage<Props> = (props) => {
  const { data, error } = props;

  if (error) {
    toast(error, { type: "error" });
    return null;
  }

  return (
    <div className="mx-auto p-4 prose max-w-screen-xl prose-indigo prose-md">
      <Head>
        <title>{data.data.title}</title>
        <meta name="description" content={data.data.description} />
      </Head>

      <h4 className="text-2xl font-bold">{data.data.title}</h4>

      <p className="text-sm text-gray-500"> {data.data.description}</p>
      <img
        src={data.data.featuredImage}
        alt={data.data.description}
        className="w-full mt-4 max-h-96 object-cover"
      />

      <div className="mt-4">{parse(data.data.content)}</div>
      <hr />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;

  try {
    const response = await api.fetchPost(slug as string);
    return { props: { data: response.data } };
  } catch (error: any) {
    if (error.response)
      return { props: { error: error.response.data.message } };
    else
      return {
        props: { error: "Something went wrong. Please reload to view content" },
      };
  }
};

export default BlogDetail;
