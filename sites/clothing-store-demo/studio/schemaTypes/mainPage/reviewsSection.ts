// shopmaket/schemaTypes/reviewsSection.ts
import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'reviewsSection',
  title: 'Customer Reviews',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'What Our Customers Say',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      initialValue: 'Real reviews from real customers',
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
      initialValue: 6,
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
            }),
          ],
        }),
      ],
      initialValue: [
        {label: 'Reviews', value: '200+'},
        {label: 'Average Rating', value: '4.9★'},
        {label: 'Recommend', value: '98%'},
        {label: 'Response Time', value: '24h'},
      ],
    }),
    defineField({
      name: 'averageRating',
      title: 'Average Rating',
      type: 'number',
      initialValue: 4.8,
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'totalReviews',
      title: 'Total Reviews',
      type: 'number',
      initialValue: 1284,
    }),
    defineField({
      name: 'reviews',
      title: 'Featured Reviews',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'customerName',
              title: 'Customer Name',
              type: 'string',
            }),
            defineField({
              name: 'customerLocation',
              title: 'Customer Location',
              type: 'string',
            }),
            defineField({
              name: 'rating',
              title: 'Rating',
              type: 'number',
              validation: (Rule) => Rule.min(1).max(5),
            }),
            defineField({
              name: 'reviewText',
              title: 'Review Text',
              type: 'text',
            }),
            defineField({
              name: 'date',
              title: 'Review Date',
              type: 'date',
            }),
            defineField({
              name: 'product',
              title: 'Product Reviewed',
              type: 'reference',
              to: [{type: 'product'}],
            }),
          ],
          preview: {
            select: {
              title: 'customerName',
              subtitle: 'reviewText',
              rating: 'rating',
            },
            prepare({title, subtitle, rating}) {
              return {
                title: title,
                subtitle: `${'★'.repeat(rating)} • ${subtitle?.slice(0, 50)}...`,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      reviewCount: 'reviews',
      isActive: 'isActive',
    },
    prepare({title, reviewCount, isActive}) {
      return {
        title: title,
        subtitle: `${reviewCount?.length || 0} reviews • ${isActive ? 'Active' : 'Inactive'}`,
      }
    },
  },
})
