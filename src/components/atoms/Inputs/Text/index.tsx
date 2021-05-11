import React from "react";
import { TextInput } from "react-native";
import { TextInputProps } from "../../../../declerations";
import InputStyles from "../styles";

const CustomTextInput = (props: TextInputProps) => (
	<TextInput
		style={InputStyles.inputLineOuter}
		{...props}
		onChangeText={props.onChange}
	/>
);

export default CustomTextInput;
