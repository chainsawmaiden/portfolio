import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import media from './media'
import articleMediaSingle from './articleMediaSingle'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    project,
    media,
    articleMediaSingle,
  ],
}
