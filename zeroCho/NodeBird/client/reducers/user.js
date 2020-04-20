const dummyUser = {
	nickname: '엠카이',
	Post: [],
	Followings: [],
	Flolowers: [],
	signUpData: [],
}

export const initialState = {
	isLoggedIn: false,
	user: null,
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const signupAction = data => ({
	type: SIGN_UP_REQUEST,
	data,
});
export const signupSucces = {
	type: SIGN_UP_SUCCESS,
};
export const loginAction = data => ({
	type: LOG_IN_REQUEST,
	data,
});
export const logoutAction = {
	type: LOG_OUT_REQUEST,
};

const reducer = (state = initialState, action) => {
	switch(action.type){
		case LOG_IN_REQUEST: {
			return {
				...state,
				isLoggedIn: true,
				user: dummyUser,
			}
		}
		case LOG_OUT_REQUEST: {
			return {
				...state,
				isLoggedIn: false,
				user: null,
			}
		}
		case SIGN_UP_REQUEST: {
			return {
				...state,
			}
		}
		default: {
			return {
				...state,
				signUpData: action.data,
			}
		}
	}
};

export default reducer;