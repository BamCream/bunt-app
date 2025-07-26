import Provider from "src/components/common/provider";
import { Slot } from "expo-router";

export default function Layout() {
    return (
        <Provider>
            <Slot />
        </Provider>
    );
}
