import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Upload, X, Loader2, Trash2 } from 'lucide-react';
// Local API usage replaces Firebase logic

interface Video {
  id?: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl?: string;
  createdAt?: any;
}

interface VideosProps {
  user: any | null;
  isAdmin: boolean;
}

export default function Videos({ user, isAdmin }: VideosProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ transferred: 0, total: 0, percentage: 0 });
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    file: null as File | null,
    thumbnailFile: null as File | null
  });

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.file || !newVideo.title || !newVideo.description) return;

    setIsUploading(true);
    setIsFinalizing(false);

    try {
      const formData = new FormData();
      formData.append('title', newVideo.title);
      formData.append('description', newVideo.description);
      formData.append('video', newVideo.file);
      if (newVideo.thumbnailFile) {
        formData.append('thumbnail', newVideo.thumbnailFile);
      }

      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      fetchVideos();
      setNewVideo({ title: '', description: '', file: null, thumbnailFile: null });
      setShowUploadModal(false);
    } catch (error) {
      console.error("Upload failed:", error);
      alert(error instanceof Error ? error.message : "Failed to upload video.");
    } finally {
      setIsUploading(false);
      setIsFinalizing(false);
    }
  };

  const handleDelete = async (videoId: string) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    
    try {
      const response = await fetch(`/api/videos/${videoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        fetchVideos();
      } else {
        alert("Failed to delete video.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete video.");
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const allVideos = videos;

  return (
    <section id="videos" className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Teaching Videos</h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          
          {isAdmin && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="mt-10 inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload New Video
            </button>
          )}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {allVideos.map((video, index) => (
            <motion.div
              key={video.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-[2rem] shadow-xl shadow-gray-100/50 border border-gray-50 overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-blue-100 transition-all group"
            >
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden mb-8 group">
                <video
                  className="w-full h-full object-cover"
                  controls
                  muted={false}
                  playsInline
                  autoPlay={false}
                  preload="metadata"
                  poster={video.thumbnailUrl || `https://picsum.photos/seed/vid${index}/800/450`}
                >
                  <source src={video.url} />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-blue-600/10 pointer-events-none group-hover:bg-transparent transition-colors" />
                
                {isAdmin && !video.id?.startsWith('static-') && (
                  <button
                    onClick={() => handleDelete(video.id!)}
                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                    title="Delete Video"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{video.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm flex-grow line-clamp-3">{video.description}</p>
              <div className="mt-6 pt-6 border-t border-gray-50 flex items-center text-blue-600 font-bold text-sm uppercase tracking-widest">
                <Play className="w-4 h-4 mr-2" /> Watch Lesson
              </div>
            </motion.div>
          ))}

          {allVideos.length === 0 && !isAdmin && (
            <div className="col-span-full text-center py-12 text-gray-400">
              <Play className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Teaching videos will appear here soon.</p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload Video</h3>
              
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Video Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    value={newVideo.description}
                    onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none h-24 resize-none"
                    placeholder="Brief description..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Video File</label>
                  <input
                    type="file"
                    accept="video/*"
                    required
                    onChange={(e) => setNewVideo({ ...newVideo, file: e.target.files?.[0] || null })}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewVideo({ ...newVideo, thumbnailFile: e.target.files?.[0] || null })}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{formatBytes(uploadProgress.transferred)} of {formatBytes(uploadProgress.total)}</span>
                      <span>{uploadProgress.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-blue-600 h-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress.percentage}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {isFinalizing ? 'Finalizing...' : 'Uploading...'}
                    </>
                  ) : (
                    'Start Upload'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
