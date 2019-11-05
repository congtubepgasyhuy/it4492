import React, { createRef } from 'react'
import { debounce } from 'lodash'
import { Input } from 'antd'

export const SearchBox = (props: { onTextChange: (v: string) => any }) => (
    <div className="gx-chat-search-wrapper">
        <div className="gx-search-bar gx-chat-search-bar gx-lt-icon-search-bar-lg">
            <div className="gx-form-group" style={{ maxHeight: 30 }}>
                <Input
                    className="ant-input"
                    type="search"
                    placeholder="Tìm đại lý theo tên"
                    onChange={(e) => props.onTextChange(e.target.value)}
                />
                <span className="gx-search-icon gx-pointer"><i className="icon icon-search" /></span>
            </div>
        </div>
    </div>
)