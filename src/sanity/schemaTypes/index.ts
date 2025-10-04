import { type SchemaTypeDefinition } from 'sanity'
import articleMediaSingle from './articleMediaSingle'
import articleMediaDouble from './articleMediaDouble'
import articleSection from './articleSection'
import articleTextMediaDouble from './articleTextMediaDouble'
import articleTextMediaSingle from './articleTextMediaSingle'
import article from './article'
import gallery from './gallery'
import galleryMediaDouble from './galleryMediaDouble'
import media from './media'
import project from './project'
import quote from './quote'
import textBlock from './textBlock'
import titleBlock from './titleBlock'
import galleryMediaGrid from './galleryMediaGrid'
import mediaCarousel from './mediaCarousel'
import photoGallery from './photoGallery'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    article,
    articleMediaSingle,
    articleMediaDouble,
    articleSection,
    articleTextMediaDouble,
    articleTextMediaSingle,
    gallery,
    galleryMediaDouble,
    galleryMediaGrid,
    media,
    mediaCarousel,
    photoGallery,
    project,
    quote,
    textBlock,
    titleBlock,
  ],
}
