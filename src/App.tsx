/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

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
  brandPortfolioTitle: { jp: "Brand Portfolio / プロジェクト実績", ko: "Brand Portfolio / 프로젝트 실적" },
  brands: ["NATURE REPUBLIC", "LUNA", "YUHAN beauty care", "INGA", "GASH", "CHARDE"],
  galleryLabels: {
    slide3: { jp: "", ko: "" },
    slide4: { jp: "", ko: "" },
    slide5: { jp: "", ko: "" },
    slide6: { jp: "", ko: "" },
    slide7: { jp: "", ko: "" },
    slide8: { jp: "", ko: "" }
  },
  bridalPortfolioSubtitle: { jp: "ウェディング・ブライダル実績", ko: "웨딩・브라이달 실적" },
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const t = (item: TextContent) => (lang === 'jp' ? item.jp : item.ko);

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
      <div className="fixed top-5 left-5 z-[9999] flex gap-1.5 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-sm border border-black/5">
        <button
          onClick={() => setLang('jp')}
          className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider transition-all duration-200 ${lang === 'jp' ? 'bg-charcoal text-white' : 'text-gray-500 hover:text-charcoal'
            }`}
        >
          JP
        </button>
        <button
          onClick={() => setLang('ko')}
          className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider transition-all duration-200 ${lang === 'ko' ? 'bg-charcoal text-white' : 'text-gray-500 hover:text-charcoal'
            }`}
        >
          한국어
        </button>
      </div>

      <main
        ref={scrollContainerRef}
        className="snap-y snap-mandatory h-screen overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        {/* Slide 1 - Profile */}
        <section className="snap-start w-full h-full flex flex-col md:flex-row p-10 md:p-16 gap-10 bg-bg-base">
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
        <section className="snap-start w-full h-full flex flex-col items-center justify-center p-16 bg-bg-base">
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
                ? 'bg-white'
                : num === 7
                  ? ''
                  : 'flex flex-col px-16 pt-20 pb-10 bg-bg-base'
              }`}
            style={num === 7 ? { background: '#F5F3EF', padding: '60px 40px 40px 40px' } : undefined}
          >
            {/* Slides 3, 5 */}
            {(num === 3 || num === 5) && (
              <div className="flex-1 h-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
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
              </div>
            )}

            {/* Slide 4 (LUNA) - Custom aspect-ratio preservation */}
            {num === 4 && (
              <div className="flex-1 h-full min-h-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full items-center justify-center">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 h-full">
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
              </div>
            )}
          </section>
        ))}

        {/* Slide 9 - Bridal Styling Portfolio Logo List */}
        <section key={9} className="snap-start w-full h-full flex flex-col items-center px-16 pt-24 pb-10 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-10 shrink-0"
          >
            <h2 className="text-4xl font-serif text-charcoal mb-4">Bridal Styling Portfolio</h2>
            <p className="text-sm font-sans tracking-wider text-charcoal/60">{t(content.bridalPortfolioSubtitle)}</p>
          </motion.div>
          
          <div className="flex flex-col items-center gap-10 w-full max-w-2xl flex-1 justify-start pt-8">
            {[
              { id: 1, name: "KO JI HYEONG WEDDING", url: "https://www.instagram.com/jeju__kojihyeong_wedding/", h: "h-14" },
              { id: 2, name: "ARHA", url: "https://www.instagram.com/arha__review/", h: "h-12" },
              { id: 3, name: "ISLA", url: "https://www.instagram.com/isla_official___/", h: "h-12" },
              { id: 4, name: "ANOTHERDAY", url: "https://www.instagram.com/anotherday_official/", h: "h-12" },
              { id: 5, name: "YUHA haus", url: "https://www.instagram.com/yuha_haus/", h: "h-14" }
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
        <section key={10} className="snap-start w-full h-full flex flex-col px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-6 shrink-0"
          >
            <img src="./images/9-5.png" alt="YUHA haus" className="h-20 w-auto object-contain mx-auto pointer-events-none" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-1 min-h-0 overflow-y-auto md:overflow-hidden pb-4 md:pb-0">
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
        </section>

        {/* Slide 11 - ANOTHERDAY A (Page 11) */}
        <section key={11} className="snap-start w-full h-full flex flex-col px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-6 shrink-0"
          >
            <img src="./images/9-4.png" alt="ANOTHERDAY" className="h-12 w-auto object-contain mx-auto pointer-events-none" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-6 flex-1 min-h-0 overflow-y-auto md:overflow-visible pb-4 md:pb-0">
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
        </section>

        {/* Slide 12 - ANOTHERDAY B (Page 12) */}
        <section key={12} className="snap-start w-full h-full flex flex-col px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8 shrink-0"
          >
            <img src="./images/9-4.png" alt="ANOTHERDAY" className="h-12 w-auto object-contain mx-auto pointer-events-none" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 flex-1 min-h-0 overflow-y-auto md:overflow-visible pb-4 md:pb-0 md:pt-4 md:px-2">
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
        </section>

        {/* Slide 13 - ANOTHERDAY C (Page 13) */}
        <section key={13} className="snap-start w-full h-full flex flex-col px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-6 shrink-0"
          >
            <img src="./images/9-4.png" alt="ANOTHERDAY" className="h-12 w-auto object-contain mx-auto pointer-events-none" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-1 min-h-0 overflow-y-auto md:overflow-hidden pb-4 md:pb-0">
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
        </section>

        {/* Slide 14 - ANOTHERDAY D (Page 14) */}
        <section key={14} className="snap-start w-full h-full flex flex-col px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-6 shrink-0"
          >
            <img src="./images/9-4.png" alt="ANOTHERDAY" className="h-12 w-auto object-contain mx-auto pointer-events-none" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-1 min-h-0 overflow-y-auto md:overflow-hidden pb-4 md:pb-0">
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
        </section>

        {/* Slide 15 - ISLA Wedding (Page 15-16) */}
        <section key={15} className="snap-start w-full h-full flex flex-col px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-6 shrink-0"
          >
            <img src="./images/9-4.png" alt="ANOTHERDAY" className="h-12 w-auto object-contain mx-auto pointer-events-none" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-1 min-h-0 overflow-y-auto md:overflow-hidden pb-4 md:pb-0">
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
        </section>

        {/* Slide 16 - Wedding Portfolio Gallery */}
        <section key={16} className="snap-start w-full h-full flex flex-col px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <div className="h-20 shrink-0"></div> {/* Title space placeholder */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-1 min-h-0 overflow-y-auto md:overflow-hidden pb-4 md:pb-0">
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
        </section>

        {/* Slide 17 - Entertainment & Broadcasting (Page 17) */}
        <section key={17} className="snap-start w-full h-full flex flex-col items-center px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-10 shrink-0"
          >
            <h2 className="text-4xl font-serif text-charcoal mb-2">{t(content.broadcastingTitle)}</h2>
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
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-full max-w-2xl mx-auto flex-1 min-h-0 pb-8">
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
        </section>

        {/* Slide 18 - Broadcasting Work Gallery (Page 18) */}
        <section key={18} className="snap-start w-full h-full flex flex-col px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="grid grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
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
          </div>
        </section>

        {/* Slide 19 - Artist & Celebrity Editorial (Page 19) */}
        <section key={19} className="snap-start w-full h-full flex flex-col px-16 pt-20 pb-24 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-10 shrink-0"
          >
            <h2 className="text-4xl font-serif text-charcoal mb-2">{t(content.editorialTitle)}</h2>
            <p className="text-sm font-sans tracking-wider text-charcoal/60">{t(content.editorialSub)}</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1 min-h-0">
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
        </section>

        {/* Slide 20 - Drama & Filmography */}
        <section key={20} className="snap-start w-full h-full flex flex-col px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-10 shrink-0"
          >
            <h3 className="text-sm uppercase tracking-[1em] text-gray-500 font-bold">{t(content.dramaTitle)}</h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto items-center justify-center flex-1 min-h-0">
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
        </section>

        {/* Slide 21 - Musical (Commercial & Lookbook) */}
        <section key={21} className="snap-start w-full h-full flex flex-col px-16 pt-20 pb-24 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 shrink-0"
          >
            <h2 className="text-4xl font-serif text-charcoal">{t(content.musicalTitle)}</h2>
          </motion.div>
          <div className="grid grid-cols-2 gap-12 w-full max-w-4xl mx-auto flex-1 min-h-0">
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
        </section>

        {/* Slide 22 - Musical Work Gallery (Page 22) */}
        <section key={22} className="snap-start w-full h-full flex flex-col px-16 pt-20 pb-10 bg-bg-base overflow-hidden">
          <div className="grid grid-cols-2 gap-6 h-full w-full">
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
        </section>

        {/* Slide 23 - Fashion Week & Runway — Brands (Page 23) */}
        <section key={23} className="snap-start w-full h-full flex flex-col items-center px-16 pt-20 pb-24 bg-bg-base overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 shrink-0"
          >
            <h2 className="text-3xl font-serif tracking-widest text-charcoal uppercase">{t(content.fashionCollectionsTitle)}</h2>
          </motion.div>
          <div className="flex-1 w-full flex items-center justify-center min-h-0 bg-transparent">
            <div className="grid grid-cols-3 gap-x-12 gap-y-16 items-center max-w-4xl mx-auto bg-transparent">
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
                  className="block transform hover:scale-105 transition-all duration-300 bg-transparent hover:bg-transparent no-underline"
                >
                  <img 
                    src={`./images/23-${item.id}.png`} 
                    alt="" 
                    className={`${item.large ? 'h-28' : 'h-14'} w-auto object-contain mx-auto pointer-events-none transition-all`} 
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
                className="block transform hover:scale-105 transition-all duration-300 bg-transparent hover:bg-transparent no-underline"
              >
                <img src="./images/23-4.png" alt="" className="h-28 w-auto object-contain mx-auto pointer-events-none transition-all" referrerPolicy="no-referrer" />
              </motion.a>
              
              <div className="flex flex-col gap-y-10 items-center justify-center bg-transparent">
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
                    <img src={`./images/23-${item.id}.png`} alt="" className="h-14 w-auto object-contain mx-auto pointer-events-none transition-all" referrerPolicy="no-referrer" />
                  </motion.a>
                ))}
              </div>
 
              <div className="flex flex-col gap-y-10 items-center justify-center bg-transparent">
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
                    <img src={`./images/23-${item.id}.png`} alt="" className="h-14 w-auto object-contain mx-auto pointer-events-none transition-all" referrerPolicy="no-referrer" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Slide 24 - Seoul Fashion Week Runway (Page 24) */}
        <section key={24} className="snap-start w-full h-full flex flex-col px-16 pt-20 pb-24 bg-bg-base overflow-hidden">
          <div className="text-center mb-12 shrink-0">
            <h2 className="text-6xl font-serif tracking-tighter italic opacity-90">{t(content.fashionWeekTitle)}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl mx-auto flex-1 min-h-0 pb-4">
            {[1, 2, 3].map((img) => (
              <div key={img} className="min-h-0 bg-transparent overflow-hidden flex items-center justify-center">
                <img src={`./images/24-${img}.png`} alt="" className={`runway-img${img} max-h-full w-auto object-contain`} referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Pagination View */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-50 bg-transparent">
        <span className="text-[10px] tracking-[0.3em] font-bold text-gray-400">
          {String(currentSlide + 1).padStart(2, '0')} / 24
        </span>
        <div
          className="flex flex-col gap-2 items-center"
          style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(4px)', padding: '8px 4px', borderRadius: '999px' }}
        >
          {[...Array(24)].map((_, i) => (
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
