// Anything exported from this file is importable by other in-browser modules.
export { default as Navbar } from './Components/Layout/Navbar';
export { default as Footer } from './Components/Layout/Footer';

// Re-export only the Ant Design components we use
export { 
  Layout, 
  Row, 
  Col, 
  Card, 
  Input, 
  InputNumber,
  Avatar, 
  Space, 
  Button,
  Typography,
  Select,
  Pagination,
  Spin,
  Empty,
  Divider,
  Form,
  Badge,
  Alert,
  Modal,
  Upload,
  Image,
  Tag,
  Menu,
  message
} from 'antd';

export {
    UserOutlined, 
    LogoutOutlined, 
    EditOutlined,
    ShoppingCartOutlined,
    DeleteOutlined,
    CheckOutlined,
    CloseOutlined,
    EyeOutlined,
    PlusOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
export function publicApiFunction() {}
