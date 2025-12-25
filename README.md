# Pazaryeri - E-Commerce Frontend

Bu proje, **Frontend Developer** pozisyonu için hazırlanmış teknik değerlendirme case'idir. Next.js 16 ve TypeScript kullanılarak geliştirilmiş, ölçeklenebilir ve maintain edilebilir bir pazaryeri frontend uygulamasıdır.

## 🚀 Özellikler

- ✅ **Next.js 16** - App Router ile modern React uygulaması
- ✅ **TypeScript** - Strict mode ile tip güvenliği
- ✅ **Internationalization (i18n)** - Türkçe ve İngilizce dil desteği (URL tabanlı)
- ✅ **Zustand** - Global state management (Favori yönetimi)
- ✅ **Tailwind CSS** - Utility-first CSS framework
- ✅ **Dark Mode** - Sistem tercihine göre otomatik tema
- ✅ **Framer Motion** - Smooth animasyonlar
- ✅ **Atomic Design** - Component mimarisi
- ✅ **SEO Optimized** - Dynamic metadata, sitemap, robots.txt
- ✅ **Performance** - Code splitting, lazy loading, image optimization

## 📁 Proje Yapısı

```
pazaryeri/
├── app/                    # Next.js App Router
│   ├── [locale]/          # i18n routing
│   │   ├── layout.tsx     # Locale layout
│   │   ├── page.tsx       # Ana sayfa
│   │   └── products/     # Ürün sayfaları
│   ├── layout.tsx         # Root layout
│   ├── sitemap.ts         # SEO sitemap
│   └── robots.ts          # SEO robots.txt
├── components/
│   ├── atoms/             # Atomic Design - Atoms
│   │   ├── Button/
│   │   ├── Badge/
│   │   └── Price/
│   ├── molecules/         # Atomic Design - Molecules
│   │   └── ProductCard/
│   ├── organisms/         # Atomic Design - Organisms
│   │   └── Header/
│   └── providers/         # Context providers
│       └── ThemeProvider/
├── lib/
│   ├── api/               # API katmanı (mock data)
│   │   ├── products.ts
│   │   └── categories.ts
│   ├── stores/            # Zustand stores
│   │   └── favorites.ts
│   └── utils.ts           # Utility fonksiyonlar
├── types/                 # TypeScript type tanımları
│   └── product.ts
├── data/                  # Mock JSON veriler
│   ├── mock-products.json
│   └── mock-categories.json
├── messages/              # i18n çeviri dosyaları
│   ├── tr.json
│   └── en.json
├── i18n/                  # i18n konfigürasyonu
│   ├── request.ts
│   └── routing.ts
└── middleware.ts          # Next.js middleware (i18n)
```

## 🛠️ Kurulum

### Gereksinimler

- Node.js 18+ 
- npm veya yarn

### Adımlar

