import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Tag, Statistic, Card, Row, Col } from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { adminService } from '../../services/adminService';
import './Users.css';

const { Column } = Table;
const { Option } = Select;

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [stats, setStats] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [pagination.current]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllUsers({
        page: pagination.current,
        limit: pagination.pageSize
      });
      setUsers(response.users);
      setPagination({
        ...pagination,
        total: response.total
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await adminService.getUserStats();
      setStats(response);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleUpdateUser = (values) => {
    // Handle update user
    console.log('Update user:', values);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await adminService.deleteUser(userId);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="admin-users">
      <h1>Quản lý người dùng</h1>
      
      {/* Statistics */}
      {stats && (
        <Row gutter={[16, 16]} className="stats-row">
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng số người dùng"
                value={stats.totalUsers}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Admin"
                value={stats.totalAdmins}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Người dùng hoạt động"
                value={stats.activeUsers}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Đăng ký hôm nay"
                value={stats.newUsersToday}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Users Table */}
      <Table
        dataSource={users}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="_id"
      >
        <Column
          title="Họ tên"
          dataIndex="name"
          key="name"
          render={(text, record) => (
            <div className="user-info">
              <div className="user-name">{text}</div>
              <div className="user-email">{record.email}</div>
            </div>
          )}
        />
        <Column
          title="Số điện thoại"
          dataIndex="phone"
          key="phone"
          render={(phone) => (
            <span>
              <PhoneOutlined /> {phone}
            </span>
          )}
        />
        <Column
          title="Vai trò"
          dataIndex="role"
          key="role"
          render={(role) => (
            <Tag color={role === 'admin' ? 'red' : 'blue'}>
              {role === 'admin' ? 'Admin' : 'User'}
            </Tag>
          )}
        />
        <Column
          title="Trạng thái"
          dataIndex="isActive"
          key="isActive"
          render={(isActive) => (
            <Tag color={isActive ? 'green' : 'red'}>
              {isActive ? 'Hoạt động' : 'Đã khóa'}
            </Tag>
          )}
        />
        <Column
          title="Ngày đăng ký"
          dataIndex="createdAt"
          key="createdAt"
          render={(date) => (
            <span>
              <CalendarOutlined /> {new Date(date).toLocaleDateString('vi-VN')}
            </span>
          )}
        />
        <Column
          title="Thao tác"
          key="action"
          render={(_, record) => (
            <div className="action-buttons">
              <Button
                type="link"
                icon={<EyeOutlined />}
                onClick={() => handleViewUser(record)}
              >
                Xem
              </Button>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => handleViewUser(record)}
              >
                Sửa
              </Button>
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteUser(record._id)}
              >
                Xóa
              </Button>
            </div>
          )}
        />
      </Table>

      {/* User Detail Modal */}
      <Modal
        title="Chi tiết người dùng"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedUser && (
          <Form
            form={form}
            layout="vertical"
            initialValues={selectedUser}
            onFinish={handleUpdateUser}
          >
            <Form.Item label="Họ tên" name="name">
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            
            <Form.Item label="Email" name="email">
              <Input prefix={<MailOutlined />} disabled />
            </Form.Item>
            
            <Form.Item label="Số điện thoại" name="phone">
              <Input prefix={<PhoneOutlined />} />
            </Form.Item>
            
            <Form.Item label="Vai trò" name="role">
              <Select>
                <Option value="user">Người dùng</Option>
                <Option value="admin">Quản trị viên</Option>
              </Select>
            </Form.Item>
            
            <Form.Item label="Trạng thái" name="isActive">
              <Select>
                <Option value={true}>Hoạt động</Option>
                <Option value={false}>Đã khóa</Option>
              </Select>
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default AdminUsers;