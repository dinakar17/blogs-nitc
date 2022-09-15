import { AxiosResponse } from "axios";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import * as api from "../../api";

type Props = {
  data: AxiosResponse["data"];
  error: any;
};

const BlogDetail: NextPage<Props> = (props) => {
  const { data, error } = props;

  const { enqueueSnackbar } = useSnackbar();

  if (error) {
    enqueueSnackbar(error, { variant: "error" });
    return null;
  }

  return (
    <div>
      <Head>
        <title>{data.data.title}</title>
        <meta name="description" content={data.data.description} />
      </Head>

      <h4>{data.data.title}</h4>

      <p>{data.data.description}</p>
      <img src={data.data.featuredImage} alt={data.data.description} />

      <div>
        {data.data.content}
      </div>
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
