export const dynamic = 'force-dynamic';
import React from 'react'
import BackButton from '../../components/BackButton';

// ใน Next.js 15 เราต้องประกาศ params เป็น Promise
export default async function SearchPage({ params }: { params: Promise<{ searchTerm: string }> }) {
  
  // 1. รอรับค่า searchTerm (สำคัญมากสำหรับ Next.js 15)
  const resolvedParams = await params;
  const searchTerm = resolvedParams.searchTerm;
  
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
  
  // 2. เรียก API (ใส่ query ให้ถูกต้อง)
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=th-TH`,
    { cache: 'no-store' } // ป้องกันการจำค่าเก่า
  )
  
  const data = await res.json()
  const movies = data.results

  return (
    <main className="p-8 bg-black min-h-screen text-white">
      {/* 3. ใช้ decodeURIComponent เพื่อให้อ่านภาษาไทยออก */}
      <h1 className="text-3xl mb-8">
        ผลการค้นหาสำหรับ: <span className="text-cyan-400">{decodeURIComponent(searchTerm)}</span>
      </h1>
        <BackButton />
      {movies && movies.length === 0 && (
        <div className="text-center py-20">
            <h2 className="text-xl text-gray-400">ไม่พบหนังที่ท่านค้นหา ลองพิมพ์ชื่อภาษาอังกฤษดูครับ</h2>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {movies?.map((movie: any) => (
          <div key={movie.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:scale-105 transition duration-300 shadow-lg">
            {movie.poster_path ? (
               <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            ) : (
               <div className="h-[300px] flex items-center justify-center bg-gray-800 italic text-gray-500">No Image</div>
            )}
            <div className="p-3 text-center text-sm font-semibold truncate">{movie.title}</div>
          </div>
        ))}
      </div>
    </main>
  )
}