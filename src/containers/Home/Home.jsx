import React, { Component, Fragment } from "react";
import moment from "moment";

// socket
import socketIOClient from "socket.io-client";

// common components
import Spinner from "../../components/Spinner/Spinner";

// actions
import {
  doGetAvatars,
  doGetActiveAvatar,
  doMakeActive,
  doGetMessages,
  doPostMessages,
} from "../../actions/messageActions";

import MessageForm from "./MessageForm";

// css
import "./Home.scss";

const socket_url = process.env.REACT_APP_BASE_API_URL;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatars: [],
      messages: [],
      fetching: true,
      activeAvatar: null,
      isHidden: true,
      socket: {},
      serverError: "",
    };
    this.messagesEndRef = React.createRef(null);
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
  };

  // open socket
  handleSocket = () => {
    const socket = socketIOClient(socket_url, {
      transports: ["websocket"],
      upgrade: false,
    });

    socket.on("connect_error", (err) => {
      console.log("socket connection error");
    });

    socket.on("error", (err) => {
      console.log("socket auth error: ", err);
    });

    socket.on("connect", () => {
      console.log("socket connected...");
      // console.log("socket_id: ", socket.id);
      this.setState({ socket: socket });
      this.getInitialData();
    });

    socket.on("subscribeToRoom", (data) => {
      // console.log("socket data", data);
      const { messages } = this.state;
      if (data && data.id) {
        const found = messages.find((item) => item.id === data.id);
        if (!found) {
          // messages.unshift(data);
          messages.push(data);
          this.setState({ messages });
          this.scrollToBottom();
        }
      }
    });
  };

  // close socket
  handleCloseSocket = () => {
    const { socket } = this.state;
    socket.off("subscribeToRoom");
    socket.disconnect();
  };

  getMessages = async () => {
    try {
      const messages = await doGetMessages();
      this.setState({ messages });
      this.scrollToBottom();
    } catch (error) {
      this.setState({ serverError: error.message });
    }
  };

  getInitialData = async () => {
    const { socket } = this.state;
    const socketId = socket.id;
    try {
      const activeAvatar = await doGetActiveAvatar(socketId);
      if (!activeAvatar) {
        const avatars = await doGetAvatars();
        this.setState({ avatars: avatars });
      } else {
        this.setState({ activeAvatar });
        this.getMessages();
      }
      this.setState({ fetching: false });
    } catch (error) {
      this.setState({ serverError: error.message, fetching: false });
    }
  };

  componentDidMount() {
    // this.getInitialData();
    this.handleSocket();
  }

  componentWillUnmount() {
    this.handleCloseSocket();
  }

  handleAvatar = async (id) => {
    const { socket } = this.state;
    const socketId = socket.id || "";
    try {
      const res = await doMakeActive(id, socketId);
      this.setState({ activeAvatar: res, isHidden: false });
      this.getMessages();
    } catch (error) {
      this.setState({ serverError: error.message });
    }
  };

  handleSubmit = async (values) => {
    const { activeAvatar } = this.state;
    values.id = activeAvatar.id;
    try {
      await doPostMessages(values);
    } catch (error) {
      this.setState({ serverError: error.message });
    }
  };

  render() {
    const { avatars, fetching, activeAvatar, messages, isHidden, serverError } = this.state;

    return (
      <Fragment>
        <section id="home">
          <div className="container">
            {!activeAvatar ? (
              <Fragment>
                <div className="row mt-4 mb-4">
                  {fetching && (
                    <div className="col-md-12 p-2">
                      <Spinner />
                    </div>
                  )}

                  {fetching && avatars.length === 0 && (
                    <div className="col-md-12 p-2">No avatars available</div>
                  )}

                  {!fetching &&
                    avatars.map((avatar) => {
                      return (
                        <div key={avatar.id} className="col p-2">
                          <div
                            className="user_card mt-2"
                            onClick={() => this.handleAvatar(avatar.id)}
                          >
                            <img className="user_image" alt="img" src={avatar.image_url} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="row mt-5 mb-4">
                  <div className="col-md-8">
                    <div className="msg_container">
                      {messages.map((msg) => {
                        return (
                          <div key={msg.id} className="d-flex flex-row msg_body">
                            <img alt="img" src={msg.avatar.image_url} />
                            <div className="pl-2">
                              <div className="text-muted time">{`${moment(
                                msg.timestamp
                              ).fromNow()}`}</div>
                              <div>{msg.message}</div>
                            </div>
                          </div>
                        );
                      })}
                      <span ref={this.messagesEndRef}> </span>
                    </div>
                    {!isHidden && <MessageForm handleSubmit={this.handleSubmit} />}
                  </div>
                </div>
              </Fragment>
            )}

            {serverError && <div className="text-danger mt-2 mb-2 text-center">{serverError}</div>}
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Home;
