import React from 'react';
import {
	View,
	StyleSheet
} from 'react-native';

export default function VerticalSeparator(props) {
	return (
		<View style={styles.separator}></View>
	);
}

const styles = StyleSheet.create({
	separator: {
		borderTopWidth: 1,
		borderTopColor: '#000',
		marginHorizontal: 50,
		marginVertical: 4,
	},

})