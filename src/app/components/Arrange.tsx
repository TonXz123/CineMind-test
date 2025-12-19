'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function Arrange() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // ดึงค่าปัจจุบันจาก URL ถ้าไม่มีให้เป็น 'desc' (มากไปน้อย)
  const currentSort = searchParams.get('sort') || 'desc'

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    // เปลี่ยน URL เป็น ?sort=... โดยไม่ทำให้หน้าเว็บรีโหลดใหม่ทั้งหมด
    router.push(`/?sort=${value}`)
  }

  return (
    <div className="flex items-center gap-2 mb-6 justify-end">
      <label className="text-sm text-gray-400">จัดเรียงตามคะแนน:</label>
      <select 
        value={currentSort}
        onChange={handleChange}
        className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-1 outline-none focus:ring-2 focus:ring-cyan-500"
      >
        <option value="desc">คะแนน: มาก → น้อย</option>
        <option value="asc">คะแนน: น้อย → มาก</option>
      </select>
    </div>
  )
}