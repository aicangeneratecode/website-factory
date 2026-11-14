// shopmaket/schemaTypes/faqSection.ts
import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      initialValue: 'Everything you need to know about shopping with NSF.',
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
      initialValue: 8,
    }),
    defineField({
      name: 'categories',
      title: 'FAQ Categories',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      initialValue: ['Shipping & Returns', 'Orders', 'Payment', 'Products', 'General'],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'category',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'support@nsf.com',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      initialValue: '@nsf_clothing',
    }),
    defineField({
      name: 'instagramLink',
      title: 'Instagram Link',
      type: 'url',
      initialValue: 'https://instagram.com/nsf_clothing',
    }),
    defineField({
      name: 'responseTime',
      title: 'Response Time',
      type: 'string',
      initialValue: 'Average response time: Under 2 hours',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      faqCount: 'faqs',
      isActive: 'isActive',
    },
    prepare({title, faqCount, isActive}) {
      return {
        title: title,
        subtitle: `${faqCount?.length || 0} FAQs • ${isActive ? 'Active' : 'Inactive'}`,
      }
    },
  },
})
