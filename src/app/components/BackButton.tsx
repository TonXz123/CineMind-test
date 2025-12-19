'use client' // ต้องเป็น Client เพราะใช้พฤติกรรมของ Browser

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button 
      onClick={() => router.back()} 
      className="mb-6 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
    >
      <span>←</span> ย้อนกลับ
    </button>
  )
}