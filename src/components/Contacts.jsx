import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/SSN.png";
import bng from "../assets/background.png";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    (async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
    })();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Chat</h1>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="username">
                    <h2>{contact.username}</h2>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="username">
              <h1>{currentUserName}</h1>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 70% 15%;
  overflow: hidden;
  background-color: #103ea0;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    background-color : #fdfdfdaf;
    img {
      height: 2rem;
      align-items: center;
    }
    h1 {
      color: #103ea0;
      text-transform: uppercase;
      text-align: center;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #fdfdfdaf;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .username {
        h2 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #7573a7bc;
    }
  }

  .current-user {
    background-color: #fdfdfdaf;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h1 {
        color: #103ea0;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;