import React from "react";
import { View, Alert, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Atoms, Molecules, Organisms } from "../../components";
import { StoreState } from "../../reducers";
import styles from "./styles";
import * as Services from "../../services";
import { FontAwesome } from "@expo/vector-icons";
import LayoutWrapper from "../../layout";
import { logOutUser } from "../../actions/auth";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import * as Hooks from "../../hooks";
import * as Actions from "../../actions";

const UserProgress = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	const chartData = useSelector((state: StoreState) => state.chartData);

	const dispatch = useDispatch();

	const alertSignOut = () =>
		Alert.alert("Útskráning", "Viltu skrá þig út?", [
			{
				text: "Nei",
				onPress: () => null,
				style: "cancel",
			},
			{ text: "Já", onPress: () => dispatch(logOutUser()) },
		]);

	// fired when notification is received while app is open
	Hooks.Notifications.useNotificationListener((item) => {
		console.log("NEW NOTIFICATION:", item);
	});

	// fired when notification response is received
	Hooks.Notifications.useResponseListener((response) => {
		console.log("NEW NOTIFICATION RESPONSE:", response);
	});

	// handle get permission
	Hooks.Notifications.useRequestPermission((token) => {
		dispatch(
			Actions.PushNotification.sendPushNotificationToken(token)
		);
	});

	return (
		<ScrollView>
			<LayoutWrapper>
				<View>
					<Molecules.Users.Info {...auth} />
					<TouchableOpacity
						onPress={alertSignOut}
						style={styles.lock}
					>
						<FontAwesome
							name="lock"
							size={20}
							color={Services.Colors.MapToDark["grey"]}
						/>
					</TouchableOpacity>
				</View>

				<Atoms.Text.Heading style={styles.padTitleTop}>
					Minn árangur
				</Atoms.Text.Heading>
				<Organisms.Users.ScoreCard {...auth} />
				<Atoms.Text.Heading style={styles.padTitleTop}>
					Leiðin að 100 þúsund
				</Atoms.Text.Heading>
				{/* <Atoms.Charts.LineChart
					datasets={[
						{
							// data: [1, 2, 5, 10, 15, 22, 23, 33],
							data: chartData.answersPerDay.reduce<number[]>(
								(prev, curr) => {
									if (prev.length === 0)
										return [curr.count];
									const last = prev[prev.length - 1];
									prev.push(curr.count + last);
									return prev;
								},
								[]
							),
						},
					]}
					labels={chartData.answersPerDay.map((item, i) => {
						if (i === 0)
							return moment(item.date).format("DD MM");
						else if (i === chartData.answersPerDay.length - 1)
							return "í dag      ";
						return "";
					})}
					// labels={["23.03", "", "", "", "", "", "", "I dag           "]}
					height={220}
				/> */}
			</LayoutWrapper>
		</ScrollView>
	);
};

export default UserProgress;
