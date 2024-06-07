import { Box, Center } from '@gluestack-ui/themed';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ShowScreen = ({ route }) => {
    const { title, pic, overview, popularity, releaseDate } = route.params;
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: title,
            headerBackTitle: 'Back to List',
        });
    }, [navigation, title]);

    return (
        <Box width='100%' px={20}>
            <Center py={10}>
                <Text style={styles.title}>{title}</Text>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${pic}` }}
                    style={styles.image}
                    accessibilityLabel={`Poster for ${overview}`}
                />
                <Text style={styles.overview}>{overview}</Text>
                <Text style={styles.details}>
                    <Text style={styles.boldText}>Popularity:</Text> {popularity} | 
                    <Text style={styles.boldText}> Release Date:</Text> {new Date(releaseDate).toLocaleDateString()}
                </Text>
            </Center>
        </Box>
    );
};

const styles = StyleSheet.create({
    title: {
        marginVertical: 20,
        fontWeight: 'bold',
        fontSize: 18, // $2xl equivalent
    },
    image: {
        marginVertical: 20,
        width: 300,
        height: 300,
    },
    overview: {
        marginVertical: 15,
        marginHorizontal: 20
    },
    details: {
        marginVertical: 2,
        fontSize: 12,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default ShowScreen;
