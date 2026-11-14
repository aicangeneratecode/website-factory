// shopmaket/schemaTypes/heroSection.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section - Главный баннер',
  type: 'document',
  fields: [
    defineField({
      name: 'isActive',
      title: 'Включить секцию',
      type: 'boolean',
      initialValue: true,
      description: 'Показать/скрыть эту секцию на главной странице',
    }),

    defineField({
      name: 'title',
      title: 'Основной заголовок',
      type: 'string',
      initialValue: 'NSF',
      description: 'Большой текст в левой части',
    }),

    defineField({
      name: 'subtitle',
      title: 'Подзаголовок',
      type: 'string',
      initialValue: 'Essentials',
      description: 'Текст под основным заголовком',
    }),

    defineField({
      name: 'mainImage',
      title: 'Основное изображение',
      type: 'image',
      description: 'Изображение в правой части (рекомендуется 800x1000px)',
    }),

    defineField({
      name: 'buttonText',
      title: 'Текст кнопки "Купить"',
      type: 'string',
      initialValue: 'Shop Now',
    }),

    defineField({
      name: 'instagramUsername',
      title: 'Instagram username',
      type: 'string',
      initialValue: '@nsf_clothing',
      description: 'Только имя пользователя (без @)',
    }),

    defineField({
      name: 'stats',
      title: 'Статистика',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Значение',
              type: 'string',
              description: 'Например: 200+',
            },
            {
              name: 'label',
              title: 'Подпись',
              type: 'string',
              description: 'Например: Customers',
            },
          ],
        },
      ],
      initialValue: [
        {value: '200+', label: 'Customers'},
        {value: '4.8★', label: 'Rating'},
        {value: '24h', label: 'Response'},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      isActive: 'isActive',
      order: 'order',
      media: 'mainImage',
    },
    prepare({title, subtitle, isActive, order, media}) {
      return {
        title: `🎯 ${title || 'Hero'} ${isActive ? '✅' : '❌'}`,
        subtitle: `Order: ${order} • ${subtitle?.slice(0, 50) || 'No subtitle'}`,
        media: media || undefined,
      }
    },
  },
})
