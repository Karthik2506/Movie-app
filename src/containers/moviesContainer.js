import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const MoviesContainer = ({ navigation, movies }) => {
    return (
        <FlatList
            data={movies}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Image
                        style={styles.image}
                        source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
                    />
                    <View style={styles.details}>
                        <Text style={styles.title}>{item.title ? item.title : item.name}</Text>
                        <Text style={styles.popularity}>Popularity: {item.popularity}</Text>
                        <Text style={styles.release}>Release Date: {item.release_date}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Details', { title: item.title ? item.title : item.name, pic: item.poster_path, overview: item.overview, popularity: item.popularity, releaseDate: item.release_date })}
                        >
                            <Text style={styles.buttonText}>More Details</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            
        />
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    image: {
        width: 100,
        height: 100,
        
    },
    details: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    popularity: {
        margin : 2,
        fontSize: 12,
        color: '#666',
    },
    release: {
        fontSize: 12,
        color: '#666',
    },
    button: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#00bcd4',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MoviesContainer;
