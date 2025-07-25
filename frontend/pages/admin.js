// // frontend/pages/admin.js
// import { useState } from 'react';
// import dynamic from 'next/dynamic';
// import axios from 'axios';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import ParticleBackground from '../components/ParticleBackground';


// export default function Admin() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [slug, setSlug] = useState('');
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [error, setError] = useState('');

//   if (status === 'loading') return <p className="text-center text-[#2C6CA4]">Loading...</p>;
//   if (!session) {
//     router.push('/login');
//     return null;
//   }

//   const generateSlug = title => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

//   const createPage = async () => {
//     try {
//       const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages`, {
//         slug: slug || generateSlug(title),
//         title,
//         content,
//       });
//       alert('Page created successfully!');
//       setSlug('');
//       setTitle('');
//       setContent('');
//       setError('');
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to create page');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col font-sans relative bg-[#E6F0FA] text-[#2C6CA4]">
//       <ParticleBackground selector=".main-content" />
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E6F0FA]/50 to-white/30 pointer-events-none z-0" />
//       <Header />
//       <main className="main-content flex-1 flex flex-col items-center justify-center px-5 sm:px-13 md:px-28 pt-20 pb-16 gap-12 z-10 text-center relative overflow-hidden">
//         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#2C6CA4]">Create New Page</h1>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <div className="max-w-4xl mx-auto w-full">
//           <div className="mb-4">
//             <label className="block mb-2 text-xl font-semibold text-[#2C6CA4]">Page Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={e => {
//                 setTitle(e.target.value);
//                 setSlug(generateSlug(e.target.value));
//               }}
//               placeholder="Enter title"
//               className="w-full p-2 border border-[#2C6CA4]/20 rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 text-xl font-semibold text-[#2C6CA4]">Page Slug</label>
//             <input
//               type="text"
//               value={slug}
//               onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
//               placeholder="Enter slug (e.g., about-us)"
//               className="w-full p-2 border border-[#2C6CA4]/20 rounded"
//             />
//           </div>
//           <div className="mb-12">
//             <label className="block mb-2 text-xl font-semibold text-[#2C6CA4]">Content</label>
//             <ReactQuill
//               value={content}
//               onChange={setContent}
//               modules={{
//                 toolbar: [
//                   [{ header: [1, 2, false] }],
//                   ['bold', 'italic', 'underline'],
//                   ['link', 'image'],
//                   [{ list: 'ordered' }, { list: 'bullet' }],
//                 ],
//               }}
//               className="h-64 bg-white rounded"
//             />
//           </div>
//           <button onClick={createPage} className="px-8 py-4 bg-[#3B5998] text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105">
//             Create Page
//           </button>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }