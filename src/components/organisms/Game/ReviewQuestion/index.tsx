import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Alert, TouchableOpacity, View, Text } from "react-native";
import { Atoms } from "../../..";
import styles from "./styles";
import { Utils } from "../";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../../reducers";
import getQuestions from "./questions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Actions from "../../../../actions";
import { CheckListItem } from "./interface";
import style from "../../Notifications/styles";

const ReviewQuestion = () => {
	const state = useSelector((state: StoreState) => state.verifyQuestion);
	const game = useSelector((state: StoreState) => state.game);
	const auth = useSelector((state: StoreState) => state.auth);
	const dispatch = useDispatch();

	const [items, setItems] = useState<CheckListItem[]>([]);
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		setItems(getQuestions());
		setCurrent(0);
	}, [game.lastLoaded]);

	const item = useMemo<CheckListItem | undefined>(
		() => items[current],
		[items, current]
	);

	// toggle true false for item at index i
	const advance = useCallback(
		(isGood: boolean) => {
			if (isGood) {
				const copy = [...items];
				copy[current].value = isGood;
				setItems([...copy]);
				setCurrent((c) => c + 1);
			} else handleArchive();
		},
		[items, current]
	);

	useEffect(() => {
		if (items.length > 0 && items.length === current)
			handleCompleteStep(true);
	}, [current, items]);

	// handles archive
	const handleArchive = async () =>
		Alert.alert(
			"Ertu viss?",
			`${item?.badQuestionPrompt} Ef svo er þá munum við eyða henni.`,
			[
				{
					text: "Hætta við",
					onPress: () => null,
				},
				{
					text: "Já",
					onPress: () => handleCompleteStep(false),
				},
			]
		);

	// handles completing step and dispatching action
	// which will get next rounds info
	const handleCompleteStep = async (isGood: boolean) =>
		dispatch(
			Actions.Game.submitVerifyQuestion(game._id, state._id, isGood)
		);

	return (
		<View style={styles.flex}>
			<Utils.QuestionIs question={state.text} />

			{item ? (
				<View style={styles.middle}>
					<View style={styles.center}>
						<Atoms.Text.Heading>
							{item?.title}
						</Atoms.Text.Heading>
						<Atoms.Text.Para style={styles.para}>
							{item?.description}
						</Atoms.Text.Para>
						<View style={styles.buttons}>
							<Atoms.Buttons.Emoji
								emoji="👍"
								onPress={() => advance(true)}
								type="success"
							/>
							<Atoms.Buttons.Emoji
								emoji="👎"
								onPress={() => advance(false)}
								type="danger"
							/>
						</View>
					</View>
				</View>
			) : null}
		</View>
	);
};

export default ReviewQuestion;
