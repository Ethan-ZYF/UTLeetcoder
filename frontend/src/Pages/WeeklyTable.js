import React, { useState } from 'react';
import { Layout, Row, Col, Typography, theme, Image } from 'antd';
import { getUsers, getWeeks } from '../component/utils';
import { DownOutlined, CalendarOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import WeeklyLog from '../component/WeeklyLog';
import github from '../github-mark/github-mark.png';

const { Header, Content } = Layout;
const getItem = (label, key) => {
    return {
        label,
        key,
        icon: <CalendarOutlined />
    };
};

const defaultContent = '';

const WeeklyTable = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    
    const [users, setUsers] = useState(() => {
        getUsers().then((res) => {
            setUsers(res.data);
        });
        return [];
    });
    const [content, setContent] = useState(defaultContent);
    const [parsed, setParsed] = useState('');
    const [weeks, setWeeks] = useState(() => {
        getWeeks().then((res) => {
            setWeeks(res.data);
            setContent(res.data[0]);
            const [year, week] =res.data[0].split('-');
            setParsed(`Statistics for Week ${week} of ${year}`);
        });
        return [];
    });
    const items = weeks.map((week) => {
        return getItem(week, week);
    });

    const handleMenuClick = (e) => {
        if (e.key !== defaultContent) {
            setContent(e.key);
            const [year, week] = e.key.split('-');
            setParsed(`Statistics for Week ${week} of ${year}`);
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <>
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
            >
                <Row
                    style={{
                        height: '100%',
                    }}
                >
                    <Col span={20}
                        style={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                    >
                        <Typography.Title
                            style={{
                                color: 'black',
                                marginLeft: 16,
                                marginTop: 'auto',
                                marginBottom: 'auto',
                            }}
                            level={3}
                        >
                            {parsed}
                        </Typography.Title>
                    </Col>
                    <Col span={4}
                        style={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            padding: 16,
                        }}
                    >
                        <Image
                            preview={false}
                            width={45}
                            height={45}
                            src={github}
                            style={{
                                display: 'block',
                            }}
                            onMouseEnter={() => {
                                document.body.style.cursor = 'pointer';
                            }}
                            onMouseLeave={() => {
                                document.body.style.cursor = 'default';
                            }}
                            onClick={() => {
                                // window.location.href = 'https://github.com/Ethan-ZYF/UTLeetcoder';
                                // open a new tab
                                window.open(
                                    'https://github.com/Ethan-ZYF/UTLeetcoder'
                                );
                            }}
                        />
                    </Col>
                </Row>
            </Header>
            <Content
                style={{
                    margin: '16px 16px',
                }}
            >
                <Space wrap>
                    <Dropdown menu={menuProps} >
                        <Button>
                            <Space>
                                {content}
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </Space>
                <WeeklyLog week={content} users={users} />
            </Content>
        </>

    );
}

export default WeeklyTable;