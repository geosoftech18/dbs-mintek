import fs from 'fs'
import mongoose from 'mongoose'

const env = fs.readFileSync('.env.local', 'utf8')
const uri = env
  .split(/\r?\n/)
  .find((l) => l.startsWith('MONGODB_URI='))
  ?.slice('MONGODB_URI='.length)

if (!uri) {
  console.error('No MONGODB_URI')
  process.exit(1)
}

await mongoose.connect(uri, { family: 4 })
const col = mongoose.connection.db.collection('blogs')

const posts = await col
  .find({ status: 'published' })
  .project({ title: 1, slug: 1, content: 1, featuredImage: 1 })
  .toArray()

const rows = posts
  .map((post) => {
    const content = post.content || ''
    const featured = post.featuredImage || ''
    const contentBytes = Buffer.byteLength(content, 'utf8')
    const featuredBytes = Buffer.byteLength(featured, 'utf8')
    const inlineImgs = (content.match(/data:image\/[a-zA-Z0-9.+-]+;base64,/g) || [])
      .length
    const featuredIsData = featured.startsWith('data:')
    return {
      slug: post.slug,
      title: post.title,
      mb: Number(((contentBytes + featuredBytes) / 1024 / 1024).toFixed(2)),
      contentMB: Number((contentBytes / 1024 / 1024).toFixed(2)),
      featuredMB: Number((featuredBytes / 1024 / 1024).toFixed(2)),
      inlineImgs,
      featuredIsData,
    }
  })
  .sort((a, b) => b.mb - a.mb)

console.log(JSON.stringify(rows.slice(0, 15), null, 2))
console.log(
  'over 5MB:',
  rows.filter((r) => r.mb > 5).map((r) => ({ slug: r.slug, mb: r.mb }))
)

await mongoose.disconnect()
