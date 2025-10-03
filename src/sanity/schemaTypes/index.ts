import { type SchemaTypeDefinition } from 'sanity'
import articleMediaSingle from './articleMediaSingle'
import articleMediaDouble from './articleMediaDouble'
import articleSection from './articleSection'
import article from './article'
import gallery from './gallery'
import galleryMediaDouble from './galleryMediaDouble'
import media from './media'
import project from './project'
import textBlock from './textBlock'
import titleBlock from './titleBlock'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    article,
    articleMediaSingle,
    articleMediaDouble,
    articleSection,
    gallery,
    galleryMediaDouble,
    media,
    project,
    textBlock,
    titleBlock,
  ],
}
