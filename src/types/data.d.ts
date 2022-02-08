interface IData {
  uid: string
}

interface IVolumeData extends IData {
  chapters: string[]
  index: number
  name: string
}

interface IChapterData extends IData {
  index: number
  name: string
  pages: number
}

interface IPageData extends IData {
  height?: number
  type?: 'ad' | 'image'
  uri?: string
  width?: number
}

interface IRemoteData {
  animes: number[]
  author: string
  baseUrls: string[]
  chapters: number[]
  genres: string[]
  latestChapter: number
  names: string[]
  published: string
  serialization: string
  synopses: string[]
  volumes: number[][]
}

interface ISectionData {
  synopsis: string
  title: string
  data: IChapterData[]
}
