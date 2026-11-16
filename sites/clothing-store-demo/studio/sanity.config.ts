// ДОЛЖНО БЫТЬ:
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {
  HomeIcon,
  PackageIcon,
  TagIcon,
  StarIcon,
  ImageIcon,
  MessageCircleIcon,
  HelpCircleIcon,
  SettingsIcon,
} from 'lucide-react'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET
if (!projectId || !dataset) {
  throw new Error('Set SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET for this client.')
}

export default defineConfig({
  name: 'default',
  title: 'Clothing Store CMS',

  projectId,
  dataset,

  plugins: [
    media(),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // 📦 PRODUCTS SECTION
            S.listItem()
              .title('Products')
              .icon(PackageIcon)
              .child(
                S.list()
                  .title('Products Management')
                  .items([
                    S.documentTypeListItem('product').title('All Products').icon(PackageIcon),
                    S.documentTypeListItem('brand').title('Brands').icon(TagIcon),
                  ]),
              ),

            // 🏠 HOMEPAGE SECTIONS
            S.listItem()
              .title('Homepage')
              .icon(HomeIcon)
              .child(
                S.list()
                  .title('Homepage Sections')
                  .items([
                    S.documentTypeListItem('heroSection')
                      .title('Hero Section')
                      .icon(StarIcon)
                      .child(
                        S.document()
                          .title('Hero Section')
                          .schemaType('heroSection')
                          .documentId('heroSection'),
                      ),
                    S.documentTypeListItem('popularProductsSection')
                      .title('Popular Products')
                      .icon(StarIcon)
                      .child(
                        S.document()
                          .title('Popular Products Section')
                          .schemaType('popularProductsSection')
                          .documentId('popularProductsSection'),
                      ),
                    S.documentTypeListItem('categoryCarousel')
                      .title('Category Carousel')
                      .icon(ImageIcon)
                      .child(
                        S.document()
                          .title('Category Carousel')
                          .schemaType('categoryCarousel')
                          .documentId('categoryCarousel'),
                      ),
                    S.documentTypeListItem('instagramFeed')
                      .title('Instagram Feed')
                      .icon(ImageIcon)
                      .child(
                        S.document()
                          .title('Instagram Feed')
                          .schemaType('instagramFeed')
                          .documentId('instagramFeed'),
                      ),
                    S.documentTypeListItem('ugcGallery')
                      .title('UGC Gallery')
                      .icon(ImageIcon)
                      .child(
                        S.document()
                          .title('UGC Gallery')
                          .schemaType('ugcGallery')
                          .documentId('ugcGallery'),
                      ),
                    S.documentTypeListItem('reviewsSection')
                      .title('Customer Reviews')
                      .icon(MessageCircleIcon)
                      .child(
                        S.document()
                          .title('Customer Reviews')
                          .schemaType('reviewsSection')
                          .documentId('reviewsSection'),
                      ),
                    S.documentTypeListItem('faqSection')
                      .title('FAQ Section')
                      .icon(HelpCircleIcon)
                      .child(
                        S.document()
                          .title('FAQ Section')
                          .schemaType('faqSection')
                          .documentId('faqSection'),
                      ),
                  ]),
              ),

            // ⚙️ SETTINGS (опционально)
            S.listItem()
              .title('Settings')
              .icon(SettingsIcon)
              .child(
                S.document()
                  .title('Site Settings')
                  .schemaType('siteSettings')
                  .documentId('siteSettings'),
              ),

            // Divider
            S.divider(),

            // All documents (as fallback)
            ...S.documentTypeListItems().filter(
              (listItem) =>
                ![
                  'product',
                  'brand',
                  'heroSection',
                  'popularProductsSection',
                  'categoryCarousel',
                  'instagramFeed',
                  'ugcGallery',
                  'reviewsSection',
                  'faqSection',
                  'siteSettings',
                ].includes(listItem.getId() || ''),
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
