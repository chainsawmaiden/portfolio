import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'playlist',
  title: 'Playlist',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Playlist Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'songs',
      title: 'Songs',
      type: 'array',
      of: [{ type: 'playlistSong' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      songs: 'songs',
      firstImage: 'songs.0.image',
    },
    prepare({ title, songs, firstImage }) {
      const songCount = songs?.length || 0
      return {
        title: title,
        subtitle: `${songCount} song${songCount !== 1 ? 's' : ''}`,
        media: firstImage,
      }
    },
  },
})