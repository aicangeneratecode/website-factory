// schemaTypes/instagramFeed.ts
const instagramFeed = {
  name: 'instagramFeed',
  title: 'Instagram Feed Section',
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
      initialValue: 5,
    },
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Main title for the Instagram section',
    },
    {
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
      description: 'Subtitle text under the title',
    },
    {
      name: 'handle',
      title: 'Instagram Handle',
      type: 'string',
      description: 'e.g., @NSF_Clothing',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Text that appears under the Instagram handle',
    },
    {
      name: 'followers',
      title: 'Followers Count',
      type: 'string',
      description: 'e.g., 5.2K',
    },
    {
      name: 'postsCount',
      title: 'Posts Count',
      type: 'string',
      description: 'e.g., 89',
    },
    {
      name: 'posts',
      title: 'Instagram Posts',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'instagramPost',
          fields: [
            {
              name: 'image',
              title: 'Post Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'text',
            },
            {
              name: 'likes',
              title: 'Likes Count',
              type: 'number',
            },
            {
              name: 'comments',
              title: 'Comments Count',
              type: 'number',
            },
            {
              name: 'link',
              title: 'Post URL',
              type: 'url',
            },
            {
              name: 'type',
              title: 'Post Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Product', value: 'product'},
                  {title: 'Behind the Scenes', value: 'behind'},
                  {title: 'User Generated Content', value: 'ugc'},
                  {title: 'Announcement', value: 'announcement'},
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
              type: 'type',
            },
            prepare(selection: any) {
              const {title, media, type} = selection
              return {
                title: title || 'No caption',
                subtitle: `Type: ${type || 'Not specified'}`,
                media,
              }
            },
          },
        },
      ],
      description: 'Add Instagram posts to display in the feed',
    },
    {
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      description: 'Title in the call-to-action section',
    },
    {
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      description: 'Description in the call-to-action section',
    },
    {
      name: 'ctaFollowText',
      title: 'CTA Follow Button Text',
      type: 'string',
      description: 'Text for the follow button',
    },
    {
      name: 'ctaFollowLink',
      title: 'CTA Follow Button Link',
      type: 'url',
      description: 'Link for the follow button',
    },
    {
      name: 'ctaDmText',
      title: 'CTA DM Button Text',
      type: 'string',
      description: 'Text for the direct message button',
    },
    {
      name: 'ctaDmLink',
      title: 'CTA DM Button Link',
      type: 'url',
      description: 'Link for the direct message button',
    },
    {
      name: 'responseTime',
      title: 'Response Time',
      type: 'string',
      description: 'e.g., Average response time: Under 2 hours',
    },
  ],
  preview: {
    select: {
      title: 'title',
      handle: 'handle',
      active: 'isActive',
    },
    prepare(selection: any) {
      const {title, handle, active} = selection
      return {
        title: title || 'Instagram Feed',
        subtitle: `${active ? 'Active' : 'Inactive'} • ${handle || 'No handle'}`,
      }
    },
  },
}

export default instagramFeed // Default export
