import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            decorators: [
              { title: 'Italic', value: 'em' },
            ],
            annotations: [],
          }
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      description: 'Optional attribution (e.g., author, source)',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      quote: 'quote',
      attribution: 'attribution',
    },
    prepare({ quote, attribution }) {
      const quoteText = quote?.[0]?.children?.map((c: { text: string }) => c.text).join('').slice(0, 100) || 'No quote'
      return {
        title: `"${quoteText}${quoteText.length >= 100 ? '...' : ''}"`,
        subtitle: attribution || 'No attribution',
      }
    }
  }
})