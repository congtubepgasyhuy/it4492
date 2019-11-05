import React from "react";
import { Avatar } from "antd";


export const UserInfo = () => (
  <div className="gx-chat-user-hd">

    <div className="gx-chat-avatar gx-mr-3">
      <div className="gx-status-pos">
        <Avatar src='https://cdn4.iconfinder.com/data/icons/avatars-circle-2/72/146-512.png'
          className="gx-size-50"
          alt="" />
      </div>
    </div>

    <div className="gx-module-user-info gx-flex-column gx-justify-content-center">
      <div className="gx-module-title">
        <h5 className="gx-mb-0">Admin</h5>
      </div>
      <div className="gx-module-user-detail">
        <span className="gx-text-grey gx-link">admin@prettypaint.com.vn</span>
      </div>
    </div>
  </div>

)