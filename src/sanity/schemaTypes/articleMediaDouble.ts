import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'articleMediaDouble',
  title: 'Article Media (Double)',
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
    defineField({
      name: 'layout',
      title: 'Layout',
      description: 'Layout configuration for the two media items',
      type: 'string',
      options: {
        list: [
          { title: 'Small, Large', value: 'smallLarge' },
          { title: 'Medium, Medium', value: 'mediumMedium' },
          { title: 'Large, Small', value: 'largeSmall' },
        ],
        layout: 'radio',
      },
      initialValue: 'mediumMedium',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      asset1: 'mediaFirst.asset.0',
      caption1: 'mediaFirst.caption',
      asset2: 'mediaSecond.asset.0',
      caption2: 'mediaSecond.caption',
      layout: 'layout',
    },
    prepare({ asset1, caption1, layout }) {
      const layoutLabels = {
        smallLarge: 'Small, Large',
        mediumMedium: 'Medium, Medium',
        largeSmall: 'Large, Small'
      }
      
      const caption1Text = caption1?.[0]?.children?.[0]?.text || 'No caption'

      
      return {
        title: `Double Media - ${layoutLabels[layout as keyof typeof layoutLabels] || layout}`,
        subtitle: caption1Text,
        media: asset1?._type === 'image' ? asset1 : asset1?.asset,
      }
    }
  }
})