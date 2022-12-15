import React, { useEffect, useRef, useState } from 'react'
import { useDispatch} from 'react-redux'
import { deleteUser, getUsers,getUserDetail} from '../../Slice/userSlice'
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import {
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import useRequest from "../../Hooks/useRequest"
import Swal from 'sweetalert2';
import { openModalEdit } from '../../Slice/action/modalAction';
import userAPI from '../../Services/userAPI';
const UserManager = () => {
    const { data: users } = useRequest(() => userAPI.getUsers())
    
    const dispacth = useDispatch()
   

    useEffect(() => {
        dispacth(getUsers())
    },
        // eslint-disable-next-line
        []
    )
    const [searchText, setSearchText] = useState("");

    const [searchedColumn, setSearchedColumn] = useState("");

    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div
                style={{
                    padding: 10,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 6,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1890ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const handleDelete = async (userId) => {
        try {
            await dispacth(deleteUser(userId)).unwrap();
            await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    }

    const columns = [
        {
            title: "ID & Name",
            render: (record) => (
                <React.Fragment>
                    {record.userId}
                    <br />
                    {record.name}
                </React.Fragment>
            ),
            responsive: ["xs"],
        },
        {
            title: "ID",
            dataIndex: "userId",
            key: "userId",
            sortDirections: ["descend"],
            sorter: (item2, item1) => item2.userId - item1.userId,
            responsive: ["sm"],
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps("name"),
            sortDirections: ["descend"],
            sorter: (item2, item1) => {
                let name1 = item1.name?.trim().toLowerCase();
                let name2 = item2.name?.trim().toLowerCase();
                if (name2 < name1) {
                    return -1;
                } else {
                    return 1;
                }
            },
            responsive: ["sm"],
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            // eslint-disable-next-line
            render: (t, r) => < img src={`${r.avatar}`} />,
            responsive: ["sm"],
        },
        {
            title: "Email & Phone",
            render: (record) => (
                <React.Fragment>
                    {record.email}
                    <br />
                    {record.phoneNumber}
                </React.Fragment>
            ),
            responsive: ["xs"],
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            ...getColumnSearchProps("email"),
            sortDirections: ["descend"],
            sorter: (item2, item1) => {
                let email1 = item1.email?.trim().toLowerCase();
                let email2 = item2.email?.trim().toLowerCase();
                if (email1 < email2) {
                    return -1;
                } else {
                    return 1;
                }
            },
            responsive: ["sm"],
        },
        {
            title: "Phone number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            responsive: ["sm"],
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <p
                        title="Edit"
                        className="text-success"
                        style={{ fontSize: 20 }}
                        onClick={() => {
                            dispacth(getUserDetail(record.userId))
                            dispacth(openModalEdit(record.userId));
                            
                        }}
                    >
                        <EditOutlined />
                    </p>
                    <p
                        title="Delete"
                        className="text-danger"
                        style={{ fontSize: 20 }}
                        onClick={() => handleDelete(record.userId)}
                    >
                        <DeleteOutlined />
                    </p>
                </Space>
            ),
        },
    ];
    return (
        <div className=' container-fluid mt-1 mb-4'>
            <h3 className='mb-3 text-success font-weight-bold'>User Management</h3>
            <Table
                scroll={{x: 600 , y:600}}
                rowKey={"userId"}
                columns={columns}
                dataSource={users}
            />
            
        </div>
    )
}

export default UserManager