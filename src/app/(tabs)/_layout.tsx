import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import Home from "../../assets/images/home.png";
import Dictionary from "../../assets/images/dictionary.png";
import Upload from "../../assets/images/upload.png";
import Record from "../../assets/images/record.png";
import Profile from "../../assets/images/profile.png";

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarBackground: () => (
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "#ffffff",
                            borderTopWidth: 0,
                        }}
                    />
                ),
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={Home}
                            style={{ width: 24, height: 24, tintColor: color }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="dictionary"
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={Dictionary}
                            style={{ width: 24, height: 24, tintColor: color }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="upload"
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={Upload}
                            style={{ width: 24, height: 24, tintColor: color }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="record"
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={Record}
                            style={{ width: 24, height: 24, tintColor: color }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={Profile}
                            style={{ width: 24, height: 24, tintColor: color }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
