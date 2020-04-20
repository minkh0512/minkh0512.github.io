export const initialState = {
	mainPosts: [{
		User: {
      id: 1,
      nickname: '엠카이',
    },
    content: '처음올려봐요',
    img: 'https://previews.123rf.com/images/aquir/aquir1311/aquir131100316/23569861-sample-grunge-red-round-stamp.jpg',
	}],
	imagePaths: [],
};

export const ADD_POST = 'ADD_POST';
export const ADD_DUMMY = 'ADD_DUMMY';

const addPost = {
	type: ADD_POST,
};
const addDummy = {
	type: ADD_DUMMY,
	data: {
		constent: 'Hello',
		UserId: 1,
		User: {
			nickname: '엠카이',
		}
	}
};

const reducer = ( state = initialState, action ) => {
	switch(action.type){
		case ADD_POST: {
			return {
				...state,

			}
		}
		case ADD_DUMMY: {
			return {
				...state,
				mainPosts: [
					action.data, 
					...state.mainPosts,
				],
			}
		}
		default: {
			return {
				...state,
			}
		}
	}
}

export default reducer;