// shopmaket/schemaTypes/product.ts - ОБНОВЛЕННАЯ СХЕМА
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Men', value: 'men'},
          {title: 'Women', value: 'women'},
          {title: 'Accessories', value: 'accessories'},
          {title: 'Unisex', value: 'unisex'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      options: {
        list: [
          {title: 'T-Shirts', value: 'tshirts'},
          {title: 'Hoodies', value: 'hoodies'},
          {title: 'Pants', value: 'pants'},
          {title: 'Outerwear', value: 'outerwear'},
          {title: 'Accessories', value: 'accessories'},
          {title: 'Tracksuits', value: 'tracksuits'},
          {title: 'Sneakers', value: 'sneakers'},
        ],
      },
    }),
    defineField({
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'XS', value: 'XS'},
          {title: 'S', value: 'S'},
          {title: 'M', value: 'M'},
          {title: 'L', value: 'L'},
          {title: 'XL', value: 'XL'},
          {title: 'XXL', value: 'XXL'},
          {title: 'One Size', value: 'One Size'},
          {title: 'EU 38', value: 'EU 38'},
          {title: 'EU 39', value: 'EU 39'},
          {title: 'EU 40', value: 'EU 40'},
          {title: 'EU 41', value: 'EU 41'},
          {title: 'EU 42', value: 'EU 42'},
          {title: 'EU 43', value: 'EU 43'},
          {title: 'EU 44', value: 'EU 44'},
        ],
      },
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{type: 'brand'}],
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'material',
      title: 'Material',
      type: 'string',
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isNew',
      title: 'Is New',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isSale',
      title: 'Is Sale',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images',
      price: 'price',
      brand: 'brand.name',
      isNew: 'isNew',
      inStock: 'inStock',
    },
    prepare({title, media, price, brand, isNew, inStock}) {
      return {
        title: `${title} ${isNew ? '🆕' : ''}`,
        subtitle: `${brand ? `Brand: ${brand} • ` : ''}$${price} • ${inStock ? '✅ In Stock' : '❌ Out of Stock'}`,
        media: media?.[0],
      }
    },
  },
})
