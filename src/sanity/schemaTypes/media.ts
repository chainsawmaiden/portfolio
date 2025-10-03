import { defineField, defineType } from "sanity";

export default defineType({
  name: 'media', 
  title: 'Media',
  type: 'object',
  fields: [
    defineField({
      name: 'asset',
      title: 'Asset',
      description: "Image or video file",
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            metadata: ['lqip'],
          },
        },
        {
          type: 'mux.video'
        }
      ],
      validation: (Rule) => Rule.required().max(1).min(1),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      description: 'Optional rich text caption for this media',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
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
          }
        },
      ]
    }),
    defineField({
      name: 'alternateCaptionTitle',
      title: 'Alternate Caption Title',
      description: 'Alternate caption title (optional)',
      type: 'string'
    })
  ],
  preview: {
    select: {
      asset: 'asset.0',
      caption: 'caption',
    },
    prepare({ asset, caption }) {
      const captionText = caption?.[0].children?.[0].text || 'No caption'
      return {
        title: captionText,
        subtitle: asset?._type === 'image' ? 'Image' : 'Video',
        media: asset?._type === 'image' ? asset : asset?.asset,
      }
    }
  }
})