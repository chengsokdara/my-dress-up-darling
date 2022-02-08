export const generateChapters: (
  latestChapter: number,
  pages: number[],
) => IChapterData[] = (latestChapter, pages) => {
  const chapters: IChapterData[] = []
  Array.from(Array(latestChapter)).forEach((_, i) => {
    const index = i + 1
    chapters.push({
      index,
      name: `Chapter ${index}`,
      pages: pages[i],
      uid: `chapter-${index}`,
    })
  })

  return chapters
}

export const generatePages: (
  chapterIndex: number,
  numberOfPage: number,
) => string[] = (chapterIndex, numberOfPage) => {
  return Array.from(Array(numberOfPage)).map((_, i) => {
    const pageIndex = i + 1
    return `https://cdn.mushoku-tensei.online/file/mangashnwa/sono-bisque-doll-wa-koi-wo-suru/Chapter-${chapterIndex}/${pageIndex}.jpg`
  })
}
