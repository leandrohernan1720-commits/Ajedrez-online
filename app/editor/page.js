'use client'
import { useState } from 'react'
const emptyBoard = Array(8).fill(null).map(()=>Array(8).fill(''))
const icons = {K:'♔',Q:'♕',R:'♖',B:'♗',N:'♘',P:'♙',k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'}
export default function Editor(){
  const [board,setBoard]=useState(emptyBoard)
  const [piece,setPiece]=useState('P')
  const [turnW,setTurnW]=useState(true)
  const [link,setLink]=useState('')
  const genLink = ()=>{
    const room = Math.random().toString(36).slice(2,8)
    const data = btoa(JSON.stringify({board, turnW}))
    const url = `${window.location.origin}/online/${room}?data=${data}`
    setLink(url)
  }
  return(
    <div className="flex flex-col items-center gap-3 p-3 min-h-screen bg-[#EEEED2]">
      <h1 className="font-bold">Editor - Armá la posición</h1>
      <div className="grid grid-cols-7 gap-1 bg-white p-2 rounded-xl border-2 border-black w-full max-w-[380px]">
        {['P','N','B','R','Q','K','p','n','b','r','q','k',''].map(p=><button key={p} onClick={()=>setPiece(p)} className={`h-8 border rounded ${piece===p?'bg-yellow-300':'bg-gray-100'}`}>{p?icons[p]:'X'}</button>)}
      </div>
      <select value={turnW?'w':'b'} onChange={e=>setTurnW(e.target.value==='w')} className="border-2 border-black rounded p-2 text-sm"><option value="w">Turno Blancas</option><option value="b">Turno Negras</option></select>
      <div className="w-full max-w-[380px] aspect-square bg-[#769656] p-1.5 rounded-xl border-2 border-black">
        <div className="grid grid-cols-8 w-full h-full">
          {board.map((row,r)=> row.map((_,c)=>{
            const isLight=(r+c)%2===0
            return(<div key={`${r}${c}`} onClick={()=>{ const nb=board.map(x=>[...x]); nb[r][c]=piece; setBoard(nb)}} className={`flex items-center justify-center text-[26px] ${isLight?'bg-[#EEEED2]':'bg-[#769656]'}`}>{icons[board[r][c]]||''}</div>)
          }))}
        </div>
      </div>
      <button onClick={genLink} className="bg-black text-white px-6 py-3 rounded-xl font-bold w-full max-w-[380px]">Generar link para alumno</button>
      {link && <div className="w-full max-w-[380px] bg-white p-3 rounded-xl border-2 border-black text-xs break-all">
        <p className="mb-2">{link}</p>
        <button onClick={()=>navigator.clipboard.writeText(link)} className="bg-green-600 text-white w-full py-2 rounded-xl font-bold">📋 Copiar</button>
      </div>}
      <button onClick={()=>setBoard(emptyBoard)} className="text-xs underline">Vaciar tablero</button>
    </div>
  )
}
