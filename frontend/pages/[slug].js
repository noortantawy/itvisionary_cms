// frontend/pages/[slug].js
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages/${params.slug}`);
    const page = await res.json();
    if (!page || page.error) {
      return { notFound: true };
    }
    return { props: { page }, revalidate: 10 };
  } catch (err) {
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages`);
    const pages = await res.json();
    const paths = pages.map(page => ({ params: { slug: page.slug } }));
    const staticPages = ['about', 'services', 'products', 'partners', 'contact', 'blog']; // Exclude static routes
    return { paths: paths.filter(path => !staticPages.includes(path.params.slug)), fallback: 'blocking' };
  } catch (err) {
    return { paths: [], fallback: 'blocking' };
  }
}

export default function Page({ page }) {
  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-[#E6F0FA] text-[#2C6CA4]">
      <ParticleBackground selector=".main-content" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E6F0FA]/50 to-white/30 pointer-events-none z-0" />
      <Header />
      <main className="main-content flex-1 flex flex-col items-center justify-center px-5 sm:px-13 md:px-28 pt-20 pb-16 gap-12 z-10 text-center relative overflow-hidden">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#2C6CA4]">{page.title}</h1>
        <div className="max-w-4xl mx-auto text-[#2C6CA4]/80 text-lg" dangerouslySetInnerHTML={{ __html: page.content }} />
      </main>
      <Footer />
    </div>
  );
}