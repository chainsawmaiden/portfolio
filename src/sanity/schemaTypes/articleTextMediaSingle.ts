import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'articleTextMediaSingle',
  title: 'Article Text + Media (Single)',
  type: 'object',
  fields: [
    defineField({
      name: 'textBlock',
      title: 'Text Block',
      type: 'textBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'media',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaSize',
      title: 'Media Size',
      description: 'Size of the media column',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Large', value: 'large' },
        ],
        layout: 'radio',
      },
      initialValue: 'large',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      text: 'textBlock.text',
      asset: 'media.asset.0',
      mediaSize: 'mediaSize',
    },
    prepare({ text, asset, mediaSize }) {
      const textPreview = text?.[0]?.children?.map((c: any) => c.text).join('').slice(0, 50) || 'No text'
      
      return {
        title: `Text + Media${mediaSize === 'small' && ' (Small)'}`,
        subtitle: textPreview,
        media: asset?._type === 'image' ? asset : asset?.asset,
      }
    }
  }
})