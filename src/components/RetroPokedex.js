import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RetroPokedex = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [captured, setCaptured] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [selectedType, setSelectedType] = useState('all');
  const pokemonPerPage = 18;

  const themes = [
    {
      name: 'Purple Dream',
      background: 'linear-gradient(135deg, #ffd4e5 0%, #e7c6ff 25%, #c4b5fd 50%, #ffc4e1 75%, #ffd4e5 100%)',
      primary: '#d8b4fe',
      secondary: '#c084fc',
      light: '#f5d0fe',
      card: 'linear-gradient(180deg, #fae8ff 0%, #f3e8ff 100%)',
      cardInner: 'linear-gradient(180deg, #ffffff 0%, #fef3ff 100%)',
      captured: 'linear-gradient(135deg, #fef3ff 0%, #fae8ff 100%)',
      locked: 'linear-gradient(135deg, #ffc4e1 0%, #ffb4d1 100%)',
      capturedBadge: 'linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)',
      lockedBadge: 'linear-gradient(135deg, #fda4af 0%, #fb7185 100%)',
      button: 'linear-gradient(135deg, #e7c6ff 0%, #d8b4fe 100%)',
      page: 'linear-gradient(135deg, #ffc4e1 0%, #ffb4d1 100%)',
      stat1: 'linear-gradient(135deg, #ffc4e1 0%, #ffb4d1 100%)',
      stat2: 'linear-gradient(135deg, #e7c6ff 0%, #d7b6ff 100%)',
      progress: 'linear-gradient(90deg, #a78bfa 0%, #c084fc 50%, #e879f9 100%)',
      textMain: '#9d4edd',
      textDark: '#6b21a8',
      textAccent: '#c026d3'
    },
    {
      name: 'Ocean Blue',
      background: 'linear-gradient(135deg, #cfe9ff 0%, #b3daff 25%, #9dcaff 50%, #b3daff 75%, #cfe9ff 100%)',
      primary: '#93c5fd',
      secondary: '#60a5fa',
      light: '#dbeafe',
      card: 'linear-gradient(180deg, #e0f2fe 0%, #dbeafe 100%)',
      cardInner: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%)',
      captured: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      locked: 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)',
      capturedBadge: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      lockedBadge: 'linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)',
      button: 'linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)',
      page: 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)',
      stat1: 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)',
      stat2: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
      progress: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)',
      textMain: '#1e40af',
      textDark: '#1e3a8a',
      textAccent: '#2563eb'
    },
    {
      name: 'Mint Green',
      background: 'linear-gradient(135deg, #d1f4e0 0%, #b8f0d0 25%, #9ee7c0 50%, #b8f0d0 75%, #d1f4e0 100%)',
      primary: '#86efac',
      secondary: '#4ade80',
      light: '#dcfce7',
      card: 'linear-gradient(180deg, #dcfce7 0%, #d1fae5 100%)',
      cardInner: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)',
      captured: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      locked: 'linear-gradient(135deg, #bbf7d0 0%, #86efac 100%)',
      capturedBadge: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
      lockedBadge: 'linear-gradient(135deg, #86efac 0%, #4ade80 100%)',
      button: 'linear-gradient(135deg, #86efac 0%, #4ade80 100%)',
      page: 'linear-gradient(135deg, #bbf7d0 0%, #86efac 100%)',
      stat1: 'linear-gradient(135deg, #bbf7d0 0%, #86efac 100%)',
      stat2: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
      progress: 'linear-gradient(90deg, #22c55e 0%, #4ade80 50%, #86efac 100%)',
      textMain: '#16a34a',
      textDark: '#15803d',
      textAccent: '#22c55e'
    },
    {
      name: 'Peach Dream',
      background: 'linear-gradient(135deg, #ffd4c4 0%, #ffc4b4 25%, #ffb4a4 50%, #ffc4b4 75%, #ffd4c4 100%)',
      primary: '#fdba74',
      secondary: '#fb923c',
      light: '#fed7aa',
      card: 'linear-gradient(180deg, #ffedd5 0%, #fed7aa 100%)',
      cardInner: 'linear-gradient(180deg, #ffffff 0%, #fff7ed 100%)',
      captured: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
      locked: 'linear-gradient(135deg, #fde68a 0%, #fcd34d 100%)',
      capturedBadge: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
      lockedBadge: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      button: 'linear-gradient(135deg, #fdba74 0%, #fb923c 100%)',
      page: 'linear-gradient(135deg, #fde68a 0%, #fcd34d 100%)',
      stat1: 'linear-gradient(135deg, #fde68a 0%, #fcd34d 100%)',
      stat2: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)',
      progress: 'linear-gradient(90deg, #f97316 0%, #fb923c 50%, #fdba74 100%)',
      textMain: '#ea580c',
      textDark: '#c2410c',
      textAccent: '#f97316'
    },
    {
      name: 'Cotton Candy',
      background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 25%, #f9a8d4 50%, #fbcfe8 75%, #fce7f3 100%)',
      primary: '#f9a8d4',
      secondary: '#f472b6',
      light: '#fce7f3',
      card: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 100%)',
      cardInner: 'linear-gradient(180deg, #ffffff 0%, #fdf2f8 100%)',
      captured: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
      locked: 'linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 100%)',
      capturedBadge: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
      lockedBadge: 'linear-gradient(135deg, #f9a8d4 0%, #f472b6 100%)',
      button: 'linear-gradient(135deg, #f9a8d4 0%, #f472b6 100%)',
      page: 'linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 100%)',
      stat1: 'linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 100%)',
      stat2: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
      progress: 'linear-gradient(90deg, #ec4899 0%, #f472b6 50%, #f9a8d4 100%)',
      textMain: '#db2777',
      textDark: '#be185d',
      textAccent: '#ec4899'
    }
  ];

  const theme = themes[currentTheme];

  const changeTheme = () => {
    setCurrentTheme((prev) => (prev + 1) % themes.length);
  };

  const typeColors = {
    normal: { bg: '#A8A878', light: '#C6C6A7', emoji: '⭐' },
    fire: { bg: '#F08030', light: '#F5AC78', emoji: '🔥' },
    water: { bg: '#6890F0', light: '#9DB7F5', emoji: '💧' },
    electric: { bg: '#F8D030', light: '#FAE078', emoji: '⚡' },
    grass: { bg: '#78C850', light: '#A7DB8D', emoji: '🌿' },
    ice: { bg: '#98D8D8', light: '#BCE6E6', emoji: '❄️' },
    fighting: { bg: '#C03028', light: '#D67873', emoji: '👊' },
    poison: { bg: '#A040A0', light: '#C183C1', emoji: '☠️' },
    ground: { bg: '#E0C068', light: '#EBD69D', emoji: '🌍' },
    flying: { bg: '#A890F0', light: '#C6B7F5', emoji: '🕊️' },
    psychic: { bg: '#F85888', light: '#FA92B2', emoji: '🔮' },
    bug: { bg: '#A8B820', light: '#C6D16E', emoji: '🐛' },
    rock: { bg: '#B8A038', light: '#D1C17D', emoji: '🪨' },
    ghost: { bg: '#705898', light: '#A292BC', emoji: '👻' },
    dragon: { bg: '#7038F8', light: '#A27DFA', emoji: '🐉' },
    dark: { bg: '#705848', light: '#A29288', emoji: '🌙' },
    steel: { bg: '#B8B8D0', light: '#D1D1E0', emoji: '⚙️' },
    fairy: { bg: '#EE99AC', light: '#F4BDC9', emoji: '🧚' }
  };

  useEffect(() => {
    fetchPokemon();
    const saved = localStorage.getItem('capturedPokemon');
    if (saved) {
      setCaptured(JSON.parse(saved));
    }
  }, []);

  const fetchPokemon = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      
      const pokemonDetails = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url);
          return res.json();
        })
      );
      
      setPokemon(pokemonDetails);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      setLoading(false);
    }
  };

  const toggleCapture = (id) => {
    const newCaptured = captured.includes(id)
      ? captured.filter(c => c !== id)
      : [...captured, id];
    
    setCaptured(newCaptured);
    localStorage.setItem('capturedPokemon', JSON.stringify(newCaptured));
  };

  // Filter by type
  const filteredPokemon = selectedType === 'all' 
    ? pokemon 
    : pokemon.filter(p => p.types.some(t => t.type.name === selectedType));

  // Get all unique types from pokemon
  const allTypes = ['all', ...new Set(pokemon.flatMap(p => p.types.map(t => t.type.name)))];

  // Pagination
  const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage);
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    setCurrentPage(1); // Reset to first page when filtering
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-all duration-700" style={{
        background: theme.background
      }}>
        <div className="text-center pixel-text">
          <div className="animate-bounce text-6xl mb-4 pixel-emoji">✨</div>
          <p className="text-2xl font-bold pixel-shadow" style={{ color: theme.textMain }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 transition-all duration-700" style={{
      background: theme.background,
      fontFamily: '"Press Start 2P", cursive'
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          
          .pixel-border {
            border: 5px solid ${theme.primary};
            box-shadow: 
              inset -3px -3px 0px ${theme.secondary},
              inset 3px 3px 0px ${theme.light},
              6px 6px 0px rgba(157, 78, 221, 0.4);
            image-rendering: pixelated;
            transition: all 0.7s ease;
          }
          
          .pixel-card {
            border: 4px solid ${theme.primary};
            box-shadow: 
              inset -2px -2px 0px ${theme.primary},
              inset 2px 2px 0px ${theme.light},
              4px 4px 0px rgba(233, 213, 255, 0.5);
            image-rendering: pixelated;
            transition: all 0.7s;
          }
          
          .pixel-card:hover {
            transform: scale(1.08) rotate(-1deg);
            border-color: #f0abfc;
            box-shadow: 
              inset -2px -2px 0px #e879f9,
              inset 2px 2px 0px #fae8ff,
              6px 6px 0px rgba(240, 171, 252, 0.6);
          }
          
          .pixel-button {
            border: 4px solid ${theme.primary};
            box-shadow: 
              inset -3px -3px 0px ${theme.secondary},
              inset 3px 3px 0px ${theme.light},
              4px 4px 0px rgba(157, 78, 221, 0.4);
            transition: all 0.7s;
          }
          
          .pixel-button:hover:not(:disabled) {
            transform: translate(2px, 2px);
            box-shadow: 
              inset -3px -3px 0px #c084fc,
              inset 3px 3px 0px #f5d0fe,
              2px 2px 0px rgba(157, 78, 221, 0.4);
          }
          
          .pixel-button:active:not(:disabled) {
            transform: translate(3px, 3px);
            box-shadow: 
              inset -3px -3px 0px #c084fc,
              inset 3px 3px 0px #f5d0fe,
              1px 1px 0px rgba(157, 78, 221, 0.4);
          }
          
          .pixel-text {
            font-family: "Press Start 2P", cursive;
            text-rendering: optimizeSpeed;
            image-rendering: pixelated;
          }
          
          .pixel-shadow {
            text-shadow: 4px 4px 0px rgba(157, 78, 221, 0.4);
          }
          
          .pokemon-sprite {
            image-rendering: pixelated;
            image-rendering: -moz-crisp-edges;
            image-rendering: crisp-edges;
            filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.25));
          }
          
          .locked-sprite {
            filter: brightness(1.2) sepia(1) hue-rotate(280deg) saturate(0.6) drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.15));
          }
          
          @keyframes sparkle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          .sparkle {
            animation: sparkle 1.5s ease-in-out infinite;
          }
          
          .float {
            animation: float 3s ease-in-out infinite;
          }
          
          .stat-box {
            border: 3px solid ${theme.primary};
            box-shadow: 
              inset -2px -2px 0px ${theme.secondary},
              inset 2px 2px 0px ${theme.light},
              3px 3px 0px rgba(157, 78, 221, 0.3);
            transition: all 0.7s;
          }
          
          .pixel-emoji {
            font-size: inherit;
            image-rendering: pixelated;
            filter: contrast(1.2) brightness(1.1);
            text-rendering: optimizeSpeed;
          }
        `}
      </style>

      <div className="container mx-auto max-w-7xl">
        {/* Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar - Stats */}
          <div className="lg:col-span-3 space-y-4">
            {/* Header Card */}
            <div className="pixel-border rounded-xl p-5 float" style={{
              background: theme.card
            }}>
              <div className="text-center">
                <h1 className="pixel-text pixel-shadow mb-3" style={{
                  color: theme.textMain,
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}>
                  Pokémon
                  <br />
                  Gallery
                </h1>
                <div className="text-5xl mb-2 pixel-emoji">✨</div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="pixel-border rounded-xl p-5" style={{
              background: theme.card
            }}>
              <div className="text-center mb-4">
                <div className="text-4xl mb-2 pixel-emoji">🏆</div>
                <p className="pixel-text" style={{ 
                  fontSize: '10px',
                  color: theme.textMain
                }}>
                  Collection
                </p>
              </div>
              
              <div className="stat-box rounded-lg p-3 mb-3" style={{
                background: theme.page
              }}>
                <p className="pixel-text text-center pixel-shadow" style={{ 
                  color: theme.textAccent,
                  fontSize: '20px'
                }}>
                  {captured.length}/{pokemon.length}
                </p>
              </div>
              
              <div className="w-full h-5 rounded-full pixel-border overflow-hidden mb-3" style={{
                background: theme.locked
              }}>
                <div 
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${(captured.length / pokemon.length) * 100}%`,
                    background: theme.progress,
                    boxShadow: '0 0 15px rgba(168, 139, 250, 0.6)'
                  }}
                />
              </div>
              
              <p className="pixel-text text-center" style={{ 
                fontSize: '8px',
                color: theme.textMain
              }}>
                {Math.round((captured.length / pokemon.length) * 100)}% Complete
              </p>
            </div>

            {/* Stats Cards */}
            <div className="space-y-3">
              <div className="stat-box rounded-lg p-3" style={{
                background: theme.stat1
              }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl pixel-emoji">⭐</span>
                  <div className="flex-1">
                    <p className="pixel-text" style={{ fontSize: '8px', color: theme.textMain }}>
                      Captured
                    </p>
                    <p className="pixel-text" style={{ fontSize: '14px', color: theme.textAccent }}>
                      {captured.length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="stat-box rounded-lg p-3" style={{
                background: theme.stat2
              }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl pixel-emoji">🎯</span>
                  <div className="flex-1">
                    <p className="pixel-text" style={{ fontSize: '8px', color: theme.textMain }}>
                      Remaining
                    </p>
                    <p className="pixel-text" style={{ fontSize: '14px', color: theme.textDark }}>
                      {pokemon.length - captured.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mascots */}
            <div className="flex justify-center gap-3 mt-4">
              <button 
                onClick={changeTheme}
                className="w-12 h-12 rounded-full pixel-border flex items-center justify-center text-2xl sparkle pixel-emoji cursor-pointer hover:scale-110 transition-transform"
                style={{
                  background: theme.stat1
                }}
                title="Change Theme"
              >
                😊
              </button>
              <button 
                onClick={changeTheme}
                className="w-12 h-12 rounded-full pixel-border flex items-center justify-center text-2xl sparkle pixel-emoji cursor-pointer hover:scale-110 transition-transform"
                style={{
                  background: theme.stat2,
                  animationDelay: '0.75s'
                }}
                title="Change Theme"
              >
                😎
              </button>
            </div>
          </div>

          {/* Main Content - Pokemon Grid */}
          <div className="lg:col-span-9">
            {/* Type Filters - Compact Design */}
            <div className="pixel-border rounded-2xl p-3 mb-4" style={{
              background: theme.cardInner
            }}>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                {/* All Button */}
                <button
                  onClick={() => handleTypeFilter('all')}
                  className="pixel-button rounded-lg px-2 py-2 transition-all hover:scale-110"
                  style={{
                    background: selectedType === 'all' ? theme.progress : theme.stat1,
                    border: `3px solid ${theme.primary}`,
                    boxShadow: selectedType === 'all' ? `0 0 10px ${theme.secondary}` : 'none'
                  }}
                  title="All Types"
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="pixel-emoji text-lg">🌈</span>
                    <span className="pixel-text text-white" style={{ fontSize: '6px' }}>
                      all
                    </span>
                  </div>
                </button>

                {/* Type Buttons */}
                {allTypes.filter(t => t !== 'all').map(type => (
                  <button
                    key={type}
                    onClick={() => handleTypeFilter(type)}
                    className="pixel-button rounded-lg px-2 py-2 transition-all hover:scale-110"
                    style={{
                      background: selectedType === type 
                        ? typeColors[type]?.bg 
                        : theme.stat2,
                      border: `3px solid ${selectedType === type ? typeColors[type]?.light : theme.primary}`,
                      boxShadow: selectedType === type ? `0 0 10px ${typeColors[type]?.bg}` : 'none'
                    }}
                    title={type.charAt(0).toUpperCase() + type.slice(1)}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="pixel-emoji text-lg">{typeColors[type]?.emoji}</span>
                      <span className="pixel-text text-white" style={{ fontSize: '6px' }}>
                        {type}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="pixel-border rounded-xl p-6" style={{
              background: theme.card,
              minHeight: '600px'
            }}>
              {/* Grid */}
              <div className="pixel-border rounded-xl p-5 mb-5" style={{
                background: theme.cardInner,
                minHeight: '500px'
              }}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {currentPokemon.map(p => {
                    const isCaptured = captured.includes(p.id);
                    
                    return (
                      <div
                        key={p.id}
                        onClick={() => toggleCapture(p.id)}
                        className="pixel-card rounded-xl cursor-pointer relative group"
                        style={{
                          background: isCaptured ? theme.captured : theme.locked,
                          padding: '12px',
                          aspectRatio: '1'
                        }}
                      >
                        {/* Captured Badge */}
                        {isCaptured && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-lg z-10 sparkle pixel-emoji" style={{
                            background: theme.capturedBadge,
                            border: `3px solid ${theme.light}`,
                            boxShadow: '0 3px 6px rgba(157, 78, 221, 0.4)'
                          }}>
                            ✓
                          </div>
                        )}
                        
                        {/* Locked Badge */}
                        {!isCaptured && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-base z-10 pixel-emoji" style={{
                            background: theme.lockedBadge,
                            border: `3px solid ${theme.light}`,
                            boxShadow: '0 3px 6px rgba(244, 63, 94, 0.4)'
                          }}>
                            🔒
                          </div>
                        )}
                        
                        <img
                          src={p.sprites.front_default}
                          alt={p.name}
                          className={`w-full h-full object-contain pokemon-sprite ${
                            isCaptured ? '' : 'locked-sprite'
                          }`}
                          style={{
                            imageRendering: 'pixelated',
                            imageRendering: '-moz-crisp-edges',
                            imageRendering: 'crisp-edges',
                            transform: 'scale(1.5)',
                            transformOrigin: 'center'
                          }}
                        />
                        
                        {/* Pokemon Info Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-2 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity" style={{
                          background: `linear-gradient(to top, ${theme.textMain}f2, transparent)`
                        }}>
                          <p className="pixel-text text-white text-center capitalize" style={{ fontSize: '8px' }}>
                            {p.name}
                          </p>
                        </div>
                        
                        {/* Pokemon Number */}
                        <div className="absolute top-2 left-2 px-2 py-1 rounded" style={{
                          background: isCaptured ? `${theme.textMain}e6` : `${theme.textAccent}e6`,
                          border: '2px solid white'
                        }}>
                          <span className="pixel-text text-white" style={{ fontSize: '7px' }}>
                            #{p.id.toString().padStart(3, '0')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                {/* Previous Button */}
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="pixel-button rounded-xl px-6 py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  style={{
                    background: currentPage === 1 
                      ? 'linear-gradient(135deg, #d4d4d4 0%, #a3a3a3 100%)' 
                      : theme.button,
                    color: currentPage === 1 ? '#737373' : theme.textDark
                  }}
                >
                  <ChevronLeft size={24} />
                  <span className="pixel-text hidden sm:inline" style={{ fontSize: '10px' }}>
                    Prev
                  </span>
                </button>

                {/* Page Indicator */}
                <div className="pixel-border rounded-xl px-8 py-4" style={{
                  background: theme.page,
                  color: theme.textMain
                }}>
                  <span className="pixel-text" style={{ fontSize: '12px' }}>
                    Page {currentPage} / {totalPages}
                  </span>
                </div>

                {/* Next Button */}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="pixel-button rounded-xl px-6 py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  style={{
                    background: currentPage === totalPages 
                      ? 'linear-gradient(135deg, #d4d4d4 0%, #a3a3a3 100%)' 
                      : theme.button,
                    color: currentPage === totalPages ? '#737373' : theme.textDark
                  }}
                >
                  <span className="pixel-text hidden sm:inline" style={{ fontSize: '10px' }}>
                    Next
                  </span>
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetroPokedex;
