import React, { useState } from 'react'
import { Upload, Icon, message, Spin } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { API } from '../../api/API';
import { UploadFile } from 'antd/lib/upload/interface';
import { with_app_chat_state } from '../../store/chat';

type UploadResult = {
  data: {
    image: string,
    image_fullsize: string,
    image_name: string
  },
  message: string,
  result: 0 | 1

}

export const UploadImageList = with_app_chat_state<{ onClose: Function }>(props => {
  const [preview_url, set_preview_url] = useState<string | null>(null)
  const [loading, set_Loading] = useState<boolean>(false)

  return (
    <Upload
      name="image"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      headers={{
        'Authorization': `Bearer ${API.access_token}`,
      }}
      action="https://qly.prettypaint.com.vn/api/v1/upload"
      beforeUpload={file => {
        set_Loading(true)
        set_preview_url(URL.createObjectURL(file))
        return true
      }}
      onSuccess={({ data, message, result }: UploadResult) => {
        if (result == 0) {
          alert('Không thể gửi ảnh')
          return
        }
        set_preview_url(null)
        set_Loading(false)
        props.store.send_image(
          data.image_name,
          data.image,
          data.image_fullsize
        )
        props.onClose()
      }}
    >
      <Spin spinning={loading}>
        {
          preview_url ? <img src={preview_url} /> : (
            <div>
              <Icon type={loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          )
        }
      </Spin>
    </Upload>
  )
})