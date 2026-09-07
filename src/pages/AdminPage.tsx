import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, LogOut, CheckCircle, XCircle, Trash2, Plus, 
  Upload, Layers, Award, FileCheck, MessageSquare, 
  User, RefreshCw, Eye, Sparkles, Shield
} from 'lucide-react';
import { 
  getAllTestimonialsAdmin, 
  updateTestimonialStatus, 
  deleteTestimonial,
  getClassroomPosts,
  createClassroomPost,
  deleteClassroomPost,
  getAchievements,
  createAchievement,
  deleteAchievement,
  getCertificates,
  createCertificate,
  deleteCertificate
} from '../services/store';
import { Testimonial, ClassroomPost, Achievement, Certificate, MomentCategory } from '../types';
import { uploadToCloudinary } from '../lib/cloudinary';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { BotanicalDecoration } from '../components/BotanicalDecoration';
import { MediaUploader } from '../components/MediaUploader';

export const AdminPage: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('iqra_admin_authed') === 'true';
  });
  const [emailInput, setEmailInput] = useState('Iqrahasan848@gmail.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'testimonials' | 'posts' | 'achievements' | 'certificates' | 'profile'>('overview');

  // Data states
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [posts, setPosts] = useState<ClassroomPost[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);

  // Forms states
  // New Post Form
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCaption, setNewPostCaption] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<MomentCategory>('Classroom');
  const [newPostMediaType, setNewPostMediaType] = useState<'image' | 'video'>('image');
  const [newPostMediaUrl, setNewPostMediaUrl] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);

  // New Achievement Form
  const [achTitle, setAchTitle] = useState('');
  const [achDesc, setAchDesc] = useState('');
  const [achDate, setAchDate] = useState('');
  const [achCategory, setAchCategory] = useState('Academic Milestone');
  const [achImageUrl, setAchImageUrl] = useState('');

  // New Certificate Form
  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certDate, setCertDate] = useState('');
  const [certDesc, setCertDesc] = useState('');
  const [certFileUrl, setCertFileUrl] = useState('');

  const refreshAllData = async () => {
    setLoading(true);
    try {
      const [tData, pData, aData, cData] = await Promise.all([
        getAllTestimonialsAdmin(),
        getClassroomPosts(),
        getAchievements(),
        getCertificates()
      ]);
      setTestimonials(tData);
      setPosts(pData);
      setAchievements(aData);
      setCertificates(cData);
    } catch (err) {
      console.error('Error refreshing admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const verifyAdminRole = async (userId: string): Promise<boolean> => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .maybeSingle();

      return profile?.role === 'admin';
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        if (session) {
          const isAdmin = await verifyAdminRole(session.user.id);
          if (isAdmin) {
            setIsAuthenticated(true);
            localStorage.setItem('iqra_admin_authed', 'true');
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem('iqra_admin_authed');
          }
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('iqra_admin_authed');
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session) {
          const isAdmin = await verifyAdminRole(session.user.id);
          if (isAdmin) {
            setIsAuthenticated(true);
            localStorage.setItem('iqra_admin_authed', 'true');
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem('iqra_admin_authed');
            await supabase.auth.signOut();
          }
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('iqra_admin_authed');
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      refreshAllData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (isSupabaseConfigured) {
      // Production mode: Authenticate via Supabase Auth & check DB admin role
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput,
        password: passwordInput,
      });

      if (error) {
        setAuthError(`Authentication failed: ${error.message}`);
        return;
      }

      if (data.session) {
        const isAdmin = await verifyAdminRole(data.session.user.id);
        if (isAdmin) {
          localStorage.setItem('iqra_admin_authed', 'true');
          setIsAuthenticated(true);
        } else {
          setAuthError('Access Denied: Your account does not have administrator privileges in the database.');
          await supabase.auth.signOut();
          localStorage.removeItem('iqra_admin_authed');
          setIsAuthenticated(false);
        }
      }
    } else {
      // Development Fallback Mode (when Supabase .env keys are not configured yet)
      if (passwordInput.length >= 4) {
        localStorage.setItem('iqra_admin_authed', 'true');
        setIsAuthenticated(true);
        setAuthError('');
      } else {
        setAuthError('Dev Mode: Enter any password of 4+ characters to log into local demo CMS.');
      }
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('iqra_admin_authed');
    setIsAuthenticated(false);
  };

  // Cloudinary File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetUrlSetter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFile(true);
    try {
      const url = await uploadToCloudinary(file);
      targetUrlSetter(url);
    } catch (err) {
      alert('File upload failed. Please try again.');
    } finally {
      setUploadingFile(false);
    }
  };

  // Testimonial Moderation
  const handleApproveTestimonial = async (id: string) => {
    await updateTestimonialStatus(id, true);
    refreshAllData();
  };

  const handleRejectTestimonial = async (id: string) => {
    await updateTestimonialStatus(id, false);
    refreshAllData();
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (window.confirm('Delete this testimonial permanently?')) {
      await deleteTestimonial(id);
      refreshAllData();
    }
  };

  // Classroom Post CRUD
  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle || !newPostMediaUrl) {
      alert('Please fill out post title and media URL / upload an image');
      return;
    }
    await createClassroomPost({
      title: newPostTitle,
      caption: newPostCaption,
      category: newPostCategory,
      media_type: newPostMediaType,
      media_url: newPostMediaUrl,
    });
    setNewPostTitle('');
    setNewPostCaption('');
    setNewPostMediaUrl('');
    refreshAllData();
    alert('Classroom moment published!');
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Delete this classroom post permanently?')) {
      await deleteClassroomPost(id);
      refreshAllData();
    }
  };

  // Achievement CRUD
  const handleAddAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!achTitle || !achDate) return;
    await createAchievement({
      title: achTitle,
      description: achDesc,
      date: achDate,
      category: achCategory,
      image_url: achImageUrl,
    });
    setAchTitle('');
    setAchDesc('');
    setAchDate('');
    setAchImageUrl('');
    refreshAllData();
  };

  const handleDeleteAch = async (id: string) => {
    if (window.confirm('Delete achievement?')) {
      await deleteAchievement(id);
      refreshAllData();
    }
  };

  // Certificate CRUD
  const handleAddCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certTitle || !certFileUrl) return;
    await createCertificate({
      title: certTitle,
      issuer: certIssuer,
      issue_date: certDate,
      description: certDesc,
      file_url: certFileUrl,
    });
    setCertTitle('');
    setCertIssuer('');
    setCertDate('');
    setCertDesc('');
    setCertFileUrl('');
    refreshAllData();
  };

  const handleDeleteCert = async (id: string) => {
    if (window.confirm('Delete certificate?')) {
      await deleteCertificate(id);
      refreshAllData();
    }
  };

  // UNAUTHENTICATED LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-academic-pattern flex items-center justify-center p-4">
        <div className="max-w-md w-full academic-card rounded-2xl p-8 space-y-6 relative border-gold/40 shadow-2xl">
          <BotanicalDecoration position="top-right" size={44} />

          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full border border-gold bg-cream-100 flex items-center justify-center text-gold font-serif font-bold text-xl mx-auto shadow-sm">
              IH
            </div>
            <h2 className="font-serif text-2xl font-bold text-charcoal">Teacher Portal Login</h2>
            <p className="text-xs uppercase tracking-widest text-gold font-semibold">Iqra Hasan CMS Dashboard</p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wider font-bold text-charcoal">
                Admin Email
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gold-subtle bg-cream-50 text-charcoal text-xs focus:ring-1 focus:ring-gold focus:border-gold"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wider font-bold text-charcoal">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gold-subtle bg-cream-50 text-charcoal text-xs focus:ring-1 focus:ring-gold focus:border-gold"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full border border-gold bg-gold text-cream-50 text-xs uppercase tracking-widest font-bold hover:bg-gold-dark transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Access CMS Dashboard</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link to="/" className="text-xs text-charcoal-muted hover:text-gold uppercase tracking-wider">
              ← Return to Portfolio Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const pendingTestimonialsCount = testimonials.filter(t => !t.approved).length;

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col text-charcoal font-sans">
      
      {/* Top Admin Header */}
      <header className="bg-cream-50 border-b border-gold-subtle px-6 py-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-gold bg-cream-100 flex items-center justify-center text-gold font-serif font-bold text-lg">
              IH
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg text-charcoal">IQRA HASAN — CMS PORTAL</h1>
              <p className="text-[10px] uppercase tracking-widest text-gold font-semibold">Teacher Management Console</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-subtle text-xs text-charcoal-medium hover:text-gold"
            >
              <Eye className="w-3.5 h-3.5 text-gold" />
              <span>View Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-red-200 bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-gold-subtle">
          {[
            { id: 'overview', label: 'Overview', icon: Shield },
            { id: 'testimonials', label: `Testimonials (${pendingTestimonialsCount} pending)`, icon: MessageSquare },
            { id: 'posts', label: `Classroom Moments (${posts.length})`, icon: Layers },
            { id: 'achievements', label: `Achievements (${achievements.length})`, icon: Award },
            { id: 'certificates', label: `Certificates (${certificates.length})`, icon: FileCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gold text-cream-50 shadow-sm'
                    : 'bg-cream-50 text-charcoal-medium border border-gold-subtle hover:bg-gold/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}

          <button
            onClick={refreshAllData}
            className="p-2.5 rounded-full bg-cream-50 border border-gold-subtle text-gold hover:bg-gold hover:text-cream-50 transition-colors ml-auto"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="academic-card rounded-2xl p-6 space-y-2">
                <div className="flex items-center justify-between text-gold">
                  <MessageSquare className="w-6 h-6" />
                  <span className="text-xs uppercase font-bold text-gold">{pendingTestimonialsCount} Pending</span>
                </div>
                <h3 className="font-serif text-3xl font-bold text-charcoal">{testimonials.length}</h3>
                <p className="text-xs uppercase tracking-wider text-charcoal-muted">Total Testimonials</p>
              </div>

              <div className="academic-card rounded-2xl p-6 space-y-2">
                <div className="flex items-center justify-between text-gold">
                  <Layers className="w-6 h-6" />
                  <span className="text-xs font-bold text-gold">Active</span>
                </div>
                <h3 className="font-serif text-3xl font-bold text-charcoal">{posts.length}</h3>
                <p className="text-xs uppercase tracking-wider text-charcoal-muted">Classroom Posts</p>
              </div>

              <div className="academic-card rounded-2xl p-6 space-y-2">
                <div className="flex items-center justify-between text-gold">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-charcoal">{achievements.length}</h3>
                <p className="text-xs uppercase tracking-wider text-charcoal-muted">Achievements</p>
              </div>

              <div className="academic-card rounded-2xl p-6 space-y-2">
                <div className="flex items-center justify-between text-gold">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-charcoal">{certificates.length}</h3>
                <p className="text-xs uppercase tracking-wider text-charcoal-muted">Certificates</p>
              </div>

            </div>

            {/* Recent Pending Moderation Box */}
            <div className="academic-card rounded-2xl p-8 space-y-4">
              <h3 className="font-serif text-xl font-bold text-charcoal">Pending Moderation Queue</h3>
              {pendingTestimonialsCount === 0 ? (
                <p className="text-xs text-charcoal-muted">No pending testimonials awaiting approval.</p>
              ) : (
                <div className="space-y-3">
                  {testimonials.filter(t => !t.approved).map((t) => (
                    <div key={t.id} className="p-4 rounded-xl bg-cream-50 border border-gold/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <span className="font-serif font-bold text-base text-charcoal">{t.name} ({t.rating}★)</span>
                        <p className="text-xs text-charcoal-medium italic">"{t.message}"</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApproveTestimonial(t.id)}
                          className="px-3 py-1.5 rounded-full bg-gold text-cream-50 text-xs font-bold flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(t.id)}
                          className="px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: TESTIMONIALS MODERATION */}
        {activeTab === 'testimonials' && (
          <div className="academic-card rounded-2xl p-8 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-charcoal">Manage & Moderate Testimonials</h3>
            <p className="text-xs text-charcoal-muted">Public visitors can submit testimonials, which require your approval to display on the live site.</p>

            <div className="space-y-4">
              {testimonials.map((t) => (
                <div key={t.id} className="p-5 rounded-xl bg-cream-50 border border-gold-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-serif font-bold text-lg text-charcoal">{t.name}</span>
                      <span className="text-xs uppercase font-bold text-gold">{t.role}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${t.approved ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {t.approved ? 'Approved' : 'Pending Approval'}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-medium italic">"{t.message}"</p>
                    <p className="text-[10px] text-charcoal-muted">{new Date(t.created_at).toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!t.approved ? (
                      <button
                        onClick={() => handleApproveTestimonial(t.id)}
                        className="px-3 py-1.5 rounded-full bg-gold text-cream-50 text-xs font-bold flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Approve
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRejectTestimonial(t.id)}
                        className="px-3 py-1.5 rounded-full bg-cream-200 text-charcoal-medium text-xs font-bold"
                      >
                        Unapprove
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteTestimonial(t.id)}
                      className="p-2 rounded-full text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CLASSROOM MOMENTS POSTS */}
        {activeTab === 'posts' && (
          <div className="space-y-8">
            {/* Create New Post Form */}
            <div className="academic-card rounded-2xl p-8 border-gold/40">
              <h3 className="font-serif text-2xl font-bold text-charcoal mb-4">Add New Classroom Moment</h3>
              <form onSubmit={handleAddPost} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs uppercase font-bold text-charcoal">Moment Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Science Experiment Demonstration"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold-subtle bg-cream-50 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs uppercase font-bold text-charcoal">Category</label>
                    <select
                      value={newPostCategory}
                      onChange={(e) => setNewPostCategory(e.target.value as MomentCategory)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold-subtle bg-cream-50 text-xs"
                    >
                      <option value="Classroom">Classroom</option>
                      <option value="Activities">Activities</option>
                      <option value="Events">Events</option>
                      <option value="Achievements">Achievements</option>
                      <option value="Student Work">Student Work</option>
                      <option value="School Moments">School Moments</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs uppercase font-bold text-charcoal">Caption & Details</label>
                  <textarea
                    rows={3}
                    placeholder="Describe the activity..."
                    value={newPostCaption}
                    onChange={(e) => setNewPostCaption(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gold-subtle bg-cream-50 text-xs resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs uppercase font-bold text-charcoal">Media Type</label>
                    <div className="flex items-center gap-4 pt-1 text-xs">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="mediaType"
                          checked={newPostMediaType === 'image'}
                          onChange={() => setNewPostMediaType('image')}
                        />
                        <span>Image</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="mediaType"
                          checked={newPostMediaType === 'video'}
                          onChange={() => setNewPostMediaType('video')}
                        />
                        <span>Video</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <MediaUploader
                      label="Classroom Moment Media"
                      value={newPostMediaUrl}
                      onChange={setNewPostMediaUrl}
                      accept={newPostMediaType === 'video' ? 'video/*' : 'image/*'}
                      optional={false}
                      helpText={newPostMediaType === 'video' ? 'Select video file from device' : 'Select classroom photo from device'}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-full border border-gold bg-gold text-cream-50 text-xs uppercase font-bold tracking-wider hover:bg-gold-dark transition-colors"
                >
                  Publish Moment
                </button>
              </form>
            </div>

            {/* List Existing Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((p) => (
                <div key={p.id} className="academic-card rounded-2xl p-4 flex gap-4 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={p.media_url} alt={p.title} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-serif font-bold text-base text-charcoal">{p.title}</h4>
                      <p className="text-xs text-gold uppercase">{p.category} • {p.media_type}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeletePost(p.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ACHIEVEMENTS */}
        {activeTab === 'achievements' && (
          <div className="space-y-8">
            <div className="academic-card rounded-2xl p-8 border-gold/40">
              <h3 className="font-serif text-2xl font-bold text-charcoal mb-4">Add Achievement</h3>
              <form onSubmit={handleAddAchievement} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Achievement Title"
                    value={achTitle}
                    onChange={(e) => setAchTitle(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-gold-subtle text-xs bg-cream-50"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Date (e.g. May 2025)"
                    value={achDate}
                    onChange={(e) => setAchDate(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-gold-subtle text-xs bg-cream-50"
                    required
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Description..."
                  value={achDesc}
                  onChange={(e) => setAchDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-subtle text-xs bg-cream-50 resize-none"
                />

                <MediaUploader
                  label="Achievement Image"
                  value={achImageUrl}
                  onChange={setAchImageUrl}
                  accept="image/*"
                  optional={true}
                  helpText="Upload an optional photo of the certificate, medal, or award"
                />

                <button type="submit" className="px-6 py-2.5 rounded-full bg-gold text-cream-50 text-xs font-bold uppercase">
                  Save Achievement
                </button>
              </form>
            </div>

            <div className="space-y-3">
              {achievements.map((a) => (
                <div key={a.id} className="academic-card rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-base">{a.title}</h4>
                    <p className="text-xs text-charcoal-medium">{a.description} ({a.date})</p>
                  </div>
                  <button onClick={() => handleDeleteAch(a.id)} className="text-red-600 p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div className="space-y-8">
            <div className="academic-card rounded-2xl p-8 border-gold/40">
              <h3 className="font-serif text-2xl font-bold text-charcoal mb-4">Add Certificate</h3>
              <form onSubmit={handleAddCertificate} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Certificate Title"
                    value={certTitle}
                    onChange={(e) => setCertTitle(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-gold-subtle text-xs bg-cream-50"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Issuing Authority"
                    value={certIssuer}
                    onChange={(e) => setCertIssuer(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-gold-subtle text-xs bg-cream-50"
                    required
                  />
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Issue Date (e.g. June 2025)"
                    value={certDate}
                    onChange={(e) => setCertDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gold-subtle text-xs bg-cream-50"
                  />
                  
                  <MediaUploader
                    label="Certificate File / Document"
                    value={certFileUrl}
                    onChange={setCertFileUrl}
                    accept="image/*,application/pdf"
                    optional={false}
                    helpText="Select certificate image or PDF document directly from your device"
                  />
                </div>
                <button type="submit" className="px-6 py-2.5 rounded-full bg-gold text-cream-50 text-xs font-bold uppercase">
                  Save Certificate
                </button>
              </form>
            </div>

            <div className="space-y-3">
              {certificates.map((c) => (
                <div key={c.id} className="academic-card rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-base">{c.title}</h4>
                    <p className="text-xs text-charcoal-medium">{c.issuer} — {c.issue_date}</p>
                  </div>
                  <button onClick={() => handleDeleteCert(c.id)} className="text-red-600 p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
