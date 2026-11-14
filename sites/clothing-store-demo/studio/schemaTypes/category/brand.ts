export default {
  name: 'brand',
  title: 'Brands',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Brand Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Brand Description',
      type: 'text',
    },
    {
      name: 'isActive',
      title: 'Active Brand',
      type: 'boolean',
      initialValue: true,
      description: 'Show in filters and catalog',
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower number means higher in the list',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      description: 'description',
    },
  },
}
