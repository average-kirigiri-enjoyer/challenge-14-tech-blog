//imports comment model
const {Comment} = require('../models');

const commentData =
[
	{
		text: 'COMMENT!',
		date: '2024-09-10',
		user_id: 1,
		user_name: 'HAHAHAHA',
		post_id: 1,
	},
	{
		text: 'NEW COMMENT!',
		date: '2023-08-11',
		user_id: 2,
		user_name: 'username',
		post_id: 1,
	},
	{
		text: 'ANOTHER NEW COMMENT!',
		date: '2023-11-12',
		user_id: 2,
		user_name: 'username',
		post_id: 2,
	},
	{
		text: 'MORE NEW COMMENT!!!',
		date: '2024-12-12',
		user_id: 3,
		user_name: 'test',
		post_id: 3,
	},
];

//bulk-creates comment data in database
const commentSeeds = () => Comment.bulkCreate(commentData);

module.exports = commentSeeds;