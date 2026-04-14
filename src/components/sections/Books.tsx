import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book as BookIcon, Upload, X, Loader2, FileText, Download, Trash2, Lock } from 'lucide-react';
// Local API usage replaces Firebase logic

interface Book {
  id: string;
  title: string;
  description: string;
  url: string;
  downloads: number;
  createdAt: string;
}

interface BooksProps {
  user: any | null;
  isAdmin: boolean;
}

export default function Books({ user, isAdmin }: BooksProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ transferred: 0, total: 0, percentage: 0 });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [newBook, setNewBook] = useState({
    title: '',
    description: '',
    file: null as File | null
  });

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.file || !newBook.title || !newBook.description) return;

    setIsUploading(true);
    setIsFinalizing(false);

    try {
      const formData = new FormData();
      formData.append('title', newBook.title);
      formData.append('description', newBook.description);
      formData.append('image', newBook.file);

      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      fetchBooks();
      setNewBook({ title: '', description: '', file: null });
      setShowUploadModal(false);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload book.");
    } finally {
      setIsUploading(false);
      setIsFinalizing(false);
    }
  };

  const handleDelete = async (bookId: string) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        fetchBooks();
      } else {
        alert("Failed to delete book.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete book.");
    }
  };

  const handleDownload = async (book: Book) => {
    try {
      await fetch(`/api/books/${book.id}/download`, { method: 'POST' });
      fetchBooks();
      // Open in new tab for download
      window.open(book.url, '_blank');
    } catch (error) {
      console.error("Download tracking failed:", error);
      window.open(book.url, '_blank');
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <section id="books" className="py-10 px-4 sm:px-6 lg:px-8 bg-blue-50/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Subject Books & Study Material</h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-8"></div>
          
          {isAdmin && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload New Book
            </button>
          )}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {books.map((book, index) => (
            <motion.div
              key={book.id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-100/50 border border-gray-50 flex flex-col hover:shadow-2xl hover:shadow-blue-100 transition-all group"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-6 relative">
                  <FileText className="w-8 h-8" />
                  {isAdmin && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(book.id!);
                      }}
                      className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                      title="Delete Book"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Downloads</span>
                  <span className="text-2xl font-black text-blue-600">{book.downloads || 0}</span>
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{book.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm flex-grow mb-8 line-clamp-3">{book.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedBook(book)}
                  className="inline-flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  See PDF
                </button>
                <button
                  onClick={() => handleDownload(book)}
                  className="inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </button>
              </div>
            </motion.div>
          ))}
          
          {books.length === 0 && !isAdmin && (
            <div className="col-span-full text-center py-12 text-gray-500">
              <BookIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No books uploaded yet. Check back soon!</p>
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
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload Subject Book</h3>
              
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                  <input
                    type="text"
                    required
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="e.g. Class 12 Physics Part 1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    value={newBook.description}
                    onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none h-24 resize-none"
                    placeholder="Briefly describe the book content..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PDF File</label>
                  <input
                    type="file"
                    accept=".pdf"
                    required
                    onChange={(e) => setNewBook({ ...newBook, file: e.target.files?.[0] || null })}
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
                      {isFinalizing ? 'Finalizing...' : 'Uploading Book...'}
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

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-white rounded-[2rem] w-full max-w-5xl h-[85vh] overflow-hidden relative shadow-2xl"
            >
              <div className="absolute top-6 right-6 z-[60] flex gap-4">
                <button
                  onClick={() => handleDownload(selectedBook)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Free Download
                </button>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="p-2 bg-gray-200/50 hover:bg-gray-200 text-gray-900 rounded-full transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="w-full h-full relative">
                <iframe
                  src={selectedBook.url}
                  className="w-full h-full border-none"
                  title={selectedBook.title}
                />
                
                {/* 75% Blur Overlay */}
                <div className="absolute inset-0 top-[25%] bg-white/30 backdrop-blur-[12px] flex flex-col items-center justify-center p-8 text-center pointer-events-none z-[55]">
                  <div className="max-w-md pointer-events-auto">
                    <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                      <Lock className="w-10 h-10" />
                    </div>
                    <h4 className="text-3xl font-black text-gray-900 mb-4">Content Locked</h4>
                    <p className="text-gray-700 font-medium mb-8">
                      You are viewing a free preview. Download the full PDF to access all {selectedBook.title} material.
                    </p>
                    <button
                      onClick={() => handleDownload(selectedBook)}
                      className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xl shadow-xl hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95"
                    >
                      <Download className="w-6 h-6 mr-3" />
                      Download Full PDF
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Support Icons
