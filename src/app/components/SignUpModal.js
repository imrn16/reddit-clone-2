import React, { useState } from "react";
import { useReddit } from "../contexts/RedditContext";
import { MdOutlineCancel, GiCancel } from "react-icons/md";
import { login, signup } from "../login/actions";
import ReactTextareaAutosize from "react-textarea-autosize";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

function SignUpModal() {
	const { showSignUpModal, setShowSignUpModal, checkUserAuthenticated } = useReddit();

	const [user, setUser] = useState();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [pass, setPass] = useState();

	const router = useRouter();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		await signup(formData);
		setShowSignUpModal(false);


		// console.log('user: ', user, 'first name: ', firstName, 'last name: ', lastName, 'email: ', email, 'password: ', pass)
		// console.log(formData)
		
		// const data = {
		// 	email: email,
		// 	password: pass,
		// };
	
		// const metadata = {
		// 	first_name: firstName,
		// 	last_name: lastName,
		// 	username: user,
		// };
	
		// const { error } = await supabase.auth.signUp({
		// 	email: data.email,
		// 	password: data.password,
		// 	options: {
		// 		data: metadata,
		// 	},
		// });
	
		// if (error) {
		// 	redirect("/error");
		// }
	
		//console.log(data, metadata)
		
		// revalidatePath("/", "layout");
		// redirect("/");
	

		//router.push("/");
		// console.log("refresh after login");
		// await checkUserAuthenticated();
	};

	const handleSignIn = async (event) => {
		event.preventDefault();
		const { data, error } = await supabase.auth.signInWithPassword({
			email: `${email}`,
			password: `${pass}`,
		});
	};

	if (showSignUpModal === false) {
		return null;
	} else
		return (
			<div className="fixed inset-0 flex items-center justify-center z-50">
				<div
					className="fixed inset-0 bg-black opacity-65"
					onClick={() => setShowSignUpModal(false)}></div>
				<div className="bg-neutral-800 p-6 rounded-3xl drop-shadow-6xl z-10 w-11/12 max-w-lg border border-2 border-neutral-700">
<div className="flex flex-col">
					<div className="flex justify-between items-center ">
						<div className="flex flex-col">
						<h2 className="flex flex-col text-xl">Sign Up</h2>
						
						</div>
						<div className="flex justify-center aling-center p-2 rounded-full hover:bg-neutral-900">
							<button
								className=""
								onClick={() => setShowSignUpModal(false)}>
								<MdOutlineCancel size={"24"} />
							</button>
						</div>
					</div>
					<h3 className="flex flex-col text-xs text-neutral-600 ">{`Click the link from "Reddit Clone" in your email after you sign up.`}</h3>
					</div>
					<hr className="my-2 border-t-2 border-neutral-600"></hr>
					<form
						method="POST"
						onSubmit={handleSubmit}>
                            <div className="mb-4">
							<label className="">Username</label>
							<input
								className="bg-neutral-700 text-white w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
								type="username"
								name="username"
								placeholder="Enter A User Name"
								required
								value={user}
								onChange={(e) => setUser(e.target.value)}
							/>
						</div>
                        <div className="flex flex-row">
                        <div className="mb-4 pr-2">
							<label className="">First Name</label>
							<input
								className="bg-neutral-700 text-white w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
								type="first_name"
								name="first_name"
								placeholder="Enter First Name"
                                required
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
                        <div className="mb-4 pl-2">
							<label className="">Last Name</label>
							<input
								className="bg-neutral-700 text-white w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
								type="last_name"
								name="last_name"
								placeholder="Enter Last Name"
                                required
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
                        </div>
						<hr className="my-4 border-t-1 border-neutral-700"></hr>
						<div className="mb-4">
							<label className="">Email</label>
							<input
								className="bg-neutral-700 text-white w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
								type="email"
								name="email"
								placeholder="Enter Your Email"
                                required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						
						<div className="mb-4">
							<label className="">Password</label>
							<input
								className="bg-neutral-700 w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
								type="password"
								name="password"
								placeholder="Enter Your Password"
                                required
								value={pass} 
								onChange={(e) => setPass(e.target.value)}
							/>
						</div>

						<hr className="flex flex-row items-center align-center justify-center my-4 border-t-1 border-neutral-700"></hr>
						<button
							className="bg-blue-700 hover:bg-slate-600 px-4 py-2 rounded-2xl px-10"
							// onClick={() => handleSubmit()}
							type="submit">
							Sign Up
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

export default SignUpModal;
