import { Sparkles, Heart, Star, Flower } from 'lucide-react';
import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './lib/firebase';

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'messages'), {
        name,
        message,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      alert('Gửi thành công nha!');
      setName('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Đã có lỗi xảy ra. Hãy thử lại nha!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-nunito relative bg-[#f4faff] flex flex-col items-center justify-start p-4 sm:p-8 overflow-x-hidden pb-32">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-caro-pattern z-0 pointer-events-none"></div>

      {/* Soft color blobs / clouds */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0 fixed">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#e2f1ff] rounded-full blur-[120px] opacity-80"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#e2f1ff] rounded-full blur-[120px] opacity-80"></div>
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-[#fff0f4] rounded-full blur-[100px] opacity-80"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] bg-[#fff0f4] rounded-full blur-[100px] opacity-80"></div>
      </div>

      <div className="relative z-10 w-full max-w-[750px] flex flex-col items-center mt-10 sm:mt-16">
        
        {/* Envelope Container */}
        <div className="relative w-full max-w-[600px] h-[260px] sm:h-[340px] mt-[260px] sm:mt-[360px] mb-8">
            
            {/* Top Flap (Open) */}
            <div 
              className="absolute bottom-[99%] inset-x-0 h-[220px] sm:h-[280px] bg-[#d994a5] rounded-t-2xl origin-bottom shadow-inner z-0"
              style={{ clipPath: 'polygon(50% 0, 0 100%, 100% 100%)' }}
            ></div>

            {/* Envelope Back/Inside */}
            <div className="absolute inset-x-0 bottom-0 top-[0px] bg-[#bf7284] rounded-b-xl shadow-2xl z-0 border border-[#a25d6b]"></div>

            {/* Letter / Paper */}
            <div className="absolute bottom-[90px] sm:bottom-[120px] left-1/2 -translate-x-1/2 w-[92%] sm:w-[500px] max-w-full bg-[#fffcf5] border-t border-l border-r border-[#e8dfc8] z-10 shadow-xl flex flex-col pt-5 sm:pt-6 px-5 sm:px-10 pb-[60px] sm:pb-[80px] rounded-t-xl transition-all">
                
                {/* Stamp & Decor */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 w-12 h-14 sm:w-14 sm:h-16 bg-[#e07a88] border-[3px] border-dashed border-white shadow-sm rotate-[-5deg] flex items-center justify-center opacity-90 z-20">
                  <span className="absolute top-1 left-1 text-white text-[10px] sm:text-xs font-bold">50</span>
                  <Flower className="text-white w-5 h-5 sm:w-6 sm:h-6 mt-1" />
                </div>
                
                <div className="absolute -top-3 right-4 sm:right-8 bg-[#f5ebe0] shadow-md transform rotate-[4deg] px-4 py-1.5 border border-[#e3d5ca] z-20">
                   <span className="font-serif text-[#cc3b4d] text-xs sm:text-sm font-semibold tracking-wider uppercase">To: Thùy Dung</span>
                </div>

                <div className="absolute -top-4 right-16 sm:right-22 text-lg rotate-45 text-[#e07a88] drop-shadow-sm z-30">📌</div>

                {/* Paper Content */}
                <div className="text-center mt-7 sm:mt-8 mb-5 sm:mb-6 relative z-10 w-full">
                  <div className="flex flex-col items-center gap-1 sm:gap-2">
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#92a8bc] mb-0 font-medium tracking-wide drop-shadow-sm uppercase">
                       Lưu bút của
                    </h2>
                    <h1 className="font-script text-[3.8rem] sm:text-[4.8rem] text-[#cc3b4d] leading-none drop-shadow-md mt-1 whitespace-nowrap">
                       Thùy Dung
                    </h1>
                  </div>
                </div>

                <form id="luubut-form" onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 relative z-20 w-full">
                   <div>
                      <label className="block font-serif text-[1.25rem] sm:text-[1.4rem] text-[#cc3b4d] mb-1 font-semibold tracking-wide">
                         Danh tính của bạn?
                      </label>
                      <div className="relative">
                         <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tên hoặc biệt danh nha..." 
                            className="w-full bg-transparent border-b-2 border-dashed border-[#e07a88]/40 text-gray-700 placeholder:text-gray-400 font-nunito text-base sm:text-lg px-2 py-2 focus:outline-none focus:border-[#cc3b4d] transition-all"
                         />
                         <Star className="absolute right-2 top-1/2 -translate-y-1/2 text-[#ffb5a7] w-5 h-5 stroke-[1.5] opacity-60 pointer-events-none" />
                      </div>
                   </div>

                   <div className="mt-1">
                      <label className="block font-serif text-[1.25rem] sm:text-[1.4rem] text-[#cc3b4d] mb-2 font-semibold tracking-wide">
                         Lời nhắn nhủ:
                      </label>
                      <div className="relative">
                         <textarea 
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Viết những lời mún nói với Tdung vào đây nè..." 
                            rows={4}
                            className="w-full bg-transparent border-b-2 border-dashed border-[#e07a88]/40 text-gray-700 placeholder:text-gray-400 font-nunito text-base sm:text-lg px-2 py-2 focus:outline-none focus:border-[#cc3b4d] transition-all resize-none"
                         ></textarea>
                         <Star className="absolute right-2 top-1/2 -translate-y-1/2 text-[#ffb5a7] w-5 h-5 stroke-[1.5] opacity-60 pointer-events-none" />
                      </div>
                   </div>
                </form>
            </div>

            {/* Envelope Front Flaps */}
            <div className="absolute inset-0 z-30 pointer-events-none rounded-b-xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.15)]">
                <div className="absolute inset-y-0 left-0 w-[51.5%] bg-[#efb2bf]" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)', filter: 'drop-shadow(2px 0px 5px rgba(0,0,0,0.15))' }}></div>
                <div className="absolute inset-y-0 right-0 w-[51.5%] bg-[#efb2bf]" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)', filter: 'drop-shadow(-2px 0px 5px rgba(0,0,0,0.15))' }}></div>
                <div className="absolute bottom-0 inset-x-0 h-[65%] bg-[#f7c2cd] flex flex-col items-center justify-end pb-8" style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', filter: 'drop-shadow(0 -4px 8px rgba(0,0,0,0.2))' }}>
                </div>

                {/* Wax seal */}
                <div className="absolute top-[50%] sm:top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-auto">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#c44e64] rounded-full flex items-center justify-center shadow-lg relative before:content-[''] before:absolute before:-inset-1.5 before:bg-[#b03d52] before:rounded-full before:z-[-1] before:opacity-60 blur-[0.3px] hover:scale-105 transition-transform duration-300">
                      <Flower className="w-6 h-6 sm:w-7 sm:h-7 text-[#fed7df] opacity-90 fill-current" />
                    </div>
                </div>
            </div>

            {/* Fun stickers ON the envelope */}
            <div className="absolute bottom-[10%] left-[8%] text-3xl opacity-90 drop-shadow-md -rotate-12 z-40 pointer-events-none sticker-float-2">🌸</div>
            <div className="absolute bottom-[20%] right-[10%] text-3xl opacity-90 drop-shadow-md rotate-12 z-40 pointer-events-none sticker-float-1">💖</div>
            <div className="absolute top-[60%] left-[25%] text-2xl drop-shadow-md -rotate-12 z-40 pointer-events-none sticker-float-3">✨</div>
        </div>

        {/* Submit Button */}
        <div className="relative z-50 flex justify-center w-full mt-4 sm:mt-10">
            <button 
               type="submit"
               form="luubut-form"
               disabled={isSubmitting}
               className="group bg-gradient-to-r from-[#ffb5a7] to-[#fca3b7] text-white font-serif text-[1.4rem] sm:text-[1.6rem] px-12 sm:px-16 py-4 sm:py-5 rounded-full shadow-[0_12px_30px_rgba(255,181,167,0.5)] flex items-center justify-center gap-3 hover:scale-[1.03] active:scale-[0.97] transition-all whitespace-nowrap border-4 border-white cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
               <span className="pb-1 font-bold tracking-wide drop-shadow-sm">{submitted ? 'Đã Gửi Thành Công! 🎀' : isSubmitting ? 'Đang Gửi...' : 'Gửi Lời Chúc'}</span>
               <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-current opacity-90 group-hover:scale-125 transition-transform drop-shadow-md" />
            </button>
        </div>

        {/* Background ambient stickers OUTSIDE envelope */}
        <div className="fixed top-[15%] left-[5%] sm:left-[15%] z-0 text-5xl sticker-float-1 drop-shadow-md pointer-events-none">🌸</div>
        <div className="fixed top-[25%] right-[5%] sm:right-[15%] z-0 text-4xl sticker-float-2 drop-shadow-md pointer-events-none">🎀</div>
        <div className="fixed bottom-[15%] left-[10%] sm:left-[20%] z-0 text-5xl sticker-float-3 drop-shadow-lg pointer-events-none">🧸</div>
        <div className="fixed bottom-[20%] right-[10%] sm:right-[20%] z-0 text-4xl sticker-float-1 drop-shadow-lg pointer-events-none">🌷</div>
      </div>
    </div>
  );
}
