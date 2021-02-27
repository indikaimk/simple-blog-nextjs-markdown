import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {getSortedPosts} from '../lib/posts'

export async function getStaticProps() {
  const postsList = getSortedPosts()
  return {
    props: {
      postsList
    }
  }
}

export default function Home({postsList}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to My Blog
        </h1>
        <ul className={styles.postsList}>
          {postsList.map(({id, date, title, subtitle}) => (
            <li className={styles.card} key={id}>
              <a href={`/posts/${id}`}>
                <h1>{title}</h1>
                <p>{subtitle}</p>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
