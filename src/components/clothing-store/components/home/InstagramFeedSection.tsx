// src/components/home/InstagramFeedSection.tsx
import React from "react";
import { Instagram, ExternalLink, Grid3x3 } from "lucide-react";
import { SectionSkeleton } from "../shared/SectionSkeleton";
import type { InstagramFeedSectionData } from "../../types/homepageTypes";

interface InstagramFeedSectionProps {
  data?: InstagramFeedSectionData;
}

export const InstagramFeedSection: React.FC<InstagramFeedSectionProps> = ({
  data,
}) => {
  // Если данные секции еще не загружены, показываем скелетон
  if (!data) {
    return <SectionSkeleton type="instagram" />;
  }

  // Если секция отключена, не рендерим
  if (data.isActive === false) {
    return null;
  }

  // Используем данные из Sanity или значения по умолчанию
  const {
    title = "Our Instagram",
    subtitle = "Follow for daily style inspiration, new drops, and exclusive content.",
    handle = "@NSF_Clothing",
    description = "Follow for daily style inspiration, new drops, and exclusive content.",
    followers = "5.2K",
    postsCount = "89",
    posts = [],
    ctaTitle = "Shop directly through Instagram",
    ctaDescription = "DM us your desired items for personalized service and fastest response.",
    ctaFollowText = "Follow & Shop Now",
    ctaFollowLink = "https://instagram.com/NSF_Clothing",
    ctaDmText = "Send Direct Message",
    ctaDmLink = "https://instagram.com/direct",
    responseTime = "Average response time: Under 2 hours",
  } = data;

  return (
    <>
      {/* Desktop Version */}
      <section className="hidden lg:block py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Split header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16">
            <div className="mb-8 lg:mb-0 lg:w-2/5">
              <div className="inline-flex items-center gap-2 text-gray-500 text-sm font-light mb-3">
                <div className="w-6 h-0.5 bg-gray-900"></div>
                <span>SOCIAL</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                  {handle}
                </h2>
              </div>

              <p className="text-gray-500 font-light text-lg">{description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
                <div className="text-3xl font-light text-gray-900 mb-2">
                  {followers}
                </div>
                <div className="text-gray-500 text-sm font-light uppercase tracking-wider">
                  Followers
                </div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
                <div className="text-3xl font-light text-gray-900 mb-2">
                  {postsCount}
                </div>
                <div className="text-gray500 text-sm font-light uppercase tracking-wider">
                  Posts
                </div>
              </div>
            </div>
          </div>

          {/* Instagram grid with varied sizes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {posts.map((post, index) => (
              <a
                key={post._key || index}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-2xl bg-gray-100 ${
                  index === 0 || index === 5
                    ? "md:col-span-2 md:row-span-2"
                    : ""
                }`}
              >
                <div className="aspect-square relative">
                  {/* Image with hover zoom */}
                  <div className="absolute inset-0 transform transition-transform duration-700 group-hover:scale-110">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.caption || "Instagram post"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                    )}
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="font-light mb-3 line-clamp-2">
                        {post.caption}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-white/70">
                        <span>{post.likes} likes</span>
                        <span>•</span>
                        <span>{post.comments} comments</span>
                      </div>
                    </div>
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {post.type}
                  </div>

                  {/* Instagram icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-4 h-4 text-gray-900" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* CTA section - Desktop */}
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <Grid3x3 className="w-full h-full" />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-light text-white mb-6">
                {ctaTitle}
              </h3>

              <p className="text-gray-300 font-light text-lg mb-8 max-w-2xl mx-auto">
                {ctaDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={ctaFollowLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl font-light hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
                >
                  <Instagram className="w-5 h-5" />
                  <span>{ctaFollowText}</span>
                </a>

                <a
                  href={ctaDmLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/30 text-white rounded-2xl font-light hover:bg-white/10 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <span>{ctaDmText}</span>
                </a>
              </div>

              <div className="mt-8 text-gray-400 text-sm font-light">
                {responseTime}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Version - Enhanced with Dual Rows */}
      <section className="lg:hidden py-12">
        <div className="px-4">
          {/* Enhanced Header - Left Aligned */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-0.5 bg-gray-900"></div>
              <span className="text-gray-500 text-xs font-light uppercase tracking-wider">
                SOCIAL
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight tracking-tight">
              {title}
              <br />
              <span className="text-gray-600 font-semibold">{handle}</span>
            </h2>

            <p className="text-gray-500 font-light text-sm mb-6 max-w-xs">
              {description}
            </p>

            {/* Instagram Stats - Left Aligned */}
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  {followers}
                </div>
                <div className="text-gray-500 text-xs font-light uppercase tracking-wider">
                  Followers
                </div>
              </div>
              <div className="w-0.5 h-8 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  {postsCount}
                </div>
                <div className="text-gray-500 text-xs font-light uppercase tracking-wider">
                  Posts
                </div>
              </div>
            </div>
          </div>

          {/* Instagram Posts with Dual Rows Scrolling Oppositely */}
          {posts.length > 0 && (
            <div className="relative mb-8">
              {/* Container with Border Lines */}
              <div className="relative border-l border-gray-200 border-r border-gray-200 py-2">
                {/* First Row - Scrolls Left */}
                <div className="mb-4">
                  <div
                    className="flex gap-4 overflow-x-auto scrollbar-hide pl-6"
                    style={{ scrollBehavior: "smooth" }}
                  >
                    {posts.map((post) => (
                      <a
                        key={`first-${post._key}`}
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 w-40 group"
                      >
                        {/* Post Container */}
                        <div className="relative rounded-xl overflow-hidden mb-2 border border-gray-100 shadow-sm">
                          <div className="relative w-full pb-[100%]">
                            {/* Image */}
                            <div className="absolute inset-0">
                              {post.imageUrl ? (
                                <img
                                  src={post.imageUrl}
                                  alt={post.caption}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                              )}
                            </div>

                            {/* Instagram Badge */}
                            <div className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                              <Instagram className="w-3.5 h-3.5 text-gray-900" />
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="text-white text-center p-4">
                                <div className="text-sm font-medium mb-1">
                                  {post.likes} likes
                                </div>
                                <div className="text-xs font-light">
                                  {post.comments} comments
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Post Caption */}
                        <p className="text-xs text-gray-600 font-light line-clamp-2 px-1 min-h-[2.5rem]">
                          {post.caption}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Second Row - Scrolls Right */}
                <div className="flex justify-end">
                  <div
                    className="flex gap-4 overflow-x-auto scrollbar-hide pr-6"
                    style={{
                      scrollBehavior: "smooth",
                      direction: "rtl",
                    }}
                  >
                    {/* Reverse order for second row */}
                    {[...posts].reverse().map((post) => (
                      <a
                        key={`second-${post._key}`}
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 w-40 group"
                        style={{ direction: "ltr" }}
                      >
                        {/* Post Container */}
                        <div className="relative rounded-xl overflow-hidden mb-2 border border-gray-100 shadow-sm">
                          <div className="relative w-full pb-[100%]">
                            {/* Image */}
                            <div className="absolute inset-0">
                              {post.imageUrl ? (
                                <img
                                  src={post.imageUrl}
                                  alt={post.caption}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                              )}
                            </div>

                            {/* Instagram Badge */}
                            <div className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                              <Instagram className="w-3.5 h-3.5 text-gray-900" />
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="text-white text-center p-4">
                                <div className="text-sm font-medium mb-1">
                                  {post.likes} likes
                                </div>
                                <div className="text-xs font-light">
                                  {post.comments} comments
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Post Caption */}
                        <p className="text-xs text-gray-600 font-light line-clamp-2 px-1 min-h-[2.5rem]">
                          {post.caption}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scroll Hint - Bottom */}
              <div className="text-center mt-4">
                <div className="inline-flex items-center gap-2 text-xs text-gray-500">
                  <span>Scroll both rows</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 border border-gray-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 border border-gray-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 border border-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Compact CTA Section */}
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6">
            <div className="text-left">
              <h3 className="text-lg font-medium text-white mb-2">
                {ctaTitle}
              </h3>

              <p className="text-gray-300 text-sm font-light mb-4">
                {ctaDescription}
              </p>

              {/* Buttons */}
              <div className="space-y-3">
                <a
                  href={ctaFollowLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-white text-gray-900 text-sm font-medium rounded-xl text-center active:scale-95 transition-transform"
                >
                  {ctaFollowText}
                </a>

                <a
                  href={ctaDmLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 border border-white/30 text-white text-sm font-medium rounded-xl text-center active:scale-95 transition-transform"
                >
                  {ctaDmText}
                </a>
              </div>

              {/* Response Time */}
              <div className="mt-4 text-xs text-gray-400 font-light">
                {responseTime}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
