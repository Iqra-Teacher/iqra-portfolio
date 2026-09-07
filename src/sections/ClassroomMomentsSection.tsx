import React, { useState, useEffect } from 'react';
import { Play, Image as ImageIcon, Filter, Layers, Maximize2 } from 'lucide-react';
import { ClassroomPost, MomentCategory } from '../types';
import { getClassroomPosts } from '../services/store';
import { LightboxModal } from '../components/LightboxModal';
import { BotanicalDecoration } from '../components/BotanicalDecoration';

export const ClassroomMomentsSection: React.FC = () => {
  const [posts, setPosts] = useState<ClassroomPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<MomentCategory>('All');
  
  // Lightbox Modal state
  const [selectedPost, setSelectedPost] = useState<ClassroomPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await getClassroomPosts();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching classroom posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const categories: MomentCategory[] = [
    'All', 
    'Classroom', 
    'Activities', 
    'Events', 
    'Achievements', 
    'Student Work', 
    'School Moments'
  ];

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-academic-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs uppercase tracking-super-wide text-gold font-bold">
            DYNAMIC GALLERY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal">
            Classroom Moments & Activities
          </h2>
          <BotanicalDecoration position="divider" />
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gold text-cream-50 shadow-sm'
                  : 'bg-cream-50 text-charcoal-medium hover:bg-gold/15 hover:text-gold border border-gold-subtle'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="academic-card rounded-2xl h-80 animate-pulse bg-cream-200 p-4" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-16 academic-card rounded-2xl p-8 max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-charcoal">No Moments Added Yet</h3>
            <p className="text-xs text-charcoal-muted max-w-md mx-auto leading-relaxed">
              Classroom photos, event highlights, and student activities will appear here when added via the Teacher Portal.
            </p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="academic-card rounded-2xl overflow-hidden group cursor-pointer flex flex-col h-full"
              >
                {/* Media Thumbnail Container */}
                <div className="relative aspect-[4/3] bg-charcoal/90 overflow-hidden">
                  <img
                    src={post.media_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Media Type Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-charcoal/70 backdrop-blur-md text-cream-50 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 border border-white/20">
                    {post.media_type === 'video' ? (
                      <>
                        <Play className="w-3 h-3 text-gold fill-gold" />
                        <span>Video</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3 h-3 text-gold" />
                        <span>Image</span>
                      </>
                    )}
                  </div>

                  {/* Category Tag */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gold text-cream-50 text-[10px] uppercase font-bold tracking-wider">
                    {post.category}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-cream-50/90 text-gold flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Caption Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-gold transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-charcoal-medium leading-relaxed mt-2 line-clamp-3">
                      {post.caption}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-cream-200 flex items-center justify-between text-[11px] text-charcoal-muted">
                    <span>{new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    <span className="text-gold font-semibold uppercase tracking-wider group-hover:underline">Click to view →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox / Video Modal */}
      {selectedPost && (
        <LightboxModal
          isOpen={Boolean(selectedPost)}
          onClose={() => setSelectedPost(null)}
          mediaUrl={selectedPost.media_url}
          mediaType={selectedPost.media_type}
          title={selectedPost.title}
          caption={selectedPost.caption}
          category={selectedPost.category}
        />
      )}
    </section>
  );
};
