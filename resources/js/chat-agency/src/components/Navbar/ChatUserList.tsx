import React, { useState } from "react";
import { UserCell } from "./UserCell";
import { SearchBox } from "./SearchBox";
import { CustomScrollbars } from "../Layout/CustomScrollbars";
import { UserInfo } from "./UserInfo";
import { with_app_chat_state } from "../../store/chat";


export const ChatUserList = with_app_chat_state((props) => {

  const [search, set_search] = useState<string>('')


  return (
    <div className="gx-chat-sidenav gx-d-none gx-d-lg-flex">
      <div className="gx-chat-sidenav-main">

        <div className="gx-chat-sidenav-header">

          <UserInfo />
          <SearchBox onTextChange={set_search} />

        </div>

        <div className="gx-chat-sidenav-content">
          <CustomScrollbars className="gx-chat-sidenav-scroll-tab-1">

            <div className="gx-chat-user">
              {
                
                props.store.conversations.filter(c => c.name.toLowerCase().includes(
                  search.toLowerCase()
                )).map((chat, index) =>
                <UserCell
                  conversation={chat}
                  key={index}
                  onClick={() => props.store.load_message(chat.id)} />
              )}
            </div>



          </CustomScrollbars>
        </div>


      </div>
    </div>
  )
})
