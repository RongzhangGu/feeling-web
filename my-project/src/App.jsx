import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, Brain, Zap, Globe, Code, Database, Activity, 
  Users, FileText, Github, Menu, X, ArrowUpRight, Monitor, 
  Sparkles, ArrowRight, Layers, Terminal, BookOpen, Briefcase, 
  LogIn, Play
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

// --- 样式常量 ---
const COLORS = {
  bg: 'bg-[#030300]',
};

// --- 子组件: 导航栏 ---
const Navbar = ({ activePage, setActivePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: '首页' },
    { id: 'research', label: '前沿研究' },
    { id: 'product', label: '产品生态' },
    { id: 'developers', label: '开发者' },
    { id: 'company', label: '关于我们' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${isScrolled ? 'py-4 bg-[#030303]/60 backdrop-blur-2xl border-b border-white/[0.05]' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActivePage('home')}>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-500 blur-lg opacity-40 group-hover:opacity-80 transition-opacity duration-500 rounded-full" />
            <div className="w-8 h-8 relative z-10 text-white flex items-center justify-center">
              <Zap size={22} className="fill-white" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">INTERACT<span className="text-white/40 font-light">AI</span></span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`text-sm font-medium transition-all duration-300 relative group
                ${activePage === link.id ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {link.label}
              {activePage === link.id && (
                <motion.div layoutId="navIndicator" className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              )}
            </button>
          ))}
          <button className="px-6 py-2.5 rounded-full bg-white/10 border border-white/10 text-white text-sm font-bold hover:bg-white hover:text-black transition-all duration-500 flex items-center space-x-2 backdrop-blur-md">
            <LogIn size={16} />
            <span>Console</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white relative z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

// --- 全局流体背景 ---
const GlobalAurora = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030303]">
    {/* 极简网格，仅做极其微弱的纹理 */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)]"></div>
    {/* 流动的巨型极光球 */}
    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1], rotate: [0, 90, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] bg-blue-600/20 rounded-full blur-[150px] mix-blend-screen" />
    <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05], rotate: [0, -90, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute top-[30%] -right-[20%] w-[70vw] h-[70vw] bg-purple-600/20 rounded-full blur-[180px] mix-blend-screen" />
  </div>
);

