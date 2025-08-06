import React from "react";
import { Layout } from "@sysco/ui-utility";
import { Routes, Route } from "react-router-dom";
import CategoryGrid from "@/CategoryComponents/CategoryGrid"
import { useEffect } from "react";
import { fetchCategories } from "APIs/categoryApis.js";
import { Navbar, Footer } from "@sysco/ui-utility";
import ProductsPage from "./Components/Products/ProductsPage";

const { Content } = Layout;

function App() {
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message || 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content
        style={{
          margin: '24px 16px 0',
          overflow: 'initial',
          padding: '20px',
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: '#fff'
        }}
      >
        {loading && <div>Loading categories...</div>}
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        {!loading && !error && (
          <Routes>
            <Route path="/" element={<CategoryGrid categories={categories} />} />
            <Route path="/search" element={<ProductsPage />} />
            {/* <Route path="/product/:productId" element={<ProductDetail />} /> */}
          </Routes>
        )}
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;
