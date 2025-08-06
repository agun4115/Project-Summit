import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const SearchBar = ({ onSearch, placeholder = "Search products..." }) => {
  const handleSearch = (value) => {
    console.log('Search:', value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div
      style={{
        display: 'flex', 
        alignItems: 'center',
        flex: 1,
        maxWidth: '500px',
        margin: '0 32px',
      }}
    >
      <Search
        placeholder={placeholder}
        allowClear
        enterButton={
          <Button
            type="primary"
            icon={<SearchOutlined />}
            style={{
              backgroundColor: '#1890ff',
              borderColor: '#1890ff',
            }}
          />
        }
        size="large"
        onSearch={handleSearch}
        style={{
          borderRadius: '8px',
        }}
      />
    </div>
  );
};

export default SearchBar;
