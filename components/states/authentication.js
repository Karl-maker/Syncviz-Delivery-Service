import { createMachine, assign } from "xstate";
function authenticateUser() {
  return {};
}

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
      authenticate: {
        invoke: {
          src: (context, event) => authenticateUser(),
          onDone: {
            target: "business_admin",
            actions: assign({
              user: (context, event) => event.data,
            }),
          },
          onError: {
            target: "visitor",
            actions: assign({
              error: (context, event) => event.data,
            }),
          },
        },
      },
      visitor: {
        //Delete LocalStorage and Clear Cookies
        on: {
          LOGIN: [{ target: "authenticate" }],
        },
      },
      business_admin: {
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
