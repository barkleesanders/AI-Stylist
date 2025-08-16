
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { MonetizationPage } from './pages/MonetizationPage';
import { ContentCreatorPage } from './pages/ContentCreatorPage';
import { StyleOutPage } from './pages/StyleOutPage';
import { MoodBoardPage } from './pages/MoodBoardPage';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/monetization" element={<MonetizationPage />} />
          <Route path="/content-creator" element={<ContentCreatorPage />} />
          <Route path="/style-out" element={<StyleOutPage />} />
          <Route path="/mood-board" element={<MoodBoardPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
