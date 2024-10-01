"use client";

import React from "react";
import { useReddit } from "../contexts/RedditContext";
import { TiArrowUpOutline, TiArrowDownOutline, TiMessage } from "react-icons/ti";
import { useEffect } from "react";
import { comment } from "postcss";
import { useState } from "react";

function CommentsButton({id, title, content, author, postPic, subreddit, created, file, upload}) {

    const {setComments, comments, setShowComPage, showComPage, setShowComPage2} = useReddit()

	// useEffect(() => {
	// 	//handleClick()
	// 	console.log('handle click run')
	// 	console.log(comments)
	// }, [comments]);

	useEffect(() => {
		//handleClick()
		console.log('handle click run')
		console.log(comments)
	}, [comments]);

	function handleClick () {
		setComments({commentId: id, commentTitle: title, commentContent: content, commentAuthor: author, commentPic: postPic, commentSubreddit: subreddit, commentCreated: created, commentFile: file, commentUpload: upload })
		console.log('handleClick : ', comments)
	}

	useEffect(() => {
		console.log(`button showComPage: `, showComPage)
		setShowComPage2(true)
	}, [showComPage])


	return (
		<>
			<button
				className="flex h-8 w-8 rounded-full flex items-center justify-center"
				onClick={() => { handleClick()
					setShowComPage(true)
				}}>
				<TiMessage size={'18'}/>
			</button>
		</>
	);
}

export default CommentsButton;
