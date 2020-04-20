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

export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const signupAction = (data) => {
	return {
		type: SIGN_UP,
		data,
	}
}
export const loginAction = {
	type: LOG_IN,
}
export const logoutAction = {
	type: LOG_OUT,
}

const reducer = (state = initialState, action) => {
	switch(action.type){
		case LOG_IN: {
			return {
				...state,
				isLoggedIn: true,
				user: dummyUser,
			}
		}
		case LOG_OUT: {
			return {
				...state,
				isLoggedIn: false,
				user: null,
			}
		}
		case SIGN_UP: {
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