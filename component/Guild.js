import React from "react";
import { Card, Avatar, Image, Badge, Form } from "antd";
import { MdCircle } from "react-icons/md";

function Guild() {
  const user = [
    {
      userId: 1,
      userName: "동영",
      userImage: "",
    },
    {
      userId: 2,
      userName: "재현",
      userImage: "",
    },
    {
      userId: 3,
      userName: "현종",
      userImage: "",
    },
    {
      userId: 4,
      userName: "새별",
      userImage: "",
    },
    {
      userId: 5,
      userName: "세준",
      userImage: "",
    },
    {
      userId: 6,
      userName: "대영",
      userImage: "",
    },
    {
      userId: 6,
      userName: "대영",
      userImage: "",
    },
    {
      userId: 6,
      userName: "대영",
      userImage: "",
    },
  ];
  return (
    <div>
      {/* <div style={{position:'fixed',marginTop:425,marginLeft:55}}>현재운동중</div> */}
      <Card
        style={{
          width: 200,
          height: 400,
          //   marginLeft: 50,
          borderRadius: 30,
          //   position: "fixed",
          borderBottomWidth: 1,
          overflow: "auto",
        }}
        bordered={false}
      >
        <div>
          {user.map((v) => (
            <div style={{ marginBottom: 20 }}>
              <Badge dot color={"green"}>
                <Avatar
                  size={35}
                  src={
                    <Image
                      src="https://joeschmoe.io/api/v1/random"
                      style={{ width: 50 }}
                    />
                  }
                  shape="square"
                />
              </Badge>

              <span style={{ marginLeft: 50 }}>{v.userName}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Guild;
