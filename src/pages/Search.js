import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Button, ButtonIcon, ButtonText, HStack, Icon, Input, InputField, InputIcon, VStack } from '@gluestack-ui/themed';
import { FormControl, FormControlLabelText, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '@gluestack-ui/themed';
import { SearchIcon } from '@gluestack-ui/themed';
import MoviesContainer from '../containers/moviesContainer';
import { BASE_URL, API_KEY } from '../apiConfig';

const Search = ({ navigation }) => {
    const [searchCategory, setSearchCategory] = useState('movie');
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchInitiated, setSearchInitiated] = useState(false);

    const searchCategories = [
        { key: 'Multi', value: 'multi' },
        { key: 'TV Show', value: 'tv' },
        { key: 'Movie', value: 'movie' },
    ];

    const fetchSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/search/${searchCategory}?api_key=${API_KEY}&query=${search}`);
            setMovies(response.data.results);
        } catch (error) {
            setError('Failed to fetch data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        setSearchInitiated(true);
        fetchSearch();
    };

    useEffect(() => {
        if (search) {
            fetchSearch();
        }
    }, [searchCategory]);

    const handleSearchTypeChange = (value) => {
        setSearchCategory(value);
    };

    return (
        <View style={styles.container}>
            <View style={styles.centerContainer}>
                <VStack space={4} width="100%">
                    <FormControl isRequired>
                        <FormControl.Label>
                            <FormControlLabelText>Search Movie/TV Show Name</FormControlLabelText>
                        </FormControl.Label>
                        <HStack width="100%" space={2} alignItems="center">
                            <Input width="80%" flexDirection="row" alignItems="center">
                                <InputIcon>
                                    <Icon as={SearchIcon} size="sm" />
                                </InputIcon>
                                <InputField
                                    placeholder="i.e. James Bond, CLI"
                                    value={search}
                                    onChangeText={setSearch}
                                    style={{ flex: 1 }}
                                />
                            </Input>
                        </HStack>
                        <FormControl.Label>
                            <FormControlLabelText>Choose Search Type</FormControlLabelText>
                        </FormControl.Label>
                        <HStack space={2} alignItems="center" justifyContent="center">
                            <Select value={searchCategory} onValueChange={handleSearchTypeChange} style={styles.selectContainer}>
                                <SelectTrigger variant="outline" size="md">
                                    <SelectInput placeholder="Search Type" />
                                </SelectTrigger>
                                <SelectPortal>
                                    <SelectBackdrop />
                                    <SelectContent>
                                        <SelectDragIndicatorWrapper>
                                            <SelectDragIndicator />
                                        </SelectDragIndicatorWrapper>
                                        {searchCategories.map((option) => (
                                            <SelectItem key={option.value} label={option.key} value={option.value} />
                                        ))}
                                    </SelectContent>
                                </SelectPortal>
                            </Select>
                            <View style={styles.spacer} />
                            <Button onPress={handleSearch} style={[styles.searchButton, styles.cyanButton]}>
                                <ButtonIcon as={SearchIcon} mr='$2' />
                                <ButtonText>Search</ButtonText>
                            </Button>
                        </HStack>
                    </FormControl>
                </VStack>
            </View>
            <View>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#00bcd4" />
                        <Text style={styles.loadingText}>Loading page...</Text>
                    </View>
                ) : searchInitiated ? (
                    movies.length > 0 ? (
                        <MoviesContainer movies={movies} navigation={navigation} />
                    ) : (
                        <Text style={styles.initiateText}>No results found. Please try a different search term.</Text>
                    )
                ) : (
                    <Text style={styles.initiateText}>Please Initiate a search</Text>
                )}
            </View>
        </View>
    );
};

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
        flex: 0.7,
    },
    spacer: {
        width: 10, 
    },
    searchButton: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cyanButton: {
        backgroundColor: '#00bcd4',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    initiateText: {
        paddingTop: 150,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Search;
