// shopmaket/schemaTypes/popularProductsSection.ts
import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'popularProductsSection',
  title: 'Popular Products Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Popular Products',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      initialValue: 'Best selling items this week',
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
      initialValue: 4,
    }),
    defineField({
      name: 'products',
      title: 'Featured Products',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'product'}],
        }),
      ],
      description: 'Drag and drop to reorder. First 8 products will be shown.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      productCount: 'products',
      isActive: 'isActive',
    },
    prepare({title, productCount, isActive}) {
      return {
        title: title,
        subtitle: `${productCount?.length || 0} products • ${isActive ? 'Active' : 'Inactive'}`,
      }
    },
  },
})
