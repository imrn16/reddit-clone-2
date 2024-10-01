// import React, { useEffect, useState } from "react";
// import ReactTextareaAutosize from "react-textarea-autosize";
// import { useReddit } from "../contexts/RedditContext";
// import { MdOutlineCancel, GiCancel } from "react-icons/md";
// import { supabase } from "../../../lib/supabaseClient";

// function CreatePost() {
// 	const [subreddit, setSubreddit] = useState();
// 	const [title, setTitle] = useState(null);
// 	const [imgVid, setImgVid] = useState(null);
// 	const [details, setDetails] = useState(null);
// 	const [image, setImage] = useState(null);

// 	const { fetchSubreddits, subreddits, showCreatePostsModal, setShowCreatePostsModal, dateCreatedParse, checkUserAuthenticated, authorUser } = useReddit();

// 	// useEffect(() => {
// 	// 	console.log(`showCreatePostsModal is set to ${showCreatePostsModal}`);
// 	// }, [showCreatePostsModal]);

// 	const handleSubmit = async () => {

// 		const user = await checkUserAuthenticated();
// 		console.log('handle: ', user)
// 		if (!user) {
// 		  return alert('Please Sign In First');

// 		}

// 		const { data, error } = await supabase
// 			.from("posts")
// 			.insert([{ subreddit: subreddit, title: title, content: details, upvotes: 1, downvotes: 0, postPic: imgVid, author: authorUser.user_metadata.username, image: image }])
// 			.select();

// 			if (error) {
// 				console.error('Error inserting data:', error);
// 				return;
// 			  }

// 		console.log(data);
// 		setShowCreatePostsModal(false);
// 		window.location.reload()
// 	};

// 	// const [file, setFile] = useState(null);

// 	const handleFileChange = (event) => {
// 	  const file = event.target.files[0];
// 	  if (file) {
// 		setImage(URL.createObjectURL(file));
// 	  }
// 	};

// 	const handleButtonClick = () => {
// 		document.getElementById('fileInput').click();
// 	  };

// 	useEffect(() => {
// 		console.log(`subreddits: `, subreddits)
// 		if (subreddits?.length > 0) {
// 			setSubreddit(subreddits[0].name);
// 		}
// 	}, [subreddits])

// 	if (showCreatePostsModal === false) {
// 		return null;
// 	} else
// 		return (
// 			<div className="fixed inset-0 flex items-center justify-center z-50">
// 				<div
// 					className="fixed inset-0 bg-black opacity-65"
// 					onClick={() => setShowCreatePostsModal(false)}></div>
// 				<div className="bg-neutral-800 p-6 rounded-3xl drop-shadow-6xl z-10 w-11/12 max-w-lg border border-2 border-neutral-700">
// 					<div className="flex justify-between items-center mb-4">
// 						<h2 className="text-xl">Create Post</h2>
// 						<div className="flex justify-center aling-center p-2 rounded-full hover:bg-neutral-900">
// 							<button
// 								className=""
// 								onClick={() => setShowCreatePostsModal(false)}>
// 								<MdOutlineCancel size={"24"} />
// 							</button>
// 						</div>
// 					</div>
// 					<hr className="my-4 border-t-2 border-neutral-600"></hr>
// 					<div className="flex flex-row mb-4">
// 						<label className="flex flex-row items-center">Subreddit</label>
// 						<div className="w-full h-full flex flex-row items-center justify-end">
// 							<select
// 								value={subreddit}
// 								//defaultValue={subreddit[0].name}
// 								onChange={(e) => setSubreddit(e.target.value)}
// 								className="flex flex-row bg-neutral-600 w-1/2 mt-1 p-2 rounded-xl">
// 								{subreddits?.map((indiv) => (
// 									<option
// 										value={indiv.name}
// 										key={indiv.id}>
// 										{indiv.name}
// 									</option>
// 								))}
// 							</select>
// 						</div>
// 					</div>
// 					<hr className="my-4 border-t-1 border-neutral-700"></hr>
// 					<div className="mb-4">
// 						<label className="">Title</label>
// 						<input
// 							className="bg-neutral-700 text-white w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
// 							type="text"
// 							placeholder="Enter a Title"
// 							value={title}
// 							onChange={(e) => setTitle(e.target.value)}
// 							required
// 						/>
// 					</div>
// 					<hr className="my-4 border-t-1 border-neutral-700"></hr>
// 					<div className="flex flex-row">
// 					<div className="flex flex-col mb-4">
// 						<label className="">Image / Video (optional)</label>
// 						<input
// 							className="bg-neutral-700 w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
// 							type="url"
// 							placeholder="Enter a URL"
// 							value={imgVid}
// 							onChange={(e) => {
// 								setImgVid(e.target.value);
// 							}}
// 						/>
// 					</div>

