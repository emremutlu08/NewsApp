import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity,Image, Dimensions } from 'react-native';
import { AppLoading } from 'expo';

const url = "https://YOUR-WEBSITE-WORDPRESS.com/wp-json/wp/v2/posts";
export default class App extends React.Component {

    state = {
        isLoaded: false,
        posts: []
    }

    componentDidMount() {
        this.fetchPosts()
    }

    async fetchPosts() {
        return fetch(url)
            .then(result => result.json())
            .then(resultJSON => {
                this.setState({
                    isLoaded: true,
                    posts: resultJSON
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.item}>
                                    <TouchableOpacity>

                                        <View style={styles.cardContainer}>

                                            <Image
                                                style={{
                                                    borderRadius: 20,
                                                }}
                                                source={{
                                                    uri: item.jetpack_featured_media_url,
                                                    width: Dimensions.get("window").width,
                                                    height: 300
                                                }}
                                            />

                                            <Text
                                            style={{
                                                marginTop: 10,
                                                marginHorizontal: 10
                                            }}>
                                                {item.title.rendered}
                                            </Text>

                                        </View>

                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <AppLoading />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        marginVertical: 20,
    },
    cardContainer: {
        
    }
});
