// shopmaket/schemaTypes/categoryCarousel.ts
import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'categoryCarousel',
  title: 'Category Carousel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Shop by Category',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      initialValue: 'Find your perfect style',
    }),
    defineField({
      name: 'isActive',
      title: 'Show on Homepage',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 3,
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Category Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Short Description',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Category Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'link',
              title: 'Category Link',
              type: 'string',
              description: 'e.g., /catalog?category=men',
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Shop Now',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image',
              subtitle: 'description',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      isActive: 'isActive',
      order: 'order',
      categoryCount: 'categories',
    },
    prepare({title, subtitle, isActive, order, categoryCount}) {
      return {
        title: `📁 ${title || 'Categories'} ${isActive ? '✅' : '❌'}`,
        subtitle: `Order: ${order} • ${categoryCount?.length || 0} categories`,
        media: categoryCount?.[0]?.image || undefined,
      }
    },
  },
})
