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
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      description: 'The primary image shown on the project card',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'hoverImage',
      title: 'Hover Image',
      description: 'The image shown when hovering over the project card',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Order to display this project (lower numbers appear first)',
      type: 'number',
      initialValue: 999,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Full description for the project page',
      type: 'array',
      of: [{ type: 'block' }]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'projectType',
      media: 'mainImage'
    },
    prepare(selection) {
      const { title, type } = selection
      return {
        ...selection,
        subtitle: type.charAt(0).toUpperCase() + type.slice(1)
      }
    }
  }
})