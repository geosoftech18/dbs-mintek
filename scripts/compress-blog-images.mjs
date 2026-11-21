/**
 * One-time migration: shrink base64 featured/inline images in MongoDB so
 * Vercel ISR/RSC payloads stay under the 20MB page limit.
 *
 * Usage: node scripts/compress-blog-images.mjs
 */
import fs from 'fs'
import mongoose from 'mongoose'
import sharp from 'sharp'

const env = fs.readFileSync('.env.local', 'utf8')
const uri = env
  .split(/\r?\n/)
  .find((l) => l.startsWith('MONGODB_URI='))
  ?.slice('MONGODB_URI='.length)

if (!uri) {
  console.error('No MONGODB_URI in .env.local')
  process.exit(1)
}

async function compressDataUri(input, { maxWidth = 1400, quality = 70 } = {}) {
  if (!input || !input.startsWith('data:image/')) return { value: input, changed: false }
  const match = input.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/)
  if (!match) return { value: input, changed: false }

  const buffer = Buffer.from(match[2], 'base64')
  if (buffer.length < 180_000) return { value: input, changed: false }

  const out = await sharp(buffer)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer()

  return {
    value: `data:image/jpeg;base64,${out.toString('base64')}`,
    changed: true,
    before: buffer.length,
    after: out.length,
  }
}

async function compressHtml(html) {
  if (!html || !html.includes('data:image/')) {
    return { value: html, changed: false }
  }

  const re =
    /(<img\b[^>]*?\bsrc=["'])(data:image\/[a-zA-Z0-9.+-]+;base64,[^"']+)(["'][^>]*>)/gi
  let changed = false
  let value = html
  const matches = [...html.matchAll(re)]

  for (const match of matches) {
    const result = await compressDataUri(match[2])
    if (result.changed) {
      changed = true
      value = value.replace(match[2], result.value)
      console.log(
        `  inline image ${(result.before / 1024).toFixed(0)}KB → ${(result.after / 1024).toFixed(0)}KB`
      )
    }
  }

  return { value, changed }
}

await mongoose.connect(uri, { family: 4 })
const col = mongoose.connection.db.collection('blogs')
const posts = await col.find({}).toArray()

console.log(`Found ${posts.length} blogs`)

for (const post of posts) {
  let dirty = false
  const update = {}

  if (post.featuredImage?.startsWith('data:')) {
    const result = await compressDataUri(post.featuredImage)
    if (result.changed) {
      dirty = true
      update.featuredImage = result.value
      console.log(
        `${post.slug}: featured ${(result.before / 1024).toFixed(0)}KB → ${(result.after / 1024).toFixed(0)}KB`
      )
    }
  }

  if (post.content?.includes('data:image/')) {
    const result = await compressHtml(post.content)
    if (result.changed) {
      dirty = true
      update.content = result.value
      console.log(`${post.slug}: content images compressed`)
    }
  }

  if (dirty) {
    await col.updateOne({ _id: post._id }, { $set: update })
  }
}

console.log('Done')
await mongoose.disconnect()
