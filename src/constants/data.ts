const pageByChapter = [46, 28]

export const mockPages: (chapterIndex: number) => string[] = chapterIndex => {
  return Array.from(Array(pageByChapter[chapterIndex - 1])).map((_, i) => {
    const pageIndex = i + 1
    return `https://cdn.mushoku-tensei.online/file/mangashnwa/sono-bisque-doll-wa-koi-wo-suru/Chapter-${chapterIndex}/${pageIndex}.jpg`
  })
}

export const mockChapters: IChapterData[] = Array.from(Array(71)).map(
  (_, i) => {
    const index = i + 1
    return {
      index,
      name: `Chapter ${index}`,
      pages: pageByChapter[i],
      uid: `chapter-${index}`,
    }
  },
)
