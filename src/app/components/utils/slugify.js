// utils/slugify.js
export function slugify(text) {
  return text
    .toString()
    .trim()
    // فاصله و آندرلاین → خط تیره
    .replace(/\s+/g, "-")
    // حذف کاراکترهای غیر از فارسی/انگلیسی/عدد/خط‌تیره
    .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "")
    // حذف خط‌تیره‌های پشت‌سر‌هم
    .replace(/-+/g, "-")
    // حذف خط‌تیره ابتدا و انتها
    .replace(/^-+|-+$/g, "");
}
