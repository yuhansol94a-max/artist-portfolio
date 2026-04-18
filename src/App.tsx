import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';

type Language = 'jp' | 'ko';

interface TextContent {
  jp: string;
  ko: string;
}

const content = {
  jobTitle: { jp: "ヘアメイクアップ\nアーティスト", ko: "헤어메이크업\n아티스트" },
  careerLabel: { jp: "[ 経歴 / Career ]", ko: "[ 경력 / Career ]" },
  careerItems: [
    { jp: "2020–2022 放送局メイクルームデザイナー", ko: "2020–2022 방송국 메이크룸 디자이너" },
    { jp: "舞台メイク、韓国舞踊メイク 専門家", ko: "무대메이크, 한국무용 메이크업 전문가" },
    { jp: "国家技術資格 美容師（メイクアップ）免許取得", ko: "국가기술자격 미용사(메이크업) 면허 취득" }
  ],
  expertiseLabel: { jp: "[ 活動分野 / Areas of Expertise ]", ko: "[ 활동분야 / Areas of Expertise ]" },
  expertiseItems: [
    { jp: "ビューティー・ヘアメイク", ko: "뷰티・헤어메이크업" },
    { jp: "ウェディング", ko: "웨딩" },
    { jp: "TV番組・放送", ko: "TV프로그램・방송" },
    { jp: "広告、ルックブック、スチール撮影", ko: "광고, 룩북, 스틸 촬영" },
    { jp: "雑誌、ソウルファッションウィーク", ko: "잡지, 서울패션위크" },
    { jp: "ドラマ、ミュージカル", ko: "드라마, 뮤지컬" },
    { jp: "舞台メイク、公演メイク", ko: "무대메이크, 공연 메이크업" }
  ],
  brandPortfolioTitle: { jp: "Brand Portfolio / プロジェクト実績", ko: "Brand Portfolio / 프로젝트" },
  brands: ["NATURE REPUBLIC", "LUNA", "YUHAN beauty care", "INGA", "GASH", "CHARDE"],
  galleryLabels: {
    slide3: { jp: "", ko: "" },
    slide4: { jp: "", ko: "" },
    slide5: { jp: "", ko: "" },
    slide6: { jp: "", ko: "" },
    slide7: { jp: "", ko: "" },
    slide8: { jp: "", ko: "" }
  },
  bridalPortfolioSubtitle: { jp: "ウェディング・ブライダル実績", ko: "웨딩・브라이덜" },
  broadcastingTitle: { jp: "Entertainment & Broadcasting", ko: "Entertainment & Broadcasting" },
  broadcastingSub: { jp: "主要放送", ko: "주요 방송" },
  editorialTitle: { jp: "Artist & Celebrity Editorial", ko: "Artist & Celebrity Editorial" },
  editorialSub: { jp: "雑誌エディトリアル", ko: "잡지 에디토리얼" },
  musicalTitle: { jp: "Musical", ko: "뮤지컬" },
  fashionCollectionsTitle: { jp: "Fashion Week & Runway Collections", ko: "패션위크 & 런웨이 컬렉션" },
  weddingYuha: { jp: "YUHA haus", ko: "YUHA haus" },
  weddingAnother: { jp: "ANOTHERDAY", ko: "ANOTHERDAY" },
  dramaTitle: { jp: "Drama & Filmography", ko: "Drama & Filmography" },
  fashionWeekTitle: { jp: "Seoul Fashion Week", ko: "Seoul Fashion Week" }
};

const brandLinks: Record<string, string> = {
  "NATURE REPUBLIC": "https://naturerepublic.co.jp/",
  "LUNA": "https://www.qoo10.jp/shop/akbeauty",
  "YUHAN beauty care": "https://yuhanbeautycare.co.kr/",
  "INGA": "https://www.qoo10.jp/shop/inga_official",
  "GASH": "https://www.qoo10.jp/shop/gashofficial",
  "CHARDE": "https://www.qoo10.jp/shop/chard_official"
};

