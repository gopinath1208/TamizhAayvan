import React, { useState, useEffect } from 'react';
import { AdProvider, useAds } from './context/AdContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ArticlePage } from './pages/ArticlePage';
import { AdminAdManagement } from './pages/AdminAdManagement';
import { MOCK_ARTICLES } from './data/mockNews';
import { NEWS_CATEGORIES, NewsArticle } from './types/news';
import { Sliders, ArrowUp, Search, X } from 'lucide-react';

function AppContent() {
  const { activeCount, highlightSlots } = useAds();
  const [currentView, setCurrentView] = useState<'home' | 'admin' | string>('home');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll listener for Back-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setSelectedArticle(null);
    setSelectedCategorySlug(null);
    setSearchQuery('');
    setCurrentView('home');
    scrollToTop();
  };

  const handleNavigateCategory = (slug: string) => {
    setSelectedArticle(null);
    setSelectedCategorySlug(slug);
    setSearchQuery('');
    setCurrentView(`category-${slug}`);
    scrollToTop();
  };

  const handleNavigateArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
    setCurrentView(`article-${article.id}`);
    scrollToTop();
  };

  const handleNavigateAdmin = () => {
    setCurrentView('admin');
    scrollToTop();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedArticle(null);
    setSelectedCategorySlug(null);
    setCurrentView('search');
    scrollToTop();
  };

  // Filtered articles when search is active
  const searchResults = searchQuery
    ? MOCK_ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.content.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 text-stone-900 selection:bg-red-800 selection:text-white">
      {/* Universal Header with Brand Masthead, Nav, Date & Ad Manager link */}
      <Header
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        onNavigateCategory={handleNavigateCategory}
        onNavigateAdmin={handleNavigateAdmin}
        onSearch={handleSearch}
      />

      {/* Main View Router */}
      <div className="flex-1">
        {currentView === 'admin' && (
          <AdminAdManagement onBackToSite={handleNavigateHome} />
        )}

        {currentView === 'home' && (
          <HomePage
            articles={MOCK_ARTICLES}
            onSelectArticle={handleNavigateArticle}
            onNavigateCategory={handleNavigateCategory}
          />
        )}

        {currentView.startsWith('category-') && selectedCategorySlug && (
          <CategoryPage
            category={
              NEWS_CATEGORIES.find((c) => c.slug === selectedCategorySlug) || NEWS_CATEGORIES[0]
            }
            articles={MOCK_ARTICLES.filter((a) => a.categoryId === selectedCategorySlug)}
            allArticles={MOCK_ARTICLES}
            onSelectArticle={handleNavigateArticle}
            onNavigateHome={handleNavigateHome}
          />
        )}

        {currentView.startsWith('article-') && selectedArticle && (
          <ArticlePage
            article={selectedArticle}
            allArticles={MOCK_ARTICLES}
            onSelectArticle={handleNavigateArticle}
            onNavigateHome={handleNavigateHome}
            onNavigateCategory={handleNavigateCategory}
          />
        )}

        {currentView === 'search' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-red-800" />
                <h1 className="text-xl font-bold font-serif text-stone-900">
                  தேடல் முடிவுகள்: &quot;{searchQuery}&quot;
                </h1>
              </div>
              <button
                onClick={handleNavigateHome}
                className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>தேடலை ரத்து செய்க</span>
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => handleNavigateArticle(art)}
                    className="cursor-pointer bg-white p-4 rounded border border-stone-200 hover:border-red-800 shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-semibold text-red-800 uppercase">
                        {art.categoryId}
                      </span>
                      <h3 className="text-base font-bold font-serif text-stone-900 mt-1 leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2 mt-2">{art.summary}</p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-stone-100 text-[11px] text-stone-400 flex items-center justify-between font-mono">
                      <span>{art.readTime}</span>
                      <span>{art.views.toLocaleString()} வாசிப்புகள்</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-stone-500">
                <p className="text-sm">மன்னிக்கவும், &quot;{searchQuery}&quot; என்ற சொல்லுக்குரிய செய்திகள் ஏதும் கிடைக்கவில்லை.</p>
                <button
                  onClick={handleNavigateHome}
                  className="mt-4 px-4 py-2 text-xs font-semibold bg-red-900 text-white rounded hover:bg-red-800 transition-colors"
                >
                  முகப்புக்குச் செல்க
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button for Quick Access to விளம்பர மேலாண்மை (Admin Ad Management) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-stone-900 text-white hover:bg-red-900 shadow-md transition-all duration-200"
            title="மேலே செல்க (Scroll to top)"
            aria-label="மேலே செல்க"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={handleNavigateAdmin}
          className="group flex items-center gap-2 bg-red-900 hover:bg-red-800 text-white text-xs font-semibold px-3.5 py-2.5 rounded-full shadow-lg border border-amber-400/40 transition-all duration-200 hover:scale-105"
          title="விளம்பர மேலாண்மை நிர்வாக பலகை"
        >
          <Sliders className="w-4 h-4 text-amber-300 group-hover:rotate-45 transition-transform" />
          <span className="hidden sm:inline">விளம்பர மேலாண்மை</span>
          <span className="bg-amber-400 text-stone-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full font-mono">
            {activeCount}
          </span>
        </button>
      </div>

      {/* Universal Footer with FOOTER_BANNER Advertisement Placement */}
      <Footer
        onNavigateHome={handleNavigateHome}
        onNavigateCategory={handleNavigateCategory}
        onNavigateAdmin={handleNavigateAdmin}
      />
    </div>
  );
}

export default function App() {
  return (
    <AdProvider>
      <AppContent />
    </AdProvider>
  );
}
