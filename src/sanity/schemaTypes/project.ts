import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Project title',
      type: 'string',
      initialValue: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      description: 'Brief summary of project, for displaying on the homepage',
      type: 'string',
      initialValue: 'Subtitle',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      description: 'Year of project',
      type: 'string',
      initialValue: '2025',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      description: 'Type of project',
      type: 'string',
      options: {
        list: [
          { title: 'Product', value: 'product' },
          { title: 'Visual', value: 'visual' },
        ],
        layout: 'radio',
      },
      initialValue: 'product',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayMedia',
      title: 'Display Media',
      description: 'Standard display image for the project. Appears for homepage, thumbnails, etc.',
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
          type: 'mux.video',
        }
      ],
      validation: (Rule) => Rule.required().max(1).min(1),
    }),
    defineField({
      name: 'hoverMedia',
      title: 'Hover Media',
      description: 'Media that appears when user is hovering over the project on the homepage',
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
          type: 'mux.video',
        }
      ],
      validation: (Rule) => Rule.required().max(1).min(1),
    }),
    defineField({
      name: 'fullscreenMedia',
      title: 'Fullscreen Media',
      description: 'Optional fullscreen hero media for project page',
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
          type: 'mux.video',
        }
      ],
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      name: 'titleBlock',
      title: 'Title Block',
      description: 'Title block for project page',
      type: 'titleBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'disciplines',
      title: 'Disciplines',
      description: 'Specs of the project, i.e. "Product Design", "Identity", etc.',
      type: 'array',
      of: [
        {
          type: 'string',
        }
      ],
      initialValue: ['Product Design', 'Identity'],
    }),
    defineField({
      name: 'team',
      title: 'Team',
      description: 'Team members of the project, i.e. "Person 1", "Person 2", etc.',
      type: 'array',
      of: [
        {
          type: 'string',
        }
      ],
      initialValue: ['Person 1', 'Person 2'],
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      description: 'Timeline of project, in format "# months, [month]–[month] year"',
      type: 'string',
    }),
    defineField({
      name: 'accentPrimary',
      title: 'Accent Primary',
      description: 'Primary accent color for the project, used for symbols, sticker navs, etc.',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accentSecondary',
      title: 'Accent Secondary',
      description: 'Secondary accent color for the project, appears over primary color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'symbol',
      title: 'Symbol',
      description: 'Symbol associated with the project',
      type: 'string',
      validation: (Rule) => Rule.length(1),
    }),
    defineField({
      name: 'article',
      title: 'Article',
      type: 'reference',
      to: [{ type: 'article' }],
      hidden: ({ document }) => document?.type !== 'product',
      validation: (Rule) => Rule.custom((value, context) => {
        return context.document?.type !== 'product' || value ? true : 'Required for Product projects'
      }),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'reference',
      to: [{ type: 'gallery' }],
      hidden: ({ document }) => document?.type !== 'visual',
      validation: (Rule) => Rule.custom((value, context) => {
        return context.document?.type !== 'visual' || value ? true : 'Required for Visual projects'
      }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
      displayMedia: 'displayMedia',
    },
    prepare(selection) {
      const { title, subtitle, displayMedia } = selection
      const media = displayMedia?.[0]
      
      // For images, use the asset directly
      if (media?._type === 'image') {
        return {
          title,
          subtitle,
          media: media,
        }
      }
      
      return {
        title,
        subtitle,
        media: media.asset,
      }
    },
  },
})