'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Pagination() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // ดึงหน้าปัจจุบันจาก URL
  const currentPage = Number(searchParams.get('page')) || 1
  const [inputPage, setInputPage] = useState(currentPage.toString())

  // อัปเดตตัวเลขในช่อง Input เมื่อ URL เปลี่ยน
  useEffect(() => {
    setInputPage(currentPage.toString())
  }, [currentPage])

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > 500) return // TMDB มักจะจำกัดที่ 500 หน้า
    
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/?${params.toString()}`)
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const num = parseInt(inputPage)
    if (!isNaN(num)) {
      handlePageChange(num)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 mt-12 mb-12">
      
      {/* ส่วนปุ่ม ย้อนกลับ - เลขหน้า - ถัดไป */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-800 hover:bg-cyan-600 disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition"
        >
          ← ก่อนหน้า
        </button>

        <div className="flex gap-2">
            {/* ปุ่มทางลัด (แสดงหน้าใกล้เคียง) */}
            {[currentPage - 1, currentPage, currentPage + 1].map((p) => {
                if (p < 1) return null;
                return (
                    <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        className={`w-10 h-10 rounded-full transition ${p === currentPage ? 'bg-cyan-600 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}
                    >
                        {p}
                    </button>
                )
            })}
        </div>

        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-gray-800 hover:bg-cyan-600 px-4 py-2 rounded-lg transition"
        >
          ถัดไป →
        </button>
      </div>

      {/* ส่วนกรอกเลขหน้าเอง */}
      <form onSubmit={handleInputSubmit} className="flex items-center gap-2">
        <span className="text-sm text-gray-400">ไปที่หน้า:</span>
        <input 
          type="number" 
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          className="w-16 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-center outline-none focus:border-cyan-500"
          min="1"
          max="500"
        />
        <button type="submit" className="text-sm bg-cyan-700 hover:bg-cyan-600 px-3 py-1 rounded">ตกลง</button>
      </form>

    </div>
  )
}