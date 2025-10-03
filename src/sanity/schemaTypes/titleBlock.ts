import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'titleBlock',
  title: 'Title Block',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'H1', value: 'h1' },
          ],
          marks: {
            decorators: [
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (Rule) => Rule.required().uri({
                      allowRelative: true,
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  }
                ]
              },
            ]
          },
          lists: [],
        }
      ],
      validation: (Rule) => Rule.required().min(1).max(1),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              { title: 'Italic', value: 'em' },
              { title: 'Subscript', value: 'sub' },
              { title: 'Superscript', value: 'sup' }
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (Rule) => Rule.required().uri({
                      allowRelative: true,
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  }
                ]
              },
            ]
          },
          lists: [],
        }
      ],
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      name: 'titleMedia',
      title: 'Media (Optional)',
      description: 'Optional title block media',
      type: 'media',
    }),
  ],

  preview: {
    select: {
      titleBlocks: 'title',
      subtitleBlocks: 'subtitle',
      media: 'titleMedia.asset',
    },
    prepare(selection) {
      const { titleBlocks, subtitleBlocks, media } = selection
      const title = titleBlocks?.[0]?.children?.map((c: any) => c.text).join('') || 'Untitled'
      const subtitle = subtitleBlocks?.[0]?.children?.map((c: any) => c.text).join('') || undefined
      return {
        title,
        subtitle,
        media: media?.[0]?._type === 'image' ? media[0] : media?.[0]?.asset,
      }
    },
  }
})