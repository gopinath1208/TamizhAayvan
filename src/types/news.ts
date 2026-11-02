export interface NewsArticle {
  id: string;
  title: string;
  subtitle?: string;
  summary: string;
  content: string[];
  categoryId: string;
  author: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  caption?: string;
  tags: string[];
  views: number;
  isBreaking?: boolean;
  isTrending?: boolean;
  isLeadStory?: boolean;
}

export interface NewsCategory {
  id: string;
  slug: string;
  nameTa: string;
  nameEn: string;
  description: string;
}

export const NEWS_CATEGORIES: NewsCategory[] = [
  { id: 'tamil-nadu', slug: 'tamil-nadu', nameTa: 'தமிழ்நாடு', nameEn: 'Tamil Nadu', description: 'தமிழகத்தின் முக்கிய நிகழ்வுகள் மற்றும் செய்திகள்' },
  { id: 'india', slug: 'india', nameTa: 'இந்தியா', nameEn: 'India', description: 'இந்திய அளவிலான தேசிய செய்திகள் மற்றும் நிகழ்வுகள்' },
  { id: 'world', slug: 'world', nameTa: 'உலகம்', nameEn: 'World', description: 'சர்வதேச முக்கிய செய்திகள் மற்றும் உலக அரசியல்' },
  { id: 'politics', slug: 'politics', nameTa: 'அரசியல்', nameEn: 'Politics', description: 'அரசியல் களம், தேர்தல் விவாதங்கள் மற்றும் பகுப்பாய்வு' },
  { id: 'cinema', slug: 'cinema', nameTa: 'சினிமா', nameEn: 'Cinema', description: 'கோலிவுட் மற்றும் உலக சினிமா செய்திகள், விமர்சனங்கள்' },
  { id: 'business', slug: 'business', nameTa: 'வணிகம்', nameEn: 'Business', description: 'பொருளாதாரம், பங்குச்சந்தை, தங்கம் மற்றும் முதலீடு' },
  { id: 'spiritual', slug: 'spiritual', nameTa: 'ஆன்மீகம்', nameEn: 'Spiritual', description: 'கோவில் விசேஷங்கள், ராசிபலன் மற்றும் ஆன்மீக தகவல்கள்' },
  { id: 'sports', slug: 'sports', nameTa: 'விளையாட்டு', nameEn: 'Sports', description: 'கிரிக்கெட், கால்பந்து மற்றும் சர்வதேச விளையாட்டு' },
  { id: 'technology', slug: 'technology', nameTa: 'தொழில்நுட்பம்', nameEn: 'Technology', description: 'புதிய தொழில்நுட்பம், ஏஐ மற்றும் மொபைல் செய்திகள்' }
];
