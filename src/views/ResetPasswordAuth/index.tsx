import React, { useCallback } from "react";
import { TouchableOpacity, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Forms } from "../../components/organisms";

import * as Actions from "../../actions";
import { StoreState } from "../../reducers";

const ResetPasswordAuth = () => {
	const dispatch = useDispatch();

	const state = useSelector((state: StoreState) => state.authCode);
	const auth = useSelector((state: StoreState) => state.auth);
	const handleGoBack = () => {
		console.log("go back");
	};

	const handleNewVerificationCode = () =>
		dispatch(Actions.AuthCode.requestNewVerificationCode());

	const handleSendVerificationCode = useCallback(
		(code: string) => dispatch(Actions.AuthCode.verifyUser(code)),
		[]
	);

	const CODE_LENGTH = 8;

	const text = {
		title: "Staðfestingarkóði",
		description: `Staðfestingarkóði hefur verið sendur á ${auth.email}`,
		goBackText: "Til baka",
	};

	return (
		<TouchableOpacity
			activeOpacity={1}
			onPress={() => Keyboard.dismiss()}
			style={{ flex: 1 }}
		>
			<Forms.PinCodeScreen
				codeLength={CODE_LENGTH}
				onGoBack={handleGoBack}
				onRequestNew={handleNewVerificationCode}
				onSubmit={handleSendVerificationCode}
				error={{ label: state.errorMessage, type: "danger" }}
				{...text}
			/>
		</TouchableOpacity>
	);
};

export default ResetPasswordAuth;
