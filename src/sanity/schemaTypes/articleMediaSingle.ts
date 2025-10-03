import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'articleMediaSingle',
  title: 'Article Media (Single)',
  type: 'object',
  fields: [
    defineField({
      name: 'media',
      title: 'Media',
      type: 'media',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Size',
      description: 'Image size. Small = 6 columns, Medium = 8 columns, Large = 10 columns, Extra large = 12 columns.',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 's' },
          { title: 'Medium', value: 'm' },
          { title: 'Large', value: 'l' },
          { title: 'Extra Large', value: 'xl' },
        ],
        layout: 'radio',
      },
      initialValue: 'xl',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      asset: 'media.asset',
      caption: 'media.caption',
      size: 'size',
    },
    prepare({ asset, caption, size }) {
      const sizeLabels = { 
        s: 'Small', 
        m: 'Medium', 
        l: 'Large', 
        xl: 'Extra Large' 
      }
      
      const captionText = caption?.[0]?.children?.[0]?.text || 'No caption'
      
      return {
        title: `Single Media - ${sizeLabels[size as keyof typeof sizeLabels] || size}`,
        subtitle: captionText,
        media: asset?.[0]._type === 'image' ? asset[0] : asset?.[0].asset,
      }
    }
  }
})