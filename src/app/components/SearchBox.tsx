'use client' // ต้องมีบรรทัดนี้เพราะมีการใช้ช่อง Input (Client Side)

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchBox() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!search) return
    // เมื่อกด Enter จะเปลี่ยน URL ไปที่หน้า search เช่น /search/spiderman
    router.push(`/search/${search}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-8">
      <input
        type="text"
        placeholder="ค้นหาหนังที่น่าดู..."
        className="w-full max-w-md p-3 rounded-l-lg bg-gray-800 text-white border-none focus:ring-2 focus:ring-cyan-500 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button 
        type="submit" 
        className="bg-cyan-600 px-6 py-3 rounded-r-lg font-bold hover:bg-cyan-500 transition"
      >
        ค้นหา
      </button>
    </form>
  )
}