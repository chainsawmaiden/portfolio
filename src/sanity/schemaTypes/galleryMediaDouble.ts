import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryMediaDouble',
  title: 'Gallery Media (Double)',
  type: 'object',
  fields: [
    defineField({
      name: 'mediaFirst',
      title: 'Media First',
      type: 'media',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaSecond',
      title: 'Media Second',
      type: 'media',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      asset1: 'mediaFirst.asset.0',
    },
    prepare({ asset1, }) {
      return {
        title: `Gallery Pair`,
        media: asset1?._type === 'image' ? asset1 : asset1?.asset,
      }
    }
  }
})