import { createMachine, assign } from "xstate";

/*
This will allow for smooth control of the authentication. 
After a user sends credentials and gets tokens, 
LOGIN will be triggered right after to authenticate user again and then set the context
*/

export const authMachine = createMachine(
  {
    id: "authentication",
    initial: "init",
    context: {
      user: {},
      error: {},
    },
    states: {
      init: {
        always: [
          {
            target: "visitor",
          },
        ],
      },
      visitor: {
        //Delete LocalStorage and Clear Cookies
        on: {
          LOGIN_CLIENT: [{ target: "client" }],
        },
        on: {
          LOGIN_ADMINISTRATOR: [{ target: "administrator" }],
        },
        on: {
          LOGIN_DRIVER: [{ target: "driver" }],
        },
      },
      client: {
        on: {
          LOGOUT: { target: "visitor", actions: ["clearUserInfo"] },
        },
      },
      administrator: {
        on: {
          LOGOUT: { target: "visitor", actions: ["clearUserInfo"] },
        },
      },
      driver: {
        on: {
          LOGOUT: { target: "visitor", actions: ["clearUserInfo"] },
        },
      },
    },
  },
  {
    actions: {
      clearUserInfo: (context) => {
        //Clear LocalStorage, Cookies etc
      },
    },
  }
);
