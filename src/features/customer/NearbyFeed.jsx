import React, { useEffect, useMemo, useState } from 'react';
import { ProviderCard } from '../../components/marketplace/ProviderCard';
// import { useLocationContext } from '../../contexts/LocationContext';
// import { getNearbyProviders } from '../../services/dbService';
// import { calculateDistance } from '../../utils/distance'; // Haversine formula

const CATEGORIES = [
  'All',
  'Home Repair',
  'Cleaning',
  'Tutoring & Lessons',
  'Pet Care',
  'Beauty & Wellness',
  'Moving & Hauling',
];

const MOCK_PROVIDERS = [
  { id: '1', name: 'Rahul Menon', category: 'Home Repair', rating: 4.8, reviewCount: 132, distanceMinutes: 9, startingPrice: 350 },
  { id: '2', name: 'Kavya Shetty', category: 'Cleaning', rating: 4.9, reviewCount: 88, distanceMinutes: 6, startingPrice: 400 },
  { id: '3', name: 'Imran Baig', category: 'Pet Care', rating: 4.7, reviewCount: 54, distanceMinutes: 5, startingPrice: 200 },
  { id: '4', name: 'Sneha Kamath', category: 'Beauty & Wellness', rating: 4.6, reviewCount: 71, distanceMinutes: 11, startingPrice: 300 },
  { id: '5', name: 'Deepak Rao', category: 'Moving & Hauling', rating: 4.5, reviewCount: 39, distanceMinutes: 14, startingPrice: 500 },
  { id: '6', name: 'Ananya Pai', category: 'Tutoring & Lessons', rating: 4.9, reviewCount: 46, distanceMinutes: 8, startingPrice: 250 },
  { id: '7', name: 'Vikram Nayak', category: 'Home Repair', rating: 4.6, reviewCount: 63, distanceMinutes: 17, startingPrice: 300 },
  { id: '8', name: 'Farhan Sheikh', category: 'Cleaning', rating: 4.4, reviewCount: 29, distanceMinutes: 19, startingPrice: 350 },
];

export const NearbyFeed = () => {
  // const { coords } = useLocationContext();
  const [isLoading, setIsLoading] = useState(true);
  const [providers, setProviders] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsLoading(true);
    // Placeholder fetch — replace with:
    // getNearbyProviders(coords).then((list) => {
    //   const withDistance = list.map((p) => ({
    //     ...p,
    //     distanceMinutes: calculateDistance(coords, p.coords),
    //   })).sort((a, b) => a.distanceMinutes - b.distanceMinutes);
    //   setProviders(withDistance);
    //   setIsLoading(false);
    // });
    const timer = setTimeout(() => {
      setProviders([...MOCK_PROVIDERS].sort((a, b) => a.distanceMinutes - b.distanceMinutes));
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
        || p.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [providers, activeCategory, searchTerm]);

  return (
    <div className="bw-feed">
      <div className="bw-feed-controls">
        <div className="bw-search-wrap">
          <span className="bw-search-icon">&#9906;</span>
          <input
            type="text"
            className="bw-search-input"
            placeholder="Search for a service or pro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span className="bw-sort-note">Sorted by distance</span>
      </div>

      <div className="bw-chip-row bw-category-chip-row">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={`bw-chip ${activeCategory === category ? 'bw-chip-selected' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="bw-feed-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bw-skeleton bw-skeleton-card" />
          ))}
        </div>
      ) : filteredProviders.length === 0 ? (
        <div className="bw-empty-state">
          <h3>No pros found nearby</h3>
          <p>Try a different category or search term.</p>
        </div>
      ) : (
        <div className="bw-feed-grid">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      )}
    </div>
  );
};