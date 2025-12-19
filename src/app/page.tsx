import React from 'react';
import SearchBox from './components/SearchBox';
import Arrange from './components/Arrange';
import Pagination from './components/Pagination'; // Import เข้ามา

// 1. แก้ไขให้รับพารามิเตอร์ page
async function getMovies(page: number) {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=th-TH&page=${page}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch movies');
  return res.json();
}

export default async function Home({ searchParams }: { searchParams: Promise<{ sort?: string, page?: string }> }) {
  // 2. ดึงค่าจาก searchParams
  const { sort, page } = await searchParams;
  const currentPage = Number(page) || 1;

  // 3. ส่งเลขหน้าไปดึงข้อมูล
  const data = await getMovies(currentPage);
  let movies = data.results;

  // Logic การจัดเรียงเดิม
  movies = [...movies].sort((a: any, b: any) => {
    if (sort === 'asc') return a.vote_average - b.vote_average;
    return b.vote_average - a.vote_average;
  });

  return (
    <main className="min-h-screen bg-black text-white p-8">
      {/* Header และ SearchBox/Arrange เดิม */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4">
          CineMind test
        </h1>
      </header>
      <div className="">
        <SearchBox />
      </div>
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-8">
        <Arrange />
      </div>

      {/* Grid แสดงหนัง */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {movies.map((movie: any) => (
          <div key={movie.id} className="group cursor-pointer bg-gray-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-cyan-500 transition-all shadow-lg">
             <img 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'} 
                alt={movie.title}
                className="w-full h-auto transform group-hover:scale-110 transition duration-500"
              />
              <div className="p-4">
                <h2 className="font-bold text-lg truncate mb-1">{movie.title}</h2>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-400 text-sm font-semibold">⭐ {movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
          </div>
        ))}
      </div>

      {/* 4. วางปุ่มเปลี่ยนหน้าไว้ที่ท้าย Grid */}
      <Pagination />
    </main>
  );
}