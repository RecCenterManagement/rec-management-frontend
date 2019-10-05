
// Authentication action constants
export const LOGIN = 'authentication/LOGIN'
export const GET_SESSION = 'authentication/GET_SESSION'
export const LOGOUT = 'authentication/LOGOUT'
export const CLEAR_AUTH = 'authentication/CLEAR_AUTH'
export const ERROR_MESSAGE = 'authentication/ERROR_MESSAGE'

export const getSession = () => async (dispatch, getState) => {
    await dispatch({
        type: GET_SESSION,
        payload: axios.get('api/account')
    });

    //const { account } = getState().authentication;
    //if (account && account.langKey) {
    //  const langKey = Storage.session.get('locale', account.langKey);
    //  await dispatch(setLocale(langKey));
    //}
};

export const displayAuthError = message => ({ ERROR_MESSAGE, message });

export const login = (username, password, rememberMe = false) => async (dispatch, getState) => {
    const result = await dispatch({
        type: LOGIN,
        payload: axios.post('api/authenticate', { username, password, rememberMe })
    });
    const bearerToken = result.value.headers.authorization;
    console.log(bearerToken)
    //if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
    //    const jwt = bearerToken.slice(7, bearerToken.length);
    //    if (rememberMe) {
    //        Storage.local.set(AUTH_TOKEN_KEY, jwt);
    //    } else {
    //        Storage.session.set(AUTH_TOKEN_KEY, jwt);
    //    }
    //}
    await dispatch(getSession());
};
