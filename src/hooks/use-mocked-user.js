export const useMockedUser = () => {
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  return {
    id: '5e86809283e28b96d2d38537',
    avatar: '/assets/avatars/avatar-anika-visser.png',
    name: window.sessionStorage.getItem('userName'),
    email: window.sessionStorage.getItem('userName')
  };
};
