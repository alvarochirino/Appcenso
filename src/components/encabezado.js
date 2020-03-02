import React from 'react';
import {
	Text,
	View,
	Image,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const myIcon = <Icon name="chevron-left" size={24} />;

export default function Encabezado(props) {
	volver = () => {
		props.navigation.goBack(null);
		return true;
	}

	return (
		<View>
			<SafeAreaView>
				<View style={styles.container}>
					{Platform.OS === 'ios' ?
						<View style={styles.viewAtras}>
							<TouchableOpacity onPress={this.volver}>
								{myIcon}
							</TouchableOpacity>
						</View>
						: null
					}
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
	viewAtras: {
		flex: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	left: {
		flex: 77,
		alignItems: 'center',
		//backgroundColor: 'blue',
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
		fontFamily: 'ConthraxSb-Regular',
		textAlign: 'center',
	},
	text2: {
		color: 'black',
		fontFamily: 'ConthraxSb-Regular',
		textAlign: 'center',
	},
})