// 					{/* <div className="flex flex-col mb-4">
// 						<label className="">Upload Image (optional)</label>
// 						<button
// 							className="bg-neutral-700 w-full mt-1 p-2 rounded-xl placeholder:text-neutral-600"

// 							placeholder="Enter a URL"
// 							//value={file}
// 							type="file"
// 							onClick={() => handleFileChange()}
// 						>
// 						Upload</button>
// 					</div> */}

// 					<div className="flex flex-col mb-4">
// 						<button className="" onClick={handleButtonClick}>Upload Image (optional) </button>
// 						<input
// 							id="fileInput"
// 							className="bg-neutral-700 w-full mt-1 p-2 rounded-xl placeholder:text-neutral-600"
// 							accept='image/*'
// 							placeholder="Enter a URL"
// 							//value={file}
// 							type="file"

// 							onClick={handleButtonClick}
// 						>
// 						Upload</input>
// 					</div>

// 					</div>
// 					<hr className="my-4 border-t-1 border-neutral-700"></hr>
// 					<div className="mb-4">
// 						<label className="">Content</label>
// 						<ReactTextareaAutosize
// 							className="bg-neutral-700 w-full mt-1 p-2 rounded-xl resize-none placeholder:text-neutral-500"
// 							placeholder="Enter Content"
// 							onChange={(e) => setDetails(e.target.value)}
// 						/>
// 					</div>
// 					<hr className="flex flex-row items-center align-center justify-center my-4 border-t-1 border-neutral-700"></hr>
// 					<button
// 						className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-2xl px-10"
// 						onClick={() => handleSubmit()}>
// 						Submit
// 					</button>
// 				</div>
// 			</div>
// 		);
// }

// export default CreatePost;

import React, { useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useReddit } from "../contexts/RedditContext";
import { MdOutlineCancel, GiCancel } from "react-icons/md";
import { supabase } from "../../../lib/supabaseClient";

