import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import MoviesContainer from '../containers/moviesContainer';
import { API_KEY, BASE_URL } from '../apiConfig';
import { Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from '@gluestack-ui/themed';

const Tvshows = ({ navigation }) => {
    const [tvCategory, setTvCategory] = useState('popular');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const Tvcategories = [
        { key: 'airing_today', label: 'Airing Today' },
        { key: 'on_the_air', label: 'On The Air' },
        { key: 'popular', label: 'Popular' },
        { key: 'top_rated', label: 'Top Rated' }
    ];

    const fetchTvshows = async (tvcategory) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/tv/${tvcategory}?api_key=${API_KEY}`);
            setMovies(response.data.results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTvshows(tvCategory);
    }, [tvCategory]);

    const handleTvCategoryChange = (value) => {
        setTvCategory(value);
    };

    return (
        <View style={styles.container}>
            <View style={styles.centerContainer}>
                <Select value={tvCategory} onValueChange={handleTvCategoryChange} style={styles.selectContainer}>
                    <SelectTrigger variant="outline" size="md">
                        <SelectInput placeholder="Select TV Category" />
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            {Tvcategories.map((option) => (
                                <SelectItem key={option.key} label={option.label} value={option.key} />
                            ))}
                        </SelectContent>
                    </SelectPortal>
                </Select>
            </View>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Tvshows;
