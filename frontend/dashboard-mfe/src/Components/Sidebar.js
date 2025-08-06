import { Menu, Badge, Typography } from '@sysco/ui-utility';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  CloseCircleOutlined,
} from '@sysco/ui-utility';
import { PRODUCT_STATUS, USER_ROLES } from '../Constants/enums';

const { Text } = Typography;

const Sidebar = ({ 
  activeFilter, 
  onFilterChange, 
  userRole, 
}) => {
  const menuItems = [
    {
      key: PRODUCT_STATUS.ACCEPTED,
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      label: 'Active Products',
    },
    {
      key: PRODUCT_STATUS.PENDING,
      icon: <ClockCircleOutlined style={{ color: '#faad14' }} />,
      label: 'Pending Approval',
    },
    {
      key: PRODUCT_STATUS.REJECTED,
      icon: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
      label: 'Rejected Products',
    }
  ];

return (
    <div style={{ 
        background: '#fff', 
        borderRadius: '8px', 
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        height: 'fit-content',
        minHeight: '400px'
    }}>
        <div style={{ marginBottom: '20px', padding: '0 16px' }}>
            <Typography.Title level={4} style={{ margin: 0, color: '#1a237e' }}>
                {userRole === USER_ROLES.DATA_STEWARD ? 'Product Management' : 'My Products'}
            </Typography.Title>
            <Text style={{ color: '#666', fontSize: '12px' }}>
                {userRole === USER_ROLES.DATA_STEWARD
                    ? 'Manage product approvals'
                    : 'Manage your product listings'
                }
            </Text>
        </div>

        <Menu
            mode="vertical"
            selectedKeys={[activeFilter]}
            onClick={({key}) => onFilterChange(key)}
            style={{ 
                border: 'none',
                background: 'transparent'
            }}
        >
            {menuItems.map(item => (
                <Menu.Item 
                    key={item.key} 
                    icon={item.icon}
                    style={{
                        borderRadius: '6px',
                        margin: '4px 0',
                        height: '48px',
                        lineHeight: '48px',
                        ...(item.style || {})
                    }}
                > {item.label}
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <span>{item.label}</span>
                    </div>
                </Menu.Item>
            ))}
        </Menu>

        {/* <ProductStatistics /> */}
    </div>
);
};

export default Sidebar;
