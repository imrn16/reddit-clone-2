"use client"
import React from "react";
import { useReddit } from "../contexts/RedditContext";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import ReactTextareaAutosize from "react-textarea-autosize";
import { supabase } from "../../../lib/supabaseClient";
import {update} from "../login/actions"
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

function EditUser() {
	const { showUserEditModal, setShowUserEditModal, showCreatePostsModal, checkUserAuthenticated, authorUser, setAuthorUser } = useReddit();

	const [title, setTitle] = useState(null);
	const [image, setImage] = useState(null);
	const [details, setDetails] = useState(null);
	const [banner, setBanner] = useState(null);

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [username, setUsername] = useState('')

	const router = useRouter()


	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		
	//	await update(formData);
		
	// 	const user = checkUserAuthenticated()

    // if (user) {
	// 	const { error: updateError } = await supabase.auth.updateUser({
	// 		email,
	// 		password,
	// 		data: {
	// 		  username,
	// 		  first_name: firstName,
	// 		  last_name: lastName,
	// 		},
	// 	  });
	
	// 	  if (updateError) {
	// 		console.error('Error updating profile:', updateError.message);
	// 	  } else {
	// 		console.log('Profile updated successfully!');
	// 	  }}

	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email"),
		password: formData.get("password"),
		username: formData.get("username"),
	};

	const metadata = {
		first_name: formData.get("first_name"),
		last_name: formData.get("last_name"),
		username: formData.get("username"),
	};

	const { error } = await supabase.auth.updateUser({
		email: data.email,
		password: data.password,
			options: {
			data: metadata,
		},
	});

	if (error) {
		router.push("/error");
    console.log('NO')
	}
		

		setShowUserEditModal(false);
	//	router.push("/");
		//window.location.reload(); 
		console.log("refresh after login");
		await checkUserAuthenticated();

	};

	if (showUserEditModal === false) {
		return null;
	} else
		return (
			<div className="fixed inset-0 flex items-center justify-center z-50">
				<div
					className="fixed inset-0 bg-black opacity-65"
					onClick={() => setShowUserEditModal(false)}></div>
				<div className="bg-neutral-800 p-6 rounded-3xl drop-shadow-6xl z-10 w-11/12 max-w-lg border border-2 border-neutral-700">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl">Edit User</h2>
						<div className="flex justify-center aling-center p-2 rounded-full hover:bg-neutral-900">
							<button
								className=""
								onClick={() => setShowUserEditModal(false)}>
								<MdOutlineCancel size={"24"} />
							</button>
						</div>
					</div>
					<hr className="my-4 border-t-2 border-neutral-600"></hr>
					<form
						method="POST"
						onSubmit={handleSubmit}>
                            <div className="mb-4">
							<label className="">Username</label>
							<input
								className="bg-neutral-700 text-white w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
								type="text"
								name="username"
								defaultValue={authorUser.user_metadata.username}
								placeholder="Enter A User Name"
								// value={username}
								// onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
                        <div className="flex flex-row">
                        <div className="mb-4 pr-2">
							<label className="">First Name</label>
							<input
								className="bg-neutral-700 text-white w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
								type="text"
								name="first_name"
								placeholder="Enter First Name"
								defaultValue={authorUser.user_metadata.first_name}
                                required
								// value={firstName}
								// onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
                        <div className="mb-4 pl-2">
							<label className="">Last Name</label>
							<input
								className="bg-neutral-700 text-white w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
								type="text"
								name="last_name"
								placeholder="Enter Last Name"
								defaultValue={authorUser.user_metadata.last_name}
                                required
								// value={lastName}
								// onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
                        </div>
						<div className="mb-4">
							<label className="">Email</label>
							<input
								className="bg-neutral-700 text-white w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
								type="email"
								name="email"
								placeholder="Enter Your Email"
								defaultValue={authorUser.email}
                                required
								// value={email}
								// onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<hr className="my-4 border-t-1 border-neutral-700"></hr>
						<div className="mb-4">
							<label className="">Password</label>
							<input
								className="bg-neutral-700 w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
								type="password"
								name="password"
								placeholder="Enter Your Password"
                                required
								// value={password} 
								// onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<hr className="flex flex-row items-center align-center justify-center my-4 border-t-1 border-neutral-700"></hr>
						<button
							className="bg-blue-700 hover:bg-slate-600 px-4 py-2 rounded-2xl px-10"
							// onClick={() => handleSubmit()}
							type="submit">
							Update
						</button>
						{/* <button
							className="bg-blue-900 hover:bg-blue-700 px-3 py-2 rounded-2xl px-10 ml-4"
							onClick={signup}>
							Sign Up
						</button> */}
					</form>
				</div>
			</div>
		);
}

export default EditUser;
