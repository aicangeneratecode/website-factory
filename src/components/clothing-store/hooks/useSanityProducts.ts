// src/hooks/useSanityProducts.ts
import { useState, useEffect } from "react";
import { urlFor } from "../lib/sanity";
import type { Product, Category, Subcategory, Size } from "../types/types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log("🔄 Загрузка товаров из Sanity...");

        // УПРОЩЕННЫЙ ЗАПРОС - размеры как строки
        const response = await fetch("/clothing-store/data/products.json");
        if (!response.ok) throw new Error("Unable to load store data.");
        const data = await response.json();
        console.log("✅ Данные получены из Sanity:", data?.length, "товаров");

        if (!Array.isArray(data)) {
          throw new Error("Данные не являются массивом");
        }

        // ПРЕОБРАЗОВАНИЕ ДАННЫХ
        const mappedProducts: Product[] = data.map((item: any) => {
          // Размеры: просто используем как есть, это уже массив строк!
          const sizes: Size[] = item.sizes || ["M", "L"];

          // Преобразуем изображения
          const images = item.images?.map((img: any) => {
            if (img?.asset?.url) {
              return urlFor(img).width(800).url();
            }
            return "/images/clothing-store/Tshirt.png";
          }) || ["/images/clothing-store/Tshirt.png"];

          return {
            id: item._id,
            name: item.name || "Без названия",
            price: item.price || 0,
            originalPrice: item.originalPrice || undefined,
            category: (item.category as Category) || "men",
            subcategory: (item.subcategory as Subcategory) || "tshirts",
            sizes: sizes,
            brand: item.brandName || "Unknown",
            colors: [],
            images: images,
            description: item.description || "",
            material: item.material || "",
            inStock: item.inStock ?? true,
            isNew: item.isNew ?? false,
            isSale: item.isSale ?? false,
            sku: item.sku || "",
          };
        });

        console.log(
          "🎯 Преобразовано товаров из Sanity:",
          mappedProducts.length
        );

        // Используем только данные из Sanity
        const finalProducts = mappedProducts;

        console.log("📊 Итоговое количество товаров:", finalProducts.length);
        setProducts(finalProducts);
      } catch (err: any) {
        console.error("❌ Ошибка загрузки товаров из Sanity:", err);

        // При ошибке возвращаем пустой массив вместо моковых данных
        setProducts([]);
        setError(
          "Не удалось загрузить товары. Проверьте подключение к Sanity."
        );
      } finally {
        setIsLoading(false);
        console.log("🏁 Загрузка завершена");
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading, error };
}

export function useProduct(productId?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/clothing-store/data/products.json");
        if (!response.ok) throw new Error("Unable to load store data.");
        const products = await response.json();
        const data = products.find((item: { _id: string }) => item._id === productId);

        if (data) {
          // Размеры как строки
          const sizes: Size[] = data.sizes || ["M", "L"];

          const images = data.images?.map((img: any) => {
            if (img?.asset?.url) {
              return urlFor(img).width(800).url();
            }
            return "/images/clothing-store/Tshirt.png";
          }) || ["/images/clothing-store/Tshirt.png"];

          setProduct({
            id: data._id,
            name: data.name,
            price: data.price,
            originalPrice: data.originalPrice,
            category: data.category as Category,
            subcategory: data.subcategory as Subcategory,
            sizes: sizes,
            brand: data.brandName || "Unknown",
            colors: [],
            images: images,
            description: data.description || "",
            material: data.material || "",
            inStock: data.inStock ?? true,
            isNew: data.isNew ?? false,
            isSale: data.isSale ?? false,
            sku: data.sku || "",
          });
        } else {
          setError("Товар не найден в Sanity");
        }
      } catch (err: any) {
        console.error("Ошибка загрузки товара:", err);
        setError("Не удалось загрузить товар из Sanity");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, isLoading, error };
}
