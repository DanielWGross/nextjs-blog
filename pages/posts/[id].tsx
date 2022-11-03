import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import {
  GetAllPostIds,
  getAllPostIds,
  GetPostData,
  getPostData,
} from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }: { postData: GetPostData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXL}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async function getStaticPaths() {
  const paths: GetAllPostIds = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async function getStaticProps({
  params,
}) {
  const postData: GetPostData = await getPostData(params!.id as string);
  return {
    props: {
      postData,
    },
  };
};