function CreatePost() {
	const { fetchSubreddits, subreddits, showCreatePostsModal, setShowCreatePostsModal, dateCreatedParse, checkUserAuthenticated, authorUser } = useReddit();

	const [subreddit, setSubreddit] = useState();
	const [title, setTitle] = useState(null);
	const [imgVid, setImgVid] = useState(null);
	const [details, setDetails] = useState(null);
	const [fileUUID, setFileUUID] = useState(null);

	const [selectedFile, setSelectedFile] = useState(null);
	const [uploadOption, setUploadOption] = useState("URL");

	// useEffect(() => {
	// 	console.log(`showCreatePostsModal is set to ${showCreatePostsModal}`);
	// }, [showCreatePostsModal]);

	const handleSubmit = async () => {
		const user = await checkUserAuthenticated();
		console.log("handle: ", user);
		if (!user) {
			return alert("Please Sign In First");
		}

		let fileUrl = "";

		if (uploadOption === "Upload" && selectedFile) {
			const { data, error } = await supabase.storage.from("posts").upload(`public/${fileUUID}`, selectedFile);

			if (error) {
				console.error("Error uploading file:", error);
				return;
			}

			fileUrl = data.Key;
		}

		const { data, error } = await supabase
			.from("posts")
			.insert([
				{
					subreddit: subreddit,
					title: title,
					content: details,
					upvotes: 1,
					downvotes: 0,
					postPic: imgVid,
					author: authorUser.user_metadata.username,
					upload: uploadOption,
					file: fileUUID
				},
			])
			.select();

		if (error) {
			console.error("Error inserting data:", error);
			return;
		}

		// const { error } = await supabase.from("your-table-name").insert({
		// 	subreddit,
		// 	title,
		// 	imgVid: fileUrl || imgVid,
		// 	details,
		// });

		if (error) {
			console.error("Error inserting data:", error);
		} else {
			console.log(data);
			setShowCreatePostsModal(false);
			window.location.reload();
		}
	};

	// const handleSubmit = async () => {
	// 	const user = await checkUserAuthenticated();
	// 	console.log("handle: ", user);
	// 	if (!user) {
	// 		return alert("Please Sign In First");
	// 	}

	// 	const { data, error } = await supabase
	// 		.from("posts")
	// 		.insert([
	// 			{
	// 				subreddit: subreddit,
	// 				title: title,
	// 				content: details,
	// 				upvotes: 1,
	// 				downvotes: 0,
	// 				postPic: imgVid,
	// 				author: authorUser.user_metadata.username,
	// 				image: image,
	// 			},
	// 		])
	// 		.select();

	// 	if (error) {
	// 		console.error("Error inserting data:", error);
	// 		return;
	// 	}

	// 	console.log(data);
	// 	setShowCreatePostsModal(false);
	// 	window.location.reload();
	// };

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
		setFileUUID(`${crypto.randomUUID()}${e.target.files[0].name}`)
	};

	useEffect(() => {
		console.log(`subreddits: `, subreddits);
		if (subreddits?.length > 0) {
			setSubreddit(subreddits[0].name);
		}
	}, [subreddits]);

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
							required
						/>
					</div>
					<hr className="my-4 border-t-1 border-neutral-700"></hr>

					<div className="mb-4">
						<div className="flex flex-row items-center ">
							<label className="flex flex-row mb-2">Image</label>
							<div className="flex space-x-4 flex-row justify-end ml-auto">
								<button
									className={`px-4 py-2 rounded-xl ${uploadOption === "URL" ? "bg-slate-700" : "bg-neutral-600"}`}
									onClick={() => setUploadOption("URL")}>
									URL
								</button>
								<button
									className={`px-4 py-2 rounded-xl ${uploadOption === "Upload" ? "bg-slate-700" : "bg-neutral-600"}`}
									onClick={() => setUploadOption("Upload")}>
									Upload
								</button>
							</div>
						</div>
					</div>
					{uploadOption === "URL" && (
						<div className="mb-4">
							<input
								className="bg-neutral-700 w-full p-2 rounded-xl placeholder:text-neutral-500"
								type="url"
								placeholder="Enter a URL"
								value={imgVid}
								onChange={(e) => setImgVid(e.target.value)}
							/>
						</div>
					)}
					{uploadOption === "Upload" && (
						<div className="mb-4 flex flex-row items-center">
							<button
								className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-2xl"
								onClick={() => document.getElementById("fileInput").click()}>
								Select Image
							</button>
							<input
								id="fileInput"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleFileChange}
							/>
							{selectedFile ? <span className="flex flex-row ml-auto overflow-hidden max-w-64">{`${selectedFile?.name}`}</span> : null}
						</div>
					)}

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

// import { useState } from 'react';
// import { MdOutlineCancel } from 'react-icons/md';
// import ReactTextareaAutosize from 'react-textarea-autosize';
// import { createClient } from '@supabase/supabase-js';
// import { supabase } from "../../../lib/supabaseClient";

// import React, { useEffect, useState } from "react";
// import ReactTextareaAutosize from "react-textarea-autosize";
// import { useReddit } from "../contexts/RedditContext";
// import { MdOutlineCancel, GiCancel } from "react-icons/md";
// import { supabase } from "../../../lib/supabaseClient";

// 	const { fetchSubreddits, subreddits, showCreatePostsModal, setShowCreatePostsModal, dateCreatedParse, checkUserAuthenticated, authorUser } = useReddit();
// 	const [subreddit, setSubreddit] = useState('');
// 	const [title, setTitle] = useState('');
// 	const [imgVid, setImgVid] = useState('');
// 	const [details, setDetails] = useState('');
// 	const [selectedFile, setSelectedFile] = useState(null);
// 	const [uploadOption, setUploadOption] = useState('URL'); // New state for tracking the selected option

// 	const handleFileChange = (e) => {
// 		setSelectedFile(e.target.files[0]);
// 	};

// 	const handleSubmit = async () => {
// 		let fileUrl = '';

// 		if (uploadOption === 'Upload' && selectedFile) {
// 			const { data, error } = await supabase.storage
// 				.from('your-bucket-name')
// 				.upload(`public/${selectedFile.name}`, selectedFile);

// 			if (error) {
// 				console.error('Error uploading file:', error);
// 				return;
// 			}

// 			fileUrl = data.Key;
// 		}

// 		const { error } = await supabase
// 			.from('your-table-name')
// 			.insert({
// 				subreddit,
// 				title,
// 				imgVid: fileUrl || imgVid,
// 				details,
// 			});

