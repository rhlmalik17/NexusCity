import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import FriendsScreen from "./FriendsScreen";
import SearchPanel from "./SearchPanel";
import NotificationsPanel from "./NotificationsPanel";

NotificationsPanel.navigationOptions = {
  header: null
};

FriendsScreen.navigationOptions = {
  header: null
};

SearchPanel.navigationOptions = {
  header: null
};

let Friends = createAppContainer(
  createStackNavigator(
    {
      FriendsScreen: FriendsScreen,
      SearchPanel: SearchPanel,
      NotificationsPanel: NotificationsPanel
    },
    {
      initialRouteName: "FriendsScreen"
    }
  )
);
export default Friends;
