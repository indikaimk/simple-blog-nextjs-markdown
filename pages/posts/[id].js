import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {getAllPostIds, getPostData} from '../../lib/posts'

export function getStaticPaths() {
    const paths = getAllPostIds()
    return{
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    //get the blog contents based on params.id
    const postData = await getPostData(params.id)
    return{
        props: {
            postData
        }
    }
}


export default function Post({postData}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <article>
            <h1 className={styles.title}>
                Welcome to My Blog
            </h1>
            <article>
                <h1>{postData.title}</h1>
                <h2>{postData.subTitle}</h2>
                <section>
                    <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
                </section>    
            </article>
        </article>
      </main>
    </div>
  )
}
