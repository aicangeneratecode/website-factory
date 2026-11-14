// schemaTypes/ugcGallery.ts
export const ugcGallery = {
  name: 'ugcGallery',
  title: 'UGC Gallery Section',
  type: 'document',
  fields: [
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Порядок отображения на главной странице',
      initialValue: 7,
    },
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Main title for the UGC section',
      initialValue: 'Community',
    },
    {
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
      description: 'Subtitle text under the title',
      initialValue: 'Stories',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short description for mobile view',
      initialValue: 'Real photos from our community',
    },
    {
      name: 'posts',
      title: 'UGC Posts',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'ugcPost',
          fields: [
            {
              name: 'image',
              title: 'Post Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              description: 'Main photo for the post',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'likes',
              title: 'Likes Count',
              type: 'number',
              description: 'Number of likes for display',
              initialValue: 0,
              validation: (Rule: any) => Rule.min(0),
            },
            {
              name: 'tags',
              title: 'Hashtags',
              type: 'array',
              of: [{type: 'string'}],
              description: 'Hashtags for display (e.g., #hoodie, #streetwear)',
              options: {
                layout: 'tags',
              },
              initialValue: ['#NSFstyle'],
            },
          ],
          preview: {
            select: {
              title: 'tags',
              media: 'image',
              likes: 'likes',
            },
            prepare(selection: any) {
              const {title, media, likes} = selection
              const tags = Array.isArray(title) ? title.join(', ') : title
              return {
                title: tags || 'No tags',
                subtitle: `${likes || 0} likes`,
                media,
              }
            },
          },
        },
      ],
      description: 'Add user-generated photos from the community',
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Text for the call-to-action button',
      initialValue: 'Share Your Story',
    },
    {
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'url',
      description: 'Link for the CTA button',
      initialValue: 'https://instagram.com/nsf_clothing',
    },
    {
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      description: 'Text under the CTA button',
      initialValue: 'Tag @nsf_clothing for a chance to be featured',
    },
  ],
  preview: {
    select: {
      title: 'title',
      active: 'isActive',
      postCount: 'posts',
    },
    prepare(selection: any) {
      const {title, active, postCount} = selection
      return {
        title: title || 'UGC Gallery',
        subtitle: `${active ? 'Active' : 'Inactive'} • ${postCount?.length || 0} posts`,
      }
    },
  },
}