// --- 子组件: 首页 Hero (去边框的巨幕感) ---
const Hero = ({ onExplore }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative pt-32 pb-20 z-10 flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-7xl mx-auto px-6 text-center w-full flex flex-col items-center">
        
        <motion.div initial={{ opacity: 0, filter: 'blur(20px)', y: 30 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} className="flex flex-col items-center z-20">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-gray-300 text-xs font-medium mb-8 tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <Sparkles size={14} className="text-white" />
            <span>Next-Gen General AI Framework</span>
          </div>
          
          <h1 className="text-6xl md:text-[6.5rem] font-bold text-white mb-6 tracking-tighter leading-[1.05] mix-blend-plus-lighter">
            赋能通用智能的<br />
            <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300">交互大脑</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            打破系统边界。通过无缝融合的认知、执行与渲染框架，我们赋予机器感知物理世界并与之真实交互的能力。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={() => onExplore('product')} className="group px-8 py-4 bg-white text-black rounded-full font-medium flex items-center space-x-2 transition-transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              <span>探索生态</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => onExplore('research')} className="group px-8 py-4 text-gray-300 font-medium hover:text-white transition-colors flex items-center space-x-2">
              <span>查阅技术报告</span>
              <div className="w-8 h-[1px] bg-gray-600 group-hover:bg-white transition-colors ml-2" />
            </button>
          </div>
        </motion.div>

        {/* 无边框沉浸式多媒体占位区 */}
        <motion.div style={{ y, opacity }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }} className="w-full max-w-6xl mt-24 relative aspect-video md:aspect-[21/9] rounded-[3rem] overflow-hidden group cursor-pointer z-10">
          {/* 使用 Mask Image 让底部自然融入背景，去掉生硬的边框 */}
          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/10 group-hover:scale-105 transition-transform duration-1000" />
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[90%] bg-blue-500/20 rounded-[100%] blur-[100px]" />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 z-10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <Play size={24} className="text-white fill-white ml-2" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- 子组件: 核心引擎/产品 (流畅连线 + 隐形视窗嵌入) ---
const CoreEnginesSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const engines = [
    {
      name: 'InteractBrain', category: '认知基座', icon: <Brain size={40} strokeWidth={1} />,
      desc: '生态的认知中枢，不仅是 LLM。提供卓越的逻辑推理、多模态时序理解与主动知识检索能力，像人类一样建立长期记忆并自主完成复杂决策链路。',
      subProducts: ['Mem (待定)', 'CodeBrain (待定)'], color: 'text-blue-400', glow: 'bg-blue-500'
    },
    {
      name: 'InteractSkill', category: '行动框架', icon: <Zap size={40} strokeWidth={1} />,
      desc: '打破虚实边界的执行层。一套标准化的原子技能协议，让 AI 能够无缝调用海量外部 API、操作软件界面，甚至直接驱动物理世界中的实体机器人。',
      subProducts: ['AgentInfra', 'SkillPackage'], color: 'text-purple-400', glow: 'bg-purple-500'
    },
    {
      name: 'InteractRender', category: '物理渲染', icon: <Monitor size={40} strokeWidth={1} />,
      desc: '下一代神经渲染架构。将 AI 的抽象意图实时解码，转化为高保真的 3D 视觉画面与物理法则一致的仿真交互界面，实现“所想即所见”。',
      subProducts: [], color: 'text-emerald-400', glow: 'bg-emerald-500'
    },
    {
      name: 'Flimo', category: '创意应用', icon: <Layers size={40} strokeWidth={1} />,
      desc: '专为创作者打造的视频生成工具。利用底层视觉理解与渲染能力，通过自然语言即可完成专业级的分镜调度与高一致性视频生成。',
      subProducts: ['AI Video Generation'], color: 'text-orange-400', glow: 'bg-orange-500'
    }
  ];

  return (
    <section ref={containerRef} className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 relative">
        
        {/* 左侧: 粘性叙事标题 */}
        <div className="lg:w-1/3 relative">
          <div className="sticky top-40">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-white/50 font-mono text-sm uppercase tracking-widest block mb-6">Unified Architecture</span>
              <h2 className="text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                架构的<br /><span className="text-gray-500">有机统一</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                我们不制造孤立的工具模块。四大核心引擎在底层协议上完全互通，构成一个如水般流动的智能循环体。
              </p>
            </motion.div>
          </div>
        </div>

        {/* 右侧: 流动的内容与贯穿连线 */}
        <div className="lg:w-2/3 relative flex flex-col gap-32 pb-32">
          
          {/* 贯穿始终的“神经连线” (The Neural Link) */}
          <div className="absolute left-6 md:left-[3.25rem] top-10 bottom-0 w-[1px] bg-white/[0.05] hidden md:block">
            <motion.div 
              className="absolute top-0 w-full bg-gradient-to-b from-transparent via-white to-transparent h-40 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              style={{ top: useTransform(springProgress, [0, 1], ['0%', '100%']) }}
            />
          </div>

          {engines.map((engine, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative group">
              <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                
                {/* 发光节点 */}
                <div className={`shrink-0 w-16 h-16 rounded-full flex items-center justify-center bg-[#030303] border border-white/5 text-white/50 group-hover:text-white group-hover:border-white/20 transition-all duration-700 relative z-10 shadow-[0_0_0_10px_#030303]`}>
                  {engine.icon}
                  <div className={`absolute inset-0 ${engine.glow} blur-[20px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 rounded-full`} />
                </div>
                
                {/* 纯文本无边框排版 */}
                <div className="flex-1 w-full pt-2">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-white/30 font-mono text-2xl font-light leading-none">0{i+1}</span>
                    <span className={`font-mono text-sm tracking-widest uppercase ${engine.color} opacity-80`}>{engine.category}</span>
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-6 tracking-tight">{engine.name}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed font-light mb-8 max-w-xl group-hover:text-gray-300 transition-colors duration-500">
                    {engine.desc}
                  </p>

                  {/* 状态标签 */}
                  {engine.subProducts.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-8">
                      {engine.subProducts.map(sub => (
                        <span key={sub} className="px-3 py-1 bg-white/[0.03] border border-white/[0.05] rounded-md text-xs font-mono text-gray-500 uppercase">
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 隐形嵌入的多媒体视窗 (Inline Slit) - 去方块化，如同一道裂缝 */}
                  <div className="h-32 md:h-40 w-full max-w-lg rounded-2xl overflow-hidden relative group/media cursor-pointer my-8 [mask-image:linear-gradient(to_right,black_80%,transparent_100%)]">
                    <div className="absolute inset-0 bg-white/[0.02] group-hover/media:bg-white/[0.05] transition-colors duration-500" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${engine.color.replace('text-', 'from-')}/10 to-transparent opacity-0 group-hover/media:opacity-100 transition-opacity duration-700 blur-xl`} />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center gap-3 text-white/40 group-hover/media:text-white transition-colors duration-300">
                        <Play size={16} className="fill-current" />
                        <span className="font-mono text-xs tracking-widest uppercase">Preview Module</span>
                      </div>
                    </div>
                    {/* 微妙的左右边框光效 */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-0 group-hover/media:opacity-100 transition-opacity duration-500" />
                  </div>

                  <button className="flex items-center space-x-3 text-sm font-medium text-white/50 hover:text-white transition-colors group/btn">
                    <span>Explore Component</span> <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 子组件: 前沿研究 (会呼吸的无界列表) ---
const FeaturedResearchSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    { 
      id: '01', title: 'CodeBrain-1', 
      desc: '下一代自动化代码生成与逻辑推理引擎。突破传统 Transformer 局限，具备深度上下文理解与原生环境感知 Debug 能力。',
      tags: ['LLM', 'Reasoning'], actions: [{ label: '技术报告', icon: <FileText size={16} /> }, { label: '开源地址', icon: <Github size={16} /> }]
    },
    { 
      id: '02', title: 'MemBrain', 
      desc: '支持百万级 Token 记忆与主动知识检索的神经架构。让 Agent 拥有跨越数月的稳定人格与工作流记忆。',
      tags: ['Vector Search', 'Memory'], actions: [{ label: '技术报告', icon: <FileText size={16} /> }]
    },
    { 
      id: '03', title: 'LiveMotion', 
      desc: '无需动捕设备的端到端动作生成大模型。通过单目视频输入，实时输出高保真物理法则一致的 3D 人体骨骼序列。',
      tags: ['3D Vision', 'Kinetics'], actions: [{ label: '技术报告', icon: <FileText size={16} /> }, { label: 'Live Demo', icon: <Activity size={16} /> }]
    }
  ];

  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="text-5xl font-bold text-white tracking-tight mb-6">前沿探索 (Research)</h2>
          <p className="text-gray-400 text-lg max-w-xl font-light">抛弃渐进式优化。我们从第一性原理出发，直接攻克制约 AGI 发展的核心难题。</p>
        </div>

        {/* 纯排版驱动的列表，没有卡片边框 */}
        <div className="border-t border-white/[0.05]">
          {projects.map((project, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <motion.div 
                key={project.id} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}
                className="group border-b border-white/[0.05] py-12 md:py-16 relative cursor-pointer"
              >
                {/* 悬浮柔光铺满背景 */}
                <div className={`absolute inset-0 bg-white/[0.01] transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6 px-4 md:px-8">
                  {/* 左侧大标题 */}
                  <div className="flex items-baseline gap-6 md:gap-12 md:w-1/2">
                    <span className={`font-mono text-lg transition-colors duration-500 ${isHovered ? 'text-blue-400' : 'text-gray-700'}`}>{project.id}</span>
                    <h3 className={`text-4xl md:text-6xl font-bold transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isHovered ? 'text-white translate-x-4' : 'text-gray-500'}`}>
                      {project.title}
                    </h3>
                  </div>

                  {/* 右侧流体展开内容 */}
                  <motion.div initial={false} animate={{ height: isHovered ? 'auto' : '0px', opacity: isHovered ? 1 : 0.3 }} className="md:w-1/2 overflow-hidden flex items-center">
                    <div className={`transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isHovered ? 'translate-y-0' : 'translate-y-8'}`}>
                      <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light max-w-md">{project.desc}</p>
                      
                      <div className="flex flex-wrap gap-6">
                        {project.actions.map((action, idx) => (
                          <button key={idx} className="text-sm font-medium text-white/50 hover:text-white flex items-center gap-2 transition-colors">
                            {action.icon} <span>{action.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- 子组件: 新闻动态 (极简无界列表) ---
const NewsSection = () => {
  const news = [
    { date: '2024.10.15', tag: 'Release', title: 'InteractAI 联合顶级实验室发布 2024 年度通用智能交互技术白皮书。' },
    { date: '2024.09.22', tag: 'Open Source', title: 'CodeBrain-1 在自动化推理基准测试中取得突破，现已开源代码及权重。' },
    { date: '2024.08.10', tag: 'Product', title: 'LiveMotion 实时动捕引擎开启内测，邀请全球创作者与 3D 艺术家体验。' }
  ];

  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-32">
        <div className="md:w-1/3 shrink-0">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">最新动态</h2>
          <button className="flex items-center space-x-2 text-sm font-medium text-white/50 hover:text-white transition-colors">
            <span>View All News</span> <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col">
          {news.map((item, i) => (
            <div key={i} className="group flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-12 cursor-pointer py-8 border-b border-white/[0.05] relative">
              <div className={`absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -mx-6 px-6`} />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-12 w-full">
                <span className="text-gray-600 font-mono text-sm shrink-0 w-24 group-hover:text-blue-400 transition-colors">{item.date}</span>
                <h4 className="text-lg text-gray-400 group-hover:text-white transition-colors font-light leading-relaxed flex-1">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 子组件: 开发者与关于 (保持极简与无界) ---
// 为精简篇幅，保留之前的组件结构并去除多余边框
const DevelopersSection = () => (
  <section className="py-32 px-6 relative z-10 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-5xl font-bold text-white mb-6">构建于智能之上</h2>
        <p className="text-gray-400 text-lg">开发者中心与 API 文档接入点。</p>
        <button className="mt-8 px-8 py-3 bg-white text-black rounded-full font-bold">View Docs</button>
      </div>
  </section>
);
const CompanySection = () => (
  <section className="py-32 px-6 relative z-10 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-5xl font-bold text-white mb-6">关于我们</h2>
        <p className="text-gray-400 text-lg">在旧金山、上海和伦敦均设有研发中心。</p>
        <button className="mt-8 px-8 py-3 border border-white/20 text-white rounded-full font-bold">加入我们 (Careers)</button>
      </div>
  </section>
);

// --- 子组件: 页脚 ---
const Footer = () => (
  <footer className="py-20 px-6 relative z-10 mt-20">
    <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
      <div className="flex flex-col gap-6">
        <div className="flex items-center space-x-2">
          <Zap size={24} className="text-white/50" />
          <span className="text-2xl font-bold text-white/80 tracking-tighter">INTERACT<span className="text-white/30 font-light">AI</span></span>
        </div>
        <p className="text-gray-600 text-sm max-w-sm">Building the cognitive architecture for the future.</p>
      </div>
      
      <div className="flex gap-12 text-sm text-gray-500 font-medium">
        <div className="flex flex-col gap-4">
          <a href="#" className="hover:text-white transition-colors">Platform</a>
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
        </div>
        <div className="flex flex-col gap-4">
          <a href="#" className="hover:text-white transition-colors">Company</a>
          <a href="#" className="hover:text-white transition-colors">Careers</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- 主应用组件 ---
export default function App() {
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className={`min-h-screen ${COLORS.bg} text-white font-sans selection:bg-white/20 selection:text-white`}>
      <GlobalAurora />
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main>
        {activePage === 'home' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Hero onExplore={setActivePage} />
            <CoreEnginesSection />
            <FeaturedResearchSection />
            <NewsSection />
          </motion.div>
        )}

        {activePage === 'research' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-20">
             <FeaturedResearchSection /><NewsSection />
          </motion.div>
        )}
        {activePage === 'product' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-20"><CoreEnginesSection /></motion.div>
        )}
        {activePage === 'developers' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><DevelopersSection /></motion.div>
        )}
        {activePage === 'company' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><CompanySection /></motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}