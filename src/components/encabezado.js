import React from 'react';
import {
	Text,
	View,
	Image,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity
} from 'react-native';

export default function Encabezado(props) {
	return (
		<View>
			<SafeAreaView>
				<View style={styles.container}>
					<View style={styles.left}>
						<Text style={styles.text1}>{props.title}</Text>
						<Text style={styles.text2}>{props.subtitle}</Text>
						{props.subtitle2 != null ?
						<Text style={styles.text2}>{props.subtitle2}</Text>
						: null}
					</View>
					<View style={styles.right}>
						<Image
							source={require('../../assets/escudo.jpg')}
							style={styles.logo}
						/>
					</View>
				</View>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 5,
		flexDirection: 'row',
	},
	left: {
		flex: 82,
		alignItems: 'center',
	},
	right: {
		flex: 18,
		alignItems: 'center',
	},
	logo: {
		flex: 1,
		width: 60,
		resizeMode: 'contain'
	},
	text1: {
		fontSize: 24,
		color: 'black',
		fontFamily: 'conthrax-sb',
		textAlign: 'center',
	},
	text2: {
		color: 'black',
		fontFamily: 'conthrax-sb',
		textAlign: 'center',
	},
})