import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';
import MoviesContainer from '../containers/moviesContainer';
import { API_KEY, BASE_URL } from '../apiConfig';
import { Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from '@gluestack-ui/themed';

const Movies = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState('now_playing');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = [
        { key: 'now_playing', value: 'Now Playing' },
        { key: 'popular', value: 'Popular' },
        { key: 'top_rated', value: 'Top Rated' },
        { key: 'upcoming', value: 'Upcoming' }
    ];

    const fetchMovies = async (category) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`);
            setMovies(response.data.results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(selectedCategory);
    }, [selectedCategory]);

    const handleSearchTypeChange = (value) => {
        setSelectedCategory(value);
    };

    return (
        <View style={styles.container}>
            <View style={styles.centerContainer}>
                <Select value={selectedCategory} onValueChange={handleSearchTypeChange} style={styles.selectContainer}>
                    <SelectTrigger variant="outline" size="md">
                        <SelectInput placeholder="Search Type" />
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            {categories.map((option) => (
                                <SelectItem
                                    key={option.key}
                                    label={option.value}
                                    value={option.key}
                                    style={option.key === selectedCategory ? styles.selectedItem : null}
                                />
                            ))}
                        </SelectContent>
                    </SelectPortal>
                </Select>
            </View>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Loading page...</Text>
                </View>
            ) : (
                <MoviesContainer movies={movies} navigation={navigation} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContainer: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectContainer: {
        width: '100%',
        paddingRight: 20,
    },
    selectedItem: {
        backgroundColor: 'green',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Movies;
