import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'


const postsPath = path.join(process.cwd(), 'posts')

export function getSortedPosts() {
    //get the list of file names
    const postFiles = fs.readdirSync(postsPath)
    const allPostsData = postFiles.map(fileName => {
        // remove .md
        const id = fileName.replace(/\.md$/, '')

        const fullPath = path.join(postsPath, fileName)
        const postContents = fs.readFileSync(fullPath, 'utf8')

        //parse the meta data with gray-matter
        const matterResults = matter(postContents)

        return {
            id,
            ...matterResults.data
        }
    })

    // sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getAllPostIds() {
    const postFiles = fs.readdirSync(postsPath)
    return postFiles.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postsPath, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResults = matter(fileContents)

    //generate HTML with remark
    const processedContent = await remark().use(html).process(matterResults.content)
    const contentHtml = processedContent.toString()

    return{
        id,
        contentHtml,
        ...matterResults.data
    }
}
