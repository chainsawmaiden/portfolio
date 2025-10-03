import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'articleMediaSingle',
  title: 'Article Media (Single)',
  type: 'object',
  fields: [
    defineField({
      name: 'media',
      title: 'Media',
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
          initialValue: 's',
          validation: (Rule) => Rule.required(),
        }),
      ],
      preview: {
        select: {
          media: 'media',
          size: 'size',
        },
        prepare({ media, size }) {
          const sizeLabels = { s: 'Small', m: 'Medium', l: 'Large', xl: 'Extra Large', }
          const caption = media?.caption?.[0] || 'No caption'
          return {
            title: caption,
            subtitle: `Single Media - ${sizeLabels[size as keyof typeof sizeLabels] || size}`,
            media: media?.asset?.[0],
          }
        }
      }
    })
  ]
})