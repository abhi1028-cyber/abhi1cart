// Home.jsx
// Green Earth Initiative - Complete Homepage with Expanded Sections
// All styles inline - no external CSS required

import React, { useState, useEffect } from 'react';

const Home = () => {
  // ---------- Authentication State ----------
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
  });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [activePage, setActivePage] = useState('home');

  // ---------- Video Slider State ----------
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const videos = [
    {
      src: 'https://cdn.pixabay.com/video/2022/03/19/112179-693007987_large.mp4',
      title: 'Ancient Forest',
      caption: 'Protecting our last wild places'
    },
    {
      src: 'https://cdn.pixabay.com/video/2021/07/09/82901-574655368_large.mp4',
      title: 'Crystal Clear Ocean',
      caption: 'Life below water needs you'
    },
    {
      src: 'https://cdn.pixabay.com/video/2019/06/19/24074-342016682_large.mp4',
      title: 'Solar Farm Timelapse',
      caption: 'Clean energy for tomorrow'
    }
  ];

  // ---------- Tree Plantation Counter ----------
  const [treeCount, setTreeCount] = useState(187432);
  const [newTrees, setNewTrees] = useState('');

  const handleAddTrees = (e) => {
    e.preventDefault();
    const treesToAdd = parseInt(newTrees);
    if (!isNaN(treesToAdd) && treesToAdd > 0) {
      setTreeCount(prev => prev + treesToAdd);
      setNewTrees('');
    }
  };

  // ---------- Carbon Footprint Calculator ----------
  const [electricity, setElectricity] = useState('');
  const [fuel, setFuel] = useState('');
  const [carbonResult, setCarbonResult] = useState(null);

  const calculateCarbon = () => {
    const elecEmissions = (parseFloat(electricity) || 0) * 0.85;
    const fuelEmissions = (parseFloat(fuel) || 0) * 2.31;
    const total = elecEmissions + fuelEmissions;
    setCarbonResult({
      total: total.toFixed(2),
      message: total < 100 ? 'Amazing! Keep it up! 🌟' :
               total < 500 ? 'Good start! Here are tips to improve 🌿' :
               'Time to take action! Switch to green alternatives 🌍'
    });
  };

  // ---------- Environmental News ----------
  const news = [
    { title: 'Global CO2 Levels Drop 5%', source: 'Climate Watch', image: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg', fullContent: 'Scientists report the first significant drop in atmospheric carbon dioxide in decades, thanks to global renewable energy adoption.' },
    { title: 'New Ocean Cleanup Array Deployed', source: 'Ocean Conservancy', image: 'https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg', fullContent: 'The world\'s largest ocean cleanup system has been successfully deployed in the Great Pacific Garbage Patch.' },
    { title: 'Electric Vehicles Hit 20% Market Share', source: 'EV World', image: 'https://images.pexels.com/photos/114411/pexels-photo-114411.jpeg', fullContent: 'EV adoption surges as prices drop and charging infrastructure expands globally.' },
    { title: 'Reforestation Success in Amazon', source: 'Forest Alliance', image: 'https://images.pexels.com/photos/262595/pexels-photo-262595.jpeg', fullContent: 'Over 10 million trees have been planted in the Amazon rainforest this year alone.' }
  ];

  // ---------- Recycling Guide ----------
  const recyclingGuide = [
    { item: 'Plastic Bottles', action: 'Rinse, crush, remove caps', bin: 'Blue', icon: 'https://cdn-icons-png.flaticon.com/512/2784/2784459.png', tip: 'Saves 60% energy vs new plastic' },
    { item: 'Paper/Cardboard', action: 'Flatten, keep dry', bin: 'Blue', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968260.png', tip: 'Saves 17 trees per ton' },
    { item: 'Glass Jars', action: 'Clean, remove labels', bin: 'Green', icon: 'https://cdn-icons-png.flaticon.com/512/744/744819.png', tip: 'Can be recycled infinitely' },
    { item: 'E-Waste', action: 'Take to certified center', bin: 'Red', icon: 'https://cdn-icons-png.flaticon.com/512/1442/1442915.png', tip: 'Contains precious metals' }
  ];

  // ---------- Cleanup Drives ----------
  const cleanupDrives = [
    { location: 'Santa Monica Beach', date: 'June 15, 2025', spots: 45, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', description: 'Join us for a day of beach cleaning and ocean conservation.' },
    { location: 'Central Park NYC', date: 'June 22, 2025', spots: 30, image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg', description: 'Help keep America\'s most famous park clean and green.' },
    { location: 'Golden Gate Park', date: 'June 30, 2025', spots: 50, image: 'https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg', description: 'Protecting San Francisco\'s urban wilderness.' }
  ];

  // ---------- Blog Posts (Expanded) ----------
  const blogPosts = [
    { id: 1, title: '10 Ways to Reduce Plastic Waste', category: 'Lifestyle', readTime: '5 min', image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg', excerpt: 'Simple everyday swaps that can eliminate single-use plastic from your life.', content: 'Start with reusable bags, water bottles, and straws. Avoid microbeads in cosmetics. Choose glass or metal containers over plastic. Shop at bulk stores. Make your own cleaning products. Say no to plastic cutlery. Use beeswax wraps instead of cling film. Buy produce without packaging. Switch to bamboo toothbrushes. Recycle properly.' },
    { id: 2, title: 'Composting 101: Turn Waste into Gold', category: 'Gardening', readTime: '7 min', image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg', excerpt: 'Learn how to start composting in any space, from apartments to backyards.', content: 'Composting reduces landfill waste and creates nutrient-rich soil. Use a mix of greens (food scraps) and browns (leaves, paper). Avoid meat, dairy, and oils. Turn your pile weekly. Keep it moist but not wet. Harvest after 2-3 months. Use compost to fertilize plants, gardens, and lawns.' },
    { id: 3, title: 'Sustainable Fashion Guide', category: 'Fashion', readTime: '6 min', image: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg', excerpt: 'How to build an eco-friendly wardrobe without breaking the bank.', content: 'Buy second-hand and vintage. Choose natural fibers like cotton, linen, hemp. Avoid fast fashion. Repair clothes instead of replacing. Rent formal wear. Support ethical brands. Wash in cold water. Air dry when possible. Donate or recycle old clothes.' },
    { id: 4, title: 'Renewable Energy at Home', category: 'Energy', readTime: '8 min', image: 'https://images.pexels.com/photos/159397/solar-panel-array-energy-solar-159397.jpeg', excerpt: 'Solar, wind, and other clean energy options for homeowners.', content: 'Install solar panels on your roof. Consider community solar if you rent. Switch to a green energy provider. Use smart thermostats. Upgrade to Energy Star appliances. Seal windows and doors. Add insulation. Use LED bulbs. Unplug devices when not in use.' }
  ];

  // ---------- Auth Functions ----------
  const handleSignup = (e) => {
    e.preventDefault();
    if (signupData.name && signupData.email && signupData.password) {
      setUser({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        profileImage: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`
      });
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setSignupData({ name: '', email: '', password: '' });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === user.email && loginData.password === user.password) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginData({ email: '', password: '' });
    } else {
      alert('Invalid credentials! Try: email@test.com / password123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfile(false);
  };

  // Auto-slide videos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % videos.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [videos.length]);

  // Styles
  const styles = {
    container: { fontFamily: "'Poppins', sans-serif", overflowX: 'hidden' },
    // Header Styles
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      padding: '15px 40px',
      boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
    },
    headerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
    },
    logo: {
      width: '55px',
      height: '55px',
      filter: 'drop-shadow(0 4px 8px rgba(46,204,113,0.3))',
    },
    brandName: {
      fontFamily: "'Parley Bold', 'Poppins', sans-serif",
      fontSize: '1.4rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #2ecc71, #27ae60, #1e8449)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '1px',
    },
    nav: {
      display: 'flex',
      gap: '25px',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    navLink: {
      textDecoration: 'none',
      color: '#2c3e50',
      fontWeight: '600',
      transition: 'color 0.3s',
      cursor: 'pointer',
      padding: '8px 12px',
      borderRadius: '25px',
    },
    authButtons: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
    },
    loginBtn: {
      padding: '8px 20px',
      background: '#2ecc71',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'transform 0.2s',
    },
    signupBtn: {
      padding: '8px 20px',
      background: 'transparent',
      color: '#2ecc71',
      border: '2px solid #2ecc71',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.2s',
    },
    logoutBtn: {
      padding: '8px 20px',
      background: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
    },
    profileContainer: {
      position: 'relative',
      cursor: 'pointer',
    },
    profileImage: {
      width: '42px',
      height: '42px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid #2ecc71',
    },
    profileDropdown: {
      position: 'absolute',
      top: '55px',
      right: 0,
      background: 'white',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      padding: '15px',
      minWidth: '220px',
      zIndex: 1001,
    },
    profileName: { fontWeight: 'bold', color: '#2c3e50', marginBottom: '5px' },
    profileEmail: { fontSize: '0.8rem', color: '#7f8c8d', marginBottom: '10px' },
    dropdownBtn: {
      width: '100%',
      padding: '8px',
      marginTop: '5px',
      background: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
    },
    // Modal Styles
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      zIndex: 2000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      background: 'white',
      borderRadius: '30px',
      padding: '40px',
      width: '90%',
      maxWidth: '450px',
      position: 'relative',
    },
    modalClose: {
      position: 'absolute',
      top: '15px',
      right: '20px',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#7f8c8d',
    },
    modalTitle: { fontSize: '1.8rem', marginBottom: '20px', color: '#2c3e50', textAlign: 'center' },
    input: {
      width: '100%',
      padding: '12px',
      margin: '10px 0',
      border: '1px solid #ddd',
      borderRadius: '12px',
      fontSize: '1rem',
    },
    modalBtn: {
      width: '100%',
      padding: '12px',
      background: '#2ecc71',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '15px',
    },
    switchText: { textAlign: 'center', marginTop: '15px', color: '#7f8c8d', cursor: 'pointer' },
    // Video Slider
    videoSlider: { position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', marginTop: '80px' },
    slide: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, transition: 'opacity 1.5s ease', zIndex: 0 },
    slideActive: { opacity: 1, zIndex: 1 },
    backgroundVideo: { width: '100%', height: '100%', objectFit: 'cover' },
    overlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3))', zIndex: 2 },
    slideCaption: { position: 'absolute', bottom: '25%', left: '10%', zIndex: 3, color: 'white' },
    slideH1: { fontSize: '4rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #fff, #a8e6cf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    slideP: { fontSize: '1.5rem', marginBottom: '2rem' },
    ctaButton: { padding: '14px 32px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '50px', fontSize: '1.1rem', cursor: 'pointer' },
    sliderControls: { position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '15px', zIndex: 10 },
    dot: { width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer' },
    dotActive: { background: '#2ecc71', transform: 'scale(1.4)' },
    // Sections
    section: { padding: '80px 20px' },
    container: { maxWidth: '1280px', margin: '0 auto' },
    sectionHeader: { textAlign: 'center', marginBottom: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' },
    sectionH2: { fontSize: '2.5rem', color: '#2c3e50' },
    sectionIcon: { width: '50px', height: '50px' },
    // Tree Counter
    counterSection: { background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)', padding: '80px 20px' },
    treeCounter: { textAlign: 'center', padding: '50px', background: 'white', borderRadius: '40px' },
    counterNumber: { fontSize: '6rem', fontWeight: 'bold', color: '#27ae60' },
    treeInput: { padding: '14px 24px', border: '2px solid #ddd', borderRadius: '60px', width: '260px', marginRight: '12px' },
    treeButton: { padding: '14px 32px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '60px', cursor: 'pointer' },
    // Carbon Calculator
    calculatorSection: { background: '#f4fbf4', padding: '80px 20px' },
    calculatorGrid: { display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' },
    inputGroup: { flex: 1, minWidth: '240px' },
    calcBtn: { background: '#3498db', color: 'white', border: 'none', padding: '0 36px', borderRadius: '16px', cursor: 'pointer' },
    carbonResult: { marginTop: '40px', padding: '30px', background: 'white', borderRadius: '28px', textAlign: 'center' },
    // Recycling
    recyclingGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' },
    recyclingCard: { background: '#f9fff9', padding: '30px', borderRadius: '28px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.3s' },
    recyclingIcon: { width: '70px', height: '70px', marginBottom: '20px' },
    // News
    newsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' },
    newsCard: { background: 'white', borderRadius: '24px', overflow: 'hidden', cursor: 'pointer' },
    newsImage: { width: '100%', height: '200px', objectFit: 'cover' },
    newsContent: { padding: '24px' },
    // Cleanup
    cleanupGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' },
    cleanupCard: { background: 'white', borderRadius: '32px', overflow: 'hidden' },
    cleanupImage: { width: '100%', height: '200px', objectFit: 'cover' },
    cleanupInfo: { padding: '28px', textAlign: 'center' },
    joinBtn: { marginTop: '20px', padding: '12px 28px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '60px', cursor: 'pointer' },
    // Footer
    footer: { background: '#1a2a1f', color: 'white', padding: '50px 20px 30px', textAlign: 'center' },
    // Trippy Image Style
    trippyImage: {
      filter: 'hue-rotate(15deg) saturate(1.5) contrast(1.1)',
      transition: 'all 0.5s ease',
    },
    trippyCard: {
      background: 'linear-gradient(135deg, rgba(46,204,113,0.1), rgba(52,152,219,0.1))',
      backdropFilter: 'blur(5px)',
    }
  };

  const keyframes = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 5px #2ecc71; }
      50% { box-shadow: 0 0 20px #2ecc71; }
    }
    .recycling-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
    .news-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
    .cleanup-card:hover { transform: translateY(-8px); }
    button:hover { transform: translateY(-2px); opacity: 0.9; }
    .nav-link:hover { background: rgba(46,204,113,0.1); }
    .trippy-img:hover { filter: hue-rotate(45deg) saturate(2); transform: scale(1.02); }
    @media (max-width: 768px) {
      .slide-caption h1 { font-size: 2rem !important; }
      .slide-caption p { font-size: 1rem !important; }
      .counter-number { font-size: 3rem !important; }
      .tree-input { width: 100% !important; margin-right: 0 !important; margin-bottom: 12px !important; }
      .tree-button { width: 100% !important; }
      .calculator-grid { flex-direction: column; }
      .calc-btn { padding: 14px !important; }
      .header-content { flex-direction: column; }
      .nav { justify-content: center; }
    }
  `;

  // Custom SVG Logo
  const CustomLogo = () => (
    <svg width="55" height="55" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 4px 8px rgba(46,204,113,0.3))' }}>
      <circle cx="50" cy="50" r="48" stroke="url(#grad)" strokeWidth="3" fill="white"/>
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2ecc71"/>
          <stop offset="100%" stopColor="#27ae60"/>
        </linearGradient>
      </defs>
      <path d="M50 20 L62 45 L90 45 L68 62 L76 90 L50 74 L24 90 L32 62 L10 45 L38 45 Z" fill="#2ecc71" stroke="#27ae60" strokeWidth="2"/>
      <circle cx="50" cy="50" r="8" fill="white"/>
      <path d="M50 35 L55 45 L65 45 L57 52 L60 62 L50 56 L40 62 L43 52 L35 45 L45 45 Z" fill="#f1c40f"/>
    </svg>
  );

  // Expanded Home Page Content
  const renderHomePage = () => (
    <>
      {/* Video Slider */}
      <div style={styles.videoSlider}>
        {videos.map((video, index) => (
          <div key={index} style={{ ...styles.slide, ...(index === currentSlide ? styles.slideActive : {}) }}>
            <video src={video.src} autoPlay={index === currentSlide} loop muted playsInline style={styles.backgroundVideo} />
            <div style={styles.overlay}></div>
            <div style={styles.slideCaption} className="slide-caption">
              <h1 style={styles.slideH1}>{video.title}</h1>
              <p style={styles.slideP}>{video.caption}</p>
              <button style={styles.ctaButton}>Take Action →</button>
            </div>
          </div>
        ))}
        <div style={styles.sliderControls}>
          {videos.map((_, idx) => (
            <button key={idx} style={{ ...styles.dot, ...(idx === currentSlide ? styles.dotActive : {}) }} onClick={() => setCurrentSlide(idx)} />
          ))}
        </div>
      </div>

      {/* Tree Counter */}
      <section style={styles.counterSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionH2}>🌳 Trees Planted So Far</h2>
            <img src="https://cdn-icons-png.flaticon.com/512/1679/1679791.png" style={styles.sectionIcon} alt="tree" />
          </div>
          <div style={styles.treeCounter}>
            <div style={styles.counterNumber}>{treeCount.toLocaleString()}</div>
            <div style={{ fontSize: '3rem', margin: '20px 0' }}>🌱🌳🌲</div>
            <form onSubmit={handleAddTrees}>
              <input type="number" placeholder="+ Add trees planted" value={newTrees} onChange={(e) => setNewTrees(e.target.value)} min="1" style={styles.treeInput} className="tree-input" />
              <button type="submit" style={styles.treeButton} className="tree-button">Add Trees</button>
            </form>
          </div>
          <p style={{ textAlign: 'center', marginTop: '30px', fontWeight: 500 }}>🎯 Goal: 1,000,000 trees by 2026</p>
        </div>
      </section>

      {/* Carbon Calculator */}
      <section style={styles.calculatorSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionH2}>📊 Carbon Footprint Calculator</h2>
            <img src="https://cdn-icons-png.flaticon.com/512/2410/2410239.png" style={styles.sectionIcon} alt="calc" />
          </div>
          <div style={styles.calculatorGrid} className="calculator-grid">
            <div style={styles.inputGroup}><label style={{ fontWeight: 600 }}>💡 Electricity (kWh/month)</label><input type="number" value={electricity} onChange={(e) => setElectricity(e.target.value)} placeholder="e.g., 300" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }} /></div>
            <div style={styles.inputGroup}><label style={{ fontWeight: 600 }}>⛽ Fuel (liters/month)</label><input type="number" value={fuel} onChange={(e) => setFuel(e.target.value)} placeholder="e.g., 50" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }} /></div>
            <button onClick={calculateCarbon} style={styles.calcBtn} className="calc-btn">Calculate →</button>
          </div>
          {carbonResult && <div style={styles.carbonResult}><h3>Your footprint: <span style={{ color: '#e67e22', fontSize: '2rem' }}>{carbonResult.total} kg CO₂</span></h3><p>{carbonResult.message}</p><div style={{ marginTop: '15px', padding: '10px', background: '#fff3e0', borderRadius: '60px' }}>💡 Plant {Math.ceil(carbonResult.total / 20)} trees to offset!</div></div>}
        </div>
      </section>

      {/* Recycling Guide with Trippy Images */}
      <section style={{ background: 'white', padding: '80px 20px' }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionH2}>♻️ Smart Recycling Guide</h2>
            <img src="https://cdn-icons-png.flaticon.com/512/484/484611.png" style={styles.sectionIcon} alt="recycle" />
          </div>
          <div style={styles.recyclingGrid}>
            {recyclingGuide.map((item, idx) => (
              <div key={idx} style={{ ...styles.recyclingCard, ...styles.trippyCard }} className="recycling-card">
                <img src={item.icon} alt={item.item} style={{ ...styles.recyclingIcon, ...styles.trippyImage }} className="trippy-img" />
                <h4 style={{ fontSize: '1.3rem' }}>{item.item}</h4>
                <p>{item.action}</p>
                <span style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '60px', marginTop: '15px', background: item.bin === 'Blue' ? '#3498db' : item.bin === 'Green' ? '#2ecc71' : '#e74c3c', color: 'white' }}>{item.bin} Bin</span>
                <p style={{ fontSize: '0.8rem', marginTop: '10px', color: '#7f8c8d' }}>✨ {item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental News */}
      <section style={{ background: '#f0f7f0', padding: '80px 20px' }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionH2}>📰 Latest Environmental News</h2>
            <img src="https://cdn-icons-png.flaticon.com/512/3372/3372488.png" style={styles.sectionIcon} alt="news" />
          </div>
          <div style={styles.newsGrid}>
            {news.map((article, idx) => (
              <div key={idx} style={styles.newsCard} className="news-card">
                <img src={article.image} alt={article.title} style={{ ...styles.newsImage, ...styles.trippyImage }} className="trippy-img" />
                <div style={styles.newsContent}>
                  <h3>{article.title}</h3>
                  <p style={{ color: '#7f8c8d' }}>{article.source}</p>
                  <p style={{ fontSize: '0.9rem', marginTop: '8px' }}>{article.fullContent.substring(0, 100)}...</p>
                  <a href="#" style={{ color: '#2ecc71', textDecoration: 'none', fontWeight: 600, display: 'inline-block', marginTop: '10px' }}>Read more →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cleanup Drives */}
      <section style={{ background: 'linear-gradient(135deg, #fff, #e8f5e9)', padding: '80px 20px' }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionH2}>🧹 Join a Cleanup Drive</h2>
            <img src="https://cdn-icons-png.flaticon.com/512/2936/2936863.png" style={styles.sectionIcon} alt="cleanup" />
          </div>
          <div style={styles.cleanupGrid}>
            {cleanupDrives.map((drive, idx) => (
              <div key={idx} style={styles.cleanupCard} className="cleanup-card">
                <img src={drive.image} alt={drive.location} style={{ ...styles.cleanupImage, ...styles.trippyImage }} className="trippy-img" />
                <div style={styles.cleanupInfo}>
                  <div style={{ fontSize: '2.5rem' }}>📍</div>
                  <h3>{drive.location}</h3>
                  <p>📅 {drive.date}</p>
                  <p>👥 {drive.spots} spots left</p>
                  <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#7f8c8d' }}>{drive.description}</p>
                  <button style={styles.joinBtn} className="join-btn">Join Now →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  // Expanded Blog Page
  const renderBlogPage = () => (
    <section style={{ ...styles.section, marginTop: '80px' }}>
      <div style={styles.container}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionH2}>🌿 Green Earth Blog</h2>
          <img src="https://cdn-icons-png.flaticon.com/512/3372/3372488.png" style={styles.sectionIcon} alt="blog" />
        </div>
        <p style={{ textAlign: 'center', marginBottom: '50px', fontSize: '1.2rem', color: '#7f8c8d' }}>Latest stories, tips, and insights for sustainable living</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          {blogPosts.map(post => (
            <div key={post.id} style={{ background: 'white', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', transition: 'transform 0.3s', cursor: 'pointer' }} className="news-card">
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '220px', objectFit: 'cover', ...styles.trippyImage }} className="trippy-img" />
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ background: '#2ecc71', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem' }}>{post.category}</span>
                  <span style={{ color: '#7f8c8d', fontSize: '0.8rem' }}>⏱️ {post.readTime}</span>
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '10px', color: '#2c3e50' }}>{post.title}</h3>
                <p style={{ color: '#7f8c8d', marginBottom: '15px' }}>{post.excerpt}</p>
                <details style={{ marginTop: '15px' }}>
                  <summary style={{ color: '#2ecc71', fontWeight: 'bold', cursor: 'pointer' }}>Read full article</summary>
                  <p style={{ marginTop: '10px', lineHeight: '1.6' }}>{post.content}</p>
                </details>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Expanded About Page
  const renderAboutPage = () => (
    <section style={{ ...styles.section, marginTop: '80px' }}>
      <div style={styles.container}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionH2}>🌍 About Green Earth Initiative</h2>
          <CustomLogo />
        </div>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png" style={{ width: '100px', marginBottom: '20px', ...styles.trippyImage }} className="trippy-img" alt="mission" />
            <p style={{ fontSize: '1.3rem', lineHeight: '1.8', color: '#2c3e50' }}>We are a global movement dedicated to environmental conservation, reforestation, and sustainable living. Since 2020, we've planted over <strong>187,000 trees</strong> and mobilized thousands of volunteers worldwide.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '50px' }}>
            <div style={{ background: '#e8f5e9', padding: '30px', borderRadius: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem' }}>🎯</div>
              <h3>Our Mission</h3>
              <p>Create a sustainable future through education, action, and community engagement. Empower individuals to make eco-friendly choices.</p>
            </div>
            <div style={{ background: '#e8f5e9', padding: '30px', borderRadius: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem' }}>👁️</div>
              <h3>Our Vision</h3>
              <p>A world where humanity lives in harmony with nature, where clean air, water, and biodiversity are protected for generations.</p>
            </div>
            <div style={{ background: '#e8f5e9', padding: '30px', borderRadius: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem' }}>💚</div>
              <h3>Our Values</h3>
              <p>Sustainability, transparency, collaboration, innovation, and respect for all living beings.</p>
            </div>
          </div>

          <div style={{ marginTop: '60px', background: 'linear-gradient(135deg, #2ecc71, #27ae60)', padding: '40px', borderRadius: '30px', color: 'white', textAlign: 'center' }}>
            <h3>Join Our Movement</h3>
            <p style={{ marginTop: '15px' }}>Be part of the solution. Volunteer, donate, or simply spread the word.</p>
            <button style={{ marginTop: '20px', padding: '12px 32px', background: 'white', color: '#2ecc71', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>Get Involved →</button>
          </div>
        </div>
      </div>
    </section>
  );

  // Expanded Contacts Page
  const renderContactsPage = () => (
    <section style={{ ...styles.section, marginTop: '80px' }}>
      <div style={styles.container}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionH2}>📞 Contact Us</h2>
          <img src="https://cdn-icons-png.flaticon.com/512/2936/2936863.png" style={styles.sectionIcon} alt="contact" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '50px' }}>
          <div>
            <h3>Get in Touch</h3>
            <div style={{ marginTop: '30px' }}>
              <p style={{ margin: '15px 0', fontSize: '1.1rem' }}>📧 <strong>Email:</strong> hello@greenearth.org</p>
              <p style={{ margin: '15px 0', fontSize: '1.1rem' }}>📞 <strong>Phone:</strong> +1 (555) 123-GREEN</p>
              <p style={{ margin: '15px 0', fontSize: '1.1rem' }}>📍 <strong>Address:</strong> 123 Eco Avenue, San Francisco, CA 94105</p>
              <p style={{ margin: '15px 0', fontSize: '1.1rem' }}>🌐 <strong>Social:</strong> @greenearth on Instagram, Twitter, Facebook</p>
            </div>
          </div>
          <div>
            <h3>Send us a Message</h3>
            <form style={{ marginTop: '30px' }}>
              <input type="text" placeholder="Your Name" style={styles.input} />
              <input type="email" placeholder="Your Email" style={styles.input} />
              <textarea placeholder="Your Message" rows="4" style={{ ...styles.input, fontFamily: 'inherit' }}></textarea>
              <button type="submit" style={{ ...styles.modalBtn, width: 'auto', padding: '12px 32px' }}>Send Message →</button>
            </form>
          </div>
        </div>
        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <h3>Office Hours</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM (PST)</p>
          <p>Saturday: 10:00 AM - 2:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
    </section>
  );

  // Page Router
  const renderActivePage = () => {
    switch(activePage) {
      case 'blog': return renderBlogPage();
      case 'about': return renderAboutPage();
      case 'contacts': return renderContactsPage();
      default: return renderHomePage();
    }
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent} className="header-content">
          <div style={styles.logoContainer} onClick={() => setActivePage('home')}>
            <CustomLogo />
            <span style={styles.brandName}>GREEN EARTH INITIATIVE</span>
          </div>
          <nav style={styles.nav}>
            <span style={styles.navLink} className="nav-link" onClick={() => setActivePage('home')}>🏠 Home</span>
            <span style={styles.navLink} className="nav-link" onClick={() => setActivePage('blog')}>📝 Blog</span>
            <span style={styles.navLink} className="nav-link" onClick={() => setActivePage('about')}>🌱 About</span>
            <span style={styles.navLink} className="nav-link" onClick={() => setActivePage('contacts')}>📧 Contacts</span>
            {!isLoggedIn ? (
              <div style={styles.authButtons}>
                <button style={styles.loginBtn} onClick={() => { setIsSignupMode(false); setShowLoginModal(true); }}>Login</button>
                <button style={styles.signupBtn} onClick={() => { setIsSignupMode(true); setShowLoginModal(true); }}>Sign Up</button>
              </div>
            ) : (
              <div style={styles.profileContainer}>
                <img src={user.profileImage} alt="profile" style={styles.profileImage} onClick={() => setShowProfile(!showProfile)} />
                {showProfile && (
                  <div style={styles.profileDropdown}>
                    <div style={styles.profileName}>{user.name}</div>
                    <div style={styles.profileEmail}>{user.email}</div>
                    <button style={styles.dropdownBtn} onClick={handleLogout}>🚪 Logout</button>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Login/Signup Modal */}
      {showLoginModal && (
        <div style={styles.modalOverlay} onClick={() => setShowLoginModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalClose} onClick={() => setShowLoginModal(false)}>×</div>
            <h2 style={styles.modalTitle}>{isSignupMode ? '🌱 Create Account' : '🌿 Welcome Back'}</h2>
            {isSignupMode ? (
              <form onSubmit={handleSignup}>
                <input type="text" placeholder="Full Name" style={styles.input} value={signupData.name} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} required />
                <input type="email" placeholder="Email" style={styles.input} value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} required />
                <input type="password" placeholder="Password" style={styles.input} value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} required />
                <button type="submit" style={styles.modalBtn}>Sign Up →</button>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" style={styles.input} value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required />
                <input type="password" placeholder="Password" style={styles.input} value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
                <button type="submit" style={styles.modalBtn}>Login →</button>
              </form>
            )}
            <p style={styles.switchText} onClick={() => setIsSignupMode(!isSignupMode)}>
              {isSignupMode ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </p>
            <p style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '15px', color: '#bdc3c7' }}>Demo: email@test.com / password123</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {renderActivePage()}

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <CustomLogo />
          <p style={{ marginTop: '20px' }}>🌱 Green Earth Initiative — Every action counts. Together for a sustainable future.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px', flexWrap: 'wrap' }}>
            <span>📧 hello@greenearth.org</span>
            <span>📞 +1 (555) 123-GREEN</span>
            <span>🌐 @greenearth</span>
          </div>
          <p style={{ marginTop: '30px', fontSize: '0.8rem', opacity: 0.7 }}>© 2025 Green Earth Initiative. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;