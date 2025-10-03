import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'articleTextMediaDouble',
  title: 'Article Text + Media (Double)',
  type: 'object',
  fields: [
    defineField({
      name: 'textBlock',
      title: 'Text Block',
      type: 'textBlock',
      validation: (Rule) => Rule.required(),
    }),
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
      text: 'textBlock.text',
      asset1: 'mediaFirst.asset.0',
    },
    prepare({ text, asset1, }) {
      const textPreview = text?.[0]?.children?.map((c: any) => c.text).join('').slice(0, 50) || 'No text'

      return {
        title: 'Text + Double Media',
        subtitle: textPreview,
        media: asset1?._type === 'image' ? asset1 : asset1?.asset,
      }
    }
  }
})