export default function App() {
  const [lang, setLang] = useState<Language>('jp');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const t = (item: TextContent) => (lang === 'jp' ? item.jp : item.ko);

  const MobileImageStack = ({ 
    images, 
    objectFit = 'cover', 
    backgroundColor = '#F5F3EF' 
  }: { 
    images: string[], 
    objectFit?: 'cover' | 'contain', 
    backgroundColor?: string 
  }) => {
    const [index, setIndex] = useState(0);
    const [exitX, setExitX] = useState<number | string>(0);

    const handleDragEnd = (_: any, info: any) => {
      if (info.offset.x < -100) {
        setExitX(-400);
        setIndex((prev) => (prev + 1) % images.length);
      } else {
        setExitX(0);
      }
    };

    const currentIndex = index % images.length;
    const nextIndex = (index + 1) % images.length;

    return (
      <div
        className="relative w-full h-[55vh] flex items-center justify-center select-none overflow-visible pt-4"
      >
        <AnimatePresence mode="popLayout">
          {/* Back Card (Visual hint) */}
          <motion.div
            key={`back-${images[nextIndex]}`}
            initial={{ opacity: 0, scale: 0.9, x: 20, y: 10 }}
            animate={{ opacity: 0.3, scale: 0.95, x: 10, y: 0 }}
            className="absolute w-[80%] h-full rounded-2xl shadow-sm border border-black/5 pointer-events-none"
            style={{ backgroundColor: '#E0DED7', zIndex: 0 }}
          >
             <img src={images[nextIndex]} alt="" className={`w-full h-full ${objectFit === 'cover' ? 'object-cover' : 'object-contain'} grayscale opacity-40`} />
          </motion.div>

          {/* Front Card (Draggable) */}
          <motion.div
            key={`front-${images[currentIndex]}`}
            initial={{ x: 0, rotate: 0, opacity: 1, scale: 1 }}
            animate={{ x: 0, rotate: 0, opacity: 1, scale: 1 }}
            exit={{ x: -500, rotate: -25, opacity: 0, transition: { duration: 0.5, ease: "anticipate" } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="absolute w-[80%] h-full rounded-2xl shadow-2xl overflow-hidden border border-black/10 cursor-grab active:cursor-grabbing"
            style={{ backgroundColor, zIndex: 10 }}
          >
            <img 
              src={images[currentIndex]} 
              alt="" 
              className={`w-full h-full ${objectFit === 'cover' ? 'object-cover' : 'object-contain'}`}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Indicator Pill */}
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
           <div className="bg-charcoal/5 backdrop-blur-sm px-4 py-1.5 rounded-full border border-black/[0.03]">
              <span className="text-[10px] font-bold tracking-[0.4em] text-charcoal/50">
                 {currentIndex + 1} / {images.length}
              </span>
           </div>
           <div className="flex gap-1.5">
              {images.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-charcoal w-4' : 'bg-charcoal/10 w-1'}`} />
              ))}
           </div>
        </div>
      </div>
    );
  };

  const getGalleryLink = (num: number) => {
    if (num === 3) return "https://finv.co.kr/";
    if (num === 5) return "https://naturerepublic.co.jp/";
    return null;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, clientHeight } = scrollContainerRef.current;
        const index = Math.round(scrollTop / clientHeight);
        setCurrentSlide(index);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Language Toggle */}
      <div className="fixed bottom-0 left-0 right-0 p-8 flex justify-center z-[9999] pointer-events-none">
        <div className="pointer-events-auto flex gap-1.5 bg-white/10 backdrop-blur-md p-1 rounded-full shadow-xl border border-white/20">
          <button
            onClick={() => setLang('jp')}
            className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider transition-all duration-300 ${lang === 'jp' ? 'bg-white text-charcoal shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
          >
            JP
          </button>
          <button
            onClick={() => setLang('ko')}
            className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider transition-all duration-300 ${lang === 'ko' ? 'bg-white text-charcoal shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
          >
            한국어
          </button>
        </div>
      </div>

      {/* Slide 1 Mobile vs Desktop Logic */}
      <style>{`
        @media (max-width: 767px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
        }
        @media (min-width: 768px) {
          .desktop-only { display: flex !important; }
          .mobile-only { display: none !important; }
        }
      `}</style>
      
      {/* Sticky Background for Slide 1-2 only - Restricted scope */}
      <div className="absolute top-0 left-0 w-full h-[calc(200vh-1px)] mobile-only z-0 pointer-events-none overflow-hidden">
        <div className="sticky top-0 w-full h-[100vh] overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full"
          >
            <img src="./images/1-1.png" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-base/10 to-bg-base/40" />
          </motion.div>
        </div>
      </div>

      <main
        ref={scrollContainerRef}
        className="snap-y snap-mandatory h-screen overflow-y-auto overflow-x-hidden scroll-smooth relative z-10"
      >
        {/* Slide 1 - Mobile Hero (Mobile Only) */}
        <section key="mobile-hero" className="snap-start w-full h-full mobile-only flex flex-col items-center justify-end pb-24 px-6 bg-transparent relative">
          <div className="relative z-10 text-center w-full">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-serif font-light whitespace-pre-line leading-[1.1] tracking-tighter"
              style={{ color: '#C4956A', textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}
            >
              Makeup Artist
            </motion.h1>
          </div>
        </section>

        {/* Slide 1 - Mobile Info (Mobile Only) */}
        <section key="mobile-info" className="snap-start w-full h-full mobile-only flex flex-col justify-center px-6 pt-12 pb-28 bg-transparent gap-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold block mb-4">
              {t(content.careerLabel)}
            </span>
            <ul className="space-y-4">
              {content.careerItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-base leading-relaxed text-charcoal font-medium"
                >
                  {t(item)}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-10 border-t border-charcoal/10"
          >
            <p className="text-[10px] tracking-[0.3em] text-charcoal/50 mb-6 uppercase block font-bold">
              {t(content.expertiseLabel)}
            </p>
            <div className="grid grid-cols-1 gap-y-3">
              {content.expertiseItems.map((item, idx) => (
                <div key={idx} className="text-sm tracking-widest text-charcoal/90 font-sans leading-relaxed">
                  {t(item)}
                </div>
              ))}
            </div>
          </motion.div>
        </section>


        {/* Slide 1 - Desktop Profile (Desktop Only) */}
        <section key="desktop-profile" className="snap-start w-full h-full desktop-only flex-row p-16 pb-28 gap-10 bg-bg-base">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-auto h-full rounded-sm relative shadow-[20px_20px_60px_rgba(0,0,0,0.03)] border border-white/20 overflow-hidden"
          >
            <img
              src="./images/1-1.png"
              alt="Artist Portrait"
              className="w-auto h-full object-contain block"
            />
          </motion.div>
          <div className="flex-1 flex flex-col justify-center max-w-2xl gap-y-12 md:gap-y-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-charcoal border-b border-charcoal/20 pb-4 inline-block w-fit whitespace-pre-line"
            >
              {t(content.jobTitle)}
            </motion.h1>

            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold block mb-4">
                {t(content.careerLabel)}
              </span>
              <ul className="space-y-3">
                {content.careerItems.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-base md:text-lg lg:text-[19px] leading-relaxed text-charcoal/90"
                  >
                    {t(item)}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="pt-10 border-t border-charcoal/10 w-full">
              <p className="text-[10px] tracking-[0.3em] text-charcoal/40 mb-6 uppercase">
                {t(content.expertiseLabel)}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12">
                {content.expertiseItems.map((item, idx) => (
                  <div key={idx} className="text-sm md:text-base lg:text-[17px] tracking-widest text-charcoal/80 font-sans whitespace-nowrap leading-relaxed">
                    {t(item)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Slide 2 - Brand Portfolio */}
        <section className="snap-start w-full h-full flex flex-col items-center justify-center px-16 pt-16 pb-28 bg-[#F5F3EF] relative z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-16"
          >
            {t(content.brandPortfolioTitle)}
          </motion.h2>
          <div className="flex flex-col items-center gap-6">
            {content.brands.map((brand, i) => (
              <motion.a
                key={brand}
                href={brandLinks[brand]}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ opacity: 0.5 }}
                transition={{ delay: i * 0.1 }}
                className={`text-4xl md:text-6xl tracking-[0.2em] transition-opacity cursor-pointer text-center ${i % 2 === 0 ? 'font-serif italic opacity-80' : 'font-sans font-extralight uppercase'
                  }`}
              >
                {brand}
              </motion.a>
            ))}
          </div>
        </section>

        {/* Slides 3-8 (Work Galleries) */}
        {[3, 4, 5, 6, 7, 8].map((num) => (
          <section
            key={num}
            className={`snap-start w-full h-full overflow-hidden ${num === 6
                ? 'bg-[#F5F3EF]'
                : num === 7
                  ? ''
                  : 'flex flex-col px-6 md:px-16 pt-20 pb-28 bg-bg-base'
              }`}
            style={num === 7 ? { background: '#F5F3EF', padding: '60px 24px 112px 24px' } : undefined}
          >
            {/* Slides 3, 5 */}
            {(num === 3 || num === 5) && (
              <div className="flex-1 h-full">
                <div className="hidden md:grid grid-cols-3 gap-8 h-full">
                  {[1, 2, 3].map((img) => (
                    <div
                      key={img}
                      className="bg-gray-200 rounded-sm shadow-sm flex items-center justify-center border border-black/5 overflow-hidden"
                    >
                      <img
                        src={`./images/${num}-${img}.png`}
                        alt=""
                        className={`slide${num}-img${img} w-full h-full object-cover`}
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
                <div className="md:hidden flex h-full items-center">
                  <MobileImageStack images={[1, 2, 3].map(i => `./images/${num}-${i}.png`)} />
                </div>
              </div>
            )}

            {/* Slide 4 (LUNA) - Custom aspect-ratio preservation */}
            {num === 4 && (
              <div className="flex-1 h-full min-h-0">
                <div className="hidden md:grid grid-cols-3 gap-8 h-full items-center justify-center">
                  {[1, 2, 3].map((img) => (
                    <div
                      key={img}
                      className="flex-1 h-full min-h-0 bg-[#F5F3EF] overflow-hidden flex items-center justify-center"
                    >
                      <img
                        src={`./images/4-${img}.png`}
                        alt=""
                        className={`slide4-img${img} max-w-full max-h-full object-contain block`}
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
                <div className="md:hidden flex h-full items-center">
                  <MobileImageStack images={[1, 2, 3].map(i => `./images/4-${i}.png`)} objectFit="contain" />
                </div>
              </div>
            )}

            {num === 6 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', padding: 0, backgroundColor: '#F5F3EF' }}>
                <img
                  src="./images/6-1.png"
                  alt="Yuhan Beauty Care Campaign"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    backgroundColor: '#F5F3EF'
                  }}
                />
              </div>
            )}

            {num === 7 && (
              <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', gap: '12px' }}>
                {/* Left column: 35%, 2 stacked images */}
                <div style={{ width: '35%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <img src="./images/7-1.png" alt="" className="slide7-img1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} referrerPolicy="no-referrer" />
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <img src="./images/7-2.png" alt="" className="slide7-img2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} referrerPolicy="no-referrer" />
                  </div>
                </div>
                {/* Center column: 38%, full height */}
                <div style={{ width: '38%', overflow: 'hidden' }}>
                  <img src="./images/7-3.png" alt="" className="slide7-img3" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} referrerPolicy="no-referrer" />
                </div>
                {/* Right column: 27%, full height */}
                <div style={{ width: '27%', overflow: 'hidden' }}>
                  <img src="./images/7-4.png" alt="" className="slide7-img4" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} referrerPolicy="no-referrer" />
                </div>
              </div>
            )}

            {num === 8 && (
              <div className="flex-1 h-full">
                <div className="hidden md:grid grid-cols-3 gap-10 h-full">
                  {[1, 2, 3].map((img) => (
                    <div
                      key={img}
                      className="aspect-[3/4] md:aspect-auto h-full bg-gray-200 rounded-sm shadow-sm flex items-center justify-center border border-black/5 overflow-hidden"
                    >
                      <img
                        src={`./images/8-${img}.png`}
                        alt=""
                        className={`slide8-img${img} w-full h-full object-cover`}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
                <div className="md:hidden flex h-full items-center">
                  <MobileImageStack images={[1, 2, 3].map(i => `./images/8-${i}.png`)} />
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Slide 9 - Bridal Styling Portfolio Logo List */}
        <section key={9} className="snap-start w-full h-full flex flex-col items-center px-6 md:px-16 pt-24 pb-28 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-10 shrink-0"
          >
            <h2 className="text-2xl md:text-4xl font-serif text-charcoal mb-4">Bridal Styling Portfolio</h2>
            <p className="text-sm font-sans tracking-wider text-charcoal/60">{t(content.bridalPortfolioSubtitle)}</p>
          </motion.div>
          
          <div className="flex flex-col items-center gap-y-6 w-full max-w-2xl flex-1 justify-center pt-4 overflow-y-auto no-scrollbar">
            {[
              { id: 1, name: "KO JI HYEONG WEDDING", url: "https://www.instagram.com/jeju__kojihyeong_wedding/", h: "h-10 md:h-14" },
              { id: 2, name: "ARHA", url: "https://www.instagram.com/arha__review/", h: "h-10 md:h-12" },
              { id: 3, name: "ISLA", url: "https://www.instagram.com/isla_official___/", h: "h-10 md:h-12" },
              { id: 4, name: "ANOTHERDAY", url: "https://www.instagram.com/anotherday_official/", h: "h-10 md:h-12" },
              { id: 5, name: "YUHA haus", url: "https://www.instagram.com/yuha_haus/", h: "h-10 md:h-14" }
            ].map((brand, i) => (
              <motion.a
                key={brand.id}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
                className="block hover:opacity-50 transition-opacity duration-200 bg-transparent"
              >
                <img src={`./images/9-${brand.id}.png`} alt={brand.name} className={`${brand.h} w-auto object-contain mx-auto pointer-events-none`} referrerPolicy="no-referrer" />
              </motion.a>
            ))}
          </div>
        </section>

        {/* Slide 10 - YUHA haus (Page 10) */}
        <section key={10} className="snap-start w-full h-full flex flex-col px-6 md:px-16 pt-20 pb-28 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-6 shrink-0"
          >
            <img src="./images/9-5.png" alt="YUHA haus" className="h-14 md:h-20 w-auto object-contain mx-auto pointer-events-none max-w-full" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="flex-1 min-h-0 pb-4 md:pb-0">
            <div className="hidden md:flex flex-row items-center justify-center gap-6 h-full overflow-hidden">
              {[1, 2, 3].map((img, i) => (
                <motion.div 
                  key={img} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + (i * 0.1) }}
                  className="flex-1 w-full md:w-auto bg-[#F5F3EF] overflow-hidden"
                >
                  <img src={`./images/10-${img}.png`} alt="" className={`yuha-img${img} w-full h-auto max-h-[60vh] md:max-h-[70vh] object-contain block`} referrerPolicy="no-referrer" />
                </motion.div>
              ))}
            </div>
            <div className="md:hidden flex h-full items-center">
              <MobileImageStack images={[1, 2, 3].map(i => `./images/10-${i}.png`)} objectFit="contain" />
            </div>
          </div>
        </section>

        {/* Slide 11 - ANOTHERDAY A (Page 11) */}
        <section key={11} className="snap-start w-full h-full flex flex-col px-6 md:px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-6 shrink-0"
          >
            <img src="./images/9-4.png" alt="ANOTHERDAY" className="h-10 md:h-12 w-auto object-contain mx-auto pointer-events-none max-w-full" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="flex-1 min-h-0 pb-4 md:pb-0">
            <div className="hidden md:flex flex-row items-center justify-center gap-4 md:gap-6 h-full overflow-hidden">
              {[1, 2, 3, 4].map((img, i) => (
                <motion.div 
                  key={img} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + (i * 0.1) }}
                  className="flex-none w-full sm:w-[calc(50%-1rem)] md:flex-1 md:w-auto bg-[#F5F3EF] overflow-hidden"
                >
                  <img src={`./images/11-${img}.png`} alt="" className={`anotherday1-img${img} w-full h-auto max-h-[50vh] md:max-h-[60vh] object-contain block`} referrerPolicy="no-referrer" />
                </motion.div>
              ))}
            </div>
            <div className="md:hidden flex h-full items-center">
              <MobileImageStack images={[1, 2, 3, 4].map(i => `./images/11-${i}.png`)} objectFit="contain" />
            </div>
          </div>
        </section>

        {/* Slide 12 - ANOTHERDAY B (Page 12) */}
        <section key={12} className="snap-start w-full h-full flex flex-col px-6 md:px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8 shrink-0"
          >
            <img src="./images/9-4.png" alt="ANOTHERDAY" className="h-10 md:h-12 w-auto object-contain mx-auto pointer-events-none max-w-full" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="flex-1 min-h-0 pb-4 md:pb-0 md:pt-4 md:px-2">
            <div className="hidden md:flex flex-row items-center justify-center gap-6 md:gap-8 h-full">
              {[1, 2, 3].map((img, i) => (
                <motion.div 
                  key={img}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + (i * 0.1) }}
                  className={`flex-1 w-full md:w-auto overflow-hidden bg-[#F5F3EF] ${img === 2 ? 'scale-[1.02] md:scale-y-105 shadow-xl z-10 relative' : ''}`}
                >
                  <img 
                    src={`./images/12-${img}.png`} 
                    alt="" 
                    className={`anotherday2-img${img} w-full h-auto ${img === 2 ? 'max-h-[55vh] md:max-h-[70vh]' : 'max-h-[50vh] md:max-h-[65vh]'} object-contain block`} 
                    referrerPolicy="no-referrer" 
                  />
                </motion.div>
              ))}
            </div>
            <div className="md:hidden flex h-full items-center">
              <MobileImageStack images={[1, 2, 3].map(i => `./images/12-${i}.png`)} objectFit="contain" />
            </div>
          </div>
        </section>

        {/* Slide 13 - ANOTHERDAY C (Page 13) */}
        <section key={13} className="snap-start w-full h-full flex flex-col px-6 md:px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-6 shrink-0"
          >
            <img src="./images/9-4.png" alt="ANOTHERDAY" className="h-10 md:h-12 w-auto object-contain mx-auto pointer-events-none max-w-full" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="flex-1 min-h-0 pb-4 md:pb-0">
            <div className="hidden md:flex flex-row items-center justify-center gap-6 h-full overflow-hidden">
              {[1, 2, 3].map((img, i) => (
                <motion.div 
                  key={img} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + (i * 0.1) }}
                  className="flex-1 w-full md:w-auto bg-[#F5F3EF] overflow-hidden"
                >
                  <img src={`./images/13-${img}.png`} alt="" className={`anotherday3-img${img} w-full h-auto max-h-[60vh] md:max-h-[70vh] object-contain block`} referrerPolicy="no-referrer" />
                </motion.div>
              ))}
            </div>
            <div className="md:hidden flex h-full items-center">
              <MobileImageStack images={[1, 2, 3].map(i => `./images/13-${i}.png`)} objectFit="contain" />
            </div>
          </div>
        </section>

        {/* Slide 14 - ANOTHERDAY D (Page 14) */}
        <section key={14} className="snap-start w-full h-full flex flex-col px-6 md:px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-6 shrink-0"
          >
            <img src="./images/9-4.png" alt="ANOTHERDAY" className="h-10 md:h-12 w-auto object-contain mx-auto pointer-events-none max-w-full" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="flex-1 min-h-0 pb-4 md:pb-0">
            <div className="hidden md:flex flex-row items-center justify-center gap-6 h-full overflow-hidden">
              {[1, 2, 3].map((img, i) => (
                <motion.div 
                  key={img} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + (i * 0.1) }}
                  className="flex-1 w-full md:w-auto bg-[#F5F3EF] overflow-hidden"
                >
                  <img src={`./images/14-${img}.png`} alt="" className={`anotherday4-img${img} w-full h-auto max-h-[60vh] md:max-h-[70vh] object-contain block`} referrerPolicy="no-referrer" />
                </motion.div>
              ))}
            </div>
            <div className="md:hidden flex h-full items-center">
              <MobileImageStack images={[1, 2, 3].map(i => `./images/14-${i}.png`)} objectFit="contain" />
            </div>
          </div>
        </section>

        {/* Slide 15 - ISLA Wedding (Page 15-16) */}
        <section key={15} className="snap-start w-full h-full flex flex-col px-6 md:px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-6 shrink-0"
          >
            <img src="./images/9-4.png" alt="ANOTHERDAY" className="h-10 md:h-12 w-auto object-contain mx-auto pointer-events-none max-w-full" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="flex-1 min-h-0 pb-4 md:pb-0">
            <div className="hidden md:flex flex-row items-center justify-center gap-6 h-full overflow-hidden">
              {[1, 2, 3].map((img, i) => (
                <motion.div 
                  key={img} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + (i * 0.1) }}
                  className="flex-1 w-full md:w-auto bg-[#F5F3EF] overflow-hidden"
                >
                  <img src={`./images/15-${img}.png`} alt="" className={`isla-img${img} w-full h-auto max-h-[60vh] md:max-h-[70vh] object-contain block`} referrerPolicy="no-referrer" />
                </motion.div>
              ))}
            </div>
            <div className="md:hidden flex h-full items-center">
              <MobileImageStack images={[1, 2, 3].map(i => `./images/15-${i}.png`)} objectFit="contain" />
            </div>
          </div>
        </section>

        {/* Slide 16 - Wedding Portfolio Gallery */}
        <section key={16} className="snap-start w-full h-full flex flex-col px-6 md:px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <div className="h-20 shrink-0"></div> {/* Title space placeholder */}
          <div className="flex-1 min-h-0 pb-4 md:pb-0">
            <div className="hidden md:flex flex-row items-center justify-center gap-6 h-full overflow-hidden">
              {[1, 2, 3].map((img, i) => (
                <motion.div 
                  key={img} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + (i * 0.1) }}
                  className="flex-1 w-full md:w-auto bg-[#F5F3EF] overflow-hidden"
                >
                  <img 
                    src={`./images/16-${img}.png`} 
                    alt="" 
                    className={`wedding-img-16-${img} w-full h-auto max-h-[60vh] md:max-h-[70vh] object-contain block`} 
                    referrerPolicy="no-referrer" 
                  />
                </motion.div>
              ))}
            </div>
            <div className="md:hidden flex h-full items-center">
              <MobileImageStack images={[1, 2, 3].map(i => `./images/16-${i}.png`)} />
            </div>
          </div>
        </section>

        {/* Slide 17 - Entertainment & Broadcasting (Page 17) */}
        <section key={17} className="snap-start w-full h-full flex flex-col items-center px-6 md:px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-10 shrink-0"
          >
            <h2 className="text-2xl md:text-4xl font-serif text-charcoal mb-2">{t(content.broadcastingTitle)}</h2>
            <p className="text-sm font-sans tracking-wider text-charcoal/60">{t(content.broadcastingSub)}</p>
          </motion.div>
          
          {/* Top Group: Broadcasting Logos */}
          <div className="flex flex-row items-center justify-center gap-16 h-auto w-full mb-12 shrink-0">
            {[1, 2].map((num, i) => {
              const links = {
                1: "https://www.arirang.com/?lang=en",
                2: "https://global.ebs.co.kr/global/main/index"
              };
              return (
                <motion.a 
                  key={num} 
                  href={links[num as keyof typeof links]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + (i * 0.1) }}
                  className="h-16 md:h-20 flex items-center justify-center bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img src={`./images/17-${num}.png`} alt="" className="max-h-full w-auto object-contain" referrerPolicy="no-referrer" />
                </motion.a>
              );
            })}
          </div>
 
          {/* Bottom Group: Program Previews */}
          <div className="flex-1 w-full max-w-2xl mx-auto min-h-0 pb-8">
            <div className="hidden md:grid grid-cols-2 gap-x-6 gap-y-4 h-full">
              {[3, 4, 5, 6].map((num, i) => {
                const links = {
                  3: "https://boysplanetapply.com/?locale=ja&tab=first",
                  4: "https://boysplanetapply.com/?locale=ja&tab=first",
                  5: "https://3rd.produce101.jp/",
                  6: "https://produce101.jp/"
                };
                return (
                  <motion.a 
                    key={num} 
                    href={links[num as keyof typeof links]} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 + (i * 0.1) }}
                    className="w-full aspect-video bg-transparent overflow-hidden block cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <img src={`./images/17-${num}.png`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </motion.a>
                );
              })}
            </div>
            <div className="md:hidden grid grid-cols-2 gap-3 w-full mt-4">
              {[3, 4, 5, 6].map((img) => (
                <div key={img} className="overflow-hidden flex items-center justify-center aspect-video">
                  <img
                    src={`./images/17-${img}.png`}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Slide 18 - Broadcasting Work Gallery (Page 18) */}
        <section key={18} className="snap-start w-full h-full flex flex-col px-6 md:px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="hidden md:grid grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
              {[1, 2, 3, 4].map((img, i) => (
                <motion.div 
                  key={img} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.15 }}
                  className="w-full aspect-video bg-transparent border border-black/5 overflow-hidden rounded-sm"
                >
                  <img 
                    src={`./images/18-${img}.png`} 
                    alt="" 
                    className={`broadcasting-work-img${img} w-full h-full object-cover`} 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.endsWith('.png')) {
                        target.src = target.src.replace('.png', '.jpg');
                      } else {
                        target.style.display = 'none';
                      }
                    }}
                  />
                </motion.div>
              ))}
            </div>
            <div className="md:hidden w-full flex items-center justify-center" style={{ aspectRatio: '16/9', maxHeight: '40vh' }}>
              <MobileImageStack images={[1, 2, 3, 4].map(i => `./images/18-${i}.png`)} objectFit="contain" />
            </div>
          </div>
        </section>

        {/* Slide 19 - Artist & Celebrity Editorial (Page 19) */}
        <section key={19} className="snap-start w-full h-full flex flex-col px-6 md:px-16 pt-20 pb-28 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-10 shrink-0"
          >
            <h2 className="text-2xl md:text-4xl font-serif text-charcoal mb-2">{t(content.editorialTitle)}</h2>
            <p className="text-sm font-sans tracking-wider text-charcoal/60">{t(content.editorialSub)}</p>
          </motion.div>
          <div className="flex-1 min-h-0">
            <div className="hidden md:grid grid-cols-4 gap-6 h-full">
              {[
                { label: "KISS OF LIFE", id: 1 },
                { label: "tripleS", id: 2 },
                { label: "YEEUN", id: 3 },
                { label: "KINO", id: 4 }
              ].map((item, i) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + (i * 0.1) }}
                  className="flex flex-col min-h-0"
                >
                  <span className="text-[11px] font-sans font-bold tracking-widest text-charcoal mb-3 text-center shrink-0">{item.label}</span>
                  <div className="flex-1 bg-transparent overflow-hidden min-h-0 flex items-center justify-center">
                    <img src={`./images/19-${item.id}.png`} alt="" className={`editorial-img${item.id} max-h-full w-auto object-contain`} referrerPolicy="no-referrer" />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="md:hidden flex h-full items-center">
              <MobileImageStack images={[1, 2, 3, 4].map(i => `./images/19-${i}.png`)} objectFit="contain" />
            </div>
          </div>
        </section>

        {/* Slide 20 - Drama & Filmography */}
        <section key={20} className="snap-start w-full h-full flex flex-col px-6 md:px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-10 shrink-0"
          >
            <h3 className="text-sm uppercase tracking-[1em] text-gray-500 font-bold">{t(content.dramaTitle)}</h3>
          </motion.div>
          <div className="hidden md:grid grid-cols-2 gap-8 w-full max-w-5xl mx-auto items-center justify-center flex-1 min-h-0">
            {["KILLING HOUSE", "Twenty"].map((work, i) => (
              <motion.div
                key={work}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + (i * 0.15) }}
                className="flex flex-col items-center justify-center gap-4 min-h-0"
              >
                <span className="text-center font-sans tracking-widest text-xs shrink-0">＜{work}＞</span>
                <div className="min-h-0 bg-transparent rounded-sm overflow-hidden relative flex items-center justify-center">
                  <img
                    src={`./images/20-${i + 1}.png`}
                    alt={work}
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="md:hidden flex flex-col gap-6 w-full items-center px-4 pt-4">
            {[
              { id: 1, title: "KILLING HOUSE" },
              { id: 2, title: "Twenty" }
            ].map((item) => (
              <div key={item.id} className="flex flex-col items-center gap-2 w-full">
                <span className="text-[10px] tracking-widest font-sans text-charcoal/60">
                  ＜{item.title}＞
                </span>
                <img
                  src={`./images/20-${item.id}.png`}
                  alt={item.title}
                  className="w-auto object-contain max-w-full max-h-[28vh]"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Slide 21 - Musical (Commercial & Lookbook) */}
        <section key={21} className="snap-start w-full h-full flex flex-col px-6 md:px-16 pt-20 pb-28 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 shrink-0"
          >
            <h2 className="text-2xl md:text-4xl font-serif text-charcoal">{t(content.musicalTitle)}</h2>
          </motion.div>
          <div className="flex-1 min-h-0">
            <div className="hidden md:grid grid-cols-2 gap-12 w-full max-w-4xl mx-auto h-full">
              {[
                { label: "<Spy>", id: 1 },
                { label: "<FRATERNITE>", id: 2 }
              ].map((item, i) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + (i * 0.15) }}
                  className="flex flex-col min-h-0 h-full"
                >
                  <span className="text-sm font-sans font-medium text-charcoal mb-4 text-center shrink-0">{item.label}</span>
                  <div className="flex-1 min-h-0 bg-transparent overflow-hidden flex items-center justify-center">
                    <img src={`./images/21-${item.id}.png`} alt="" className={`musical-img${item.id} max-h-full w-auto object-contain`} referrerPolicy="no-referrer" />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="md:hidden flex flex-row gap-4 w-full items-start justify-center px-4 pt-4">
              {[
                { id: 1, title: "KILLING HOUSE" },
                { id: 2, title: "Twenty" }
              ].map((item) => (
                <div key={item.id} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] tracking-widest font-sans text-charcoal/60">
                    ＜{item.title}＞
                  </span>
                  <img
                    src={`./images/21-${item.id}.png`}
                    alt={item.title}
                    className="w-full h-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Slide 22 - Musical Work Gallery (Page 22) */}
        <section key={22} className="snap-start w-full h-full flex flex-col px-6 md:px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <div className="flex-1 h-full min-h-0">
            <div className="hidden md:grid grid-cols-2 gap-6 h-full w-full">
              {[1, 2, 3, 4].map((img, i) => (
                <motion.div 
                  key={img} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
                  className="bg-gray-200 border border-black/5 overflow-hidden"
                >
                  <img src={`./images/22-${img}.png`} alt="" className={`musical-work-img${img} w-full h-full object-cover`} referrerPolicy="no-referrer" />
                </motion.div>
              ))}
            </div>
            <div className="md:hidden flex h-full items-center">
              <MobileImageStack
                images={[1,2,3,4].map(i => `./images/22-${i}.png`)}
                objectFit="cover"
              />
            </div>
          </div>
        </section>

        {/* Slide 23 - Fashion Week & Runway — Brands (Page 23) */}
        <section key={23} className="snap-start w-full h-full flex flex-col items-center px-6 md:px-16 pt-20 pb-28 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 shrink-0"
          >
            <h2 className="text-xl md:text-3xl font-serif tracking-widest text-charcoal uppercase">{t(content.fashionCollectionsTitle)}</h2>
          </motion.div>
          <div className="md:hidden grid grid-cols-2 gap-x-8 gap-y-10 w-full px-8 items-center justify-items-center mt-4">
            {[1,2,3,4,5,6,7,8].map((i) => (
              <div key={i} className="flex items-center justify-center">
                <img
                  src={`./images/23-${i}.png`}
                  alt=""
                  className={`${[1,4,6,8].includes(i) ? 'h-16' : 'h-10'} w-auto object-contain`}
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
          <div className="hidden md:flex flex-1 w-full items-center min-h-0 bg-transparent overflow-x-hidden pt-8">
            <div className="flex md:grid md:grid-cols-3 gap-x-12 md:gap-y-16 items-center max-w-4xl mx-auto bg-transparent">
              {[
                { id: 1, url: "https://www.instagram.com/liesangbong37/", large: true },
                { id: 2, url: "https://www.instagram.com/chungchunglie/", large: true },
                { id: 3, url: "https://www.instagram.com/hanacha_studio/", large: false }
              ].map((item, i) => (
                <motion.a 
                  key={item.id} 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + (i * 0.1) }}
                  className="snap-center shrink-0 block transform hover:scale-105 transition-all duration-300 bg-transparent hover:bg-transparent no-underline"
                >
                  <img 
                    src={`./images/23-${item.id}.png`} 
                    alt="" 
                    className={`${item.large ? 'h-16 md:h-28' : 'h-10 md:h-14'} w-auto object-contain mx-auto pointer-events-none transition-all`} 
                    referrerPolicy="no-referrer" 
                  />
                </motion.a>
              ))}
              
              <motion.a 
                href="https://www.instagram.com/lingerie_han/" 
                target="_blank" 
                rel="noopener noreferrer" 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                className="snap-center shrink-0 block transform hover:scale-105 transition-all duration-300 bg-transparent hover:bg-transparent no-underline"
              >
                <img src="./images/23-4.png" alt="" className="h-16 md:h-28 w-auto object-contain mx-auto pointer-events-none transition-all" referrerPolicy="no-referrer" />
              </motion.a>
              
              <div className="flex shrink-0 md:flex-col gap-x-10 md:gap-y-10 items-center justify-center bg-transparent snap-center">
                {[
                  { id: 5, url: "https://www.instagram.com/dailymirror_official/" },
                  { id: 7, url: "https://www.instagram.com/man.g_studio/" }
                ].map((item, i) => (
                  <motion.a 
                    key={item.id} 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 + (i * 0.1) }}
                    className="block transform hover:scale-105 transition-all duration-300 bg-transparent hover:bg-transparent no-underline"
                  >
                    <img src={`./images/23-${item.id}.png`} alt="" className="h-10 md:h-14 w-auto object-contain mx-auto pointer-events-none transition-all" referrerPolicy="no-referrer" />
                  </motion.a>
                ))}
              </div>
 
              <div className="flex shrink-0 md:flex-col gap-x-10 md:gap-y-10 items-center justify-center bg-transparent snap-center">
                {[
                  { id: 6, url: "https://www.instagram.com/mmam_designer/" },
                  { id: 8, url: "https://www.instagram.com/demoo.official/" }
                ].map((item, i) => (
                  <motion.a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 + (i * 0.1) }}
                    className="block transform hover:scale-105 transition-all duration-300 bg-transparent hover:bg-transparent no-underline"
                  >
                    <img src={`./images/23-${item.id}.png`} alt="" className="h-20 md:h-28 w-auto object-contain mx-auto pointer-events-none transition-all" referrerPolicy="no-referrer" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Slide 24 - Seoul Fashion Week Runway (Page 24) */}
        <section key={24} className="snap-start w-full h-full flex flex-col px-6 md:px-16 pt-20 pb-28 bg-bg-base overflow-hidden">
          <div className="text-center mb-12 shrink-0">
            <h2 className="text-3xl md:text-6xl font-serif tracking-tighter italic opacity-90">{t(content.fashionWeekTitle)}</h2>
          </div>
          <div className="flex-1 min-h-0 pb-4">
            <div className="hidden md:grid grid-cols-3 gap-4 h-full w-full max-w-5xl mx-auto">
              {[1, 2, 3].map((img) => (
                <div key={img} className="min-h-0 bg-transparent overflow-hidden flex items-center justify-center">
                  <img src={`./images/24-${img}.png`} alt="" className={`runway-img${img} max-h-full w-auto object-contain`} referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <div className="md:hidden flex h-full items-center">
              <MobileImageStack images={[1, 2, 3].map(i => `./images/24-${i}.png`)} objectFit="contain" />
            </div>
          </div>
        </section>
      </main>

      {/* Pagination View */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-50 bg-transparent">
        <span className="text-[10px] tracking-[0.3em] font-bold text-gray-400">
          {String(currentSlide + 1).padStart(2, '0')} / {isMobile ? 25 : 24}
        </span>
        <div
          className="flex flex-col gap-2 items-center"
          style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(4px)', padding: '8px 4px', borderRadius: '999px' }}
        >
          {[...Array(isMobile ? 25 : 24)].map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-charcoal h-4' : 'bg-gray-300 h-1'
                }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