// 		if (error) {
// 			console.error('Error inserting data:', error);
// 		} else {
// 			setShowCreatePostsModal(false);
// 		}
// 	};

// 	if (showCreatePostsModal === false) {
// 		return null;
// 	} else {
// 		return (
// 			<div className="fixed inset-0 flex items-center justify-center z-50">
// 				<div
// 					className="fixed inset-0 bg-black opacity-65"
// 					onClick={() => setShowCreatePostsModal(false)}></div>
// 				<div className="bg-neutral-800 p-6 rounded-3xl drop-shadow-6xl z-10 w-11/12 max-w-lg border border-2 border-neutral-700">
// 					<div className="flex justify-between items-center mb-4">
// 						<h2 className="text-xl">Create Post</h2>
// 						<div className="flex justify-center align-center p-2 rounded-full hover:bg-neutral-900">
// 							<button
// 								className=""
// 								onClick={() => setShowCreatePostsModal(false)}>
// 								<MdOutlineCancel size={"24"} />
// 							</button>
// 						</div>
// 					</div>
// 					<hr className="my-4 border-t-2 border-neutral-600"></hr>
// 					<div className="flex flex-row mb-4">
// 						<label className="flex flex-row items-center">Subreddit</label>
// 						<div className="w-full h-full flex flex-row items-center justify-end">
// 							<select
// 								value={subreddit}
// 								onChange={(e) => setSubreddit(e.target.value)}
// 								className="flex flex-row bg-neutral-600 w-1/2 mt-1 p-2 rounded-xl">
// 								{subreddits?.map((indiv) => (
// 									<option
// 										value={indiv.name}
// 										key={indiv.id}>
// 										{indiv.name}
// 									</option>
// 								))}
// 							</select>
// 						</div>
// 					</div>
// 					<hr className="my-4 border-t-1 border-neutral-700"></hr>
// 					<div className="mb-4">
// 						<label className="">Title</label>
// 						<input
// 							className="bg-neutral-700 text-white w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
// 							type="text"
// 							placeholder="Enter a Title"
// 							value={title}
// 							onChange={(e) => setTitle(e.target.value)}
// 							required
// 						/>
// 					</div>
// 					<hr className="my-4 border-t-1 border-neutral-700"></hr>
// 					<div className="mb-4">
// 						<label className="">Image / Video</label>
// 						<div className="flex space-x-4">
// 							<button
// 								className={`px-4 py-2 rounded-xl ${uploadOption === 'URL' ? 'bg-slate-700' : 'bg-neutral-600'}`}
// 								onClick={() => setUploadOption('URL')}>
// 								URL
// 							</button>
// 							<button
// 								className={`px-4 py-2 rounded-xl ${uploadOption === 'Upload' ? 'bg-slate-700' : 'bg-neutral-600'}`}
// 								onClick={() => setUploadOption('Upload')}>
// 								Upload
// 							</button>
// 						</div>
// 					</div>
// 					{uploadOption === 'URL' && (
// 						<div className="mb-4">
// 							<input
// 								className="bg-neutral-700 w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
// 								type="url"
// 								placeholder="Enter a URL"
// 								value={imgVid}
// 								onChange={(e) => setImgVid(e.target.value)}
// 							/>
// 						</div>
// 					)}
// 					{uploadOption === 'Upload' && (
// 						<div className="mb-4">
// 							<button
// 								className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-2xl"
// 								onClick={() => document.getElementById('fileInput').click()}>
// 								Select Image
// 							</button>
// 							<input
// 								id="fileInput"
// 								type="file"
// 								accept="image/*"
// 								className="hidden"
// 								onChange={handleFileChange}
// 							/>
// 						</div>
// 					)}
// 					<hr className="my-4 border-t-1 border-neutral-700"></hr>
// 					<div className="mb-4">
// 						<label className="">Content</label>
// 						<ReactTextareaAutosize
// 							className="bg-neutral-700 w-full mt-1 p-2 rounded-xl resize-none placeholder:text-neutral-500"
// 							placeholder="Enter Content"
// 							onChange={(e) => setDetails(e.target.value)}
// 						/>
// 					</div>
// 					<hr className="flex flex-row items-center align-center justify-center my-4 border-t-1 border-neutral-700"></hr>
// 					<button
// 						className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-2xl px-10"
// 						onClick={handleSubmit}>
// 						Submit
// 					</button>
// 				</div>
// 			</div>
// 		);
// 	}
// };

// export default CreatePost;
