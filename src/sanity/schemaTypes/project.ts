// src/sanity/schemaTypes/project.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      description: 'Title of the project as shown in the project card (e.g., "Volta, Internship")',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'listTitle',
      title: 'List Title',
      description: 'Shorter title shown in the sidebar list (e.g., "Volta")',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'URL path for this project (e.g., "volta" for /volta)',
      type: 'slug',
      options: {
        source: 'listTitle',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      description: 'Category of project (Product or Craft)',
      type: 'string',
      options: {
        list: [
          { title: 'Product', value: 'product' },
          { title: 'Craft', value: 'craft' },
        ],
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      description: 'Skills/disciplines used in this project (e.g., "Product Design, Identity")',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Information',
      description: 'Optional additional info (e.g., "400K+ User Growth" or "$1M funding raised")',
      type: 'string',
    }),
    // Main media - can be either image, youtube, or self-hosted video
    defineField({
      name: 'mainMedia',
      title: 'Main Media',
      description: 'The primary media (image or video) shown on the project card',
      type: 'object',
      fields: [
        defineField({
          name: 'mediaType',
          title: 'Media Type',
          type: 'string',
          options: {
            list: [
              { title: 'Image', value: 'image' },
              { title: 'YouTube Video', value: 'youtube' },
              { title: 'Self-Hosted Video', value: 'video' }
            ],
          },
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
            storeOriginalFilename: true,
          },
          hidden: ({ parent }) => parent?.mediaType !== 'image'
        }),
        defineField({
          name: 'youtubeUrl',
          title: 'YouTube URL',
          description: 'URL of the YouTube video (e.g., https://www.youtube.com/watch?v=XXXXXXXXXXX)',
          type: 'url',
          hidden: ({ parent }) => parent?.mediaType !== 'youtube'
        }),
        defineField({
          name: 'youtubeStart',
          title: 'Start Time (seconds)',
          description: 'Time to start the video (in seconds)',
          type: 'number',
          hidden: ({ parent }) => parent?.mediaType !== 'youtube',
          initialValue: 0
        }),
        defineField({
          name: 'youtubeEnd',
          title: 'End Time (seconds)',
          description: 'Time to end the video (in seconds)',
          type: 'number',
          hidden: ({ parent }) => parent?.mediaType !== 'youtube'
        }),
        defineField({
          name: 'videoUrl',
          title: 'Video URL',
          description: 'Path to the self-hosted video file (e.g., /videos/project-video.mp4)',
          type: 'string',
          hidden: ({ parent }) => parent?.mediaType !== 'video'
        }),
        defineField({
          name: 'videoPoster',
          title: 'Video Poster Image',
          description: 'Optional poster image to show before the video loads',
          type: 'image',
          options: {
            hotspot: true,
          },
          hidden: ({ parent }) => parent?.mediaType !== 'video'
        }),
      ]
    }),
    // Hover media - can be either image, youtube, or self-hosted video
    defineField({
      name: 'hoverMedia',
      title: 'Hover Media',
      description: 'The media (image or video) shown when hovering over the project card',
      type: 'object',
      fields: [
        defineField({
          name: 'mediaType',
          title: 'Media Type',
          type: 'string',
          options: {
            list: [
              { title: 'Image', value: 'image' },
              { title: 'YouTube Video', value: 'youtube' },
              { title: 'Self-Hosted Video', value: 'video' }
            ],
          },
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
            storeOriginalFilename: true,
          },
          hidden: ({ parent }) => parent?.mediaType !== 'image'
        }),
        defineField({
          name: 'youtubeUrl',
          title: 'YouTube URL',
          description: 'URL of the YouTube video (e.g., https://www.youtube.com/watch?v=XXXXXXXXXXX)',
          type: 'url',
          hidden: ({ parent }) => parent?.mediaType !== 'youtube'
        }),
        defineField({
          name: 'youtubeStart',
          title: 'Start Time (seconds)',
          description: 'Time to start the video (in seconds)',
          type: 'number',
          hidden: ({ parent }) => parent?.mediaType !== 'youtube',
          initialValue: 0
        }),
        defineField({
          name: 'youtubeEnd',
          title: 'End Time (seconds)',
          description: 'Time to end the video (in seconds)',
          type: 'number',
          hidden: ({ parent }) => parent?.mediaType !== 'youtube'
        }),
        defineField({
          name: 'videoUrl',
          title: 'Video URL',
          description: 'Path to the self-hosted video file (e.g., /videos/project-video.mp4)',
          type: 'string',
          hidden: ({ parent }) => parent?.mediaType !== 'video'
        }),
        defineField({
          name: 'videoPoster',
          title: 'Video Poster Image',
          description: 'Optional poster image to show before the video loads',
          type: 'image',
          options: {
            hotspot: true,
          },
          hidden: ({ parent }) => parent?.mediaType !== 'video'
        }),
      ]
    }),
    // Keep the original fields for backwards compatibility
    defineField({
      name: 'mainImage',
      title: 'Main Image (Legacy)',
      description: 'Legacy field - please use Main Media instead',
      type: 'image',
      options: {
        hotspot: true,
        storeOriginalFilename: true,
      },
      hidden: true
    }),
    defineField({
      name: 'hoverImage',
      title: 'Hover Image (Legacy)',
      description: 'Legacy field - please use Hover Media instead',
      type: 'image',
      options: {
        hotspot: true,
        storeOriginalFilename: true,
      },
      hidden: true
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Order to display this project (lower numbers appear first)',
      type: 'number',
      initialValue: 999,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'projectType',
      media: 'mainMedia.image'
    },
    prepare(selection) {
      const { title, type, media } = selection
      // Handle the case where type might be null or undefined
      const typePrefix = type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Project'
      return {
        title,
        subtitle: typePrefix,
        media: media
      }
    }
  }
})