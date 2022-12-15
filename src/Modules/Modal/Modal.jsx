import React from 'react'
import {Drawer}  from "antd"
import { useDispatch, useSelector } from 'react-redux'
import { closeModalAction } from "../../Slice/action/modalAction"

const Modal = () => {
    const { visible, componentModalContent, title } = useSelector((state) => state.modalEditProjectReducer)
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(closeModalAction())
    }
    return (
        
        <Drawer
            title={title}
            width={"50%"}
            onClose={onClose}
            open={visible}
            bodyStyle={{
                paddingBottom: 80,
            }}>
            {componentModalContent}
        </Drawer>

    )
}

export default Modal