1. **Repository'yi klonlayın:**
```bash
git clone <repository-url>
cd pazaryeri
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

4. **Tarayıcıda açın:**
```
http://localhost:3000/tr
```

## 📝 Scripts

- `npm run dev` - Geliştirme sunucusunu başlatır
- `npm run build` - Production build oluşturur
- `npm run start` - Production sunucusunu başlatır
- `npm run lint` - ESLint kontrolü yapar
- `npm run lint:fix` - ESLint hatalarını düzeltir
- `npm run format` - Prettier ile formatlar
- `npm run format:check` - Prettier kontrolü yapar
- `npm run test` - Testleri çalıştırır
- `npm run test:watch` - Testleri watch mode'da çalıştırır
- `npm run test:coverage` - Test coverage raporu oluşturur

## 🏗️ Mimari Kararlar

### Rendering Stratejileri

- **Ana Sayfa (`/`):** SSG (Static Site Generation) - İlk yüklemede hızlı
- **Ürün Listesi:** SSR (Server-Side Rendering) - Dinamik içerik için
- **Ürün Detay:** SSR - SEO ve dinamik içerik için

### State Management

- **Zustand** kullanıldı - Basit, hafif ve ölçeklenebilir
- **Favori yönetimi** global state üzerinden yapılıyor
- **Persist middleware** ile localStorage'a kaydediliyor
- Normalize edilmiş state yapısı (Record<string, Product>)

### Component Mimarisi

**Atomic Design** prensiplerine uygun:
- **Atoms:** Button, Badge, Price (En küçük component'ler)
- **Molecules:** ProductCard (Atom'ların birleşimi)
- **Organisms:** Header (Molecule'ların birleşimi)
- **Templates:** Sayfa şablonları (layout.tsx)
- **Pages:** Gerçek sayfalar (page.tsx)

### Internationalization

- **next-intl** kullanıldı
- URL tabanlı routing (`/tr`, `/en`)
- Merkezi çeviri dosyaları (`messages/tr.json`, `messages/en.json`)
- Middleware ile otomatik locale yönlendirme

### Performance Optimizasyonları

- **next/image** - Otomatik image optimization
- **Code splitting** - Route ve component bazlı
- **Lazy loading** - Framer Motion ile animasyonlar
- **Memoization** - React.memo ve useMemo kullanımı

### SEO

- **Dynamic metadata** - Her sayfa için özel metadata
- **OpenGraph & Twitter Card** - Social media paylaşımları için
- **sitemap.xml** - Otomatik sitemap oluşturma
- **robots.txt** - Arama motoru yönlendirmeleri

## 🎨 Stil ve UI

- **Tailwind CSS** - Utility-first CSS framework
- **Dark Mode** - Sistem tercihine göre otomatik
- **Responsive Design** - Mobile-first yaklaşım
- **Framer Motion** - Smooth animasyonlar

## 🧪 Test

Test yapısı hazırlanmıştır:
- **Jest** - Test framework
- **React Testing Library** - Component testleri
- Test dosyaları `*.test.tsx` veya `*.spec.tsx` formatında

## 📦 Mock Data

Gerçek bir API varmış gibi mock JSON dosyaları kullanıldı:
- `data/mock-products.json` - Ürün verileri
- `data/mock-categories.json` - Kategori verileri
- API katmanı (`lib/api/`) üzerinden erişiliyor

## 🔧 Konfigürasyon

### TypeScript
- Strict mode aktif
- Path aliases (`@/*`)
- Type definitions (`types/`)

### ESLint
- Next.js ESLint config
- TypeScript rules

### Prettier
- Tailwind CSS plugin
- Single quote, semicolon, 2 space indent

## 🚧 Varsayımlar ve Trade-off'lar

### Varsayımlar

1. **Backend API:** REST tabanlı API varsayıldı, şu an mock data kullanılıyor
2. **Authentication:** Kullanıcı girişi için basit bir yapı varsayıldı
3. **Cart Management:** Sepet yönetimi için state management hazır ama tam implementasyon yapılmadı
4. **Image Storage:** Ürün görselleri için placeholder path'ler kullanıldı

### Trade-off'lar

1. **Test Coverage:** Temel test yapısı hazırlandı, tam coverage için daha fazla test yazılabilir
2. **API Integration:** Mock data kullanıldı, gerçek API entegrasyonu için `lib/api/` katmanı hazır

## 📚 Kullanılan Teknolojiler

- **Next.js 16.1.1** - React framework
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **next-intl 4.6.1** - Internationalization
- **Zustand 5.0.9** - State management
- **Framer Motion 12.23.26** - Animations
- **Lucide React** - Icons
- **Jest** - Testing
- **ESLint** - Linting
- **Prettier** - Code formatting

## 🌐 Dil Desteği

- **Türkçe** (`/tr`) - Varsayılan
- **İngilizce** (`/en`)

## 📄 Lisans

Bu proje teknik değerlendirme amaçlıdır.

## 👤 Geliştirici

Frontend Developer pozisyonu için hazırlanmıştır.

---

**Not:** Bu proje production ortamı düşünülerek tasarlanmıştır. Gerçek bir API entegrasyonu için `lib/api/` katmanındaki fonksiyonlar güncellenmelidir.
