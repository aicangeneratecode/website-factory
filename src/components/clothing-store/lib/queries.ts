export const homepageQuery = `
          {
            "hero": *[_type == "heroSection"][0]{
              _id,
              isActive,
              order,
              title,
              subtitle,
              "mainImage": mainImage.asset->url,
              buttonText,
              instagramUsername,
              stats
            },
            "popularProducts": *[_type == "popularProductsSection"][0]{
              _id,
              isActive,
              order,
              title,
              subtitle,
              products[]->{
                _id,
                name,
                price,
                originalPrice,
                "images": images[].asset->url,
                "brand": brand->name,
                isNew,
                inStock,
                sizes
              }
            },
            "categoryCarousel": *[_type == "categoryCarousel"][0]{
              _id,
              isActive,
              order,
              title,
              subtitle,
              categories[]{
                name,
                description,
                "image": image.asset->url,
                link,
                buttonText
              }
            },
            "instagramFeed": *[_type == "instagramFeed"][0]{
              _id,
              _type,
              isActive,
              order,
              title,
              subtitle,
              handle,
              description,
              followers,
              postsCount,
              ctaTitle,
              ctaDescription,
              ctaFollowText,
              ctaFollowLink,
              ctaDmText,
              ctaDmLink,
              responseTime,
              "posts": posts[] {
                _key,
                caption,
                likes,
                comments,
                link,
                type,
                "imageUrl": image.asset->url
              }
            },
            "ugcGallery": *[_type == "ugcGallery"][0]{
              _id,
              _type,
              isActive,
              order,
              title,
              subtitle,
              description,
              ctaText,
              ctaLink,
              ctaDescription,
              autoPlay,
              loopVideos,
              muted,
              filters,
              "posts": posts[]{
                _key,
                likes,
                tags,
                isVideo,
                videoUrl,
                user {
                  username,
                  "avatarUrl": avatar.asset->url
                },
                "imageUrl": image.asset->url,
                "videoFileUrl": videoFile.asset->url,
                "videoThumbnailUrl": videoThumbnail.asset->url,
                "thumbnailUrl": coalesce(videoThumbnail.asset->url, image.asset->url)
              }
            },
            "reviewsSection": *[_type == "reviewsSection" && isActive == true][0]{
              ...,
              reviews[]{
                ...,
                product->{
                  _id,
                  name
                }
              },
              stats[]{
                label,
                value
              }
            },
            "faqSection": *[_type == "faqSection" && isActive == true][0]{
              ...,
              categories,
              faqs[]{
                _key,
                question,
                answer,
                category
              },
              contactEmail,
              instagramHandle,
              instagramLink,
              responseTime
            }
          }
        `;

export const productsQuery = `*[_type == "product"]{
          _id,
          name,
          price,
          originalPrice,
          category,
          subcategory,
          "brandName": brand->name,
          sizes,
          "images": images[]{
            ...,
            asset->{
              _id,
              url
            }
          },
          description,
          material,
          inStock,
          isNew,
          isSale,
          sku
        }`;

export const instagramQuery = `*[_type == "instagramFeed" && isActive == true][0] {
          _id,
          _type,
          isActive,
          title,
          subtitle,
          handle,
          description,
          followers,
          postsCount,
          ctaTitle,
          ctaDescription,
          ctaFollowText,
          ctaFollowLink,
          ctaDmText,
          ctaDmLink,
          responseTime,
          "posts": posts[] {
            _key,
            caption,
            likes,
            comments,
            link,
            type,
            "imageUrl": image.asset->url
          }
        }`;
