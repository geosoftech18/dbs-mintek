/**
 * Browser-side image compression before saving blog posts.
 * Prevents multi‑MB base64 images from breaking Vercel ISR (20MB page limit).
 */
export async function compressImageFile(
  file: File,
  opts: { maxWidth?: number; quality?: number } = {}
): Promise<string> {
  const { maxWidth = 1400, quality = 0.7 } = opts

  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxWidth / bitmap.width)
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    bitmap.close()
    return readAsDataUrl(file)
  }

  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const dataUrl = canvas.toDataURL('image/jpeg', quality)
  // If compression somehow grew the file, keep the original read.
  if (dataUrl.length > file.size * 1.4) {
    return readAsDataUrl(file)
  }
  return dataUrl
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}
