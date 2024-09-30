import React, { useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useReddit } from "../contexts/RedditContext";
import { MdOutlineCancel, GiCancel } from "react-icons/md";
import { supabase } from "../../../lib/supabaseClient";

function CreatePost() {
	const [subreddit, setSubreddit] = useState();
	const [title, setTitle] = useState(null);
	const [imgVid, setImgVid] = useState(null);
	const [details, setDetails] = useState(null);
	const [image, setImage] = useState(null);

	const { fetchSubreddits, subreddits, showCreatePostsModal, setShowCreatePostsModal, dateCreatedParse, checkUserAuthenticated, authorUser } = useReddit();

	// useEffect(() => {
	// 	console.log(`showCreatePostsModal is set to ${showCreatePostsModal}`);
	// }, [showCreatePostsModal]);

	const handleSubmit = async () => {

		const user = await checkUserAuthenticated();
		console.log('handle: ', user)
		if (!user) {
		  return alert('Please Sign In First');

		}

		const { data, error } = await supabase
			.from("posts")
			.insert([{ subreddit: subreddit, title: title, content: details, upvotes: 1, downvotes: 0, postPic: imgVid, author: authorUser.user_metadata.username }])
			.select();

			if (error) {
				console.error('Error inserting data:', error);
				return;
			  }

		console.log(data);
		setShowCreatePostsModal(false);
		window.location.reload()
	};

	useEffect(() => {
		console.log(`subreddits: `, subreddits)
		if (subreddits?.length > 0) {
			setSubreddit(subreddits[0].name);
		} 
	}, [subreddits])

	if (showCreatePostsModal === false) {
		return null;
	} else
		return (
			<div className="fixed inset-0 flex items-center justify-center z-50">
				<div
					className="fixed inset-0 bg-black opacity-65"
					onClick={() => setShowCreatePostsModal(false)}></div>
				<div className="bg-neutral-800 p-6 rounded-3xl drop-shadow-6xl z-10 w-11/12 max-w-lg border border-2 border-neutral-700">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl">Create Post</h2>
						<div className="flex justify-center aling-center p-2 rounded-full hover:bg-neutral-900">
							<button
								className=""
								onClick={() => setShowCreatePostsModal(false)}>
								<MdOutlineCancel size={"24"} />
							</button>
						</div>
					</div>
					<hr className="my-4 border-t-2 border-neutral-600"></hr>
					<div className="flex flex-row mb-4">
						<label className="flex flex-row items-center">Subreddit</label>
						<div className="w-full h-full flex flex-row items-center justify-end">
							<select
								value={subreddit}
								//defaultValue={subreddit[0].name}
								onChange={(e) => setSubreddit(e.target.value)}
								className="flex flex-row bg-neutral-600 w-1/2 mt-1 p-2 rounded-xl">
								{subreddits?.map((indiv) => (
									<option
										value={indiv.name}
										key={indiv.id}>
										{indiv.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<hr className="my-4 border-t-1 border-neutral-700"></hr>
					<div className="mb-4">
						<label className="">Title</label>
						<input
							className="bg-neutral-700 text-white w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
							type="text"
							placeholder="Enter a Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<hr className="my-4 border-t-1 border-neutral-700"></hr>
					<div className="mb-4">
						<label className="">Image / Video (optional)</label>
						<input
							className="bg-neutral-700 w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
							type="url"
							placeholder="Enter a URL"
							value={imgVid}
							onChange={(e) => {
								setImgVid(e.target.value);
							}}
						/>
					</div>
					<hr className="my-4 border-t-1 border-neutral-700"></hr>
					<div className="mb-4">
						<label className="">Content</label>
						<ReactTextareaAutosize
							className="bg-neutral-700 w-full mt-1 p-2 rounded-xl resize-none placeholder:text-neutral-500"
							placeholder="Enter Content"
							onChange={(e) => setDetails(e.target.value)}
						/>
					</div>
					<hr className="flex flex-row items-center align-center justify-center my-4 border-t-1 border-neutral-700"></hr>
					<button
						className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-2xl px-10"
						onClick={() => handleSubmit()}>
						Submit
					</button>
				</div>
			</div>
		);
}

export default CreatePost;
